const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function subscribeNewsLetter(email) {
  await prisma.newsletters.create({
    data: {
      email: email,
    },
  });
}

module.exports = { subscribeNewsLetter };
