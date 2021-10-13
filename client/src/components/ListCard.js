import { useContext, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { GlobalStoreContext } from '../store'
/*
    This is a card in our list of top 5 lists. It lets select
    a list for editing and it has controls for changing its 
    name or deleting it.
    
    @author McKilla Gorilla
*/
function ListCard(props) {
    const { store } = useContext(GlobalStoreContext);
    const [ editActive, setEditActive ] = useState(store.isListNameEditActive);
    const [ text, setText ] = useState("");
    store.history = useHistory();
    const { idNamePair, selected } = props;

    function handleLoadList(event) {
        if (!event.target.disabled) {
            let _id = event.target.id;
            if (_id.indexOf('list-card-text-') >= 0)
                _id = ("" + _id).substring("list-card-text-".length);

            // CHANGE THE CURRENT LIST
            store.setCurrentList(_id);
        }
        handleToggleEdit(event);
    }
    function handleDeleteList(event){
        event.stopPropagation();
        //MARK THE CURRENT LIST TODO
        store.showDeleteListModal();
    }
    function handleToggleEdit(event) {
        event.stopPropagation();
        toggleEdit();
    }

    function toggleEdit() {
        let newActive = !editActive;
        if (newActive) {
            store.setIsListNameEditActive();
        }
        setEditActive(newActive);
    }

    function handleKeyPress(event) {
        if (event.code === "Enter") {
            handleBlur(event);
        }
    }
    function handleBlur(event){
        let id = event.target.id.substring("list-".length);
        handleUpdateText(event);
        store.changeListName(id, text); //for some reason setting text here doesnt change the value of text on new lists ya gotta do whatya
        store.changeListName(id, event.target.value); //kept the last two lines so console doesn't scream at me
        toggleEdit();
    }
    function handleUpdateText(event) {
        setText(event.target.value);
    }
    let selectClass = "unselected-list-card";
    if (selected) {
        selectClass = "selected-list-card";
    }
    let cardStatus = false;
    if (store.isListNameEditActive) {
        cardStatus = true;
    }
    let cardElement =
        <div
            id={idNamePair._id}
            key={idNamePair._id}
            onClick={handleLoadList}
            className={'list-card ' + selectClass}>
            <span
                id={"list-card-text-" + idNamePair._id}
                key={"span-" + idNamePair._id}
                className="list-card-text">
                {idNamePair.name}
            </span>
            <input
                disabled={cardStatus}
                type="button"
                id={"delete-list-" + idNamePair._id}
                className="list-card-button"
                onClick={handleDeleteList}
                value={"\u2715"}
            />
            <input
                disabled={cardStatus}
                type="button"
                id={"edit-list-" + idNamePair._id}
                className="list-card-button"
                onClick={handleToggleEdit}
                value={"\u270E"}
            />
        </div>;

    if (editActive) {
        cardElement =
            <input
                autoFocus
                id={"list-" + idNamePair._id}
                className='list-card'
                type='text'
                onKeyPress={handleKeyPress}
                onBlur={handleBlur}
                onChange={handleUpdateText} //useless i think unless you add features
                defaultValue={idNamePair.name}
            />;
    }
    return (
        cardElement
    );
}

export default ListCard;