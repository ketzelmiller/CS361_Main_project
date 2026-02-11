import { useEffect, useState } from "react";
import PastHabitTable from "../components/PastHabitTable";

function PastHabits(){
  const [habits, setHabits] = useState([])

  // Fetch Deleted
  async function loadDeletedHabits(){
    const res = await fetch("/habits/deleted")
    const data = await res.json()
    setHabits(data)
  }

  // Restore deleted
  async function restoreHabit(id){
    await fetch(`/habits/${id}/restore`, {method: "PATCH"})
    loadDeletedHabits();
  }

  useEffect(() => {loadDeletedHabits()}, [])

  if (!habits || habits.length === 0) {
  return <p>No habits yet.</p>;
  }
  return(
    <div className="view-page" style={{ padding: 20 }}>
      <h2>Past Habits</h2>
        <PastHabitTable habits={habits} onRestore={onRestore}/>
    </div>
  );
}


export default PastHabits;