
/**
 * Classe représentant une modale.
 * 
 * @param {HTMLElement} anchor - L'élément HTML auquel la modale est attachée.
 * @param {string} body - Le contenu HTML de la modale.
 */
export class Modal {
    #abortController
    #anchor
    #bodyElement
    #body   
    constructor({anchor, body = null}) {
        this.#anchor = anchor;
        this.#body = body;
        this.#abortController = new AbortController();
        this.#bodyElement = null;
    }

    /**
     * Rend la modale.
     * @returns {string}
     */
    render() {
        this.#abortController.abort();
        this.#abortController = new AbortController();
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
    /**
     * Ferme la modale.
     * @returns {void}
     */
    close() {
        this.#anchor.innerHTML = '';
        this.#bodyElement = null;
        this.#abortController.abort();
        this.#abortController = new AbortController();
    }
    /**
     * ouvre la modale.
     * @param {Function} onOpen - Callback function à exécuter lorsque la modale est ouverte.
     */
    open(onOpen) {
        this.#abortController.abort();
        this.#abortController = new AbortController();
        this.#anchor.innerHTML = this.render();
        this.#bodyElement = this.#anchor.querySelector('.modal-body');
        onOpen()
        const closeButton = this.#anchor.querySelectorAll('.modal-close');
        closeButton.forEach(button => {
            button.addEventListener('click', () => this.close(), { signal: this.#abortController.signal });
        });
    }
    /**
     * Met à jour le contenu de la modale.
     * @param {string} body - Le nouveau contenu à définir dans la modale.
     * @returns {void}
     */
    update(body) {

        if (!this.#bodyElement) return
        this.#bodyElement.innerHTML = body;
        const closeButton = this.#bodyElement.querySelectorAll('.btn-close');
        closeButton.forEach(button => {
            button.addEventListener('click', () => this.close(), { signal: this.#abortController.signal });
        });
    }
}
/**
 * Classe représentant un message dans la modale.
 */
export class ModalMessage {
    constructor({ title = null, message }) {
        this.title = title;
        this.message = message;
    }

    /**
     * Renders the modal message.
     * @returns {string}
     */
    render() {
        return `
            <div class="modal-message">
                ${this.title ? `<h2>${this.title}</h2>` : ''}
                <p>${this.message}</p>
                <button class="button btn-close">Fermer</button>
            </div>
        `;
    }
}


