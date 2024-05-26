const prisma = require("../../utils/prisma");

async function subscribeNewsLetter(email) {
  try {
    await prisma.NEWSLETTER_SUBSCRIBERS.create({
      data: {
        email: email,
      },
    });
  } catch (error) {
    return null;
  }
}

module.exports = { subscribeNewsLetter };
