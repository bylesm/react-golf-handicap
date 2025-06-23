import React from "react";
import {
  calculate9HoleSD,
  calculateESD,
  calculate18HoleSD
} from "./calculations";

export default function RoundTable({ rounds, updateRound }) {
  function editPCC(index) {
    const newPCC = parseFloat(prompt("New PCC value", rounds[index].pcc));
    if (!isNaN(newPCC)) {
      const updated = { ...rounds[index], pcc: newPCC };
      if (updated.holes === 18) {
        updated.sd_combined = calculate18HoleSD(updated.ag, updated.cr, updated.slope, newPCC);
      } else {
        updated.sd_actual = calculate9HoleSD(updated.ag, updated.cr, updated.slope, newPCC);
        updated.sd_estimated = calculateESD(updated.ag, updated.cr, updated.slope, newPCC);
        updated.sd_combined = updated.sd_actual + updated.sd_estimated;
      }
      updated.finalised = true;
      updateRound(index, updated);
    }
  }

  return (
    <table>
      <thead>
        <tr>
          <th>Date</th><th>Course</th><th>AG</th><th>CR</th><th>Slope</th>
          <th>PCC</th><th>SD</th><th>Holes</th><th>Edit</th>
        </tr>
      </thead>
      <tbody>
        {rounds.map((r, i) => (
          <tr key={i}>
            <td>{r.date}</td>
            <td>{r.course}</td>
            <td>{r.ag}</td>
            <td>{r.cr}</td>
            <td>{r.slope}</td>
            <td>{r.pcc}</td>
            <td>{r.sd_combined.toFixed(1)}</td>
            <td>{r.holes}</td>
            <td><button onClick={() => editPCC(i)}>Edit</button></td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
