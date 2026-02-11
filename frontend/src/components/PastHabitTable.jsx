import PastHabitRow from "./PastHabitRow";


export default function PastHabitTable({habits, onRestore}){
  if (!habits || habits.length === 0) {
  return <p>No deleted habits in the past 30 days.</p>;
  }
  return(
    <table border="1" cellPadding="8" style={{ borderCollapse: "collapse", width: "100%" }}>
      <thead>
        <tr>
          <th>Habit</th>
          <th>Frequency</th>
          <th>Notes</th>
          <th>Restore</th>
        </tr>
      </thead>
      <tbody>
        {habits.map((h) => (
          <HabitRow
            key={h._id}
            habit={h}
            onEdit={onEdit}
            onRestore={onRestore}
          />
        ))}
      </tbody>
    </table>
  )
}

