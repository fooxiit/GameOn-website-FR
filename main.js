import { formObject } from "./class/FormObject.js";
import { CheckboxInput, DateInput, EmailInput, NumberInput, RadioInput, TextInput } from "./class/Input.js";

const modalBody = document.querySelector(".modal-body");
const registerForm = new formObject({
        id: "register-form",
        fields:[
            new TextInput({
                id:"first",
                name:"first",
                label:"Prénom",
                placeholder:"Votre prénom",
                minLength:2,
                maxLength:100,
                error:false,
                errorMessage:"Veuillez entrer 2 caractères ou plus pour le champ du nom.",
                validateCallback:(value) => {
                    console.log("validate first",value)
                    if(!value) return false
                    return new RegExp("\\w{2,}").test(value)      
                }
            }),
            new TextInput({
                id:"last",
                name:"last",
                label:"Nom",
                placeholder:"Votre nom",
            }),
            new EmailInput({
                id:"email",
                name:"email",
                label:"Email",
                placeholder:"Votre email",
            }),
            new DateInput({
                id:"birthdate",
                name:"birthdate",
                label:"Date de naissance",
                placeholder:"Votre date de naissance",
                error:false,
                errorMessage:"Vous devez entrer votre date de naissance.",
                validateCallback:(value) => {
                    if(!value) return false
                    if(isNaN(new Date(value))) return false
                    return true
                }
            }),
            new NumberInput({
                id:"quantity",
                name:"quantity",
                label:"À combien de tournois GameOn avez-vous déjà participé ?",
                placeholder:""
            }),
            new RadioInput({
                validateCallback:(value) => {
                    if(!value) return false
                    return true
                },
                errorMessage:"Vous devez choisir une option.",
                id:"location",
                name:"location",
                label:"A quel tournoi souhaitez-vous participer cette année ?",
                options:[
                    {label:"New york",value:"New york"},
                    {label:"San francisco",value:"San francisco"},
                    {label:"Seattle",value:"Seattle"},
                    {label:"Chicago",value:"Chicago"},
                    {label:"Boston",value:"Boston"},
                    {label:"Portland",value:"Portland"}
                ]
            }),
            new CheckboxInput({
                id:"terms",
                name:"terms",
                label:"J'ai lu et accepté les conditions d'utilisation.",
                error:false,
                errorMessage:"Vous devez vérifier que vous acceptez les termes et conditions.",
                validateCallback:(value) => {
                    if(!value) return false
                    return true
                }
            }),
            new CheckboxInput({
                id:"news",
                name:"news",
                label:"Je souhaite être prévenu des prochains évènements."
            })
        ],
        submitCallback: (values) => {console.log(values,'test')},
        submitButtonText: "C'est parti",
        onRender: (formElement) => {
            modalBody.innerHTML = formElement;
        }
});

registerForm.render()
