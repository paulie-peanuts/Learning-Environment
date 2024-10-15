import React, { useState } from 'react';
import QuizList from './QuizList';
import DeleteQuizModal from './DeleteQuizModal'; // Import the modal
import './QuizApp.css'; // Import the CSS file

const QuizApp = () => {
  const [sentence, setSentence] = useState('');
  const [quizData, setQuizData] = useState(null);
  const [selectedOption, setSelectedOption] = useState('');
  const [result, setResult] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [questionToDelete, setQuestionToDelete] = useState(null); // Track the question to delete

  // Modify saveQuizData to accept the quizData as an argument
  const saveQuizData = async (quizDataToSave) => {
    const dataToSave = {
      OriginalSentence: quizDataToSave.originalSentence,
      NewSentence: quizDataToSave.newSentence,
      CorrectWord: quizDataToSave.correctWord,
      Options: quizDataToSave.options
    };

    try {
      const response = await fetch('http://localhost:5152/api/quiz/save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSave),
      });

      const result = await response.json();
      console.log(result.Message);  // Should print "Quiz saved successfully."
    } catch (error) {
      console.error('Error saving quiz data:', error);
    }
  };

  const handleSentenceSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5152/api/synonym/quiz', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ sentence }),
      });
      const data = await response.json();
      console.log(data);
      setQuizData(data);  // Update the state with the quiz data
      saveQuizData(data);  // Pass the received data directly to saveQuizData
      setSelectedOption('');
      setResult(null);
    } catch (error) {
      console.error('Error fetching the quiz:', error);
    }
  };

  const handleSubmitAnswer = async (e) => {
    e.preventDefault();

    if (!quizData || !quizData.correctWord) {
      console.error('Correct word is missing.');
      return;
    }

    try {
      const response = await fetch('http://localhost:5152/api/synonym/check-answer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userAnswer: selectedOption,
          correctWord: quizData.correctWord
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      setResult(result.isCorrect ? "Correct!" : "Incorrect!");
    } catch (error) {
      console.error('Error checking answer:', error);
      setResult('Error submitting answer. Please try again.');
    }
  };

  // Trigger modal
  const handleOpenDeleteModal = (question) => {
    setQuestionToDelete(question);
    setShowDeleteModal(true);
  };

  const handleDeleteQuestion = () => {
    // Logic to delete the question
    console.log(`Deleted question: ${questionToDelete}`);
    setShowDeleteModal(false);
  };

  return (
    <div className="quiz-container">
      <h1>Synonym Quiz</h1>
      {!quizData ? (
        <form onSubmit={handleSentenceSubmit}>
          <input
            type="text"
            value={sentence}
            onChange={(e) => setSentence(e.target.value)}
            placeholder="Enter a sentence"
          />
          <button type="submit">Generate Quiz</button>
        </form>
      ) : (
        <div>
          <p><strong>Modified Sentence:</strong> {quizData.newSentence}</p>
          <form onSubmit={handleSubmitAnswer}>
            {quizData.options.map((option, index) => (
              <div key={index}>
                <label>
                  <input
                    type="radio"
                    value={option}
                    checked={selectedOption === option}
                    onChange={(e) => setSelectedOption(e.target.value)}
                  />
                  {option}
                </label>
              </div>
            ))}
            <button type="submit">Submit Answer</button>
          </form>
          <QuizList onDelete={handleOpenDeleteModal} /> {/* Pass onDelete prop */}
        </div>
      )}

      {result && <p>{result}</p>}

      {/* Delete confirmation modal */}
      <DeleteQuizModal
        show={showDeleteModal}
        handleClose={() => setShowDeleteModal(false)}
        handleDelete={handleDeleteQuestion}
      />
    </div>
  );
};

export default QuizApp;


