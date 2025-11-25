import React from 'react';
// Assuming AnswerButton is a component that handles the styling and click logic for individual choices.
import AnswerButton from './AnswerButton';


function QuestionCard({ question, selectedAnswer, onAnswerSelect }) {
  return (
    // Main container for the question text and buttons, providing vertical spacing
    <div className="space-y-4">
      
      {/* Question Text Display */}
      <h3 className="text-xl font-semibold mb-6 text-[#334155]">{question.text}</h3> {/* Uses a dark gray/blue color for readability */}

      {/* Answer Options: Maps the array of options to render individual AnswerButton components */}
      {question.options.map((option, index) => (
        <AnswerButton 
          key={index}
          text={option}
          // The click handler calls the parent function, passing the option's text
          onClick={() => onAnswerSelect(option)}
          // Determines if this specific button should appear highlighted based on the selectedAnswer prop
          isSelected={selectedAnswer === option}
        />
      ))}
    </div>
  );
}

export default QuestionCard;