import nodemailer from "nodemailer";

// ── Transporter ───────────────────────────────────────────────────────────────
const hasCredentials = process.env.EMAIL_USER && process.env.EMAIL_PASS;

const transporter = hasCredentials 
    ? nodemailer.createTransport({
        host:   process.env.EMAIL_HOST   ?? "smtp.gmail.com",
        port:   Number(process.env.EMAIL_PORT ?? 587),
        secure: Number(process.env.EMAIL_PORT ?? 587) === 465,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    })
    : null;

if (!hasCredentials) {
    console.log("ℹ️ [Email Service] No SMTP credentials found. Emails will be logged to the terminal instead.");
}

const FROM = process.env.EMAIL_FROM ?? `"Velocity Cars26" <noreply@cars26.com>`;
const BASE_URL = process.env.NEXTAUTH_URL ?? "http://localhost:3000";

// ── Helpers ───────────────────────────────────────────────────────────────────
function baseTemplate(content: string): string {
    return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Velocity Cars26</title>
</head>
<body style="margin:0;padding:0;background:#0a0a0a;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0a0a0a;padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="560" cellpadding="0" cellspacing="0" style="background:#111;border:1px solid rgba(255,255,255,0.08);border-radius:16px;overflow:hidden;">
          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(to bottom,#3f0000,#111);padding:36px 40px;text-align:center;border-bottom:1px solid rgba(255,255,255,0.05);">
              <div style="display:inline-block;background:rgba(220,38,38,0.15);border:1px solid rgba(220,38,38,0.3);border-radius:10px;padding:12px 18px;margin-bottom:16px;">
                <span style="color:#ef4444;font-size:20px;">🏎</span>
              </div>
              <div style="color:white;font-size:22px;font-weight:700;letter-spacing:0.2em;text-transform:uppercase;">VELOCITY</div>
              <div style="color:rgba(255,255,255,0.4);font-size:11px;letter-spacing:0.15em;text-transform:uppercase;margin-top:4px;">Cars26</div>
            </td>
          </tr>
          <!-- Body -->
          <tr>
            <td style="padding:36px 40px;">
              ${content}
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="border-top:1px solid rgba(255,255,255,0.05);padding:20px 40px;text-align:center;">
              <p style="color:rgba(255,255,255,0.2);font-size:12px;margin:0;">
                © ${new Date().getFullYear()} Velocity Cars26. All rights reserved.<br/>
                If you didn't request this email, you can safely ignore it.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

// ── Verification Email ─────────────────────────────────────────────────────────
export async function sendVerificationEmail(
    email: string,
    name: string,
    token: string
): Promise<void> {
    const url = `${BASE_URL}/api/auth/verify-email?token=${token}`;

    if (!transporter) {
        console.log(`\n📧 [DEV] Verification email for ${name} (${email}):`);
        console.log(`🔗 ${url}\n`);
        return;
    }

    const content = `
      <h1 style="color:white;font-size:24px;font-weight:700;margin:0 0 8px;">Verify your email</h1>
      <p style="color:rgba(255,255,255,0.5);font-size:15px;margin:0 0 28px;">Hi ${name}, one click and you're in.</p>

      <a href="${url}" style="display:inline-block;background:#dc2626;color:white;text-decoration:none;padding:14px 32px;border-radius:8px;font-size:14px;font-weight:700;letter-spacing:0.05em;text-transform:uppercase;margin-bottom:28px;">
        Verify Email Address
      </a>

      <p style="color:rgba(255,255,255,0.3);font-size:12px;margin:0 0 8px;">Or copy this link:</p>
      <p style="color:rgba(220,38,38,0.7);font-size:12px;word-break:break-all;margin:0 0 28px;">${url}</p>

      <div style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.06);border-radius:8px;padding:14px 18px;">
        <p style="color:rgba(255,255,255,0.3);font-size:12px;margin:0;">
          ⏱ This link expires in <strong style="color:rgba(255,255,255,0.5);">24 hours</strong>.
        </p>
      </div>
    `;

    await transporter.sendMail({
        from:    FROM,
        to:      email,
        subject: "Verify your Velocity Cars26 account",
        html:    baseTemplate(content),
    });
}

// ── Welcome Email ──────────────────────────────────────────────────────────────
export async function sendWelcomeEmail(email: string, name: string): Promise<void> {
    if (!transporter) {
        console.log(`\n🎉 [DEV] Welcome email sent to ${name} (${email}).\n`);
        return;
    }

    const content = `
      <h1 style="color:white;font-size:24px;font-weight:700;margin:0 0 8px;">Welcome to Velocity, ${name}.</h1>
      <p style="color:rgba(255,255,255,0.5);font-size:15px;margin:0 0 24px;">
        Your account is active. Browse our exclusive inventory of performance and luxury vehicles.
      </p>
      <a href="${BASE_URL}/inventory" style="display:inline-block;background:#dc2626;color:white;text-decoration:none;padding:14px 32px;border-radius:8px;font-size:14px;font-weight:700;letter-spacing:0.05em;text-transform:uppercase;">
        Explore Inventory
      </a>
    `;

    await transporter.sendMail({
        from:    FROM,
        to:      email,
        subject: "Welcome to Velocity Cars26",
        html:    baseTemplate(content),
    });
}
