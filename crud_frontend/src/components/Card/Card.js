import {Component} from "react";

export default class Card extends Component {
    constructor(props) {
        super(props);
    }

    deleteCardHandler = e => {
        e.preventDefault();
        this.props.func(this._reactInternals.key);
    }

    render() {
        return (
            <div className="col-sm-6 crud-card">
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">{this.props.title}</h5>
                        <p className="card-text">{this.props.text}</p>
                        <button
                            type="button"
                            className="btn btn-light"
                            onClick={this.deleteCardHandler}
                        >Удалить
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}
