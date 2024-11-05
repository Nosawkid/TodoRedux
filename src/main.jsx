import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import App from "./App.jsx";
import { createStore } from "redux";
import { Provider } from "react-redux";
import todoReducer from "./reducers/todoReducer.js";

const store = createStore(todoReducer);

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <StrictMode>
      <App />
    </StrictMode>
  </Provider>
);
