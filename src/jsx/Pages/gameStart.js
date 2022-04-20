import React from "react";
import { useHistory } from "react-router-dom";
import male1 from "./../../assets/male1.jpg";
import male2 from "./../../assets/male2.jpg";
import male3 from "./../../assets/male3.jpg";
import female1 from "./../../assets/female1.jpg";
import female2 from "./../../assets/female2.jpg";
import female3 from "./../../assets/female3.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import AnswerMultiple from "./quiz/multipleAnswer";
import Question from "./quiz/question";
import monday from "./../../assets/monday.png"
import correct from './../../assets/correct.mp3';
import incorrect from './../../assets/incorrect.mp3';
import start from './../../assets/start.wav';
import settings from './../../assets/settings.wav';


const GameStart = () => {
  //First Screen of project
  const [userName, setUserName] = React.useState("");
  const [example, setExample] = React.useState(false)
  const [answrong, setwrong] = React.useState(false)
  let history = useHistory();
  const difficulty = ['easy', 'medium', 'hard']


  const sortAns = (ans) => {
    return ans.sort(function (a, b) { return 0.5 - Math.random() })
  }

  let exampleQuestion = [{ question: 'What is the previous name of Monday.com ?',
                           type: 'multiple',
                           correct_answer: 'daPulse',
                           incorrect_answers: ['Monday.com since day 1', 'Sunday', 'daPulse', 'vix'],
                           category: 'monday' }]

  exampleQuestion = exampleQuestion.map(
    elem => {
     return { ...elem, incorrect_answers: elem.incorrect_answers } 
    })

  
  //method when user select Gender then it store it into the Localstorage
  const selectCharacter = (url, url2, url3, gender) => {
    if (userName) {
      new Audio(start).play();
      localStorage.setItem("gender", gender);
      localStorage.setItem("genderImg", url);
      localStorage.setItem("genderImg2", url2);
      localStorage.setItem("genderImg3", url3);
      localStorage.setItem("userName", userName);
      if (localStorage.getItem("difficulty") === null) {
        localStorage.setItem("difficulty", difficulty[Math.floor(Math.random() * difficulty.length)]);
      }
      history.push("/quiz");
    } else {
      alert("Please Enter Your Name!");
    }
  };

  const doSettings = () => {
    new Audio(settings).play();
    history.push("/settings");
  };

  const checkAns = (val) => {
    if (val === true) {
      new Audio(correct).play();
      setExample(false)
    } else {
      new Audio(incorrect).play();
      setwrong(true)
    }
  }

  const showExample = () => {
    setExample(!example);
    setwrong(false)
  }
 //CSS - https://tailwindcss.com/docs/
  return (
    <div className="App">
      <div className="w-full p-4 text-center" style={{ marginTop: "50px" }}>
        <span style={{ fontSize: "xxx-large", fontWeight: "bold" }}>Quizrave</span>
      </div>
      <header
        className="App-header flex justify-center items-center"
        style={{ minHeight: "90vh" }}
      >
        <div className="flex flex-col  shadow-2xl px-40 py-20 rounded-2xl" style={{ position: "relative" }}>
          <div style={{ position: "absolute", right: "20px", top: "20px" }}>
            <div >
              <FontAwesomeIcon
                onClick={doSettings}
                icon={faGear}
                style={{ fontSize: "30px" }}
              />
            </div>
          </div>
          <div className="justify-center text-center">
            <div>
              <h4>Select Your Character</h4>
            </div>

            <div className="flex flex-row gap-x-4 justify-center mt-8">
              <div
                onClick={() => selectCharacter(male1, male2, male3, "male")}
                className="w-44 h-44 bg-cover rounded-lg"
                style={{ backgroundImage: `url(${male2})`, borderRadius: '100px' }}
              />
              <div
                onClick={() => selectCharacter(female1, female2, female3, "female")}
                className="w-44 h-44 bg-cover rounded-lg"
                style={{ backgroundImage: `url(${female2})`, borderRadius: '100px' }}
              />
            </div>
            <div className="flex flex-col items-start  gap-x-4 mt-4 w-full ">
              <label className="text-lg">Enter Nick Name:</label>
              <input
                onChange={e => {
                  setUserName(e.target.value);
                }}
                type={"text"}
                placeholder="Your name"
                className="outline-none text-black border-0 rounded-lg shadow-2xl px-5 py-2 w-full"
              />

              <button
                onClick={() => showExample()}
                className=" mr-4 bg-green-800 text-white py-2 px-2 text-center rounded-md shadow-2xl  items-center  w-full" style={{ 'margin-top': '44px' }}>
                <span>Example</span>

              </button>

            </div>

          </div>

        </div>
        {example ? <div className="flex flex-col items-center p-2"> <div className="col-span-3 ">
          <div
            className="grid gap-2 grid-flow-row p-20 rounded-xl shadow-2xl bg-gray-300"
            style={{ width: "800px" }}>
            <Question data={exampleQuestion[0]} />
            <div className="flex justify-center">
              <div
                className="bg-cover bg-center rounded-md"
                style={{
                  width: "500px",
                  height: "250px",
                  backgroundImage: `url(${monday})`,
                }}>
                {" "}
              </div>

            </div>

            <AnswerMultiple
              submit={(val) => checkAns(val)}
              data={exampleQuestion[0]}
            />
            {answrong ? <div className="mt-6">
              <h6>Wrong answer</h6>
            </div> : <></>}

          </div>
        </div></div> : <></>}
      </header>


    </div>
  );
};

export default GameStart;