/*import React, { useState } from 'react';
import QuizList from './QuizList';
import './QuizApp.css'; // Import the CSS file

const QuizApp = () => {
    const [sentence, setSentence] = useState('');
    const [quizData, setQuizData] = useState(null);
    const [selectedOption, setSelectedOption] = useState('');
    const [result, setResult] = useState(null);

    // Modify saveQuizData to accept the quizData as an argument
    const saveQuizData = async (quizDataToSave) => {
        const dataToSave = {
            OriginalSentence: quizDataToSave.originalSentence,
            NewSentence: quizDataToSave.newSentence,
            CorrectWord: quizDataToSave.correctWord,
            Options: quizDataToSave.options
        };
    
        try {
            const response = await fetch('http://localhost:5152/api/quiz/save', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dataToSave),
            });
    
            const result = await response.json();
            console.log(result.Message);  // Should print "Quiz saved successfully."
        } catch (error) {
            console.error('Error saving quiz data:', error);
        }
    };
    

    const handleSentenceSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5152/api/synonym/quiz', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ sentence }),
            });
            const data = await response.json();
            console.log(data);
            setQuizData(data);  // Update the state with the quiz data
            saveQuizData(data);  // Pass the received data directly to saveQuizData
            setSelectedOption('');
            setResult(null);
        } catch (error) {
            console.error('Error fetching the quiz:', error);
        }
    };

    const handleSubmitAnswer = async (e) => {
        e.preventDefault();
    
        if (!quizData || !quizData.correctWord) {
            console.error('Correct word is missing.');
            return;
        }
    
        try {
            const response = await fetch('http://localhost:5152/api/synonym/check-answer', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userAnswer: selectedOption,
                    correctWord: quizData.correctWord
                }),
            });
    
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
    
            const result = await response.json();
            setResult(result.isCorrect ? "Correct!" : "Incorrect!");
        } catch (error) {
            console.error('Error checking answer:', error);
            setResult('Error submitting answer. Please try again.');
        }
    };
    
    return (
        <div className="quiz-container">
            <h1>Synonym Quiz</h1>
            {!quizData ? (
                <form onSubmit={handleSentenceSubmit}>
                    <input
                        type="text"
                        value={sentence}
                        onChange={(e) => setSentence(e.target.value)}
                        placeholder="Enter a sentence"
                    />
                    <button type="submit">Generate Quiz</button>
                </form>
            ) : (
                <div>
                    <p><strong>Modified Sentence:</strong> {quizData.newSentence}</p>
                    <form onSubmit={handleSubmitAnswer}>
                        {quizData.options.map((option, index) => (
                            <div key={index}>
                                <label>
                                    <input
                                        type="radio"
                                        value={option}
                                        checked={selectedOption === option}
                                        onChange={(e) => setSelectedOption(e.target.value)}
                                    />
                                    {option}
                                </label>
                            </div>
                        ))}
                        <button type="submit">Submit Answer</button>
                    </form>
                    <QuizList />
                </div>
            )}

            {result && <p>{result}</p>}
        </div>
    );
};

export default QuizApp;*/


/*import React, { useState } from 'react';

const QuizApp = () => {
    const [sentence, setSentence] = useState('');
    const [quizData, setQuizData] = useState(null);
    const [selectedOption, setSelectedOption] = useState('');
    const [result, setResult] = useState(null);

    const saveQuizData = async () => {
        const dataToSave = {
            OriginalSentence: quizData.originalSentence,
            NewSentence: quizData.newSentence,
            CorrectWord: quizData.correctWord,
            Options: quizData.options
        };
    
        try {
            const response = await fetch('http://localhost:5152/api/quiz/save', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dataToSave),
            });
    
            const result = await response.json();
            console.log(result.Message);  // Should print "Quiz saved successfully."
        } catch (error) {
            console.error('Error saving quiz data:', error);
        }
    };
    

    const handleSentenceSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5152/api/synonym/quiz', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ sentence }),
            });
            const data = await response.json();
            console.log(data);
            setQuizData(data);
            saveQuizData(data);
            setSelectedOption('');
            setResult(null);
        } catch (error) {
            console.error('Error fetching the quiz:', error);
        }
    };

    const handleSubmitAnswer = async (e) => {
        e.preventDefault();
    
        // Ensure quizData and correctWord are properly accessed
        if (!quizData || !quizData.correctWord) {
            console.error('Correct word is missing.');
            return;
        }
    
        try {
            const response = await fetch('http://localhost:5152/api/synonym/check-answer', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userAnswer: selectedOption,
                    correctWord: quizData.correctWord // Send the correctWord from quizData
                }),
            });
    
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
    
            const result = await response.json();
            setResult(result.isCorrect ? "Correct!" : "Incorrect!");
        } catch (error) {
            console.error('Error checking answer:', error);
            setResult('Error submitting answer. Please try again.');
        }
    };
    
    return (
        <div>
            <h1>Synonym Quiz</h1>
            {!quizData ? (
                <form onSubmit={handleSentenceSubmit}>
                    <input
                        type="text"
                        value={sentence}
                        onChange={(e) => setSentence(e.target.value)}
                        placeholder="Enter a sentence"
                    />
                    <button type="submit">Generate Quiz</button>
                </form>
            ) : (
                <div>
                    <p><strong>Modified Sentence:</strong> {quizData.NewSentence}</p>
                    <form onSubmit={handleSubmitAnswer}>
                        {quizData.options.map((option, index) => (
                            <div key={index}>
                                <label>
                                    <input
                                        type="radio"
                                        value={option}
                                        checked={selectedOption === option}
                                        onChange={(e) => setSelectedOption(e.target.value)}
                                    />
                                    {option}
                                </label>
                            </div>
                        ))}
                        <button type="submit">Submit Answer</button>
                    </form>
                </div>
            )}

            {result && <p>{result}</p>}
        </div>
    );
};

export default QuizApp;*/
