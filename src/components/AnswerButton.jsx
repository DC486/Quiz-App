import React from "react";

/**
 * AnswerButton
 * - text: label shown inside the button
 * - onClick: callback when clicked
 * - isSelected: visual/semantic selected state
 *
 * Visuals:
 * - Unselected: white background, subtle border, hover color change
 * - Selected: left-to-right gradient, stronger border and drop shadow
 *
 * Accessibility:
 * - type="button" to avoid accidental form submits
 * - aria-pressed indicates toggle/selection semantics
 */
function AnswerButton({ text, onClick, isSelected }) {
  // Colors used for selected and default states
  const DEFAULT_BORDER = "#E0E7EB";
  const HOVER_BG = "#F0F5F8";
  const HOVER_BORDER = "#BCC4CA";

  // Gradient and selected colors (applied via inline style)
  const SELECTED_GRADIENT = "linear-gradient(90deg, #E0F7FA 0%, #F0F5F8 100%)";
  const SELECTED_TEXT = "#263238";
  const SELECTED_BORDER = "#B2EBF2";

  // Base Tailwind classes shared by both states
  const baseClasses =
    "w-full py-4 px-6 rounded-xl text-lg text-left cursor-pointer transition-all duration-200 ease-in-out border font-medium";

  // Build className and style depending on selection
  const className = isSelected
    ? `${baseClasses} border` // visual specifics come from inline style for exact colors
    : `${baseClasses} bg-white text-[#475569] border-[1px] border-[${DEFAULT_BORDER}] hover:bg-[${HOVER_BG}] hover:border-[${HOVER_BORDER}]`;

  // Inline style for selected state (gradient + border color + subtle shadow)
  const selectedStyle = {
    background: SELECTED_GRADIENT,
    color: SELECTED_TEXT,
    borderColor: SELECTED_BORDER,
    boxShadow: "0 10px 20px rgba(16,24,40,0.08)",
  };

  return (
    <button
      type="button"
      className={className}
      onClick={onClick}
      aria-pressed={isSelected}
      style={isSelected ? selectedStyle : undefined}
    >
      {text}
    </button>
  );
}

export default AnswerButton;
