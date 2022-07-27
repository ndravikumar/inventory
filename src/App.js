import { useState } from "react";
import "./App.css";
import Piechart from "./components/charts";
import CSVReader from "./components/CSVReader";
import Records from "./records";

function App() {
  const [sampleInventory, setSampleInventory] = useState([]);
  const [originalData, setOriginalData] = useState([]);
  return (
    <div className="App">
      <CSVReader
        setSampleInventory={setSampleInventory}
        sampleInventory={sampleInventory}
        setOriginalData={setOriginalData}
        />
      <Records
        setSampleInventory={setSampleInventory}
        sampleInventory={sampleInventory}
        originalData={originalData}
        setOriginalData={setOriginalData}
      />
      <Piechart originalData={originalData} />
    </div>
  );
}

export default App;
