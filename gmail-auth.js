const { google } = require('googleapis');
const readline = require('readline');

const oAuth2Client = new google.auth.OAuth2(
  '317163977196-fvp1iv27nt3l774e8gelerur02liltjq.apps.googleusercontent.com',
  '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',
  'https://developers.google.com/oauthplayground'
);

const SCOPES = ['https://www.googleapis.com/auth/gmail.send'];

async function getAccessToken() {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  });

  console.log('Авторизуйтесь по этой ссылке:\n', authUrl);

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) => {
    rl.question('Введите код из URL после авторизации: ', (code) => {
      rl.close();
      oAuth2Client.getToken(code, (err, token) => {
        if (err) {
          console.error('Ошибка получения токена', err);
          return;
        }
        console.log('Получен токен:', token);
        // Сохраните refresh_token для постоянного использования
        console.log('Refresh token:', token.refresh_token);
      });
    });
  });
}

getAccessToken();