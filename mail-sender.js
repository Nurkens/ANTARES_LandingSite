const nodemailer = require('nodemailer');
const { google } = require('googleapis');

const oAuth2Client = new google.auth.OAuth2(
  '317163977196-fvp1iv27nt3l774e8gelerur02liltjq.apps.googleusercontent.com',
  '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',
  'https://developers.google.com/oauthplayground'
);

oAuth2Client.setCredentials({
  refresh_token: '1//0ckWACBa_z_dVCgYIARAAGAwSNwF-L9IrtTFAOyw3DHENaB3Gw0PT2qyO88L7nD1jKjk_wSRVWJcCk6l0SkQWYAV0tB2FUWXYc0Y'
});

async function sendMail() {
  try {
    const accessToken = await oAuth2Client.getAccessToken();

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: 'torgynken@gmail.com',
        clientId: '317163977196-fvp1iv27nt3l774e8gelerur02liltjq.apps.googleusercontent.com',
        clientSecret: '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',
        refreshToken: '1//0ckWACBa_z_dVCgYIARAAGAwSNwF-L9IrtTFAOyw3DHENaB3Gw0PT2qyO88L7nD1jKjk_wSRVWJcCk6l0SkQWYAV0tB2FUWXYc0Y',
        accessToken: accessToken.token
      }
    });

    const mailOptions = {
      from: 'torgynken@gmail.com',
      to: 'maddan142006@example.com',
      subject: 'Тест OAuth2',
      text: 'Это тестовое письмо через OAuth2'
    };

    const result = await transporter.sendMail(mailOptions);
    console.log('Письмо отправлено:', result.messageId);
  } catch (error) {
    console.error('Ошибка:', error);
  }
}

sendMail();