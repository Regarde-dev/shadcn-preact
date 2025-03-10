import { render } from "preact";
import { App } from "./App";
import "./index.css";

const $root = document.querySelector("#app");

render(<App />, $root);
