import { useContext } from 'react'
import { GlobalStoreContext } from '../store'
import { useHistory } from 'react-router-dom'
/*
    This toolbar is a functional React component that
    manages the undo/redo/close buttons.
    
    @author McKilla Gorilla
*/
function EditToolbar() {
    const { store } = useContext(GlobalStoreContext);
    const history = useHistory();

    let enabledButtonClass = "top5-button";
    function handleUndo() {
        store.undo();
    }
    function handleRedo() {
        store.redo();
    }
    function handleClose() {
        history.push("/");
        store.closeCurrentList();
    }
    function nothing(){
        //kinda works idk
    }
    let cantUndo = !store.hasUndo();
    let cantRedo = !store.hasRedo();

    let editStatus = false;
    if (store.isListNameEditActive || store.isItemEditActive) {
        editStatus = true;
        enabledButtonClass = "top5-button-disabled"
    }
    return (
        <div id="edit-toolbar">
            <div
                disabled={cantUndo || editStatus}
                id='undo-button'
                onClick={cantUndo || editStatus?nothing:handleUndo}
                className={cantUndo?"top5-button-disabled":enabledButtonClass}>
                &#x21B6;
            </div>
            <div
                disabled={cantRedo || editStatus}
                id='redo-button'
                onClick={cantRedo || editStatus?nothing:handleRedo}
                className={cantRedo?"top5-button-disabled":enabledButtonClass}>
                &#x21B7;
            </div>
            <div
                disabled={editStatus}
                id='close-button'
                onClick={editStatus?nothing:handleClose}
                className={enabledButtonClass}>
                &#x24E7;
            </div>
        </div>
    )
}

export default EditToolbar;