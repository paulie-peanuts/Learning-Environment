import React, { useEffect, useState } from 'react';

const QuizList = () => {
    const [quizList, setQuizList] = useState([]);

    const fetchQuizList = async () => {
        try {
            const response = await fetch('http://localhost:5152/api/quiz/questions');
            const data = await response.json();
            setQuizList(data);
        } catch (error) {
            console.error('Error fetching quiz list:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`http://localhost:5152/api/quiz/delete/${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                setQuizList(quizList.filter(question => question.id !== id));
            } else {
                console.error('Failed to delete the quiz.');
            }
        } catch (error) {
            console.error('Error deleting quiz:', error);
        }
    };

    useEffect(() => {
        fetchQuizList();
    }, []);

    return (
        <div>
            <h2>Saved Quizzes</h2>
            {quizList.length > 0 ? (
                <ul>
                    {quizList.map((question) => (
                        <li key={question.id}>
                            <p><strong>Original Sentence:</strong> {question.originalSentence}</p>
                            <p><strong>New Sentence:</strong> {question.newSentence}</p>
                            <button onClick={() => handleDelete(question.id)}>Delete</button>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No saved quizzes.</p>
            )}
        </div>
    );
};

export default QuizList;
