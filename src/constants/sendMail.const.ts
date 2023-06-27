export enum MAIL_ACTION {
  ACTIVATE_ACCOUNT = 1,
  FORTGET_PASSWORD,
}

export const CONTENT_ACTIVATE_ACCOUNT = (
  toUser: string | null,
  token: string | null,
) => {
  return (
    "<div>" +
    "<h2>" +
    "    Chat App," +
    "</h2>" +
    "<p>" +
    `    Dear ${toUser},` +
    "</p>" +
    "<p>" +
    "    Please click the Activate link to finish your account activation" +
    "</p>" +
    `<a href="${process.env.URL_PORT}/api/activate?token=${token}">` +
    "    Activate" +
    "</a>" +
    "<p>" +
    "    Thank you for choosing Chat-app" +
    "</p>" +
    "</div>"
  );
};

export const CONTENT_FORTGET_PASSWORD = (
  toUser: string | null,
  password: string | null,
) => {
  return (
    "<div>" +
    "<h2>" +
    "    Chat App," +
    "</h2>" +
    "<p>" +
    `    Dear ${toUser},` +
    "</p>" +
    "<p>" +
    "    A request has been received to change the password for your CHAT-APP" +
    "<p>" +
    "    Your new password is: " +
    "<b>" +
    `${password}` +
    "</b>" +
    "</p>" +
    "</p>" +
    "<p>" +
    "    Thank you for choosing Chat-app" +
    "</p>" +
    "</div>"
  );
};
