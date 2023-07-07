import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
  return (
    <Router>
      <Navbar />
      <main className="h-screen">Content</main>
      <Footer />
    </Router>
  );
}

export default App;
