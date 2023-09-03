require("dotenv").config();
const newsletter_url = process.env.NEXT_PUBLIC_EMAIL_LIST;
function subscribeNewsLetter(email) {
  fetch(newsletter_url + email, {
    mode: "no-cors",
  });
}

module.exports = { subscribeNewsLetter };
