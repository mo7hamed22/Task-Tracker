import { FaTimes } from "react-icons/fa";
const Task = ({ task, onDelete, toggleReminder }) => {
  return (
    <div
      className={`task ${task.reminder ? "reminder" : ""}`}
      onDoubleClick={() => toggleReminder(task.id)}
    >
      <h3>
        <p>{task.text}</p>
        <p>{task.day}</p>

        <FaTimes
          style={{ color: "red", cursor: "pointer" }}
          onClick={() => onDelete(task.id)}
        />
      </h3>
    </div>
  );
};

export default Task;
