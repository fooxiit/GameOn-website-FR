
/**
 * Classe représentant une modale.
 * 
 * @param {HTMLElement} anchor - L'élément HTML auquel la modale est attachée.
 * @param {string} body - Le contenu HTML de la modale.
 */
export class Modal {
    constructor({anchor, body = null}) {
        this.anchor = anchor;
        this.body = body;
        this.abortController = new AbortController();
        this.bodyElement = null;
    }

    render() {
        this.abortController.abort();
        this.abortController = new AbortController();
        return `
            <div class="modal-bground">
                <div class="modal-content">
                    <i class="modal-close"></i>
                    <div class="modal-body">
                    </div>
                </div>
            </div>
        `;
    }

    close() {
        this.anchor.innerHTML = '';
        this.bodyElement = null;
    }
    open(onOpen) {
        this.abortController.abort();
        this.abortController = new AbortController();
        this.anchor.innerHTML = this.render();
        this.bodyElement = this.anchor.querySelector('.modal-body');
        onOpen()
        const closeButton = this.anchor.querySelectorAll('.modal-close');
        closeButton.forEach(button => {
            button.addEventListener('click', () => this.close(), { signal: this.abortController.signal });
        });
    }
    update(body) {
        console.log(this.bodyElement)
        if (!this.bodyElement) return
        this.bodyElement.innerHTML = body;
        const closeButton = this.bodyElement.querySelectorAll('.btn-close');
        closeButton.forEach(button => {
            button.addEventListener('click', () => this.close(), { signal: this.abortController.signal });
        });
    }
}

export class ModalMessage{
    constructor({title = null, message}) {
        this.title = title;
        this.message = message;
    }

    render() {
        return `
            <div class="modal-message">
                ${this.title ? `<h2>${this.title}</h2>` : ''}
                <p>${this.message}</p>
                <button class="btn-close">Fermer</button>
            </div>
        `;
    }
}


