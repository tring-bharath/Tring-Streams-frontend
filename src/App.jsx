import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import AppRoutes from "./routes/AppRoutes";
import { ToastContainer } from "react-toastify";
function App() {
  return (
    <div className="app ">
      <ToastContainer position="top-right" autoClose={2000} />
      <AppRoutes />
    </div>
  );
}

export default App;
