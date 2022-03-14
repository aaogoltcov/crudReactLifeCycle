export default class Note {
    constructor() {
        this.url = "http://localhost:4242/notes";
    }

    async getNotes() {
        let response = await fetch(this.url);
        if (response.ok) {
            return await response.json();
        } else {
            alert("Ошибка HTTP: " + response.status);
        }
    }

    async postNote(title, text) {
        return await fetch(this.url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({
                title: title,
                text: text,
            })
        });
    }

    async deleteNote(id) {
        return await fetch(`${this.url}/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
        });
    }
}