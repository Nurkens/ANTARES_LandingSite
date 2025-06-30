const express = require('express');
const { google } = require('googleapis');
const nodemailer = require('nodemailer');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// OAuth2 клиент
const oAuth2Client = new google.auth.OAuth2(
  process.env.GMAIL_CLIENT_ID,
  process.env.GMAIL_CLIENT_SECRET,
  process.env.GMAIL_REDIRECT_URI
);

oAuth2Client.setCredentials({
  refresh_token: process.env.GMAIL_REFRESH_TOKEN
});

// Глобальный транспортер
let transporter;

async function initMailer() {
  try {
    const accessToken = await oAuth2Client.getAccessToken();
    
    transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: process.env.GMAIL_USER,
        clientId: process.env.GMAIL_CLIENT_ID,
        clientSecret: process.env.GMAIL_CLIENT_SECRET,
        refreshToken: process.env.GMAIL_REFRESH_TOKEN,
        accessToken: accessToken.token
      }
    });

    await transporter.verify();
    console.log('✅ Почтовый сервер готов');
  } catch (err) {
    console.error('❌ Ошибка инициализации почты:', err);
    process.exit(1);
  }
}

// Инициализация при старте
initMailer();

// Маршрут для отправки почты
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    const mailOptions = {
      from: `"Antares Contact Form" <${process.env.GMAIL_USER}>`,
      to: process.env.GMAIL_USER,
      subject: subject || 'Новое сообщение с сайта',
      html: `
        <h2>Новое сообщение с контактной формы</h2>
        <p><strong>Имя:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Сообщение:</strong></p>
        <p>${message}</p>
      `
    };

    await transporter.sendMail(mailOptions);
    res.json({ success: true, message: 'Сообщение успешно отправлено!' });
  } catch (err) {
    console.error('Ошибка отправки:', err);
    res.status(500).json({ success: false, message: 'Ошибка при отправке сообщения' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Сервер запущен на порту ${PORT}`));