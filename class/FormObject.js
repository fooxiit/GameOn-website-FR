export class formObject{
    // valeur privée
    #onRender;
    #abortController;

    constructor({id,fields,submitCallback,submitButtonText,onRender=()=>{}}){
       this.id = id
       this.fields = fields
       this.submitCallback = submitCallback
       this.submitButtonText = submitButtonText
       this.#onRender = onRender
       this.#abortController = new AbortController();
       this.render = this.render.bind(this);
    }

   
    /**
     * Récupère les valeurs des champs du formulaire.
     * @returns {Object} - Un objet contenant les valeurs des champs.
     */
    getValues(){
        const values = this.fields.reduce((acc, field) => {
            acc[field.name] = field.value;
            return acc;
        }, {});
        return values;
    }

    /**
     * Soumet le formulaire.
     * @param {Event} e - L'événement de soumission.
     */
    submit(e){
        
        e.preventDefault();
        Promise.all(this.fields.map(field => field.validate()))
            .then(() => {
                this.submitCallback(this.getValues());
                this.reset();
            })
            .catch(error => {
                this.render()
            });
    }

    /**
     * Rend le formulaire.
     * @returns {string}
     */
    render(){
        
        this.#abortController.abort();
        this.#abortController = new AbortController();
        const formHTML = `
            <form id="${this.id}" name="${this.id}" novalidate>
                ${this.fields.map(field => field.render()).join('')}
                <button class="btn-submit" type="submit">${this.submitButtonText}</button>
            </form>
        `;
        this.#onRender(formHTML);
        const formElement = document.querySelector(`#${this.id}`);
        formElement.addEventListener('submit', (e) => this.submit(e), { signal: this.#abortController.signal });
        this.fields.forEach(field => {
            if(field.type === "radio"){
                const radioDiv = document.querySelector(`#${field.id}`);
                radioDiv.querySelectorAll('input').forEach(radio => {
                    radio.addEventListener('change', (e) => {
                        field.onChange(e);
                    }, { signal: this.#abortController.signal });
                });
                
            }else{
                const fieldHtml = document.querySelector(`#${field.id}`);
                fieldHtml.addEventListener('change', (e) => {
                    field.onChange(e);
                }, { signal: this.#abortController.signal });
            }
        });
    }

    /**
     * Réinitialise les champs du formulaire.
     * @returns {void}
     */
    reset() {
        this.fields.forEach(field => field.reset());
        
    }

}