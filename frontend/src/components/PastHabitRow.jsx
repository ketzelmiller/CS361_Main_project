import { MdUndo } from "react-icons/md";

/*FUTURE FUNCTIONALITY WILL STORE TOTAL HABIT COMPLETIONS*/

function PastHabitRow({ habit, onRestore }) {
  return (
    <tr>
      <td>{habit.name}</td>
      <td>{habit.frequency}</td>
      <td>{habit.notes || ""}</td>

      <td style={{ textAlign: "center" }}>
        <MdUndo
          style={{ cursor: "pointer" }}
          onClick={() => onRestore(habit)}
          title="Restore Habit"
        />
      </td>
    </tr>
  );
}

export default PastHabitRow;