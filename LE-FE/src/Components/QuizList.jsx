// src/components/QuizList.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const QuizList = () => {
  const [quizzes, setQuizzes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const response = await fetch('http://localhost:5152/api/quiz/all-quizzes');
        const data = await response.json();
        setQuizzes(data);
      } catch (error) {
        console.error('Error fetching quizzes:', error);
      }
    };

    fetchQuizzes();
  }, []);

  const handleTakeQuiz = (quizId) => {
    navigate(`/take-quiz/${quizId}`);
  };

  return (
    <div className="quiz-list">
      <h2>Available Quizzes</h2>
      {quizzes.length > 0 ? (
        quizzes.map((quiz) => (
          <div key={quiz.id} className="quiz-item">
            <h3>{quiz.title}</h3>
            <p>{quiz.description}</p>
            <button onClick={() => handleTakeQuiz(quiz.id)}>Take Quiz</button>
          </div>
        ))
      ) : (
        <p>No quizzes available.</p>
      )}
    </div>
  );
};

export default QuizList;
