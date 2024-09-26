import React, { useState } from 'react';

const QuizApp = () => {
    const [sentence, setSentence] = useState('');
    const [quizData, setQuizData] = useState(null);
    const [selectedOption, setSelectedOption] = useState('');
    const [result, setResult] = useState(null);

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
            setSelectedOption('');
            setResult(null);
        } catch (error) {
            console.error('Error fetching the quiz:', error);
        }
    };

    /*const handleSubmitAnswer = async (e) => {
        e.preventDefault();
        if (!selectedOption) {
            alert('Please select an option.');
            return;
        }

        try {
            const response = await fetch('http://localhost:5152/api/synonym/check-answer', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userAnswer: selectedOption, correctWord: quizData.CorrectWord }),
            });
            const resultData = await response.json();
            setResult(resultData.Result);
        } catch (error) {
            console.error('Error checking answer:', error);
        }
    };*/
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

export default QuizApp;
