// src/components/QuizCreator.jsx
import React, { useState } from 'react';

const QuizCreator = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState({
    originalSentence: '',
    newSentence: '',
    correctWord: '',
    options: ['', '', '', ''], // Assuming 4 options per question
  });

  // Function to handle adding a question
  const addQuestion = () => {
    // Validate the current question
    if (
      !currentQuestion.originalSentence ||
      !currentQuestion.newSentence ||
      !currentQuestion.correctWord ||
      currentQuestion.options.some((opt) => !opt)
    ) {
      alert('Please fill out all question fields and options.');
      return;
    }

    setQuestions([...questions, currentQuestion]);
    // Reset current question
    setCurrentQuestion({
      originalSentence: '',
      newSentence: '',
      correctWord: '',
      options: ['', '', '', ''],
    });
  };

  // Function to save the quiz
  const saveQuiz = async () => {
    if (!title || !description || questions.length === 0) {
      alert('Please complete the quiz title, description, and add at least one question.');
      return;
    }

    const fullQuizData = {
      title,
      description,
      questions: questions.map((q) => ({
        originalSentence: q.originalSentence,
        newSentence: q.newSentence,
        correctWord: q.correctWord,
        options: q.options.join(','), // Convert options array to comma-separated string
      })),
    };

    try {
      const response = await fetch('http://localhost:5152/api/quiz/create-full-quiz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(fullQuizData),
      });

      const result = await response.json();

      if (response.ok) {
        alert(result.Message);
        // Reset the form
        setTitle('');
        setDescription('');
        setQuestions([]);
      } else {
        alert(`Error: ${result.Message || 'Could not save quiz.'}`);
      }
    } catch (error) {
      console.error('Error saving quiz:', error);
      alert('An error occurred while saving the quiz.');
    }
  };

  // Handle changes in the current question fields
  const handleQuestionChange = (e) => {
    const { name, value } = e.target;
    setCurrentQuestion({ ...currentQuestion, [name]: value });
  };

  // Handle changes in options
  const handleOptionChange = (index, value) => {
    const newOptions = [...currentQuestion.options];
    newOptions[index] = value;
    setCurrentQuestion({ ...currentQuestion, options: newOptions });
  };

  return (
    <div className="quiz-creator">
      <h2>Create a New Quiz</h2>
      <div>
        <label>
          Quiz Title:
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
        <label>
          Quiz Description:
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </label>
      </div>

      <h3>Add Questions</h3>
      <div className="question-form">
        <label>
          Original Sentence:
          <input
            type="text"
            name="originalSentence"
            value={currentQuestion.originalSentence}
            onChange={handleQuestionChange}
          />
        </label>
        <label>
          New Sentence:
          <input
            type="text"
            name="newSentence"
            value={currentQuestion.newSentence}
            onChange={handleQuestionChange}
          />
        </label>
        <label>
          Correct Word:
          <input
            type="text"
            name="correctWord"
            value={currentQuestion.correctWord}
            onChange={handleQuestionChange}
          />
        </label>
        <div className="options">
          <p>Options:</p>
          {currentQuestion.options.map((option, index) => (
            <input
              key={index}
              type="text"
              value={option}
              onChange={(e) => handleOptionChange(index, e.target.value)}
              placeholder={`Option ${index + 1}`}
            />
          ))}
        </div>
        <button type="button" onClick={addQuestion}>
          Add Question
        </button>
      </div>

      <h3>Questions Added:</h3>
      {questions.length > 0 ? (
        <ul>
          {questions.map((q, index) => (
            <li key={index}>
              <strong>Question {index + 1}:</strong> {q.newSentence}
            </li>
          ))}
        </ul>
      ) : (
        <p>No questions added yet.</p>
      )}

      <button type="button" onClick={saveQuiz}>
        Save Quiz
      </button>
    </div>
  );
};

export default QuizCreator;
