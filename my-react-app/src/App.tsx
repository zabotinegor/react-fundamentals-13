import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./components/Header/Header";

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/courses");
    } else {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div className="App">
      <Header />
    </div>
  );
}

export default App;
