import type { Component } from "solid-js";
import styles from "./App.module.css";
import Home from "./components/Home";

const App: Component = () => {
  return (
    <div class={styles.app}>
      <Home />
    </div>
  );
};

export default App;
