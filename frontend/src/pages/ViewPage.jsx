import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import HabitTable from "../components/HabitTable";


function MyHabits({setHabitToEdit}) {
  const navigate = useNavigate();
  const [habits, setHabits] = useState([]); // starts blank

  async function loadHabits() {
    const response = await fetch("/habits");
    const data = await response.json();
    setHabits(data);
  }
  
  // Loading habits on first render
  useEffect(() => {
    loadHabits();
}, []);

  // Deleting and exercise
  async function onDelete(habitId){
    const response = await fetch(`/habits/${habitId}`, { method: "DELETE"})
    // Debugging
    if(response.status === 204){
      console.log(`Successfully deleted the habit with id ${habitId}`)
    }
    else{
      console.log(`Failed to delete exercise with the ID ${habitId}`)
    }
    loadHabits();
  }

  function onEdit(habit){
    setHabitToEdit(habit)
    navigate(`/edit/${habit._id}`)
  }
  
  return(
    <div className="view-page">
      <h2>All Habits</h2>

      <HabitTable habits = {habits} onDelete={onDelete} onEdit={onEdit}/>
    </div>
  )
}

export default MyHabits;