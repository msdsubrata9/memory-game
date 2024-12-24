import React, { useEffect, useState } from "react";

function MemoryCard({ nums, setStage, setSolvedList, solvedList }) {
  const [opened, setOpened] = useState([]);

  function handleClick(num, index) {
    if (opened.length === 2) return;
    setOpened((prev) => [...prev, index]);
  }

  useEffect(() => {
    let timeoutId;

    if (opened.length === 2) {
      timeoutId = setTimeout(() => {
        const id1 = opened[0];
        const id2 = opened[1];
        if (nums[id1] === nums[id2]) {
          /*
           * if cards values are equal then
           * 1. remove the cards by adding it on setSolvedList
           * 2. remove all the indexes from opened list
           */
          setSolvedList((prev) => [...prev, nums[id1]]);
        }
        /* if cards values are not equal then
         * remove all the indexes from the opened list
         */
        setOpened([]);
      }, 1000);
    }

    return () => {
      clearTimeout(timeoutId);
    };
  }, [opened]);

  useEffect(() => {
    if (solvedList.length === 8) setStage("win");
  });

  function getClassName(num, index) {
    if (solvedList.includes(num)) {
      return "bg-green-500 text-gray-900 pointer-events-none";
    } else if (opened.includes(index)) {
      return "bg-purple-400 text-white";
    } else {
      return "bg-purple-600 text-transparent";
    }
  }

  return (
    <div className="grid grid-cols-4 gap-6 p-6 bg-white rounded-lg shadow-md">
      {nums.map((num, index) => (
        <div
          onClick={() => handleClick(num, index)}
          key={index}
          className={`flex items-center justify-center w-20 h-20 text-xl font-bold rounded-lg shadow-lg transition transform hover:scale-105 ${getClassName(
            num,
            index
          )}`}
        >
          {num}
        </div>
      ))}
    </div>
  );
}

export default MemoryCard;
