import { EthProvider } from "./contexts/EthContext";
import Intro from "./components/Intro/";
import Setup from "./components/Setup";
import Demo from "./components/Demo";
import Footer from "./components/Footer";
import Signer from "./components/Signer";
import RsaSigner from "./components/RsaSigner";
import "./App.css";

function App() {
  return (
    <EthProvider>
      <div>
        <RsaSigner/>
      </div>
      <div id="App" >
        <div className="container">
          <Intro />
          <hr />
          <Setup />
          <hr />
          <Demo />
          <hr />
          <Footer />
        </div>
      </div>
    </EthProvider>
  );
}

export default App;
