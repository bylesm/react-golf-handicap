import React, { useState, useEffect } from "react";
import RoundForm from "./RoundForm";
import RoundTable from "./RoundTable";
import { calculateHI, saveRounds, loadRounds } from "./calculations";

function App() {
  const [rounds, setRounds] = useState(loadRounds());

  useEffect(() => {
    saveRounds(rounds);
  }, [rounds]);

  function addRound(round) {
    setRounds([...rounds, round]);
  }

  function updateRound(index, updatedRound) {
    const updatedRounds = [...rounds];
    updatedRounds[index] = updatedRound;
    setRounds(updatedRounds);
  }

  return (
    <div style={{ padding: "1em", fontFamily: "sans-serif" }}>
      <h1>Golf Handicap Tracker</h1>
      <RoundForm addRound={addRound} />
      <h2>Recent Rounds</h2>
      <RoundTable rounds={rounds} updateRound={updateRound} />
      <h2>Handicap Index</h2>
      <p>{calculateHI(rounds)}</p>
    </div>
  );
}

export default App;
