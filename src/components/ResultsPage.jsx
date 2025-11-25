import React from 'react'

function ResultsPage({ score, onRestart }) {
    // Dynamically determine the color class for the score based on tiers:
    // Green (75% or higher), Yellow (50% to 74%), Red (below 50%)
    const scoreColor = score >= 75 ? 'text-green-600' : score >= 50 ? 'text-yellow-600' : 'text-red-500';

    return (
        // Main container: full screen height, centered content, light background, padding, and a fade-in transition
        <div className="min-h-screen bg-[#F0F5F8] flex flex-col justify-center items-center text-center p-8 transition-opacity duration-1000">
            
            {/* Introductory Text */}
            <p className="text-2xl text-gray-600 mb-4">You Scored</p>
            
            {/* Large Score Display: Uses dynamic color and a bold, massive font size */}
            <h1 className={`text-9xl font-extrabold ${scoreColor} transition-all duration-700`}>
                {score}%
            </h1>
            
            {/* Sub-Text */}
            <p className="text-4xl font-light text-gray-700 mt-4 mb-10">
                Your final score is
            </p>
            
            {/* Restart Button: Uses the clean, rounded button styling consistent with the rest of the application */}
            <button 
                onClick={onRestart}
                className="px-8 py-3 bg-[#E0F7FA] text-[#006064] text-xl font-semibold rounded-full border border-[#B2EBF2] shadow-md hover:bg-[#CFEEF5] transition-colors duration-300"
            >
                Start Over
            </button>
        </div>
    );
}

export default ResultsPage