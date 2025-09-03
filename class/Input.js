class Input{
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
        this.error = this.validate(this.value)
        return this.error
    }

    onChange(e){
        this.value = e.target.value
    }
}


export class TextInput extends Input{
    constructor({id,name,placeholder,label,minLength,maxLength,required,error,errorMessage}){
        super({id,name,label,required,error,errorMessage})
        this.type = "text"
        this.minLength = minLength
        this.maxLength = maxLength
        this.placeholder = placeholder
    }

    render(){
        return `
            <div>
                <label for="${this.id}">${this.label}</label>
                <input onChange="(e)=>{this.onChange(e)}" type="${this.type}" id="${this.id}" name="${this.name}" placeholder="${this.placeholder}" minlength="${this.minLength}" maxlength="${this.maxLength}" required="${this.required}">
                <span class="error">${this.error ? this.errorMessage : ''}</span>
            </div>
        `;
    }
}

export class CheckboxInput extends Input{
    constructor({id,name,label,required,error,errorMessage}){
        super({id,name,label,required,error,errorMessage})
        this.type = "checkbox"
    }
    onChange(e){
        this.value = e.target.checked
    }
    render(){
        return `
            <div>
                <label for="${this.id}">${this.label}</label>
                <input onChange="(e)=>{this.onChange(e)}" type="${this.type}" id="${this.id}" name="${this.name}" required="${this.required}">
                <span class="error">${this.error ? this.errorMessage : ''}</span>
            </div>
        `;
    }
}

export class RadioInput extends Input{
    constructor({id,name,label,required,error,errorMessage,options}){
        super({id,name,label,required,error,errorMessage})
        this.type = "radio"
        this.options = options
    }
    render(){
        return `
            <div>
                <label>${this.label}</label>
                ${this.options.map(option => `
                    <div>
                        <input onChange="(e)=>{this.onChange(e)}" type="${this.type}" id="${this.id}_${option.value}" name="${this.name}" value="${option.value}" required="${this.required}">
                        <label for="${this.id}_${option.value}">${option.label}</label>
                    </div>
                `).join('')}
                <span class="error">${this.error ? this.errorMessage : ''}</span>
            </div>
        `;
    }
}

export class DateInput extends Input{
    constructor({id,name,label,required,error,errorMessage}){
        super({id,name,label,required,error,errorMessage})
        this.type = "date"
    }
}

export class EmailInput extends Input{
    constructor({id,name,label,required,error,errorMessage}){
        super({id,name,label,required,error,errorMessage })
        this.type = "email"
    }
    onChange(e){
        this.value = e.target.value
        this.error = this.validate()
    }
}
