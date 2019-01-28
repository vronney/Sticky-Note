import React from 'react';
import Note from './Note';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

library.add(faPlus)

class Board extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            notes: []
        }
        this.eachNote = this.eachNote.bind(this);
        this.update = this.update.bind(this);
        this.remove = this.remove.bind(this);
        this.add = this.add.bind(this);
        this.nextId = this.nextId.bind(this);
    }

    add(text) {
        this.setState(prevState => ({
            notes: [
                ...prevState.notes,
                {
                    id: this.nextId(),
                    note: text
                }
            ]
        }))
    }

    nextId() {
        this.uniqueId = this.uniqueId || 0;
        return this.uniqueId++;
    }

    update(newText, i) {
        console.log('updating item at index', i, newText);
        this.setState(prevState => ({
            notes: prevState.notes.map(
                note => (note.id !== i) ? note : {...note, note: newText}
            )
        }))
    }

    remove(id) {
        console.log('Removing item at', id);
        this.setState(prevState => ({
            notes: prevState.notes.filter(note => note.id !== id)
        }))
    }

    eachNote(note, i) {
        return (
            <Note key={i} index={i} onChange={this.update} onRemove={this.remove}>{note.note}</Note>
        )
    }

    render() {
        return(
            <div className="board">
                {this.state.notes.map(this.eachNote)}
                <button onClick={this.add.bind(null, "New Note")} id="add"><FontAwesomeIcon icon="plus"/></button>
            </div>
        )
    }
}

export default Board;