// src/components/QuizResult.jsx
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const QuizResult = () => {
  const location = useLocation();
  const naviagte = useNavigate();
  const result = location.state?.result;

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

export default QuizResult;
