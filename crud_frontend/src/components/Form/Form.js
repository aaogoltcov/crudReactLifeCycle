import {Component} from "react";
import Note from "../../services/Note";

export default class Form extends Component {
    constructor(props) {
        super(props);
        this.titleTemplate = "Название";
        this.textTemplate = "Какой-то текст...";
        this.state = {
            title: "",
            text: "",
            toggle: true,
        }
        this.request = new Note();
    }

    titleChangeHandler(event) {
        this.setState({title: event.target.value})
    };

    textChangeHandler(event) {
        this.setState({text: event.target.value})
    };

    buttonSubmitHandler(event) {
        event.preventDefault();
        if (this.state.title && this.state.text) {
            this.props.postNote(this.state.title, this.state.text);
            this.clearForm();
        }
    };

    clearForm() {
        this.setState({
            title: "",
            text: "",
        });
    }

    render() {
        return (
            <form className="crud">
                <div className="form-group">
                    <label htmlFor="exampleFormControlInput1">Название</label>
                    <input type="text"
                           className="form-control"
                           id="exampleFormControlInput1"
                           placeholder={this.titleTemplate}
                           value={this.state.title}
                           onChange={this.titleChangeHandler.bind(this)}
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
                        onChange={this.textChangeHandler.bind(this)}
                        required={true}
                    />
                </div>
                <button
                    type="button"
                    className="btn btn-primary"
                    onClick={this.buttonSubmitHandler.bind(this)}
                >Отправить
                </button>
            </form>
        );
    }
}
