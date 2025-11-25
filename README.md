
# 💡 Quiz Application: Knowledge Test

This repository contains the solution for the Front-End Development Assignment, implementing a pixel-perfect quiz application based on the provided Figma design. The application is built using modern React principles, styled with Tailwind CSS, and follows a multi-state flow covering question display, scoring calculation, and final results.

---

## 🚀 Live Demo

[https://quiz-app-lilac-theta.vercel.app/]

---

## 🛠️ Technical Stack Used

| Category   | Technology                          | Rationale                                                   |
|------------|--------------------------------------|-------------------------------------------------------------|
| Core       | **React** (Functional Components, Hooks) | Required                                                    |
| Styling    | **Tailwind CSS**     | Required for rapid, scalable styling and achieving pixel-perfection |
| Language   | **Modern ES6+ JavaScript**           | Required                                                    |
| Framework  | **Vite** (Development/Bundling)      | Fast setup and hot-reloading; used during development       |

---

## ✨ Key Features Implemented

The application successfully replicates the desired Figma design and functionality across the entire user journey:

### 🎨 Pixel-Perfect Design
- Accurate layout, spacing, typography, and custom teal/blue color palette
- Smooth edges, borders, gradients, and all design elements reproduced for **desktop view**

### 🔄 Complete Quiz Flow
- Three-stage app state: **Quiz → Calculating → Results**

### 🖱️ Interactive State Handling
- Answer buttons include hover styling & a highlighted selected state

### ↔️ Robust Navigation
- "Next" disabled until an answer is selected
- "Previous" button allows revisiting answers
- On the last question, "Submit" replaces "Next"

### 📊 Segmented Progress Bar
- Individual blocks for each question
- Highlights current and completed questions

### 🎉 Scoring Animation
- Final score animates from **0% → Final score** for a polished result screen

### 🐾 Decorative Elements
- "Best of Luck!" bubble & cat paw illustration displayed **only on question 1**
- Ensures fidelity to Figma design

---

## ⚙️ Setup Instructions

### **Prerequisites**
- Node.js (v18+) and npm installed

---

### **1. Clone the Repository**
```bash
git clone [Your GitHub Repository URL]
cd quiz-application
```

---

### **2. Install Dependencies**
```bash
npm install
```

---

### **3. Ensure Tailwind Configuration**
Make sure these files exist in the project root:
- `vite.config.js` containing:
  ```js
  import tailwindcss from "@tailwindcss/vite";
  export default defineConfig({
  plugins: [react(),tailwindcss()],})
  ```
- `src/index.css` containing:
```css
@import "tailwindcss";
```

---

### **4. Run the Application**
```bash
npm run dev
```
Your app will be available at:
```
http://localhost:5173
```

---

## 📝 Assumptions Made

### **1. Hardcoded Questions**
Questions and answers reside in `QuizApp.jsx` for simplicity (no backend/API was required).

### **2. Font Fallbacks**
Stylized heading fonts are approximated using safe fallback fonts:
- `Playfair Display, serif`

### **3. Decorative Assets Reliability**
The cat paw is embedded as Base64 to ensure it renders reliably everywhere.

---

## ⏱️ Time Spent on the Assignment

| Phase | Description | Time |
|-------|-------------|------|
| 1 | Setup & component structure | **0.5 hrs** |
| 2 | Core layout & logic | **2.0 hrs** |
| 3 | Pixel-perfect styling | **3 hrs** |
| 4 | Scoring logic & animation | **1.5 hrs** |
| 5 | Cleanup, debugging & README | **1.5 hrs** |
| **Total** | | **8.5 hours** |

---

Feel free to reach out for improvements, additional features, or portfolio enhancements! 🚀
