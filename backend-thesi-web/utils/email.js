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
      <div style="font-family: 'Montserrat', Arial, sans-serif; background-color: #f6f8fa; padding: 1em;">
      <div style="max-width: 600px; margin: auto; background: #fff;  border: 1px solid #e1e4e8; padding: 1em; ">
        <p style="color: #24292e; font-size: 14px; font-weight: 600;"> Thesi UX </p>
        <h2 style="color: #24292e; font-size: 18px; text-align: center;"> Redefinição senha </h2>
        <p style="color: #586069; font-size: 14px;"> Ei! </p>
        <p style="color: #586069; font-size: 14px;"> Não se preocupe, aqui está seu link mágico! Use-o para redefinir sua senha: </p>
      <div style="display: flex; justify-content: center; padding: 1em 0;">
        <a href="${apiUrl}/change/password/${token}"
        style="
            display: inline-block;
            background-color: #24292e; 
            color: #ffffff; 
            text-decoration: none; 
            padding: 0.5em 2em; 
            border-radius: 2em; 
            text-align: center;
            font-size: 14px;
        ">
          Redefinir senha
        </a>
      </div>

    </div>
      <p style="color: #586069; font-size: 12px; text-align: center; padding-top: 1em;">No caso de dúvidas entre em contato — suporte.thesi@gmail.com</p>
      <p style="color: #586069; font-size: 12px; text-align: center; border-bottom: solid 1px #e1e4e8;  padding-bottom: 2em;">Obrigado, Equipe Thesi UX.</p>
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
    subject: 'Seu código de verificação',
    html: `
    <div style="font-family: 'Montserrat', Arial, sans-serif; background-color: #f6f8fa; padding: 1em;">
    <div style="max-width: 600px; margin: auto; background: #fff; border-radius: 10px; padding: 20px; border: 1px solid #e1e4e8;">
      <h2 style="color: #24292e; font-size: 18px;">Verifique sua identidade</h2>
      <p style="color: #586069; font-size: 14px;">Aqui está seu código de verificação:</p>
      <h2 style="font-size: 16px; letter-spacing: 5px; color: #24292e; text-align: center;">${token}</h2>
      <p style="color: #586069; font-size: 14px;" >Esse código é válido por <strong>15 minutos</strong> e só pode ser usado uma vez.</p>
      <p style="color: #586069; font-size: 12px; text-align: center; border-top: solid 1px #e1e4e8; padding-top: 1em;">Por favor não compartilhe esse código com ninguém.</p>
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
    subject: 'Bem-vindo à THESI',
    html: `
      <div style="font-family: 'Montserrat', Arial, sans-serif; background-color: #f6f8fa; padding: 1em;">
      <div style="max-width: 600px; margin: auto; background: #fff;  border: 1px solid #e1e4e8; ">
        <p style="color: #24292e; font-size: 14px; font-weight: 600; padding-left: 1em;">Thesi UX</p>
        <h2 style="color: #24292e; font-size: 16px; text-align: center;">Olá, ${name}</h2>
        <h2 style="color: #586069; font-size: 18px; text-align: center; ">Prazer em conhecer você!</h2>
        <p style="color: #586069; font-size: 14px; text-align: center" >Sua conta foi criada com sucesso e você está pronto para explorar um mundo de ideias e soluções práticas projetadas especialmente para você.</p>
        <div style="display: flex; justify-content: center; padding: 1em 0;">
          <a href="${apiUrl}" 
          style="
              display: inline-block;
              background-color: #24292e; 
              color: #ffffff; 
              text-decoration: none; 
              padding: 0.5em 2em; 
              border-radius: 2em; 
              text-align: center;
              font-size: 14px;
          ">
            Começar
          </a>
        </div>

      </div>
        <p style="color: #586069; font-size: 12px; text-align: center; padding-top: 1em;">Bem-vindo à Thesi — estamos muito felizes em ter você conosco!</p>
        <p style="color: #586069; font-size: 12px; text-align: center; border-bottom: solid 1px #e1e4e8;  padding-bottom: 2em;">Vamos construir algo incrível juntos.</p>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
}

export async function enviarEmailConvite(destinatario, projectName, projectId, token) {
  console.log("[EMAIL] Preparando envio para:", destinatario);

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: { user: emailUser, pass: emailPass }
    });

    const aceitarUrl = `${apiUrl}api/convite/responder?token=${token}&resposta=aceito`;
    const recusarUrl = `${apiUrl}api/convite/responder?token=${token}&resposta=recusado`;

    const mailOptions = {
      from: emailUser,
      to: destinatario,
      subject: `Convite para participar do projeto "${projectName}"`,
      html: `
        <div style="font-family: 'Montserrat', Arial, sans-serif; background-color: #f6f8fa; padding: 1em;">
          <div style="max-width: 600px; margin: auto; background: #fff;  border: 1px solid #e1e4e8; padding: 1em; ">
            <p style="color: #24292e; font-size: 14px; font-weight: 600;"> Thesi UX </p>
            <h2 style="color: #24292e; font-size: 18px; text-align: center;"> Convite Recebido </h2>
            <p style="color: #586069; font-size: 14px;"> Você foi convidado(a) para participar do projeto:<p>
            <p style="color: #586069; font-size: 14px; text-align: center;"><b>${projectName}</b></p>
            <p style="color: #586069; font-size: 14px;"> Por favor, aceite ou recuse o convite clicando em um dos botões abaixo. </p>
          <div style="display: flex; justify-content: center; padding: 1em 0;">
            <a href="${recusarUrl}"
            style="
                display: inline-block;
                background-color: #ffffff; 
                color: #24292e; 
                text-decoration: none; 
                padding: 0.5em 2em; 
                border-radius: 2em;
                border: solid 1px #24292e; 
                text-align: center;
                font-size: 14px;
                margin-right: 1em;
            ">
              Recusar
            </a>
            <a href="${aceitarUrl}"
            style="
                display: inline-block;
                background-color: #24292e; 
                color: #ffffff; 
                text-decoration: none; 
                padding: 0.5em 2em; 
                border-radius: 2em; 
                text-align: center;
                font-size: 14px;
            ">
              Aceitar convite
            </a>
        </div>
        </div>
          <p style="color: #586069; font-size: 12px; text-align: center; padding-top: 1em;">No caso de dúvidas entre em contato — suporte.thesi@gmail.com</p>
          <p style="color: #586069; font-size: 12px; text-align: center; border-bottom: solid 1px #e1e4e8;  padding-bottom: 2em;">Obrigado, Equipe Thesi UX.</p>
        </div>
      `
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("[EMAIL] Email enviado:", info.messageId);

  } catch (err) {
    console.error("[EMAIL] Falha ao enviar email para", destinatario, ":", err);
  }
}

