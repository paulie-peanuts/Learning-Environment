import React, { useEffect, useState } from 'react';
import DeleteQuizModal from './DeleteQuizModal'; // Import the modal component

const QuizList = ({ onDelete }) => {
    const [quizList, setQuizList] = useState([]);
    const [showDeleteModal, setShowDeleteModal] = useState(false); // Modal visibility state
    const [selectedQuestion, setSelectedQuestion] = useState(null); // Track the selected question for deletion

    const fetchQuizList = async () => {
        try {
            const response = await fetch('http://localhost:5152/api/quiz/questions');
            const data = await response.json();
            setQuizList(data);
        } catch (error) {
            console.error('Error fetching quiz list:', error);
        }
    };

    const handleOpenDeleteModal = (question) => {
        setSelectedQuestion(question); // Set the question to be deleted
        setShowDeleteModal(true); // Show the modal
    };

    const handleDelete = async () => {
        if (selectedQuestion) {
            try {
                const response = await fetch(`http://localhost:5152/api/quiz/delete/${selectedQuestion.id}`, {
                    method: 'DELETE',
                });

                if (response.ok) {
                    setQuizList(quizList.filter(question => question.id !== selectedQuestion.id));
                    setShowDeleteModal(false); // Close the modal after deletion
                } else {
                    console.error('Failed to delete the quiz.');
                }
            } catch (error) {
                console.error('Error deleting quiz:', error);
            }
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
                            <button className="btn btn-danger" onClick={() => handleOpenDeleteModal(question)}>Delete</button>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No saved quizzes.</p>
            )}

            {/* Delete confirmation modal */}
            <DeleteQuizModal
                show={showDeleteModal}
                handleClose={() => setShowDeleteModal(false)}
                handleDelete={handleDelete}
            />
        </div>
    );
};

export default QuizList;


/*import React, { useEffect, useState } from 'react';

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
                            <button class="btn btn-danger" onClick={() => handleDelete(question.id)}>Delete</button>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No saved quizzes.</p>
            )}
        </div>
    );
};

export default QuizList;*/