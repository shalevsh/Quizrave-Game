import React, { useState, useEffect } from "react";
import Question from "./quiz/question";
import AnswerBoolean from "./quiz/AnswerBoolean";
import AnswerMultiple from "./quiz/multipleAnswer";
import { styled } from "@mui/material/styles";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { useHistory } from "react-router-dom";
import Chart from "./quiz/chart";
import { useSpeechSynthesis } from "react-speech-kit";
import correct from './../../assets/correct.mp3';
import incorrect from './../../assets/incorrect.mp3';
import fifttyaud from './../../assets/50.mp3';
import Fade from '@mui/material/Fade';

//for image api
//import axios from 'axios';


//This is Just css via styled component
const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor:
      theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.mode === "light" ? "#1a90ff" : "#308fe8",
  },
}));

//This is Just css via styled component
const BorderLinearProgress2 = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor:
      theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.mode === "light" ? "#32a852" : "#32a852",
  },
}));

const QuizApp = () => {
  let history = useHistory();
  const [key, setKey] = useState(0);
  const [secondsRamaining, setSecondsRamaining] = useState(60);
  const [helper, setHelper] = useState(2);
  const [image, setImage] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [QuestionNo, SetQuestionNo] = useState(0);
  const [progressCompleted, setProgressCompleted] = useState(0);
  const [progressCorrect, setProgressCorrect] = useState(0);
  const [genderImg, setgenderImg] = useState("");
  const [totalScore, setScore] = useState(0);
  const [userName, setUserName] = useState("");
  const { speak } = useSpeechSynthesis();
  // if init array of 50\50 answers 
  const [lifelineAns, setLifeAns] = useState(null)
    // When timeExtension false = timeExtension didnt use yet
  const [timeExtension, settimeExtension] = useState(false)
      // When fiftyExtension false = fiftyExtension didnt use yet
  const [fiftyExtension, setfiftyExtension] = useState(false)
  // when anim = false the question screen disapear
  const [anim, setAmin] = useState(false)


  const sortAns = (ans) => {
    return ans.sort(function (a, b) { return 0.5 - Math.random() })
  }

  //On this UseEffect we are calling the api of the question and it will run on the start of the application
  // Got the difficulty level from the localstorage and filter questions based on it
  //when response comes up im updating the state of the component
  // here the images for same category type of question is fetched form the image list
  useEffect(() => {
    fetchAPi()
  }, []);

  const fetchAPi = async () => {
    let res = await fetch("https://opentdb.com/api.php?amount=100")
      let x = await res.json()
      setData(x);
  }
  
  // method that will set all the data for the quiz
  const setData = (jsonData) => {
    let difficulty = localStorage.getItem("difficulty");
    let objectArr = jsonData.results.filter(data => data.difficulty === difficulty);
    let arrOfObjects =jsonData.results
    // if there is under 10 question at this difficulty i will return the number questions that exists at this difficulty
    let quiz = objectArr.length > 10 ? objectArr.splice(0, 10) : objectArr.splice(0, objectArr.length);
    if (quiz.length < 10) {
      let i = 49
      difficulty = difficulty === "easy" ? "medium" : difficulty === "medium" ? "hard" : "medium"
    while (quiz.length < 10) {
      if (arrOfObjects[i].difficulty === difficulty) {
        quiz.push(arrOfObjects[i])
      }
      i--;
    }
  }
    //copy the correct ans to the incorrect array
    quiz = quiz.map(elem => { return { ...elem, incorrect_answers: [...elem.incorrect_answers, elem.correct_answer] } })
    //shuffle incorrect array
    quiz = quiz.map(elem => { return { ...elem, incorrect_answers: sortAns(elem.incorrect_answers) } })
    console.log(quiz)
    setQuestions(quiz);
    SetQuestionNo(1);
    //getImage(quiz[0]);

     setTimeout(() => {
       setAmin(true)
     }, 1000)

  let imgUrl = localStorage.getItem("genderImg2");
  setgenderImg(imgUrl);
  let name = localStorage.getItem("userName");
  setUserName(name);
  }

  useEffect(() => {
    if (questions.length) {
      speakQuestion(questions[0]);
    }
  }, [questions[0]]);

  const stripUserHandles = (string) => {
    // we will create element for decode the html non relevant convertions.
    let e = document.createElement('textarea');
    e.innerHTML = string;
    // handle case of empty input
    return e.childNodes.length === 0 ? "" : e.childNodes[0].nodeValue;
  }

  const speakQuestion = (question) => {
    let blindMode = localStorage.getItem("blindMode");
    if (blindMode && blindMode === "on") {
      if (question) {
        speak({ text: stripUserHandles(question.question) });
        if (question.type === 'multiple') {
          for (let name of question.incorrect_answers) {
            speak({ text: stripUserHandles(name) })

          }
        } else {
          speak({ text: 'True' })
          speak({ text: 'false' })
        }
      }
    }
  };

  // When user select the answer either it can right or wrong we are
  // checking answer here and update the progress and showing next question
  // set Timmer back to reset
  const checkAns = (ans) => {
    // add it
    setAmin(false)
    setLifeAns(null)
    if (ans === true) {
      new Audio(correct).play();
      setScore(totalScore + secondsRamaining);
      setProgressCorrect(progressCorrect + 10);
      let imgUrl = localStorage.getItem("genderImg");
      setgenderImg(imgUrl);
    }
    if (ans === false) {
      new Audio(incorrect).play();
      let imgUrl = localStorage.getItem("genderImg3");
      setgenderImg(imgUrl);
    }
    setTimeout(() => {
      // if there are more questiond to display i display all the things for the next questions ..
      if (QuestionNo < questions.length) {
        //add the line below to the first line in the function
        //setAmin(false)
        SetQuestionNo(QuestionNo + 1);
        setProgressCompleted(progressCompleted + 10);
        //getImage(questions[QuestionNo]);
        speakQuestion(questions[QuestionNo]);
        setKey((prevKey) => prevKey + 1);
        let imgUrl = localStorage.getItem("genderImg2");
        setgenderImg(imgUrl);
       setTimeout(() => {
      setAmin(true)
        }
        , 1000)
       } else {
        // The last question, so update all the data we transfer to result

        let final_score = ans === true ? totalScore + secondsRamaining : totalScore
        let progress_correct_num = progressCorrect !== 0 ? progressCorrect / 10 : 0;
        progress_correct_num = ans === true ? progress_correct_num + 1 : progress_correct_num;
        history.push(`/result/${progress_correct_num.toString()}/${final_score}`);
      }
    }, 500);
  };

  // Here in this function we give question category and it return category image from image list

  // I decide not show the image becuse sometimes that api return non relevant photos

  // const getImage = (quest) => {
  //   let x = 'https://www.googleapis.com/customsearch/v1?key=AIzaSyBVMQOZkPcuAjs0uH3I2F4MscboUhWZ1XU&cx=4f19805393bb95736&q=' + encodeURIComponent(quest.question.replace(/['"]+/g, ''))
  //   axios.get(x).then(pages => {
  //   let isImageFound = false;
  //   try {
  //   if (pages.data.items) {
  //   pages.data.items.forEach(element => {
    
  //   if (element.pagemap) {
    
  //   if (element.pagemap.cse_image) {
  //   isImageFound = true;
  //   console.log('image', element.pagemap.cse_image[0].src);
  //   setImage(element.pagemap.cse_image[0].src);
  //   throw 'break';
  //   }
  //   }
  //   });
  //   }
  //   if (isImageFound == false) {
  //   setImage("https://i.ibb.co/0V5WL8d/image-not-found-scaled-1150x647.png");
  //   }
  //   } catch (e) {
    
  //   }
  //   })
  //   };

  //timeExtension featcher
  const handleLifeLine = () => {
    if (helper >= 1 && timeExtension === false) {
      if (QuestionNo <= questions.length) {
        //need to comment the line below because i dont want to fade in time extention 

        //setAmin(false)

        // just for to be sure 
        SetQuestionNo(QuestionNo);
        new Audio(fifttyaud).play();
        //getImage(QuestionNo);

       //Needs for restart the 60 sec. 
        setKey((prevKey) => prevKey + 1);
        settimeExtension(true)
        // setTimeout(() => {
          // setAmin(true)
        // }, 500)
      }
      setHelper(helper - 1);
    }
  };

  const handleLifeLine50 = () => {
    if (helper >= 1 && fiftyExtension === false) {
      if (QuestionNo <= questions.length) {
        let x = questions[QuestionNo - 1]
        let ans = []
        let rand = 0
        let incorrect_answer = x.incorrect_answers[rand]
        let correct_answer = x.correct_answer
        if (x.type === 'multiple') {
          new Audio(fifttyaud).play();
          while (incorrect_answer === correct_answer) {
            rand = getRandomInt(4)
            incorrect_answer = x.incorrect_answers[rand];
          }

          ans.push(correct_answer, incorrect_answer);

          //forget to sort after 50\50 help
          sortAns(ans)

          setLifeAns(ans)
          setfiftyExtension(true);
          setHelper(helper - 1);
        }
      }
    }
  }

  const getdata = (question) => {
    if (lifelineAns === null) {
      return question
    }
    else {
      question = { ...question, incorrect_answers: lifelineAns }
      return question
    }
  }
  const RestartinitQuiz = () => {
    setAmin(false)
    setScore(0);
    SetQuestionNo(0);
    setSecondsRamaining(60);
    setHelper(2);
    setProgressCompleted(0);
    setProgressCorrect(0);
    setLifeAns(null);
    settimeExtension(false);
    setfiftyExtension(false);

  }
  const getRandomInt = (max) => Math.floor(Math.random() * max);
 //CSS - https://tailwindcss.com/docs/
  return (
    <div className="flex flex-col items-center gap-y-20 p-20">
      <div className="flex items-start justify-between w-full">
        <div className="w-44 flex flex-col items-center">
          <div
            className="w-44 h-44 bg-cover rounded-lg"
            style={{ backgroundImage: `url(${genderImg && genderImg})`, borderRadius: '100px' }}></div>
          <span className="mb-4 text-lg text-center">
            {userName && userName}
          </span>
          <div className="mt-20">
            <Chart />
          </div>
        </div>
        {QuestionNo > 0 ? (
          //change from 1000 to 500 after answer question
          <Fade in={anim} timeout={500}>
          <div className="col-span-4">
            <div
              className="grid gap-2 grid-flow-row p-20 rounded-xl shadow-2xl bg-gray-300"
              style={{ width: "800px" }}>
              <Question data={questions[QuestionNo - 1]} />
              <div className="flex justify-center">
                <div
                  className="bg-cover bg-center rounded-md"
                  style={{
                    width: "500px",
                    height: "250px",
                    backgroundImage: `url(${image})`,
                  }}>
                  {" "}
                </div>
              </div>
              {questions[QuestionNo - 1]["type"] === "multiple" ? (
                <AnswerMultiple
                  //extension={lifelineAns}
                  data={getdata(questions[QuestionNo - 1])}
                  submit={(val) => checkAns(val)}
                />
              ): (
                <AnswerBoolean
                  submit={(val) => checkAns(val)}
                  data={questions[QuestionNo - 1]}
                />
              )}
            </div>
          </div>
           </Fade>
        ) : (
          <div className="col-span-4"></div>
        )}
        <div className="flex flex-col items-center">
          <div className="flex items-start gap-x-4">
            <div className="flex-flex-col">
              <div>
                <p>Completed Questions {QuestionNo - 1}</p>
                <BorderLinearProgress
                  variant="determinate"
                  valueBuffer={questions.length}
                  value={progressCompleted}
                />
              </div>

              <div className="mt-2 shadow-md">
                <p>Correct Questions {progressCorrect / 10}</p>
                <BorderLinearProgress2
                  variant="determinate"
                  valueBuffer={questions.length}
                  value={progressCorrect}
                />
              </div>

              <div className="mt-2 shadow-md">
                <p>Total Score {totalScore}</p>
              </div>

            </div>
            <div>
              {QuestionNo > 0 ? (
                // https://www.npmjs.com/package/react-countdown-circle-timer
                <CountdownCircleTimer
                  key={key}
                  size={100}
                  strokeWidth={6}
                  trailStrokeWidth={8}
                  isPlaying
                  onComplete={() => {
                    checkAns(false);
                    return { shouldRepeat: true };
                  }}
                  onUpdate={(val) => setSecondsRamaining(val)}
                  duration={60}
                  colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
                  colorsTime={[7, 5, 2, 0]}>
                  {({ remainingTime }) => remainingTime}
                </CountdownCircleTimer>
              ) : (
                <></>
              )}
            </div>
          </div>
          <div className="mt-10 w-full">
            <button
              // Forget to comment the line below
              //onClick={handleLifeLine}
              className="w-full bg-green-800 text-white py-2 rounded-md shadow-2xl flex items-center gap-x-3 justify-center">
              <span>Total life Lines</span>
              <span className="text-xl font-semibold"> {helper}</span>
            </button>

            {timeExtension === true ? <button
              style={{ backgroundColor: 'lightgrey' }}
              className="mt-2 w-full bg-grey-800 text-white py-2 rounded-md shadow-2xl flex items-center gap-x-3 justify-center">
              <span>Time Extension</span>

            </button> : <button
              onClick={handleLifeLine}
              className="mt-2 w-full bg-green-800 text-white py-2 rounded-md shadow-2xl flex items-center gap-x-3 justify-center">
              <span>Time Extension</span>

            </button>}

            {fiftyExtension === true ? <button
              style={{ backgroundColor: 'lightgrey' }}
              className="w-full mt-2  text-white py-2 rounded-md shadow-2xl flex items-center gap-x-3 justify-center">
              <span>50/50 LifeLine</span>

            </button> : <button
              onClick={handleLifeLine50}
              className="w-full mt-2 bg-green-800 text-white py-2 rounded-md shadow-2xl flex items-center gap-x-3 justify-center">
              <span>50/50 LifeLine</span>

            </button>}
            <div className="mt-2 shadow-md">
              <div className="flex flex-row">
              <button
                  onClick={() => {
                    fetchAPi()
                    RestartinitQuiz()
                  }}
                  style={{ marginRight: "10px" }}
                  className="w-full mt-2 bg-green-800 text-white py-2 rounded-md shadow-2xl flex items-center gap-x-3 justify-center">
                  <span>Restart</span>

                </button>
                <button
                  onClick={() => {
                    history.push('/')
                  }}
                  className="w-full mt-2 bg-green-800 text-white py-2 rounded-md shadow-2xl flex items-center gap-x-3 justify-center">
                  <span>Exit</span>

                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizApp;


