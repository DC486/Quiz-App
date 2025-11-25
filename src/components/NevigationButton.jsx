import React from 'react';

/**
 * Renders navigation buttons for a multi-step form or quiz.
 * Shows Previous/Next buttons, or Previous/Submit on the last question.
 * The buttons' enabled/disabled state depends on the current question and whether an answer is selected.
 */
function NavigationButtons({ onNextClick, isAnswerSelected, onPrevClick, currentQuestionIndex, isLastQuestion }) {
  // --- Styling Constants for Thematic Look ---
  // Define the consistent color palette used across the active buttons
  const BUTTON_BG_COLOR = '#E0F7FA';    // Very light blue background
  const BUTTON_TEXT_COLOR = '#006064';  // Dark teal for text/icon
  const BUTTON_BORDER_COLOR = '#B2EBF2';// Light teal border

  // Common Tailwind classes for icons and the base button shape
  const arrowIconClasses = "w-6 h-6";
  const buttonBaseClasses = "w-12 h-12 rounded-full flex justify-center items-center transition-colors duration-200";

  // --- Dynamic Class Definitions ---

  // Classes for the "Submit" button on the last question
  const submitButtonClasses = isAnswerSelected
    ? `px-8 py-3 bg-[${BUTTON_BG_COLOR}] text-[${BUTTON_TEXT_COLOR}] text-lg font-semibold rounded-full border border-[${BUTTON_BORDER_COLOR}] shadow-md hover:bg-[#CFEEF5] transition-colors duration-300`
    : `px-8 py-3 bg-gray-100 text-gray-500 text-lg font-semibold rounded-full border border-gray-200 cursor-not-allowed`;

  // Classes for the "Previous" button, which changes color if disabled (i.e., on the first question)
  const prevButtonClasses = currentQuestionIndex > 0 
    ? `${buttonBaseClasses} bg-[${BUTTON_BG_COLOR}] text-[${BUTTON_TEXT_COLOR}] border border-[${BUTTON_BORDER_COLOR}] hover:bg-[#CFEEF5]`
    : `${buttonBaseClasses} bg-gray-100 text-gray-400 border border-gray-200 cursor-not-allowed`; 

  // --- Component Structure ---
  return (
    // Container uses flexbox to push buttons to the right and adds spacing between them
    <div className="flex justify-end mt-8 space-x-4">
      
      {/* Check if we are on the final question to decide what to render */}
      {isLastQuestion ? (
        // RENDER SCENARIO 1: Last Question (Previous + Submit)
        <>
          {/* Previous Button - Always rendered here, but disabled on question 0 */}
          <button 
            className={prevButtonClasses}
            onClick={onPrevClick}
            disabled={currentQuestionIndex === 0} // Disabled if it's the very first question
          >
            {/* SVG for Left Arrow icon */}
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className={arrowIconClasses}><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
          </button>
          
          {/* Submit Button - Uses the submit-specific styling and is disabled until an answer is selected */}
          <button
            className={submitButtonClasses}
            onClick={onNextClick} // 'Next' click handler is repurposed to trigger the submit action
            disabled={!isAnswerSelected}
          >
            Submit
          </button>
        </>
      ) : (
        // RENDER SCENARIO 2: Middle Questions (Previous + Next)
        <>
          {/* Previous Button - Same as above, disabled on question 0 */}
          <button 
            className={prevButtonClasses}
            onClick={onPrevClick}
            disabled={currentQuestionIndex === 0} 
          >
            {/* SVG for Left Arrow icon */}
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className={arrowIconClasses}><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
          </button>

          {/* Next Button - Uses standard active styling and is disabled until an answer is selected */}
          <button 
            className={`${buttonBaseClasses} bg-[${BUTTON_BG_COLOR}] text-[${BUTTON_TEXT_COLOR}] border border-[${BUTTON_BORDER_COLOR}] hover:bg-[#CFEEF5]`}
            onClick={onNextClick}
            disabled={!isAnswerSelected}
          >
            {/* SVG for Right Arrow icon */}
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className={arrowIconClasses}><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
          </button>
        </>
      )}
    </div>
  );
}

export default NavigationButtons;