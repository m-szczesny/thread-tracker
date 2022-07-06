import { useState } from "react";
import "./App.css";
import "antd/dist/antd.dark.min.css";

import { Home } from "./components/Home";

function App() {
  const [setupReady, setSetupReady] = useState(
    !!window.localStorage.getItem("accessToken")
  );

  return (
    <div className="App">
      <Home setupReady={setupReady} setSetupReady={setSetupReady} />
    </div>
  );
}

export default App;
