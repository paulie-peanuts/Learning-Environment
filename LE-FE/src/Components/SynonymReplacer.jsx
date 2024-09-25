import React, { useState } from 'react';

const SynonymReplacer = () => {
    const [sentence, setSentence] = useState('');
    const [newSentence, setNewSentence] = useState('');
    const [loading, setLoading] = useState(false);

    const handleInputChange = (e) => {
        setSentence(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await fetch('http://localhost:5152/api/synonym/replace', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ sentence }),
            });

            const data = await response.json();
            setNewSentence(data.newSentence);
        } catch (error) {
            console.error('Error fetching the API:', error);
        }

        setLoading(false);
    };

    return (
        <div style={{ padding: '20px' }}>
            <h1>Synonym Replacer</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <input
                        type="text"
                        value={sentence}
                        onChange={handleInputChange}
                        placeholder="Enter your sentence"
                        style={{ width: '300px', padding: '10px' }}
                    />
                </div>
                <div>
                    <button type="submit" style={{ marginTop: '10px', padding: '10px' }}>
                        {loading ? 'Replacing...' : 'Replace Word'}
                    </button>
                </div>
            </form>

            {newSentence && (
                <div style={{ marginTop: '20px' }}>
                    <h3>Original Sentence:</h3>
                    <p>{sentence}</p>
                    <h3>New Sentence:</h3>
                    <p>{newSentence}</p>
                </div>
            )}
        </div>
    );
};

export default SynonymReplacer;
