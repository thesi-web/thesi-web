const nodemailer = require("nodemailer");

const emailUser = process.env.EMAIL_USER;
const emailPass = process.env.EMAIL_PASS;

exports.enviarEmailRecuperacao = async (destinatario, nome, token) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: emailUser,
      pass: emailPass,
    },
  });

  const mailOptions = {
    from: emailUser,
    to: destinatario,
    subject: 'Recuperação de Senha',
    text: `Olá ${nome}! Clique no link abaixo para redefinir sua senha:\n\nhttp://localhost:3002/redefinir-senha/${token}`,
  };

  await transporter.sendMail(mailOptions);
};
