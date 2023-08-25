function subscribeNewsLetter(email) {
  fetch(process.env.NEXT_PUBLIC_EMAIL_LIST + email, {
    mode: "no-cors",
  });
}

module.exports = { subscribeNewsLetter };
