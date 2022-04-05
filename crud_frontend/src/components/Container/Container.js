import {Component} from "react";
import Form from "../Form/Form";
import Card from "../Card/Card";
import Note from "../../services/Note";

export default class Container extends Component{
    constructor(props) {
        super(props);
        this.state = {
            cards: [],
        }
        this.request = new Note();
    }

    componentDidMount() {
        this.stateUpdate();
    }

    stateUpdate() {
        this.getNotes().then(response => { this.setState({cards: response}) });
    }

    getNotes() {
        return this.request.getNotes().then(response => response
            .map(card => ({
                key: card.id,
                title: card.title,
                text: card.text,
                func: this.deleteNote,
            }))
        );
    }

    postNote(title, text) {
        this.request.postNote(title, text).then(r => {
            if (r.status === 204) {
                this.stateUpdate();
            }
        });
    }

    deleteNote(id) {
        this.request.deleteNote(id).then(r => {
            if (r.status === 204) {
                this.stateUpdate();
            }
        })
    }

    renderListOfCards() {
        return this.state.cards.map(card => <Card
            key={card.key}
            title={card.title}
            text={card.text}
            deleteNote={this.deleteNote.bind(this)}
        />)
    }

    render() {
        return (
            <>
                <Form postNote={this.postNote.bind(this)}/>
                <div className="row crud-cards">
                    {this.renderListOfCards()}
                </div>
            </>
        )
    }
}