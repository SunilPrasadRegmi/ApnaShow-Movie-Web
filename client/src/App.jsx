import React from "react";
import AppRoutes from "./routes/AppRoutes";
import { BrowserRouter } from "react-router-dom";
import UserContext from "./context/UserContext";

function App() {
  return (
    <BrowserRouter>
      <UserContext>
        <AppRoutes />
      </UserContext>
    </BrowserRouter>
  );
}

export default App;
