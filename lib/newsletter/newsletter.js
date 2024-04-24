const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function subscribeNewsLetter(email) {
  try {
    await prisma.newsletters.create({
      data: {
        email: email,
      },
    });
  } catch (error) {
    console.error(error);
    return null;
  }
}

module.exports = { subscribeNewsLetter };
