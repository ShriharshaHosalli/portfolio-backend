const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

module.exports.sendContactEmail = async ({ name, email, message }) => {
  await resend.emails.send({
    from: "Portfolio <onboarding@resend.dev>",
    to: ["shriharshahosalli@gmail.com"],
    subject: "New Contact Message",
    html: `<p><b>Name:</b> ${name}</p>
           <p><b>Email:</b> ${email}</p>
           <p>${message}</p>`
  });
};
