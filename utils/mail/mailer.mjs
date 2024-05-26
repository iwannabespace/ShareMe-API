import nodemailer from 'nodemailer';
import env from '../../env/environment.mjs';

export default class Mailer {
    constructor() {
        this.transporter = nodemailer.createTransport({
            host: env.NM_HOST,
            port: env.NM_PORT,
            secure: true,
            auth: {
                user: env.NM_USER,
                pass: env.NM_PASS,
            }
        });
    }

    async sendVerification(to, subject, code) {
        const config = {
            from: `<${env.NM_USER}>`,
            to: to,
            subject: subject,
            html: `<!DOCTYPE html>
            <html lang="tr">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Doğrulama Kodu</title>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        background-color: #f4f4f4;
                        margin: 0;
                        padding: 0;
                    }
                    .container {
                        width: 100%;
                        max-width: 600px;
                        margin: 0 auto;
                        padding: 20px;
                        background-color: #ffffff;
                        border-radius: 8px;
                        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                    }
                    .header {
                        background-color: #4CAF50;
                        color: white;
                        padding: 10px;
                        border-top-left-radius: 8px;
                        border-top-right-radius: 8px;
                        text-align: center;
                    }
                    .content {
                        padding: 20px;
                        text-align: center;
                    }
                    .code {
                        font-size: 24px;
                        font-weight: bold;
                        color: #333;
                        background-color: #f1f1f1;
                        padding: 10px;
                        border-radius: 4px;
                        display: inline-block;
                        margin-top: 20px;
                    }
                    .footer {
                        margin-top: 20px;
                        text-align: center;
                        font-size: 12px;
                        color: #777;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <h1>Doğrulama Kodu</h1>
                    </div>
                    <div class="content">
                        <p>Merhaba,</p>
                        <p>Kayıt işleminizi tamamlamak için aşağıdaki doğrulama kodunu kullanın:</p>
                        <div class="code">${code}</div>
                        <p>Bu kodu kimseyle paylaşmayın.</p>
                    </div>
                    <div class="footer">
                        <p>Bu mesajı yanlışlıkla aldıysanız lütfen dikkate almayın.</p>
                    </div>
                </div>
            </body>
            </html>`
        }

        const info = await this.transporter.sendMail(config);
        return info;
    }
}