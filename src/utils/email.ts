import { Resend } from "resend";
import { env } from "../config/env";

const resend = new Resend(env.RESEND_API_KEY);

export async function sendVerificationEmail(email: string, token: string) {
    const verificationUrl = `${env.FRONTEND_URL}/verify-email?token=${token}`;

    const html = `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #0f172a;">Verifikasi Email Anda</h2>
            <p style="color: #334155; font-size: 16px; line-height: 1.5;">
                Halo,<br><br>
                Terima kasih telah mendaftar di <strong>Teras Pelajar</strong>.
                Untuk menyelesaikan proses registrasi dan mulai belajar, silakan verifikasi alamat email Anda dengan mengklik tombol di bawah ini:
            </p>
            <div style="text-align: center; margin: 30px 0;">
                <a href="${verificationUrl}" style="background-color: #10b981; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block;">
                    Verifikasi Email
                </a>
            </div>
            <p style="color: #64748b; font-size: 14px; line-height: 1.5;">
                Atau, Anda dapat menyalin dan menempelkan tautan berikut ke browser Anda:<br>
                <a href="${verificationUrl}" style="color: #10b981;">${verificationUrl}</a>
            </p>
            <p style="color: #64748b; font-size: 14px; line-height: 1.5;">
                Tautan verifikasi ini akan kedaluwarsa dalam 1 jam.<br>
                Jika Anda tidak merasa mendaftar di Teras Pelajar, silakan abaikan email ini.
            </p>
            <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 30px 0;">
            <p style="color: #94a3b8; font-size: 12px; text-align: center;">
                &copy; ${new Date().getFullYear()} Teras Pelajar. Hak Cipta Dilindungi.
            </p>
        </div>
    `;

    return resend.emails.send({
        from: env.MAIL_FROM,
        to: email,
        subject: "Verifikasi Email - Teras Pelajar",
        html,
    });
}
