import { useEffect, useState } from 'react';
import RankingGrid from "./RankingGrid";
import ItemCollection from "./ItemCollection";

const RankItems = ({ items, setItems, dataType, imgArr, localStorageKey }) => {

    const [reload, setReload] = useState(false);

    function Reload() {
        setItems(null); // Trigger data reload by setting items to null
    }

    function drag(ev) { 
        ev.dataTransfer.setData("text", ev.target.id);
    }

    function allowDrop(ev) {
        ev.preventDefault();
    }

    function drop(ev) {
        ev.preventDefault();
        const targetElm = ev.target;
        if (targetElm.nodeName === "IMG" || targetElm.childNodes.length !== 0) return; // Early return if target is invalid

        const data = parseInt(ev.dataTransfer.getData("text").substring(5));
        const transformedCollection = items.map(item =>
            item.id === data
                ? { ...item, ranking: parseInt(targetElm.id.substring(5)) }
                : item
        );
        setItems(transformedCollection);
    }

    useEffect(() => {
        if (items == null) {
            getDataFromApi();
        }
    }, [items, dataType]); // Add items to dependency to refresh when set to null

    function getDataFromApi() {
        fetch(`item/${dataType}`)
            .then(results => results.json())
            .then(data => setItems(data))
            .catch(error => console.error("Error fetching data:", error)); // Error handling
    }

    useEffect(() => {
        if (items != null) {
            localStorage.setItem(localStorageKey, JSON.stringify(items));
        }
    }, [items, localStorageKey]); // Adding localStorageKey to dependency array for consistency

    return (
        items != null ?
            <main>
                <RankingGrid items={items} imgArr={imgArr} drag={drag} allowDrop={allowDrop} drop={drop} />
                <ItemCollection items={items} drag={drag} imgArr={imgArr} />
                <button onClick={Reload} className="reload" style={{ marginTop: "10px" }}>
                    <span className="text">Reload</span>
                </button>
            </main>
            : <main>Loading...</main>
    )
};

export default RankItems;
