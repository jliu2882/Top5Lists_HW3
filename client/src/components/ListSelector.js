import React, { useContext, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import ListCard from './ListCard.js'
import { GlobalStoreContext } from '../store'
import DeleteModal from './DeleteModal'
/*
    This React component lists all the top5 lists in the UI.
    
    @author McKilla Gorilla
*/
const ListSelector = () => {
    const { store } = useContext(GlobalStoreContext);
    store.history = useHistory();

    useEffect(() => {
        store.loadIdNamePairs();
    }, []); //TODO get console to stop screaming at me without breaking the code

    function sortKeyNamePairsByName(keyNamePairs){
        keyNamePairs.sort((keyPair1, keyPair2) => {
            // GET THE LISTS
            return keyPair1.name.localeCompare(keyPair2.name);
        });
    }
    function addNewList(){
        let payload = {"name": "Untitled "+store.newListCounter, "items": ["?", "?", "?", "?", "?"] };
        store.addNewList(payload);
    }
    let listCard = "";
    if (store) {
        sortKeyNamePairsByName(store.idNamePairs);
        listCard = store.idNamePairs.map((pair) => (
            <ListCard
                key={pair._id}
                idNamePair={pair}
                selected={false}
            />
        ))
    }
    return (
        <div id="top5-list-selector">
            <div id="list-selector-heading">
                <input
                    type="button"
                    id="add-list-button"
                    onClick={addNewList}
                    disabled={store.isListNameEditActive || store.listMarkedForDeletion!==null}
                    className={store.isListNameEditActive || store.listMarkedForDeletion!==null?"top5-button-disabled":"top5-button"}
                    value="+" />
                Your Lists
            </div>
            <div id="list-selector-list">
                {
                    listCard
                }
                <DeleteModal />
            </div>
        </div>)
}

export default ListSelector;