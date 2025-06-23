import React, { useState } from "react";
import {
  calculate9HoleSD,
  calculateESD,
  calculate18HoleSD
} from "./calculations";

export default function RoundForm({ addRound }) {
  const [form, setForm] = useState({
    date: "",
    course: "",
    tee: "",
    holes: 9,
    ag: "",
    cr: "",
    slope: "",
    pcc: 0
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setForm({ ...form, [name]: name === "holes" ? parseInt(value) : value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    const ag = parseFloat(form.ag);
    const cr = parseFloat(form.cr);
    const slope = parseInt(form.slope);
    const pcc = parseFloat(form.pcc);

    const round = {
      ...form,
      ag,
      cr,
      slope,
      pcc,
      finalised: form.holes === 18
    };

    if (form.holes === 18) {
      round.sd_combined = calculate18HoleSD(ag, cr, slope, pcc);
    } else {
      round.sd_actual = calculate9HoleSD(ag, cr, slope, pcc);
      round.sd_estimated = calculateESD(ag, cr, slope, pcc);
      round.sd_combined = round.sd_actual + round.sd_estimated;
    }

    addRound(round);
    setForm({ date: "", course: "", tee: "", holes: 9, ag: "", cr: "", slope: "", pcc: 0 });
  }

  return (
    <form onSubmit={handleSubmit}>
      <fieldset>
        <legend>Enter Round</legend>
        <input name="date" type="date" value={form.date} onChange={handleChange} required />
        <input name="course" placeholder="Course" value={form.course} onChange={handleChange} required />
        <input name="tee" placeholder="Tee" value={form.tee} onChange={handleChange} required />
        <select name="holes" value={form.holes} onChange={handleChange}>
          <option value={9}>9</option>
          <option value={18}>18</option>
        </select>
        <input name="ag" type="number" placeholder="AG" step="0.1" value={form.ag} onChange={handleChange} required />
        <input name="cr" type="number" placeholder="CR" step="0.1" value={form.cr} onChange={handleChange} required />
        <input name="slope" type="number" placeholder="Slope" value={form.slope} onChange={handleChange} required />
        <input name="pcc" type="number" placeholder="PCC" step="0.5" value={form.pcc} onChange={handleChange} />
        <button type="submit">Add Round</button>
      </fieldset>
    </form>
  );
}