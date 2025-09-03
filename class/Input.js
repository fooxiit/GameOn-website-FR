class Input{
    /**
     * 
     * @param {String} id - L'identifiant du champ.
     * @param {String} name - Le nom du champ.
     * @param {String} label - L'étiquette du champ.
     * @param {Boolean} required - Indique si le champ est requis.
     * @param {Boolean} error - Indique si le champ a une erreur.
     * @param {String} errorMessage - Le message d'erreur à afficher.
     * @param {Function} validate - La fonction de validation du champ.
     */
    constructor({id,name,label,required = false,error = false,errorMessage,validate = () => {}}){
        this.id = id
        this.name = name
        this.label = label
        this.required = required
        this.error = error
        this.errorMessage = errorMessage
        this.validate = validate
    }
    validate(){
        return new Promise((resolve,reject)=>{
            this.error = this.validate(this.value)
            if(this.error){
                reject(this.error)
            }
            resolve(this.error)
        })
    }

    onChange(e){
        this.value = e.target.value
    }
}

/**
 * Classe représentant un champ de saisie de texte.
 * @param {String} id - L'identifiant du champ.
 * @param {String} name - Le nom du champ.
 * @param {String} placeholder - Le texte d'espace réservé du champ.
 * @param {String} label - L'étiquette du champ.
 * @param {Number} minLength - La longueur minimale du champ.
 * @param {Number} maxLength - La longueur maximale du champ.
 * @param {Boolean} required - Indique si le champ est requis.
 * @param {Boolean} error - Indique si le champ a une erreur.
 * @param {String} errorMessage - Le message d'erreur à afficher.
 */
export class TextInput extends Input{
    constructor({id,name,placeholder,label,minLength,maxLength,required,error,errorMessage,validate}){
        super({id,name,label,required,error,errorMessage,validate})
        this.type = "text"
        this.minLength = minLength
        this.maxLength = maxLength
        this.placeholder = placeholder
    }

    render(){
        return `
            <div>
                <label for="${this.id}">${this.label}</label>
                <input  type="${this.type}" id="${this.id}" name="${this.name}" placeholder="${this.placeholder}" minlength="${this.minLength}" maxlength="${this.maxLength}" required="${this.required}">
                <span class="error">${this.error ? this.errorMessage : ''}</span>
            </div>
        `;
    }
}

/**
 * Classe représentant un champ de saisie de case à cocher.
 * @param {String} id - L'identifiant du champ.
 * @param {String} name - Le nom du champ.
 * @param {String} label - L'étiquette du champ.
 * @param {Boolean} required - Indique si le champ est requis.
 * @param {Boolean} error - Indique si le champ a une erreur.
 * @param {String} errorMessage - Le message d'erreur à afficher.
 * @param {Function} validate - La fonction de validation du champ.
 */
export class CheckboxInput extends Input{
    constructor({id,name,label,required,error,errorMessage,validate}){
        super({id,name,label,required,error,errorMessage,validate})
        this.type = "checkbox"
    }
    onChange(e){
        this.value = e.target.checked
    }
    render(){
        return `
            <div>
                <label for="${this.id}">${this.label}</label>
                <input type="${this.type}" id="${this.id}" name="${this.name}" required="${this.required}">
                <span class="error">${this.error ? this.errorMessage : ''}</span>
            </div>
        `;
    }
}

/**
 * Classe représentant un champ de saisie de bouton radio.
 * @param {String} id - L'identifiant du champ.
 * @param {String} name - Le nom du champ.
 * @param {String} label - L'étiquette du champ.
 * @param {Boolean} required - Indique si le champ est requis.
 * @param {Boolean} error - Indique si le champ a une erreur.
 * @param {String} errorMessage - Le message d'erreur à afficher.
 * @param {Array} options - Les options du champ de saisie.
 * @param {Function} validate - La fonction de validation du champ.
 */
export class RadioInput extends Input{
    constructor({id,name,label,required,error,errorMessage,options,validate}){
        super({id,name,label,required,error,errorMessage,validate})
        this.type = "radio"
        this.options = options
    }
    render(){
        return `
            <div id="${this.id}">
                <label>${this.label}</label>
                ${this.options.map(option => `
                    <div>
                        <label for="${this.id}_${option.value}">${option.label}</label>
                        <input type="${this.type}" id="${this.id}_${option.value}" name="${this.name}" value="${option.value}" required="${this.required}">
                    </div>
                `).join('')}
                <span class="error">${this.error ? this.errorMessage : ''}</span>
            </div>
        `;
    }
}

/**
 * Classe représentant un champ de saisie de date.
 * @param {String} id - L'identifiant du champ.
 * @param {String} name - Le nom du champ.
 * @param {String} label - L'étiquette du champ.
 * @param {Boolean} required - Indique si le champ est requis.
 * @param {Boolean} error - Indique si le champ a une erreur.
 * @param {String} errorMessage - Le message d'erreur à afficher.
 * @param {Function} validate - La fonction de validation du champ.
 */
export class DateInput extends Input{
    constructor({id,name,label,required,error,errorMessage,validate}){
        super({id,name,label,required,error,errorMessage,validate})
        this.type = "date"
    }
    render(){
        return `
            <div">
                <label for="${this.id}">${this.label}</label>
                <input type="${this.type}" id="${this.id}" name="${this.name}" required="${this.required}">
                <span class="error">${this.error ? this.errorMessage : ''}</span>
            </div>
        `;
    }
}

/**
 * Classe représentant un champ de saisie d'email.
 * @param {String} id - L'identifiant du champ.
 * @param {String} name - Le nom du champ.
 * @param {String} label - L'étiquette du champ.
 * @param {Boolean} required - Indique si le champ est requis.
 * @param {Boolean} error - Indique si le champ a une erreur.
 * @param {String} errorMessage - Le message d'erreur à afficher.
 * @param {Function} validate - La fonction de validation du champ.
 */
export class EmailInput extends Input{
    constructor({id,name,label,required,error,errorMessage,validate}){
        super({id,name,label,required,error,errorMessage,validate })
        this.type = "email"
    }
    render(){
        return `
            <div>
                <label for="${this.id}">${this.label}</label>
                <input type="${this.type}" id="${this.id}" name="${this.name}" required="${this.required}">
                <span class="error">${this.error ? this.errorMessage : ''}</span>
            </div>
        `;
    }

}

export class NumberInput extends Input{
    constructor({id,name,label,required,error,errorMessage,validate}){
        super({id,name,label,required,error,errorMessage,validate})
        this.type = "number"
    }
    render(){
        return `
            <div>
                <label for="${this.id}">${this.label}</label>
                <input type="${this.type}" id="${this.id}" name="${this.name}" required="${this.required}">
                <span class="error">${this.error ? this.errorMessage : ''}</span>
            </div>
        `;
    }   
}
