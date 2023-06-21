import { BrowserRouter as Router } from "react-router-dom/cjs/react-router-dom";
import "./App.css";
import AuthState from "./context/auth/AuthState";
import OrigamiState from "./context/origami/OrigamiState";
import Aside from "./layout/aside/Aside";
import { Body } from "./layout/body/Body";
import { Footer } from "./layout/footer/Footer";
import { Navbar } from "./layout/navbar/Navbar";
function App() {
  return (
    <OrigamiState>
      <AuthState>
        <Router>
          <div className="App">
            <Navbar />
            <div className="Container">
              <Aside />
              <Body />
            </div>
            <Footer />
          </div>
        </Router>
      </AuthState>
    </OrigamiState>
  );
}

export default App;
