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


exports.enviarEmailToken = async (destinatario, token) => {
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
    subject: 'Your registration code',
    html: `
      <div style="font-family: Arial, sans-serif; padding: 10px;">
        <h2>Email verification</h2>
        <p>To complete your sign-up, you can use the code below to create your account.</p>
        <h1 style="color: #2E86C1;">${token}</h1>
        <p>This code will expire in 10 minutes.</p>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
};


