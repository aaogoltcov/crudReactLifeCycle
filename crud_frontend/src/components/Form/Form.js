import {Component} from "react";
import Note from "../../services/Note";
import Card from "../Card/Card";

export default class Form extends Component {
    constructor(props) {
        super(props);
        this.titleTemplate = "Название";
        this.textTemplate = "Какой-то текст...";
        this.state = {
            title: "",
            text: "",
            cards: [],
            toggle: true,
        }
        this.request = new Note();
    }

    componentDidMount() {
        this.stateUpdate(true);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevState.toggle !== this.state.toggle) { this.stateUpdate() };
    }

    stateUpdate(toggle=false) {
        const response = this.getData().then(response => { this.setState({cards: response}) });
        if (toggle) {
            response.then(() => { this.toggle() })
        }
    }

    toggle = () => {
        this.setState({toggle: !this.state.toggle});
    }

    getData() {
        return this.request.getNotes().then(response => response
            .map(card => ({
                key: card.id,
                title: card.title,
                text: card.text,
                func: this.deleteCard,
            }))
        );
    }

    renderListOfCards = () => {
        return this.state.cards.map(card => <Card
            key={card.key}
            title={card.title}
            text={card.text}
            func={this.deleteCard}
        />)
    }

    titleChangeHandler = e => this.setState({title: e.target.value});

    textChangeHandler = e => this.setState({text: e.target.value});

    buttonSubmitHandler = e => {
        if (this.state.title && this.state.text) {
            e.preventDefault();
            this.request.postNote(this.state.title, this.state.text).then(r => {
                if (r.status === 204) {
                    this.toggle();
                    this.clearForm();
                }
            });
        }
    };

    deleteCard = id => {
        this.request.deleteNote(id).then(r => {
            if (r.status === 204) {
                this.toggle();
            }
        })
    };

    clearForm() {
        this.setState({
            title: "",
            text: "",
        });
    }

    render() {
        return (
            <>
                <form className="crud">
                    <div className="form-group">
                        <label htmlFor="exampleFormControlInput1">Название</label>
                        <input type="text"
                               className="form-control"
                               id="exampleFormControlInput1"
                               placeholder={this.titleTemplate}
                               value={this.state.title}
                               onChange={this.titleChangeHandler}
                               required={true}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleFormControlTextarea1">Описание</label>
                        <textarea
                            className="form-control"
                            id="exampleFormControlTextarea1"
                            rows="3"
                            placeholder={this.textTemplate}
                            value={this.state.text}
                            onChange={this.textChangeHandler}
                            required={true}
                        />
                    </div>
                    <button
                        type="button"
                        className="btn btn-primary"
                        onClick={this.buttonSubmitHandler}
                    >Отправить
                    </button>
                </form>
                <div className="row crud-cards">
                    {this.renderListOfCards()}
                </div>
            </>
        );
    }
}
