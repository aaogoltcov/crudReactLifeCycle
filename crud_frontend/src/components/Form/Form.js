import {Component} from "react";
import Note from "../../services/Note";
import Card from "../Card/Card";

export default class Form extends Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.titleTemplate = "Название";
        this.textTemplate = "Какой-то текст...";
        this.state = {
            title: "",
            text: "",
            cards: [],
        }
        this.request = new Note();
    }

    componentDidMount() {
        this.renderListOfCards();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        this.renderListOfCards();
    }

    renderListOfCards() {
        this.request.getNotes().then(response => this.setState({
            cards: response.map(card => <Card
                key={card.id}
                title={card.title}
                text={card.text}
                func={this.deleteCard}
            />)
        }));
    }

    titleChangeHandler = e => this.setState({title: e.target.value});

    textChangeHandler = e => this.setState({text: e.target.value});

    buttonSubmitHandler = e => {
        if (this.state.title && this.state.text) {
            e.preventDefault();
            this.request.postNote(this.state.title, this.state.text).then(r => console.log("POST: ", r.status));
            this.clearForm();
        }
    };

    deleteCard = id => {
        this.request.deleteNote(id).then(r => console.log("DELETE: ", r.status))
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
                    {this.state.cards}
                </div>
            </>
        );
    }
}
