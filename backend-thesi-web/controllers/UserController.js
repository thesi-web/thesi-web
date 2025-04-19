const User = require("../models/User");
const Professor = require("../models/Professor")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userService = require("../services/userService");
const { enviarRecuperacao } = require("../services/authService");

class UserController {

  async create(req, res) {
    const { phone, name, email, password, confirmpassword } = req.body;

    // Verificação de campos obrigatórios
    if (!phone || !name || !email || !password || !confirmpassword) {
      return res.status(400).json({ msg: "Todos os campos são obrigatórios" });
    }

    // Verificação se as senhas são iguais
    if (password !== confirmpassword) {
      return res.status(400).json({ msg: "As senhas não coincidem" });
    }

    try {
      // Verifica se o usuário já é cadastrado
      const existingUser = await User.findByEmail(email);
      if (existingUser) {
        return res.status(400).json({ msg: "Este e-mail já está cadastrado" });
      }

      // Criação do usuário
      const t_usuario = {
        phone,
        name,
        email,
        password,
      };

      await User.create(t_usuario);
      return res.status(201).json({ msg: "Usuário criado com sucesso!" });

    } catch (err) {
      console.error(err);
      return res.status(500).json({ msg: "Erro ao criar usuário" });
    }
  }

  async searchUser(req, res) {
    const search = req.query.search?.trim();
  
    if (!search || search.length < 2) {
      return res.status(400).json({ message: 'Digite pelo menos 2 letras' });
    }    
  
    try {
      const usuarios = await User.findByName(search);
      res.json(usuarios);
    } catch (err) {
      res.status(500).json({ message: 'Erro interno' });
    }
  }

  async login(req, res) {

    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ msg: "E-mail e senha são obrigatórios." });
    }

    try {
      const aluno = await User.findByEmail(email);

      if (aluno) {
        const passwordCorrect = await bcrypt.compare(password, aluno.ds_senha);
        if (!passwordCorrect) {
          return res.status(400).json({ msg: "Senha ou e-mail inválido." });
        }

        const tokenAluno = jwt.sign(
          { id: aluno.id_usuario, role: "aluno" },
          process.env.JWT_SECRET,
          { expiresIn: "1h" }
        );

        return res.status(200).json({
          msg: "Login realizado com sucesso",
          token: tokenAluno,
        });
      }

      const professor = await Professor.findProfessorByEmail(email);
      if (!professor) {
        return res.status(404).json({ msg: "Usuário não encontrado." });
      }

      const passwordCorrect = password === professor.ds_senha; // sem hash
      if (!passwordCorrect) {
        return res.status(400).json({ msg: "Senha ou e-mail inválido." });
      }

      const tokenProfessor = jwt.sign(
        { id: professor.id_professor, role: "professor" },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );

      return res.status(200).json({
        msg: "Login realizado com sucesso",
        token: tokenProfessor,
        role: "professor",
      });

    } catch (err) {
      console.error("Erro no login:", err);
      return res.status(500).json({ msg: "Erro ao realizar login." });
    }
  }

  async logout(req, res) {
    // Logout simbólico — o front vai apagar o token.
    return res.status(200).json({ msg: "Logout realizado com sucesso" });
  }

  async getUserInfo(req, res) {
    try {

      const user = await User.findById(req.userId);

      if (!user) {
        return res.status(404).json({ erro: "Usuário não encontrado" });
      }

      return res.status(200).json(user);
    } catch (err) {
      return res.status(500).json({ erro: "Erro ao buscar usuário" });
    }
  }

  async requestPasswordChange(req, res) {

    const { email } = req.body;
  
    if (!email) {
      return res.status(400).json({ error: "E-mail não informado." });
    }
  
    try {

      const resposta = await enviarRecuperacao(email);
      return res.status(200).json(resposta);


    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  async changePassword(req, res) {
    
    const token = req.headers["authorization"]?.split(" ")[1];
    const { password } = req.body;
  
    if (!token) {
      return res.status(400).json({ error: "Token não fornecido." });
    }
  
    if (!password) {
      return res.status(400).json({ error: "Senha é obrigatória." });
    }
  
    try {
      const result = await userService.redefinirSenha(token, password);
      return res.status(200).json(result);
    } catch (error) {
      return res.status(
        error.message === "Usuário não encontrado." ? 404 : 400
      ).json({ error: error.message });
    }
  }

}

module.exports = new UserController();
