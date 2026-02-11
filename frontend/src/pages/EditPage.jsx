import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";

function EditPage({habitToEdit}){
  const navigate = useNavigate();
  const { id } = useParams();

  const [name, setName] = useState("")
  const [frequency, setFrequency] = useState("Daily")
  const [notes, setNotes] = useState("")

  // Prefill fields when page loads
  useEffect(() => {
    if (habitToEdit){
      setName(habitToEdit.name || "")
      setFrequency(habitToEdit.frequency || "Daily")
      setNotes(habitToEdit.notes || "")
    }}, [habitToEdit]);


  async function handleSubmit(e){
    e.preventDefault()
    const updatedHabit = {name, frequency, notes}
    const response = await fetch(`/habits/${id}`, {method: "PUT", headers: {"Content-Type": "application/json"}, body: JSON.stringify(updatedHabit)})
    
    if (response.status === 200){
      alert(`Successfully updated habit ${name}`)
      navigate("/habits")
    } 
    else{
      alert(`Failed to update habit ${name}`)
    }
  }

  // If user refreshes on /edit/:id, habitToEdit will be null
  if (!habitToEdit) {
    return (
      <div className="edit-page">
        <h2>Edit Habit</h2>
        <p>No habit selected to edit. Go back to View and click Edit.</p>
        <button onClick={() => navigate("/habits")}>Back to View</button>
      </div>
    );
  }

  return (
    <div className="edit-page">
      <h2>Edit Habit</h2>

      <form onSubmit={handleSubmit} className="habit-form">
        <div className="habit-form-grid">
          <div className="field">
            <label htmlFor="name">Habit Name</label>
            <input
              id="name"
              type="text"
              value={name}
              required
              onChange={(e) => setName(e.target.value)}
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
            />
          </div>

          <div className="actions">
            <button type="submit">Save</button>
            <button type="button" onClick={() => navigate("/habits")}>
              Cancel
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}


export default EditPage;