import { AppProvider } from "./context/AppContext";
import AppRouter from "./routes/AppRouter";

import { BrowserRouter } from "react-router-dom";

import "./style/GlobalStyle.scss";

function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <AppRouter />
      </AppProvider>
    </BrowserRouter>
  );
}

export default App;
