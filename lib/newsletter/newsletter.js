const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

function checkValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

async function subscribeNewsLetter(email) {
  if (!checkValidEmail(email)) {
    throw new Error("Invalid email");
  }

  try {
    await prisma.newsletter.create({
      data: {
        email: email,
      },
    });
  } catch (error) {
    throw new Error("Email already exists");
  }
}

module.exports = { subscribeNewsLetter };
