export class formObject{
    constructor({id,fields,submitCallback,submitButtonText,onRender=()=>{}}){
       this.id = id
       this.fields = fields
       this.submitCallback = submitCallback
       this.submitButtonText = submitButtonText
       this.onRender = onRender
       this.abortController = new AbortController();
    }

   

    getValues(){
        const values = this.fields.reduce((acc, field) => {
            acc[field.name] = field.value;
            return acc;
        }, {});
        return values;
    }

    submit(e){
        console.log("Form submitted");
        e.preventDefault();
        Promise.all(this.fields.map(field => field.validate()))
            .then(() => {
                this.submitCallback(this.getValues());
            })
            .catch(error => {
                this.render()
            });
    }

    render(){
        this.abortController.abort();
        this.abortController = new AbortController();
        const formHTML = `
            <form id="${this.id}">
                ${this.fields.map(field => field.render()).join('')}
                <button type="submit">${this.submitButtonText}</button>
            </form>
        `;
        this.onRender(formHTML);
        const formElement = document.querySelector(`#${this.id}`);
        formElement.addEventListener('submit', (e) => this.submit(e));
        this.fields.forEach(field => {
            if(field.type === "radio"){
                const radioDiv = document.querySelector(`#${field.id}`);
                radioDiv.querySelectorAll('input').forEach(radio => {
                    radio.addEventListener('change', (e) => {
                        field.onChange(e);
                    });
                });
                
            }else{
                const fieldHtml = document.querySelector(`#${field.id}`);
                fieldHtml.addEventListener('change', (e) => {
                    field.onChange(e);
                });
            }
        });
    }

}