import React from 'react'

/**
 * Renders a transition or loading screen displayed between the last question and the final results page.
 * It provides a visual cue that the score calculation is in progress, preventing a sudden jump in the UI.
 */
function ScoringTransitionPage() {
    return (
        // Main container: full screen height, centered content, light background, padding, and a fade-in transition
        <div className="min-h-screen bg-[#F0F5F8] flex flex-col justify-center items-center text-center p-8 transition-opacity duration-1000">
            
            {/* Encouraging message (e.g., "Keep Learning!") styled as a prominent badge */}
            <p className="text-xl text-[#006064] font-semibold bg-white px-3 py-1 rounded-lg mb-8 shadow-sm">Keep Learning!</p> 
            
            {/* Status message indicating the process */}
            <p className="text-2xl text-gray-600 mb-4">Calculating your final score is...</p> 
            
            {/* Placeholder Score: A massive, pulsating '0' to indicate a calculation is underway */}
            <h1 className="text-9xl font-extrabold text-[#006064] animate-pulse">0</h1>
        </div>
    );
}
export default ScoringTransitionPage;