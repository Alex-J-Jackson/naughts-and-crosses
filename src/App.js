import "./App.css";
import { useState } from "react";
import NaughtsAndCrosses from "./components/naughts-and-crosses";
import FourByFour from "./components/4x4";

function App() {
  const [is4x4, setIs4x4] = useState(false);
  return (
    <div className="App">
      <button id="grid-toggle" onClick={() => setIs4x4(!is4x4)}>
        Toggle Grid
      </button>
      {is4x4 ? <FourByFour /> : <NaughtsAndCrosses />}
    </div>
  );
}

export default App;
