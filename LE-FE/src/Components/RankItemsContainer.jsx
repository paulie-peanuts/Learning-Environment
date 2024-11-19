import { useState, useEffect } from 'react';
import RankItems from './RankItems';

const RankItemsContainer = ({ dataType, imgArr }) => {
    const localStorageKeys = {
        1: "quizzes",
        2: "tests",
    };

    const localStorageKey = localStorageKeys[dataType] || "";
    const [items, setItems] = useState(() => {
        const savedData = localStorage.getItem(localStorageKey);
        return savedData ? JSON.parse(savedData) : [];
    });

    useEffect(() => {
        const savedData = localStorage.getItem(localStorageKey);
        setItems(savedData ? JSON.parse(savedData) : []);
    }, [dataType]);

    return (
        <RankItems
            items={items}
            setItems={setItems}
            dataType={dataType}
            imgArr={imgArr}
            localStorageKey={localStorageKey}
        />
    );
};

export default RankItemsContainer;
