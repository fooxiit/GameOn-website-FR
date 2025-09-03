export class formObject{
    constructor({fields,submitCallback,submitButtonText,onRender=()=>{}}){
       this.fields = fields
       this.submitCallback = submitCallback
       this.submitButtonText = submitButtonText
       this.onRender = onRender
    }

   

    getValues(){
        const values = this.fields.reduce((acc, field) => {
            acc[field.name] = field.value;
            return acc;
        }, {});
        return values;
    }

    submit(){
        Promise.all(this.fields.map(field => field.validate()))
            .then(() => {
                this.submitCallback(this.getValues());
            })
            .catch(error => {
                console.error("Validation failed:", error);
                this.render()
            });
    }

    render(){
        const formHTML = `
            <form onSubmit="(e)=>{this.onSubmit(e)}">
                ${this.fields.map(field => field.render()).join('')}
                <button type="submit">${this.submitButtonText}</button>
            </form>
        `;
        this.onRender(formHTML);
    }

}