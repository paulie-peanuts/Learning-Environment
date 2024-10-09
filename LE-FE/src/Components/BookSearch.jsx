import React, { useState } from 'react';
import axios from 'axios';

const BookSearch = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSearch = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const response = await axios.get('http://localhost:5152/api/openlibrary/search', {
                params: {
                    query: query,
                    fields: '*',
                    limit: 5,
                    page: 1
                }
            });
            setResults(response.data);
        } catch (err) {
            setError('Error fetching data from Open Library.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h2>Book Search</h2>
            <form onSubmit={handleSearch}>
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search for books..."
                    required
                />
                <button type="submit">Search</button>
            </form>

            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}

            {results.length > 0 && (
                <ul>
                    {results.map((book) => (
                        <li key={book.key}>
                            {book.cover_i && (
                                <img
                                    src={`https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`}
                                    alt={book.title}
                                    style={{ width: '50px', height: '75px' }}
                                />
                            )}
                            <strong>{book.title}</strong> by {book.author_name.join(', ')} (First published: {book.first_publish_year})
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default BookSearch;


/*import React, { useState } from 'react';
import axios from 'axios';

const BookSearch = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSearch = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const response = await axios.get('http://localhost:5152/api/openlibrary/search', {
                query: query,
                fields: '*',
                limit: 5,
                page: 1
            });
            setResults(response.data.docs);
        } catch (err) {
            setError('Error fetching data from Open Library.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h2>Book Search</h2>
            <form onSubmit={handleSearch}>
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search for books..."
                    required
                />
                <button type="submit">Search</button>
            </form>

            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}

            {results.length > 0 && (
                <ul>
                    {results.map((book) => (
                        <li key={book.key}>
                            {book.cover_i && (
                                <img
                                    src={`https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`}
                                    alt={book.title}
                                    style={{ width: '50px', height: '75px' }}
                                />
                            )}
                            <strong>{book.title}</strong> by {book.author_name.join(', ')} (First published: {book.first_publish_year})
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default BookSearch;*/
