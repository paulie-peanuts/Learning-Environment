// src/components/QuizResult.jsx
// src/components/QuizResult.jsx
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const QuizResult = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Access the result data from location.state
  const result = location.state?.result;

  // Log the result object to check its structure
  console.log('Quiz Result Data:', result);

  // Handle the case where result is missing or undefined
  if (!result) {
    return <p>No result data available.</p>;
  }

  // Use default values or destructure the result object based on the actual property names
  const {
    correctAnswers = 0,  // Default to 0 if undefined
    totalQuestions = 0,  // Default to 0 if undefined
    score = null,        // Score might be null or undefined, handle it accordingly
  } = result;

  return (
    <div className="quiz-result">
      <h2>Quiz Completed!</h2>
      <p>You answered {correctAnswers} out of {totalQuestions} questions correctly.</p>
      {/* Display score if available, else show 'N/A' */}
      <p>Your Score: {score !== null ? `${score.toFixed(2)}%` : 'N/A'}</p>
      <button onClick={() => navigate('/quiz-list')}>Back to Quizzes</button>
    </div>
  );
};

export default QuizResult;

/*import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const QuizResult = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const result = location.state?.result;
  console.log(result);
  if (!result) {
    return <p>No result data available.</p>;
  }

  const { CorrectAnswers, TotalQuestions, Score } = result;

  return (
    <div className="quiz-result">
      <h2>Quiz Completed!</h2>
      <p>You answered {CorrectAnswers} out of {TotalQuestions} questions correctly.</p>
      <p>Your Score: {Score.toFixed(2)}%</p>
      <button onClick={() => navigate('/quiz-list')}>Back to Quizzes</button>
    </div>
  );
};

export default QuizResult;*/
