import { createMutable } from "solid-js/store";
import { Todo } from "../../todos";

const LocalStorage = window.localStorage;

export const todos = createMutable({
  items: JSON.parse(LocalStorage.getItem("todos") || "[]") as Todo[],
  addTodo(todo: Todo) {
    this.items.push(todo);
    LocalStorage.setItem("todos", JSON.stringify(this.items));
  },
  toggleDone(id: string) {
    const index = this.items.findIndex((i) => i.id === id);

    if (index === -1) return;

    this.items[index].done = !this.items[index].done;
    LocalStorage.setItem("todos", JSON.stringify(this.items));
  },
  removeTodo(id: string) {
    const newItems = [...this.items];
    const index = newItems.findIndex((i) => i.id === id);
    newItems.splice(index, 1);
    this.items = newItems;
    LocalStorage.setItem("todos", JSON.stringify(this.items));
  },
  get pending() {
    const pendingItems = this.items.filter(
      (item: Todo) => item.done === false
    ) as Todo[];
    return pendingItems.length as number;
  },
});
