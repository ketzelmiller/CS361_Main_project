import { useState } from "react";
import { useNavigate } from "react-router-dom";


function CreatePage(){
  const navigate = useNavigate();
  const [name, setName] = useState("")
  const [frequency, setFrequency] = useState("Daily")
  const [notes, setNotes] = useState("")

  const handleSubmit = async(e) =>{
    e.preventDefault()
    const newHabit = {name, frequency, notes}
    const response = await fetch('/habits', {method: 'POST', headers: {"Content-Type": "application/json"}, body: JSON.stringify(newHabit)})
    
    if (response.status === 201){
      console.log(`Successfully added exercise ${name}`)
      navigate("/habits")
    }
    else{
      console.error("Create failed:", response.status, text);
      alert(`Failed to add exercise ${name}`)
      navigate("/habits")
    }
  }
  return(
    <div className='create-page'>
      <h2>What habit would you like to start tracking?</h2>
      <form onSubmit={handleSubmit} className="habit-form">
      <div className="habit-form-grid">
        <div className="field">
          <label htmlFor="name">Habit Name</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ex. Go to the gym"
          />
        </div>

        <div className="field">
          <label htmlFor="frequency">Frequency</label>
          <select
            id="frequency"
            value={frequency}
            onChange={(e) => setFrequency(e.target.value)}
          >
            <option value="Hourly">Hourly</option>
            <option value="Daily">Daily</option>
            <option value="Weekly">Weekly</option>
            <option value="Biweekly">Biweekly</option>
            <option value="Monthly">Monthly</option>
            <option value="Custom">Custom</option>
          </select>
        </div>

        <div className="field">
          <label htmlFor="notes">Notes (Optional)</label>
          <textarea
            id="notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={4}
            placeholder="Why is this habit important to you?"
          />
        </div>

        <div className="actions">
          <button type="submit">Create</button>
          <button type="button" onClick={() => navigate("/habits")}>
            Cancel
          </button>
        </div>
      </div>
    </form>
    </div>
  )
}


export default CreatePage;