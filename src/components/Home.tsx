import { Component, createEffect, createSignal, For, Show } from "solid-js";
import { v4 as uuidv4 } from "uuid";

import { todos } from "../store/todo";
import { Todo } from "../../todos";

// import todos from "../../todos";
import TodoItem from "./Todo/TodoItem";
import styles from "./Home.module.css";

const defaultItem: Todo = {
  id: "",
  title: "",
  done: false,
  description: "",
  color: "",
};

const Home: Component = () => {
  const [item, setItem] = createSignal<Todo>(defaultItem);

  const createTodo = (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      const todo: Todo = {
        id: uuidv4(),
        title: item().title,
        description: "",
        done: item().done,
        color: item().color,
      };
      todos.addTodo(todo);
      setItem(defaultItem);
    }
  };

  // createEffect(() => console.log("Todos: ", todos.items));

  return (
    <div class={styles.container}>
      {/* header */}
      <div class={styles.headerContainer}>
        <h2 class={styles.headerText}>Welcome back, Thomas</h2>
        <span class={styles.descriptionText}>
          You've got {todos.pending} tasks up in the next days.
        </span>
      </div>

      {/* todo input */}
      <div class={styles.inputContainer}>
        <input
          type="checkbox"
          checked={item().done}
          onClick={() => setItem((prev) => ({ ...prev, done: !prev.done }))}
        />
        <input
          type="text"
          value={item().title}
          class={styles.inputText}
          placeholder="Add new todo..."
          onKeyDown={createTodo}
          onKeyUp={(e) =>
            setItem((prev) => ({ ...prev, title: e.currentTarget.value }))
          }
        />
        <input
          type="color"
          value="#ffffff"
          onInput={(e) =>
            setItem((prev) => ({ ...prev, color: e.currentTarget.value }))
          }
        />
      </div>

      {/* render todos */}

      <div class={styles.todosContainer}>
        <For each={todos.items}>{(todo) => <TodoItem todo={todo} />}</For>
      </div>
    </div>
  );
};

export default Home;
