// src/components/QuizTaker.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const QuizTaker = () => {
  const { quizId } = useParams();
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState(null);
  const [userAnswers, setUserAnswers] = useState({}); // Removed questionsAnswered

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const response = await fetch(`http://localhost:5152/api/quiz/${quizId}`);
        const data = await response.json();
        setQuiz(data);
      } catch (error) {
        console.error('Error fetching quiz:', error);
      }
    };

    fetchQuiz();
  }, [quizId]);

  const handleOptionChange = (questionId, selectedOption) => {
    setUserAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: selectedOption,
    }));
  };

  const handleSubmitQuiz = async () => {
    console.log('handleSubmitQuiz called');

    const answers = Object.keys(userAnswers).map((questionId) => ({
      QuestionId: parseInt(questionId),
      SelectedOption: userAnswers[questionId],
    }));

    const quizAnswerData = {
      QuizId: parseInt(quizId),
      Answers: answers,
    };

    try {
      const response = await fetch('http://localhost:5152/api/quiz/submit-answers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(quizAnswerData),
      });

      const result = await response.json();

      if (response.ok) {
        navigate('/quiz-result', { state: { result } });
      } else {
        alert(`Error: ${result.Message || 'Could not submit quiz.'}`);
      }
    } catch (error) {
      console.error('Error submitting quiz:', error);
      alert('An error occurred while submitting the quiz.');
    }
  };

  if (!quiz) {
    return <p>Loading quiz...</p>;
  }

  const totalQuestions = quiz.quizQuestions.length;
  const questionsAnswered = Object.keys(userAnswers).length; // Compute dynamically
  const progress = (questionsAnswered / totalQuestions) * 100;

  return (
    <div className="quiz-taker">
      <h2>{quiz.title}</h2>
      <p>{quiz.description}</p>

      {/* Progress Bar */}
      <div className="progress-bar-container">
        <progress value={questionsAnswered} max={totalQuestions}></progress>
        <p>{Math.round(progress)}% completed</p>
      </div>

      {quiz.quizQuestions.map((question) => {
        const options = question.options.split(',');

        return (
          <div key={question.id} className="quiz-question">
            <p><strong>{question.newSentence}</strong></p>
            {options.map((option, index) => (
              <label key={index}>
                <input
                  type="radio"
                  name={`question-${question.id}`}
                  value={option}
                  checked={userAnswers[question.id] === option}
                  onChange={() => handleOptionChange(question.id, option)}
                />
                {option}
              </label>
            ))}
          </div>
        );
      })}
      <button type="button" onClick={handleSubmitQuiz}>Submit Quiz</button>
    </div>
  );
};

export default QuizTaker;




/*import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const QuizTaker = () => {
  const { quizId } = useParams();
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState(null);
  const [userAnswers, setUserAnswers] = useState({});

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const response = await fetch(`http://localhost:5152/api/quiz/${quizId}`);
        const data = await response.json();
        setQuiz(data);
      } catch (error) {
        console.error('Error fetching quiz:', error);
      }
    };

    fetchQuiz();
  }, [quizId]);

  const handleOptionChange = (questionId, selectedOption) => {
    setUserAnswers({
      ...userAnswers,
      [questionId]: selectedOption,
    });
  };

  const handleSubmitQuiz = async () => {
    const answers = Object.keys(userAnswers).map((questionId) => ({
      QuestionId: parseInt(questionId),
      SelectedOption: userAnswers[questionId],
    }));

    const quizAnswerData = {
      QuizId: parseInt(quizId),
      Answers: answers,
    };

    try {
      const response = await fetch('http://localhost:5152/api/quiz/submit-answers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(quizAnswerData),
      });

      const result = await response.json();

      if (response.ok) {
        navigate('/quiz-result', { result });
      } else {
        alert(`Error: ${result.Message || 'Could not submit quiz.'}`);
      }
    } catch (error) {
      console.error('Error submitting quiz:', error);
      alert('An error occurred while submitting the quiz.');
    }
  };

  if (!quiz) {
    return <p>Loading quiz...</p>;
  }

  return (
    <div className="quiz-taker">
      <h2>{quiz.title}</h2>
      <p>{quiz.description}</p>
      <form onSubmit={(e) => e.preventDefault()}>
        {quiz.quizQuestions.map((question) => {
          const options = question.options.split(',');

          return (
            <div key={question.id} className="quiz-question">
              <p><strong>{question.newSentence}</strong></p>
              {options.map((option, index) => (
                <label key={index}>
                  <input
                    type="radio"
                    name={`question-${question.id}`}
                    value={option}
                    checked={userAnswers[question.id] === option}
                    onChange={() => handleOptionChange(question.id, option)}
                  />
                  {option}
                </label>
              ))}
            </div>
          );
        })}
        <button type="button" onClick={handleSubmitQuiz}>Submit Quiz</button>
      </form>
    </div>
  );
};

export default QuizTaker;*/
