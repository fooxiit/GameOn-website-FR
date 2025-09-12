class Input{
    /**
     * 
     * @param {String} id - L'identifiant du champ.
     * @param {String} name - Le nom du champ.
     * @param {String} label - L'étiquette du champ.
     * @param {Boolean} required - Indique si le champ est requis.
     * @param {Boolean} error - Indique si le champ a une erreur.
     * @param {String} errorMessage - Le message d'erreur à afficher.
     * @param {Function} validateCallback - La fonction de validation du champ.
     */
    constructor({id,name,label,required = false,error = false,errorMessage,validateCallback = () => true}){
        this.id = id
        this.name = name
        this.label = label
        this.required = required
        this.error = error
        this.errorMessage = errorMessage
        this.validateCallback = validateCallback
        this.value = ""
        this.reset = this.reset.bind(this);
        this.previousValue = null;
        this.previousRender = null;
        this.firstValidation = true;
        this.firstRender = true;
    }
    reset() {
        
        this.previousValue = null
        this.value = ""
        this.error = false
        this.previousRender = null
        this.firstRender = true
        this.firstValidation = true
        

    }
    validate(){
        return new Promise((resolve,reject)=>{
            
            if(this.value === this.previousValue && !this.firstValidation){
                
                if(this.error) reject(this.error)
                resolve(this.error)
                return
            }
            this.firstValidation = false
            this.error = !this.validateCallback(this.value) 
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
 * @param {Function} validateCallback - La fonction de validation du champ.
 */
export class TextInput extends Input{
    constructor({id,name,placeholder,label,minLength,maxLength,required,error,errorMessage,validateCallback = () => true}){
        super({id,name,label,required,error,errorMessage,validateCallback})
        this.type = "text"
        this.minLength = minLength
        this.maxLength = maxLength
        this.placeholder = placeholder
    }

    render(){
        
        if(this.value === this.previousValue && this.previousRender && !this.firstRender){
            
            return this.previousRender
        }
        
        
        if(!this.firstRender) this.previousValue = this.value
        this.firstRender = false
        this.previousRender = `
            <div class="formData ${this.error ? 'field-error' : ''}">
                <label class="text-label" for="${this.id}">${this.label}</label>
                <input  class="text-control" value="${this.value}" type="${this.type}" id="${this.id}" name="${this.name}" placeholder="${this.placeholder}" minlength="${this.minLength}" maxlength="${this.maxLength}" ${this.required && 'required'}>
                <span class="error">${this.error ? this.errorMessage : ''}</span>
            </div>
        `;
        return this.previousRender
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
 * @param {Function} validateCallback - La fonction de validation du champ.
 */
export class CheckboxInput extends Input{
        constructor({id,name,label,value=false,required,error,errorMessage,validateCallback = () => true}){
        super({id,name,label,required,error,value,errorMessage,validateCallback})
        this.type = "checkbox"
    }
    onChange(e){
        this.previousValue = this.value
        this.value = e.target.checked
    }
    render(){
        
        if(this.value === this.previousValue && this.previousRender && !this.firstRender){
            return this.previousRender
        }
        
        if(!this.firstRender) this.previousValue = this.value
        this.firstRender = false
        this.previousRender = `
            <div class="formData ${this.error ? 'field-error' : ''}">
                <input class="checkbox-input" ${this.value && "checked"} type="${this.type}" id="${this.id}" name="${this.name}" ${this.required && 'required'}>
                <label class="checkbox2-label" for="${this.id}">
                    <i class="checkbox-icon"></i>
                    ${this.label}
                </label>
                <span class="error">${this.error ? this.errorMessage : ''}</span>
            </div>
        `
        return this.previousRender
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
 * @param {Function} validateCallback - La fonction de validation du champ.
 */
export class RadioInput extends Input{
    constructor({id,name,label,required,error,errorMessage,options,validateCallback = () => true}){
        super({id,name,label,required,error,errorMessage,validateCallback})
        this.type = "radio"
        this.options = options
    }
    render(){
        
        if(this.value === this.previousValue && this.previousRender && !this.firstRender){
            return this.previousRender
        }
        
        if(!this.firstRender) this.previousValue = this.value
        this.firstRender = false
        this.previousRender = `
            <div class="formData ${this.error ? 'field-error' : ''}" id="${this.id}">
                <label class="text-label" for="${this.id}">${this.label}</label>
                <div class="radio-options">
                    ${this.options.map(option => `
                        <div class="radio-option">
                                <input class="checkbox-input" type="${this.type}" ${this.value === option.value && "checked"} id="${this.id}_${option.value}" name="${this.name}" value="${option.value}" ${this.required && 'required'}>
                            <label class="checkbox-label" for="${this.id}_${option.value}">
                                <i class="checkbox-icon"></i>
                                ${option.label}
                            </label>
                        </div>
                    `).join('')}
                 </div>
                <span class="error">${this.error ? this.errorMessage : ''}</span>
            </div>
        `;
        return this.previousRender
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
 * @param {Function} validateCallback - La fonction de validation du champ.
 */
export class DateInput extends Input{
    constructor({id,name,label,required,error,errorMessage,validateCallback = () => true}){
        super({id,name,label,required,error,errorMessage,validateCallback})
        this.type = "date"
    }
    render(){
        

        if(this.value === this.previousValue && this.previousRender && !this.firstRender){
            return this.previousRender
        }
        
        if(!this.firstRender) this.previousValue = this.value
        this.firstRender = false
        this.previousRender = `
            <div class="formData ${this.error ? 'field-error' : ''}">
                <label class="text-label" for="${this.id}">${this.label}</label>
                <input class="text-control" value="${this.value}" type="${this.type}" id="${this.id}" name="${this.name}" ${this.required && 'required'}>
                <span class="error">${this.error ? this.errorMessage : ''}</span>
            </div>
        `;
        return this.previousRender
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
 * @param {Function} validateCallback - La fonction de validation du champ.
 */
export class EmailInput extends Input{
    constructor({id,name,label,required,error,errorMessage,validateCallback = () => true}){
        super({id,name,label,required,error,errorMessage,validateCallback })
        this.type = "email"
    }
    render(){
        

        if(this.value === this.previousValue && this.previousRender && !this.firstRender){
            return this.previousRender
        }
        
        if(!this.firstRender) this.previousValue = this.value
        this.firstRender = false
        this.previousRender = `
            <div class="formData ${this.error ? 'field-error' : ''}">
                <label class="text-label" for="${this.id}">${this.label}</label>
                <input class="text-control" value="${this.value}" type="${this.type}" id="${this.id}" name="${this.name}" ${this.required && 'required'}>
                <span class="error">${this.error ? this.errorMessage : ''}</span>
            </div>
        `;
        return this.previousRender
    }

}

export class NumberInput extends Input{
    constructor({id,name,label,required,error,errorMessage,validateCallback = () => true}){
        super({id,name,label,required,error,errorMessage,validateCallback})
        this.type = "number"
    }
    render(){
        

        if(this.value === this.previousValue && this.previousRender && !this.firstRender){
            return this.previousRender
        }
        
        if(!this.firstRender) this.previousValue = this.value
        this.firstRender = false

        this.previousRender = `
            <div class="formData ${this.error ? 'field-error' : ''}">
                <label class="text-label" for="${this.id}">${this.label}</label>
                <input class="text-control" value="${this.value}" type="${this.type}" id="${this.id}" name="${this.name}" ${this.required && 'required'}>
                <span class="error">${this.error ? this.errorMessage : ''}</span>
            </div>
        `;
        return this.previousRender
    }
}
