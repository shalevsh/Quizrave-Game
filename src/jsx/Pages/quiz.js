import React, { useState, useEffect } from "react";
import axios from "axios";
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
import videoGame from "./../../assets/game.jpeg";
import geo from "./../../assets/geo.jpeg";
import math from "./../../assets/math.jpeg";
import cartoon from "./../../assets/cartoon.jpeg";
import anime from "./../../assets/anime.jpeg";
import science from "./../../assets/anime.jpeg";
import sports from "./../../assets/sports.jpeg";
import animals from "./../../assets/animals.jpeg";
import books from "./../../assets/books.jpeg";
import movie from "./../../assets/movie.jpeg";
import music from "./../../assets/music.jpeg";
import art from "./../../assets/art.jpeg";
import historyimg from "./../../assets/historyimg.jpeg";
import gk from "./../../assets/gk.png";
import monday from "./../../assets/monday.png"
import { useSpeechSynthesis } from "react-speech-kit";
import c from './../../assets/c.mp3';
import n from './../../assets/n.mp3';
import fifttyaud from './../../assets/50.mp3';
import restart from "./../../assets/restart.jpg"
import exit from "./../../assets/exit.png"
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

var quest=[{question:'What is the previous name of Monday.com ?',type:'multiple','correct_answer':'Monday.com since day 1',incorrect_answers:['Sunday','daPulse','vix'],category:'monday'}]

