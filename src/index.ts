import "./styles/index.scss";

import { createRoot } from "react-dom/client";
import { App } from "./App";
import { createElement } from "react";

const root = createRoot(document.getElementById("page-root"));
root.render(createElement(App));
