const { sendVerificationEmail } = require("./utils/mailer");

(async () => {
  try {
    await sendVerificationEmail("YOUR_PERSONAL_EMAIL@gmail.com", "123456");
    console.log(" Test email sent! Check your inbox.");
  } catch (err) {
    console.error(" Error sending email:", err);
  }
})();
