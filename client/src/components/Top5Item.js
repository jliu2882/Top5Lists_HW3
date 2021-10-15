import { React, useContext, useState } from "react";
import { GlobalStoreContext } from '../store'
/*
    This React component represents a single item in our
    Top 5 List, which can be edited or moved around.
    
    @author McKilla Gorilla
*/
function Top5Item(props) {
    const { store } = useContext(GlobalStoreContext);
    const [draggedTo, setDraggedTo] = useState(0);
    const [ editActive, setEditActive ] = useState(store.isItemEditActive);

    function handleDragStart(event) {
        event.dataTransfer.setData("item", event.target.id);
    }

    function handleDragOver(event) {
        event.preventDefault();
    }

    function handleDragEnter(event) {
        event.preventDefault();
        setDraggedTo(true);
    }

    function handleDragLeave(event) {
        event.preventDefault();
        setDraggedTo(false);
    }

    function handleDrop(event) {
        event.preventDefault();
        let target = event.target;
        let targetId = target.id;
        targetId = targetId.substring(target.id.indexOf("-") + 1);
        let sourceId = event.dataTransfer.getData("item");
        sourceId = sourceId.substring(sourceId.indexOf("-") + 1);
        setDraggedTo(false);

        // UPDATE THE LIST
        store.addMoveItemTransaction(sourceId, targetId);
    }

    function handleToggleEdit(event) {
        event.stopPropagation();
        toggleEdit();
    }
    function toggleEdit() {
        let newActive = !editActive;
        if (newActive) {
            store.setIsItemNameEditActive();
        }
        setEditActive(newActive);
    }
    function handleKeyPress(event) {
        if (event.code === "Enter") {
            handleBlur(event);
        }
    }
    function handleBlur(event){
        let id = ("" + event.target.id).substring('item-'.length);
        store.addChangeItemTransaction(id, props.text, event.target.value);
        toggleEdit();
    }


    let { index } = props;
    let itemClass = "top5-item";
    if (draggedTo) {
        itemClass = "top5-item-dragged-to";
    }
    let cardStatus = false;
    if (store.isItemEditActive) {
        cardStatus = true;
    }

    let itemElement =
        <div
            disabled={cardStatus}
            id={'item-' + (index + 1)}
            className={itemClass}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            draggable="true"
            >
            <input
                disabled={cardStatus}
                type="button"
                id={"edit-item-" + index + 1}
                className={cardStatus?"list-card-button-disabled":"list-card-button"}
                onClick={handleToggleEdit}
                value={"\u270E"}
            />
            {props.text}
        </div>;
    if(editActive){
        itemElement = 
        <input
            autoFocus
            id={'item-' + (index + 1)}
            className={itemClass}
            type='text'
            onKeyPress={handleKeyPress}
            onBlur={handleBlur}
            defaultValue={props.text}
        />;
    }

    return (
        itemElement
    );
}

export default Top5Item;