import HabitRow from "./HabitRow";

export default function HabitTable({habits, onDelete, onEdit}){
  if (!habits || habits.length === 0) {
  return <p>No habits yet.</p>;
  }
  return(
    <table border="1" cellPadding="8" style={{ borderCollapse: "collapse", width: "100%" }}>
      <thead>
        <tr>
          <th>Habit</th>
          <th>Frequency</th>
          <th>Notes</th>
          <th>Edit</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        {habits.map((h) => (
          <HabitRow
            key={h._id}
            habit={h}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </tbody>
    </table>
  )
}



