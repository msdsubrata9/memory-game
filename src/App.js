import { useState } from "react";
import { getNums } from "./utils/constants";
import MemoryCard from "./components/MemoryCard";

function App() {
  const [stage, setStage] = useState("init");
  const [nums, setNums] = useState(getNums());
  const [solvedList, setSolvedList] = useState([]);

  function randomNums() {
    const copyNums = [...nums];
    return copyNums.sort(() => Math.random() - 0.5);
  }

  function handleStart() {
    setStage("start");
    setNums(randomNums());
    setSolvedList([]);
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-500 to-indigo-600 flex flex-col items-center">
      <h1 className="font-bold text-5xl text-white mt-10 mb-6">Memory Game</h1>
      {stage === "init" && (
        <div className="text-center mt-10">
          <button
            className="px-10 py-6 border border-white bg-white text-purple-700 font-semibold text-2xl rounded-lg shadow-lg hover:bg-purple-100 transition"
            onClick={handleStart}
          >
            Start
          </button>
        </div>
      )}
      {stage === "start" && (
        <div className="mt-10">
          <MemoryCard
            nums={nums}
            setStage={setStage}
            setSolvedList={setSolvedList}
            solvedList={solvedList}
          />
        </div>
      )}
      {stage === "win" && (
        <div className="text-center mt-20">
          <h2 className="text-4xl font-bold text-green-500">
            You won the game!!!
          </h2>
          <button
            className="px-10 py-6 my-10 border border-white bg-white text-purple-700 font-semibold text-2xl rounded-lg shadow-lg hover:bg-purple-100 transition"
            onClick={handleStart}
          >
            Play Game
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
