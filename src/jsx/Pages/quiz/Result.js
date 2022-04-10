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
  const [checked, setChecked] = React.useState(true);
  useEffect(() => {
    let x = JSON.parse(localStorage.getItem("scores"));
    if (x && x.length) {
      x.push(score);
      localStorage.setItem("scores", JSON.stringify(x));
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

    if (score > 200) {
      setChecked(true)
      setTimeout(() => {
        setChecked(false)
      }, 3000)
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
        {score > 200 && <Zoom in={checked} style={{ transitionDelay: '500ms' }}>
        <h1 className="rainbow-text">NEW HIGH SCORE !!!</h1>
          </Zoom>}

          {/* <Zoom in={checked} style={{ transitionDelay: '500ms' }}>
            <h1 className="rainbow-text">NEW HIGH SCORE !!!</h1>

          </Zoom> */}
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
