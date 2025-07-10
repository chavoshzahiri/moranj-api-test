const { google } = require('googleapis');
const fs = require('fs');

// لود کردن کلید دسترسی JSON
const auth = new google.auth.GoogleAuth({
  keyFile: 'moranj-orders-api-3173d622e6b8.json', // نام فایل JSON که دانلود کردی
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

async function accessSpreadsheet() {
  const client = await auth.getClient();
  const sheets = google.sheets({ version: 'v4', auth: client });

  const spreadsheetId = '13rUJB3bMJTNxa8T6me0E4smquB2yoQtV0IKIXHWWgaM'; 
  const range = 'Products!A1:E10'; // محدوده‌ای که میخوای بخونی

  const res = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range,
  });

  console.log(res.data.values);
}

accessSpreadsheet();
