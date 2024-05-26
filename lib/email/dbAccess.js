const prisma = require("../../utils/prisma");

async function saveSubmission(data) {
  try {
    await prisma.CONTACT_FORM_SUBMISSIONS.create({
      data: {
        name: data.name,
        email: data.email,
        message: data.message,
        receipt: data.receipt ? true : false,
      },
    });
    return true;
  } catch (error) {
    console.error("Error saving to database: ", error);
    return false;
  }
}

module.exports = { saveSubmission };
