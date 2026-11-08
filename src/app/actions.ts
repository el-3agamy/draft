// 'use server';

// import { google } from 'googleapis';

// export async function submitToSheets(formData: { name: string; whatsapp: string }) {
//     try {
//         // Prepare private key formatting for deployment environments
//         const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n');

//         const auth = new google.auth.GoogleAuth({
//             credentials: {
//                 client_email: process.env.GOOGLE_CLIENT_EMAIL,
//                 private_key: privateKey,
//             },
//             scopes: ['https://www.googleapis.com/auth/spreadsheets'],
//         });

//         const sheets = google.sheets({ version: 'v4', auth });
        
//         const egyptTime = new Intl.DateTimeFormat('en-GB', {
//             timeZone: 'Africa/Cairo',
//             day: '2-digit',
//             month: '2-digit',
//             year: 'numeric',
//             hour: '2-digit',
//             minute: '2-digit',
//             hour12: false,
//         })
//             .format(new Date())
//             .replace(',', '')
//             .replace(/\//g, '-');

//         await sheets.spreadsheets.values.append({
//             spreadsheetId: process.env.GOOGLE_SHEET_ID,
//             range: 'Dentist Leads!A:C',
//             // valueInputOption: 'USER_ENTERED',
//             valueInputOption: 'RAW',
//             requestBody: {
//                 // values: [[new Date().toISOString(), formData.name, formData.whatsapp]],
//                 // values: [[formattedDate, formData.name, String(formData.whatsapp)]],
//                 values: [[egyptTime, formData.name, String(formData.whatsapp)]],
//             },
//         });

        
//         return { success: true };
//     } catch (error) {
//         console.error('Error submitting to Google Sheets:', error);
//         return { success: false, error: 'Failed to submit form.' };
//     }
// }


'use server';

import { google } from 'googleapis';

export async function submitToSheets(formData: { name: string; whatsapp: string }) {
  try {
    const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n');

    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        private_key: privateKey,
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const sheets = google.sheets({ version: 'v4', auth });

    const egyptTime = new Intl.DateTimeFormat('en-GB', {
      timeZone: 'Africa/Cairo',
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    })
      .format(new Date())
      .replace(',', '')
      .replace(/\//g, '-');

    // 1. Save data to Google Sheets
    await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: 'Dentist Leads!A:C',
      valueInputOption: 'RAW',
      requestBody: {
        values: [[egyptTime, formData.name, String(formData.whatsapp)]],
      },
    });

    // 2. Send instant Telegram notification to the Dentist
    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    // Direct WhatsApp click-to-chat link formatted for easy one-click access
    const cleanWhatsapp = formData.whatsapp.replace(/[^0-9]/g, '');
    const message = `🔔 *New Patient Lead!*\n\n` +
      `👤 *Name:* ${formData.name}\n` +
      `📱 *WhatsApp:* [${formData.whatsapp}](https://wa.me/${cleanWhatsapp})\n` +
      `⏰ *Time:* ${egyptTime}`;

    if (botToken && chatId) {
      await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: chatId,
          text: message,
          parse_mode: 'Markdown',
        }),
      });
    }

    return { success: true };
  } catch (error) {
    console.error('Error submitting form or sending notification:', error);
    return { success: false, error: 'Failed to submit form.' };
  }
}