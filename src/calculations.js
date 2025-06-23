export function calculate9HoleSD(ag, cr, slope, pcc) {
  return (113 / slope) * (ag - cr) + 0.5 * pcc;
}

export function calculateESD(ag, cr, slope, pcc) {
  return (113 / slope) * (ag - cr) + 1.197 + 0.5 * pcc;
}

export function calculate18HoleSD(ag, cr, slope, pcc) {
  return (113 / slope) * (ag - cr) + pcc;
}

export function calculateHI(rounds) {
  const finalised = rounds.filter(r => r.finalised);
  const last20 = finalised.slice(-20);
  if (last20.length < 8) return "Insufficient data";
  const best8 = last20.map(r => r.sd_combined).sort((a, b) => a - b).slice(0, 8);
  const avg = best8.reduce((a, b) => a + b, 0) / 8;
  return avg.toFixed(1);
}

export function saveRounds(rounds) {
  localStorage.setItem("golfRounds", JSON.stringify(rounds));
}

export function loadRounds() {
  return JSON.parse(localStorage.getItem("golfRounds") || "[]");
}
