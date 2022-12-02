import { Component, createSignal } from "solid-js";
import { Todo } from "../../../todos";
import { modal } from "../../store/modal";
import { todos } from "../../store/todo";

import styles from "./TodoItem.module.css";

interface TodoProps {
  todo: Todo;
}

const TodoItem: Component<TodoProps> = (props) => {
  const {
    todo: { id, title, description, done, color },
  } = props;

  const [isChecked, setChecked] = createSignal(done);

  const onDone = (e: MouseEvent) => {
    e.stopPropagation();
    todos.toggleDone(id);
    setChecked((prev) => !prev);
  };

  const onDelete = () => {
    todos.removeTodo(id);
  };

  const openPreview = () => {
    modal.openModal();
  };

  return (
    <div
      class={styles.container}
      style={{ "background-color": color }}
      onClick={openPreview}
    >
      <div class={styles.infoContainer}>
        {/* checkbox */}
        <div>
          <input type="checkbox" checked={done} onClick={onDone} />
        </div>

        {/* info */}
        <div style={{ flex: 1 }}>
          <span
            style={
              isChecked() ? { "text-decoration-line": "line-through" } : {}
            }
          >
            {title}
          </span>
          <p>{description}</p>
        </div>

        <button class={styles.deleteBtn} onClick={onDelete}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default TodoItem;
