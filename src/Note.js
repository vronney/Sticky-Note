import React from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faSave } from '@fortawesome/free-solid-svg-icons';


library.add(faEdit)
library.add(faTrash)
library.add(faSave)

class Note extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            editing: false
        }
        this.edit = this.edit.bind(this);
        this.remove = this.remove.bind(this);
        this.renderForm = this.renderForm.bind(this);
        this.renderDisplay = this.renderDisplay.bind(this);
        this.save = this.save.bind(this);
    }

    componentWillMount() {
        this.style = {
            right: this.randomBetween(0, window.innerWidth - 150, 'px'),
            top: this.randomBetween(0, window.innerHeight -150, 'px'),
            transform: `rotate(${this.randomBetween(-25, 25, 'deg')})`
        }
    }

    randomBetween(x, y, s) {
        return x + Math.ceil(Math.random() * (y-x)) + s
    }

    componentDidUpdate() {
        var textArea
        if(this.state.editing) {
            textArea = this._newText
            textArea.focus()
            textArea.select()
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        return (
            this.props.children !== nextProps.children || this.state !== nextState
        )
    }

    edit() {
        this.setState({
            editing: true
        })
    }

    remove() {
        this.props.onRemove(this.props.index);
    }

    save(e) {
        e.preventDefault();
        this.props.onChange(this._newText.value, this.props.index)
        this.setState({
            editing: false
        })
    }

    renderForm() {
        return (
            <div className="note" style={this.style}>
                <form onSubmit={this.save}>
                    <textarea ref={input => this._newText = input}
                        defaultValue={this.props.children} />
                    <button id="save"><FontAwesomeIcon icon="save"/></button>
                </form>
            </div>
        )
    }

    renderDisplay() {
        return (
            <div className="note" style={this.style}>
                <p>{this.props.children}</p>
                <span>
                    <button onClick={this.edit} id="edit"><FontAwesomeIcon icon="edit" /></button>
                    <button onClick={this.remove} id="remove"><FontAwesomeIcon icon="trash" /></button>
                </span>
            </div>
        )
    }

    render() {
        return this.state.editing ? this.renderForm() : this.renderDisplay();
        /*
        if (this.state.editing) {
            return this.renderForm();
        } else {
            return this.renderDisplay();
        }*/
    }
}

export default Note;

