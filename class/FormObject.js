export class formObject{
    constructor({fields,submitCallback,submitButtonText,onRender=()=>{}}){
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
                console.error("Validation failed:", error);
                //this.render()
            });
    }

    render(){
        this.abortController.abort();
        const formHTML = `
            <form onSubmit="(e)=>{this.submit(e)}">
                ${this.fields.map(field => field.render()).join('')}
                <button type="submit">${this.submitButtonText}</button>
            </form>
        `;
        this.onRender(formHTML);
        this.fields.forEach(field => {
            console.log(field.id);
            if(field.type === "radio"){
                const radioDiv = document.querySelector(`#${field.id}`);
                console.log(radioDiv);
                radioDiv.querySelectorAll('input').forEach(radio => {
                    radio.addEventListener('change', {signal: this.abortController.signal}, (e) => {
                        field.onChange(e);
                    });
                });
                
            }else{
                const fieldHtml = document.querySelector(`#${field.id}`);
                fieldHtml.addEventListener('change', {signal: this.abortController.signal}, (e) => {
                    field.onChange(e);
                });
            }
        });
    }

}