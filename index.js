const express = require('express');
const { google } = require('googleapis');

const app = express();
const port = process.env.PORT || 3000;

const auth = new google.auth.GoogleAuth({
  credentials: JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON),
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

app.get('/', (req, res) => {
  res.send('Moranj API is running');
});

app.get('/products', async (req, res) => {
  try {
    const client = await auth.getClient();
    const sheets = google.sheets({ version: 'v4', auth: client });

    const spreadsheetId = '13rUJB3bMJTNxa8T6me0E4smquB2yoQtV0IKIXHWWgaM';
    const range = 'Products!A1:E10';

    const result = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range,
    });

    res.json(result.data.values);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error accessing Google Sheets');
  }
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
