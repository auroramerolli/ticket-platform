const CHARS = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // pa 0/O/1/I për lexueshmëri

function generateTicketCode() {
  let code = "";
  for (let i = 0; i < 10; i++) {
    if (i === 4 || i === 7) code += "-";
    code += CHARS[Math.floor(Math.random() * CHARS.length)];
  }
  return `TKT-${code}`;
}

module.exports = { generateTicketCode };
