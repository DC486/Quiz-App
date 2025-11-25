import React, { useState, useCallback, useEffect} from "react";
import quizQuestions from "./Data/Questions";
import QuestionCard from "./components/QuestionsCard";
import NavigationButtons from "./components/NevigationButton";
import ScoringTransitionPage from "./components/ScoringTransition";
import ResultsPage from "./components/ResultsPage";

/**
 * App.js
 * Main quiz application component.
 * - Holds quiz state and user answers
 * - Handles navigation and scoring
 * - Renders QuestionCard, NavigationButtons, transition and results screens
 */

function App() {
  // index of the currently visible question
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  // currently selected answer for the active question (string or null)
  const [selectedAnswer, setSelectedAnswer] = useState(null); 

  // map of answers the user has chosen: { [questionId]: answerText }
  const [userAnswers, setUserAnswers] = useState({}); 

  // top-level quiz flow state and final score
  const [quizState, setQuizState] = useState({
      status: 'quiz', // 'quiz' | 'calculating' | 'results'
      finalScore: null,
  });

  // derived helper values
  const isCalculating = quizState.status === 'calculating';
  const finalScore = quizState.finalScore;
  
  const currentQuestion = quizQuestions[currentQuestionIndex];
  const totalQuestions = quizQuestions.length;
  const isLastQuestion = currentQuestionIndex === totalQuestions - 1;
  
  /* ---------------------------
     Handlers
     - handleAnswerSelect: saves selected answer locally and in userAnswers
     - handlePrevClick: navigate to previous question and restore selection
     - handleNextClick: require answer, then navigate or trigger scoring
     - handleRestartQuiz: reset quiz to initial state
     --------------------------- */

  const handleAnswerSelect = useCallback((answerText) => {
    setSelectedAnswer(answerText);
    setUserAnswers(prevAnswers => ({
      ...prevAnswers,
      [currentQuestion.id]: answerText
    }));
  }, [currentQuestion]);


  const handlePrevClick = () => {
    if (currentQuestionIndex > 0) {
      const prevIndex = currentQuestionIndex - 1;
      setCurrentQuestionIndex(prevIndex);
      const prevQuestionId = quizQuestions[prevIndex].id;
      setSelectedAnswer(userAnswers[prevQuestionId] || null);
    }
  };

  const handleNextClick = () => {
    const isAnswered = userAnswers[currentQuestion.id] !== undefined;

    if (!isAnswered) return; 

    const nextIndex = currentQuestionIndex + 1;

    if (nextIndex < totalQuestions) {
      setCurrentQuestionIndex(nextIndex);
      const nextQuestionId = quizQuestions[nextIndex].id;
      setSelectedAnswer(userAnswers[nextQuestionId] || null); 
    } else {
      // move to scoring / transition screen
      setQuizState(prev => ({ ...prev, status: 'calculating' })); 
    }
  };
  
  const handleRestartQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setUserAnswers({});
    setQuizState({ status: 'quiz', finalScore: null });
  };

  /* ---------------------------
     Effect: scoring
     - Runs when quiz enters 'calculating'
     - Tallies correct answers and sets final score after a short delay
     --------------------------- */
  useEffect(() => {
    if (isCalculating) {
      let correctCount = 0;
      
      quizQuestions.forEach((question) => {
        const userAnswer = userAnswers[question.id];
        if (userAnswer === question.correctAnswer) {
          correctCount += 1;
        }
      });

      const calculatedScore = Math.round((correctCount / totalQuestions) * 100);

      const delay = 1500; 

      const timer = setTimeout(() => {
        setQuizState({ status: 'results', finalScore: calculatedScore });
      }, delay);

      return () => clearTimeout(timer);
    }
  }, [isCalculating, userAnswers, totalQuestions]);
  
  /* ---------------------------
     Conditional rendering:
     - results screen
     - scoring transition
     - main quiz UI
     --------------------------- */
  
  if (quizState.status === 'results') {
    return <ResultsPage score={finalScore} onRestart={handleRestartQuiz} />;
  }

  if (isCalculating) {
    return <ScoringTransitionPage />;
  }
  
  // progress helpers
  const progressWidth = ((currentQuestionIndex + 1) / totalQuestions) * 100;
  const markerPositions = Array.from({ length: totalQuestions }).map((_, i) => ({
    left: `${(i / (totalQuestions - 1)) * 100}%`,
    isActive: i <= currentQuestionIndex,
  }));
  
  const activeAnswerForStyling = selectedAnswer || userAnswers[currentQuestion.id] || null;
  const isAnswerSelected = activeAnswerForStyling !== null;
  
  // segmented progress UI (one block per question)
  const blockProgress = Array.from({ length: totalQuestions }).map((_, i) => (
    <div 
      key={i} 
      className={`h-1 mx-1 rounded-full flex-1 transition-colors duration-300 ${
        i === currentQuestionIndex 
          ? 'bg-[#334155]'
          : i < currentQuestionIndex
          ? 'bg-[#334155]'
          : 'bg-gray-300'
      }`}
    ></div>
  ));
  
  return (
    <div className="min-h-screen bg-blue-50 flex flex-col items-center p-0 relative overflow-hidden font-sans">
        
        {/* background gradient */}
        <div className="absolute inset-0 z-0 bg-gradient-to-br from-[#E9F4F7] via-[#E9F4F7] to-[#C9E7F4]"></div>

        {/* main container */}
        <main className="flex justify-center flex-grow w-full py-16 px-4">
            <div className="bg-white rounded-[3rem] shadow-2xl p-6 sm:p-10 w-full max-w-6xl z-10 border-[30px] border-[#B2EBF2]/40 relative">
              
              {/* header: title, subtitle, segmented progress */}
              <div className="text-center mb-8">
                <h1 className="text-5xl font-extrabold tracking-tight text-[#2C3E50]" style={{ fontFamily: 'Playfair Display, serif', fontSize: '3.5rem', color: '#1B4F72' }}> 
                  Test Your Knowledge
                </h1>

                <p className="text-center text-[#B71C1C] text-xl mb-4" style={{color: '#475569'}}>
                  Answer all questions to see your results
                </p>

                <div className="flex justify-center mx-auto mb-10 w-full max-w-lg">
                    <div className="flex w-full px-2">
                        {blockProgress}
                    </div>
                </div>
              </div>

              {/* question card */}
              <QuestionCard
                question={currentQuestion}
                selectedAnswer={activeAnswerForStyling} 
                onAnswerSelect={handleAnswerSelect}
              />

              {/* navigation controls */}
              <NavigationButtons
                onNextClick={handleNextClick}
                onPrevClick={handlePrevClick}
                isAnswerSelected={isAnswerSelected}
                currentQuestionIndex={currentQuestionIndex}
                isLastQuestion={isLastQuestion}
              />
              
              {/* decorative paw + bubble shown only on first question (desktop) */}
              {currentQuestionIndex === 0 && (
                <div className="absolute bottom-[-10px] left-[-20px] z-20 flex flex-col items-start hidden sm:block"> 
                    
                    <img 
                        src="data:image/png;base64,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"
                        alt="Cute cat paw illustration" 
                        className="w-37 h-37 mb-[-30px] ml-7 object-contain"
                        onError={(e) => {e.target.onError=null; e.target.src='[https://placehold.co/80x80/F8BBDA/5D4037?text=Cat](https://placehold.co/80x80/F8BBDA/5D4037?text=Cat)';}}
                    />
                    
                    <div className="relative bg-white text-[#475569] text-sm p-3 rounded-xl shadow-lg border-2 border-[#B2EBF2] mt-2 ml-10"> 
                        Best of Luck!
                        <div className="absolute w-0 h-0 border-r-[10px] border-r-[#B2EBF2] border-b-[10px] border-b-transparent border-t-[10px] border-t-transparent left-[-10px] top-1/2 transform -translate-y-1/2 rotate-[-45deg]"></div>
                        <div className="absolute w-0 h-0 border-r-[8px] border-r-white border-b-[8px] border-b-transparent border-t-[8px] border-t-transparent left-[-8px] top-1/2 transform -translate-y-1/2 rotate-[-45deg]"></div>
                    </div>
                </div>
              )}
            </div>
        </main>
    </div>
  );
}

export default App;
