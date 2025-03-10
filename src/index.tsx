import { render } from "preact";
import { App } from "./App";
import "./index.css";

const $root = document.querySelector("#app");

if ($root === null) {
  throw new Error("Root element not found");
}

render(<App />, $root);
