import { transporter } from "./transporter.js";
import { loadTemplate } from "./template.js";
import { logger } from "../utils/logger.js";
import { env } from "../config/env.js";

export const MailService = {
  async sendTemplate({ from, to, subject, template, data, retries = 2 }) {
    try {
      const html = await loadTemplate(template, data);

      const info = await transporter.sendMail({
        from,
        to,
        subject,
        html,
      });

      logger.info(`[MAIL] Sent to ${to} (id: ${info.messageId})`);
      return info;
    } catch (err) {
      logger.error(`[MAIL] Error sending to ${to}: ${err.message}`);

      if (retries > 0) {
        logger.warn(`[MAIL] Retrying... (${retries} left)`);
        return this.sendTemplate({ to, subject, template, data, retries: retries - 1 });
      }

      throw err;
    }
  },

  sendOtp(email, otp) {
    return this.sendTemplate({
      from: `"Central Authentication Service" <${env.EMAIL_USER}>`,
      to: email,
      subject: "Your Verification Code",
      template: "verifyOtp.hbs",
      data: { otp },
    });
  },

  changePassword(email) {
    return this.sendTemplate({
      from: `"Central Authentication Service" <${env.EMAIL_USER}>`,
      to: email,
      subject: "Password Reset Request",
      template: "changePassword.hbs",
    });
  },
};
