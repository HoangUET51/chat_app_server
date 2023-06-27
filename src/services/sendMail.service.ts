import { BaseHttpService } from "@/base";
import {
  CONTENT_ACTIVATE_ACCOUNT,
  CONTENT_FORTGET_PASSWORD,
  MAIL_ACTION,
} from "@/constants/sendMail.const";
import nodemailer from "nodemailer";

export interface MailInfo {
  mailAction: MAIL_ACTION;
  toEmail: string;
  toUser: string;
  subject?: string;
  content?: string;
  others?: any;
}

export class MailService extends BaseHttpService<any> {
  public mailAction: MAIL_ACTION;
  public toEmail: string;
  public toUser: string;
  public subject?: string;
  public content?: string;
  public others?: any;

  constructor({
    mailAction,
    toEmail,
    toUser,
    subject,
    content,
    others,
  }: MailInfo) {
    super();
    this.mailAction = mailAction;
    this.toEmail = toEmail;
    this.toUser = toUser;
    this.subject = subject;
    this.content = content;
    this.others = others;
  }

  sendMail() {
    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: Number(process.env.MAIL_PORT),
      secure: false,
      requireTLS: true,
      auth: {
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD,
      },
    });
    let subject = this.subject;
    let content = this.content;

    switch (this.mailAction) {
      case MAIL_ACTION.ACTIVATE_ACCOUNT: {
        subject = "Activate account";
        content = CONTENT_ACTIVATE_ACCOUNT(this.toUser, this.others);
        break;
      }

      case MAIL_ACTION.FORTGET_PASSWORD: {
        subject = "Change your password";
        content = CONTENT_FORTGET_PASSWORD(this.toUser, this.others);
        break;
      }
    }

    const mailOptions = {
      from: {
        name: String(process.env.MAIL_NAME),
        address: String(process.env.MAIL_FROM_ADDRESS),
      },
      to: this.toEmail,
      subject,
      html: content,
    };

    transporter.sendMail(
      mailOptions,
      function (error: any, info: { response: string }) {
        if (error) {
          return error;
        }
        return info.response;
      },
    );
  }
}

export const sendMails = (mailInfo: MailInfo) => {
  new MailService(mailInfo).sendMail();
};