const QuizApp = () => {
  let history = useHistory();
  const [key, setKey] = useState(0);
  const [rem, setRemaining] = useState(60);
  const [rep, setRep] = useState(2);
  const [image, setImage] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [QuestionNo, SetQuestionNo] = useState(0);
  const [progress, setProgress] = useState(0);
  const [genderImg, setgenderImg] = useState("");
  const [totalScore, setScore] = useState(0);
  const [userName, setUserName] = React.useState("");
  const { speak } = useSpeechSynthesis();
  const [lifelineAns,setLifeAns]=useState(null)
  const [timeExtension,settimeExtension]=useState(false)
  const [fiftyExtension,setfiftyExtension]=useState(false)


 
  const sortAns=(ans)=>{
    return ans.sort(function(a, b){return 0.5 - Math.random()})
  }

  //On this UseEffect we are calling the api of the question and it will run on the start of the application
  // Got the difficulty level from the localstorage and filter questions based on it
  //when response comes up im updating the state of the component
  // here the images for same category type of question is fetched form the image list
  useEffect(() => {
    checkAPi()
  }, []);

  const checkAPi=()=>{
    axios.get("https://opentdb.com/api.php?amount=100").then((res) => {
      let x = res.data.results;
      console.log(res.data.results);
      let difficulty = localStorage.getItem("difficulty");
      console.log(difficulty);
      x.filter((data) => data.difficulty === difficulty);
      let arr = x.splice(0, 10);
      let quiz=[...arr]
      quiz=quiz.map(elem=> {return { ...elem,incorrect_answers:[...elem.incorrect_answers,elem.correct_answer]}})

      quiz=quiz.map(elem=> {return { ...elem,incorrect_answers:sortAns(elem.incorrect_answers)}})
      
      
      console.log(quiz)
      setQuestions(quiz);
      SetQuestionNo(1);
      getImage(quiz[0]);
      //speakQuestion(questions[0])
    });
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

  const stripUserHandles =(string)=> {
    let e = document.createElement('textarea');
    e.innerHTML = string;
    // handle case of empty input
    return e.childNodes.length === 0 ? "" : e.childNodes[0].nodeValue;
  }

  const speakQuestion = (question) => {
    console.log(question)
    let blindMode = localStorage.getItem("blindMode");
    if (blindMode && blindMode === "on") {
      if (question) {
        speak({ text:stripUserHandles( question.question )});
        if(question.type==='multiple'){
         // speak({text:stripUserHandles(question.correct_answer)})
         for(let name of question.incorrect_answers){
          speak({text:stripUserHandles(name)})

         }
        }else{
          speak({text:'True'})
          speak({text:'false'})
        }
      }
    }
    // speak({ text: question.question })
  };

  

  // When user select the answer either it can right or wrong we are
  // checking answer here and update the progress and showing next question
  // set Timmer back to reset
  const checkAns = (ans) => {
    setLifeAns(null)
    if (ans === true) {
      new Audio(c).play();
      setScore(totalScore + rem);
      setProgress(progress + 1);
      let imgUrl = localStorage.getItem("genderImg");
      setgenderImg(imgUrl);
    }
    if (ans === false) {
      new Audio(n).play();
     // speak({text:'Wrong Answer'})
      let imgUrl = localStorage.getItem("genderImg3");
      setgenderImg(imgUrl);
    }
    setTimeout(() => {
      if (QuestionNo < questions.length) {
        SetQuestionNo(QuestionNo + 1);
        getImage(questions[QuestionNo]);
        speakQuestion(questions[QuestionNo]);
        setKey((prevKey) => prevKey + 1);
        let imgUrl = localStorage.getItem("genderImg2");
        setgenderImg(imgUrl);
      } else {
        if(rep>0){
          setScore(totalScore + (rep*20));
        }
        history.push(`/result/${progress.toString()}/${totalScore}`);
      }
    }, 500);
  };

  // Here in this function we give question category and it return category image from image list
  const getImage = (quest) => {
    console.log('okok',quest);
    let x='https://www.googleapis.com/customsearch/v1?key=AIzaSyB0uv89joXH09zfw9k-6BMmwS0s2SwUsGw&cx=4f19805393bb95736&q='+quest.question
     axios.get(x).then(pages=>{
     if(pages.data.items){
       pages.data.items.forEach(element => {
       
         if(element.pagemap){
      
           if(element.pagemap.cse_image){
            console.log('okok',element.pagemap.cse_image);
            setImage(element.pagemap.cse_image[0].src);
           }
         }
       });
      }
     })
    //setImage(img);
  };

  const handleLifeLine = () => {
    if (rep >= 1 && timeExtension==false) {
      if (QuestionNo < questions.length) {
        SetQuestionNo(QuestionNo);
        new Audio(fifttyaud).play();
        getImage(QuestionNo);
        setKey((prevKey) => prevKey + 1);
        settimeExtension(true)
      }
      setRep(rep - 1);
    }
  };

 const handleLifeLine50=()=>{
    if (rep >= 1 && fiftyExtension==false) {
      if (QuestionNo < questions.length) {
      let x=questions[QuestionNo-1]
      let ans=[]
      if(x.type==='multiple'){
        new Audio(fifttyaud).play();
        ans.push(x.correct_answer,x.incorrect_answers[2])
        setLifeAns(ans)
        setfiftyExtension(true);
        setRep(rep - 1);
      }
      }
    }
  }

  const getdata=(question)=>{
    if(lifelineAns===null){
      return question
    }
    else{
      let x=[]
      let z=question.incorrect_answers
      let y=z.findIndex(elem=>elem===question.correct_answer)
      if(y<=2){
        x.push(question.incorrect_answers[1])
        x.push(question.correct_answer)
      }else{
        x.push(question.incorrect_answers[3])
        x.push(question.correct_answer)
      }
      console.log(x)
      question ={...question,incorrect_answers:x}
      console.log(question)
       return question
    }
  }
  const RestartinitQuiz=()=>{
     setScore(0);
     SetQuestionNo(0);
     setRemaining(60);
     setRep(2);
     setProgress(0);
     setLifeAns(null);
     settimeExtension(false);
     setfiftyExtension(false);
  }
  return (
    <div className="flex flex-col items-center gap-y-20 p-20">
      <div className="flex items-start justify-between w-full">
        <div className="w-44 flex flex-col items-center">
          <div
            className="w-44 h-44 bg-cover rounded-lg"
            style={{ backgroundImage: `url(${genderImg && genderImg})`,  borderRadius: '100px' }}></div>
          <span className="mb-4 text-lg text-center">
            {userName && userName}
          </span>
          <div className="mt-20">
            <Chart />
          </div>
        </div>
        {QuestionNo > 0 ? (
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
                  extension={lifelineAns}
                  data={getdata(questions[QuestionNo - 1])}
                  submit={(val) => checkAns(val)}
                />
              ) : (
                <AnswerBoolean
                  submit={(val) => checkAns(val)}
                  data={questions[QuestionNo - 1]}
                />
              )}
            </div>
          </div>
        ) : (
          <div className="col-span-4"></div>
        )}
        <div className="flex flex-col items-center">
          <div className="flex items-start gap-x-4">
            <div className="flex-flex-col">
              <div>
                <p>Completed Questions {QuestionNo-1}</p>
                <BorderLinearProgress
                  variant="determinate"
                  valueBuffer={questions.length}
                  value={QuestionNo}
                />
              </div>

              <div className="mt-2 shadow-md">
                <p>Correct Questions {progress}</p>
                <BorderLinearProgress2
                  variant="determinate"
                  valueBuffer={questions.length}
                  value={progress}
                />
              </div>

              <div className="mt-2 shadow-md">
                <p>Total Score {totalScore}</p>
              </div>
              
            </div>
            <div>
              {QuestionNo > 0 ? (
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
                  onUpdate={(val) => setRemaining(val)}
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
              onClick={handleLifeLine}
              className="w-full bg-green-800 text-white py-2 rounded-md shadow-2xl flex items-center gap-x-3 justify-center">
              <span>Total life Lines</span>
              <span className="text-xl font-semibold"> {rep}</span>
            </button>

           {timeExtension===true? <button
             style={{backgroundColor:'lightgrey'}}
              className="mt-2 w-full bg-grey-800 text-white py-2 rounded-md shadow-2xl flex items-center gap-x-3 justify-center">
              <span>Time Extension</span>
             
            </button>:<button
              onClick={handleLifeLine}
              className="mt-2 w-full bg-green-800 text-white py-2 rounded-md shadow-2xl flex items-center gap-x-3 justify-center">
              <span>Time Extension</span>
             
            </button>}
            
            {fiftyExtension===true ?  <button
              style={{backgroundColor:'lightgrey'}}
              className="w-full mt-2  text-white py-2 rounded-md shadow-2xl flex items-center gap-x-3 justify-center">
              <span>50/50 LifeLine</span>
            
            </button>:<button
              onClick={handleLifeLine50}
              className="w-full mt-2 bg-green-800 text-white py-2 rounded-md shadow-2xl flex items-center gap-x-3 justify-center">
              <span>50/50 LifeLine</span>
            
            </button>}
            <div className="mt-2 shadow-md">
                  <div className="flex flex-row">
                    
                    <img onClick={()=>{checkAPi() 
                     RestartinitQuiz()
                     // window.location.reload()
                      }} alt={'restart'} style={{width:'100px'}} src={restart} />
                    
                    <img onClick={()=>{history.push('/')}} alt={'exit'} style={{width:'100px'}} src={exit}/>
                  </div>
                </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizApp;

const images = [
  { name: "Entertainment: Video Games", url: videoGame },
 
  { name: "Entertainment: Video Games", url: videoGame },
  { name: "Entertainment: Television", url: videoGame },
  { name: "Art", url: art },
  { name: "Science & Nature", url: science },
  { name: "Entertainment: Music", url: music },
  { name: "General Knowledge", url: gk },
  { name: "History", url: historyimg },
  { name: "Entertainment: Film", url: movie },
  { name: "Books", url: books },
  { name: "Animals", url: animals },
  { name: "Sports", url: sports },
  { name: "Science: Gadgets", url: science },
  { name: "Entertainment: Japanese Anime & Manga", url: anime },
  { name: "Entertainment: Cartoon & Animations", url: cartoon },
  { name: "Science: Mathematics", url: math },
  { name: "Entertainment: Comics", url: videoGame },
  { name: "Geography", url: geo },
  
];
