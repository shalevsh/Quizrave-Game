import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import Confetti from "react-confetti";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import Zoom from '@mui/material/Zoom';
export const Result = () => {
  let history = useHistory();
  let name = localStorage.getItem("userName");
  const { progress, score } = useParams();
  const [checked, setChecked] = React.useState(false);

  useEffect(() => {
    let x = JSON.parse(localStorage.getItem("scores"));
    //There is already score at local storage
    if (x && x.length) {
      x.push(score);
      localStorage.setItem("scores", JSON.stringify(x));
      //first time
    } else {
      x = [];
      x.push(score);
      localStorage.setItem("scores", JSON.stringify(x));
    }

    let y = JSON.parse(localStorage.getItem("userStats"));
    if (y && y.length) {
      y.push(name);
      localStorage.setItem("userStats", JSON.stringify(y));
    } else {
      y = [];
      y.push(name);
      localStorage.setItem("userStats", JSON.stringify(y));
    }
    //add highst score
    //convert array of string to array of numbers
    let scoresNumbersArray = x.map(v => {
      return parseInt(v, 10);
    });
    scoresNumbersArray = scoresNumbersArray.sort()
    scoresNumbersArray=scoresNumbersArray.reverse()
    let max = scoresNumbersArray[0] === null ? 0: scoresNumbersArray[0]
    if (score > 200 && score >= max) {
      setChecked(true)
    }else{
      setChecked(false)
    }
  }, []);

  return (
    <div className="App ">
      {score > 200 ?
        <Confetti numberOfPieces={score > 400 ? (progress) * 100 : score > 300 ? (progress) * 50 : (progress) * 10} />
        : null}
      <header
        className="App-header flex justify-center items-center"
        style={{ minHeight: "90vh" }}
      >
        <div className="w-full h-full flex flex-col gap-y-6 justify-center items-center">
        { <Zoom in={checked} style={{ transitionDelay: '500ms' }}>
        <h1 className="rainbow-text">NEW HIGH SCORE !!!</h1>
          </Zoom>}
          <h1>{score > 500 ? "Perfect game !" : score > 400 ? "Amazing" : score > 200 ? "Congrats" : "Go back to school"}</h1>
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-6 bg- flex items-center justify-between gap-4 rounded-lg px-6 py-3 shadow-xl w-96">
              <span className="">Total Questions: </span>{" "}
              <span className="">10</span>
            </div>
            {progress &&
              <div
                style={{ color: "rgb(22 163 74)" }}
                className="col-span-6 flex items-center justify-between gap-4 rounded-lg px-6 py-3 shadow-xl w-96"
              >
                <span className=""> Right: </span>
                <span className="">
                  {parseInt(progress)}
                </span>
              </div>}
            {progress &&
              <div className="col-span-6 text-gray-500 flex items-center justify-between gap-4 rounded-lg px-6 py-3 shadow-xl w-96">
                <span className="">Score: </span>{" "}
                <span className="">{score}</span>
              </div>}
            {progress &&
              <div
                style={{ color: "#EF4444" }}
                className="col-span-6 flex items-center justify-between gap-4 rounded-lg px-6 py-3 shadow-xl w-96"
              >
                <span className="">Wrong: </span>{" "}
                <span className="">{10 - parseInt(progress)}</span>
              </div>}
          </div>
          <div
            onClick={() => history.push("/")}
            className="bg-gray-100 text-black font-semibold cursor-pointer flex items-center justify-between ease-in-out transition duration-500 gap-4 rounded-lg px-6 py-3 shadow-xl w-96"
          >
            <FontAwesomeIcon
              icon={faArrowLeft}
              style={{ fontSize: "30px" }}
            />
            <span className="ease-in-out transition duration-500">Take me back </span>{" "}
            <div></div>
          </div>
        </div>
      </header>
    </div>
  );
};
