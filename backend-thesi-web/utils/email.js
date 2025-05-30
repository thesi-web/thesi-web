import nodemailer from 'nodemailer';

const emailUser = process.env.EMAIL_USER;
const emailPass = process.env.EMAIL_PASS;
const apiUrl = process.env.VITE_API_URL;

export async function enviarEmailRecuperacao(destinatario, token) {
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
    subject: `Here's your magic link`,
    html: `
      <div style="font-family: Arial, sans-serif; padding: 10px;">
          <h2>Change your password.✨</h2>
          <p>Hey!</p>
          <p>Don't worry, here's your magic link! use it to reset your password:</p>
          <a>${apiUrl}/change/password/${token}</a>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
}

export async function enviarEmailToken(destinatario, token) {
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
        <h2>Email verification 🐣✨</h2>
        <p>To complete your sign-up, you can use the code below to create your account.</p>
        <h1 style="color: #2E86C1;">${token}</h1>
        <p>This code will expire in 10 minutes.</p>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
}

export async function enviarEmailBoasVindas(destinatario, name) {
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
    subject: 'Welcome to Thesi',
    html: `
      <div style="font-family: Arial, sans-serif; padding: 10px;">
          <h2>Welcome to Thesi 🐥✨</h2>
          <p>Hi ${name},</p>
          <p>Welcome to Thesi — we're thrilled to have you on board!</p>
          <p>Your account has been successfully created, and you're all set to explore a world of ideas and practical solutions designed just for you.</p>
          <br/>
          <p>Let's build something great together.</p>
          <br/>
          <p>Cheers,</p>
          <p><b>The Thesi Team</b></p>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
}
