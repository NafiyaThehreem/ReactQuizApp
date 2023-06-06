import './Quiz.css';
import React,{useState} from "react";
import questions from "./QuizzData";
import QuizResult from "./QuizResult";

function App() {
  const[currentQuestion,setCurrentQuestion] = useState(0);
  const[score,setScore]=useState(0);
  const[CorrectAns,setCorrectAns]=useState(0);
  const[showResult,setshowResult]=useState(false);
  const[clicked,setClicked]=useState(false);

  const handleAnswerOption=(isCorrect)=>{
    if(isCorrect ){
      setScore(score+5);
      setCorrectAns(CorrectAns+1);
    }
    setClicked(true);
  };

  const handleNextOption =() =>{
    setClicked(false);
    const nextQuestion=currentQuestion+1;
    if(nextQuestion<questions.length){
      setCurrentQuestion(nextQuestion);
    }else{
      setshowResult(true);
    }
  };

  const handlePlayAgain=()=>{
    setScore(0);
    setCorrectAns(0);
    setshowResult(false);
    setCurrentQuestion(0);
  }

  return (
    <>
    <div className="app">
    {showResult?(
      <QuizResult
      score={score}
      CorrectAns={CorrectAns}
      handlePlayAgain={handlePlayAgain}
      />)
      :
      (
      <>
      <div className = "question-section">
      <h5>Score:{score}</h5>
      <div className ="question-count">
      <span>Question {currentQuestion+1} of {questions.length}</span>
      </div>
      <div className="question-text">
      {questions[currentQuestion].questionText}
      </div>
      </div>
      <div className = "answer-section">
      {questions[currentQuestion].answerOptions.map((ans,i)=>{
        return <button className={`button ${clicked && ans.isCorrect?"correct" : "button"}`}
        disabled = {clicked}
        key={i}
        onClick={()=>handleAnswerOption(ans.isCorrect)}>{ans.answerText}</button>;
      })}
      <div className ="actions">
      <button onClick={handlePlayAgain}>Quit</button>
      <button disabled = {!clicked} onClick={handleNextOption}>Next</button>
      </div>
      </div>
      </>
    )}
    </div>
    </>
  );
}

export default App;
