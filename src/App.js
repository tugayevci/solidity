import Install from "./pages/Install";
import Home from "./pages/Home";

function App() {
  if (window.ethereum) {
    return <Home />;
  } else {
    return <Install />;
  }
}

export default App;
