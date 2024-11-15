import "./App.css";
import { createBrowserRouter,RouterProvider } from "react-router-dom";
import { AppRoutes } from "./routes";
import { SettingsProvider } from "./context/SettingsContext";

const router = createBrowserRouter(AppRoutes);

function App(){
  return (
    <SettingsProvider>
      <RouterProvider router={router} />
    </SettingsProvider>
  );  
}

export default App;
