import { MdEdit, MdDelete } from "react-icons/md";

function HabitRow({ habit, onDelete, onEdit }) {
  return (
    <tr>
      <td>{habit.name}</td>
      <td>{habit.frequency}</td>
      <td>{habit.notes || ""}</td>

      <td style={{ textAlign: "center" }}>
        <MdEdit
          style={{ cursor: "pointer" }}
          onClick={() => onEdit(habit)}
          title="Edit Habit"
        />
      </td>

      <td style={{ textAlign: "center" }}>
        <MdDelete
          style={{ cursor: "pointer" }}
          onClick={() => {
            const ok = window.confirm("Are you sure you want to delete this habit?");
            if (ok) onDelete(habit._id);
          }}
          title="Delete Habit"
        />
      </td>
    </tr>
  );
}

export default HabitRow;