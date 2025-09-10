function editNav() {
  const topnavIcon = document.getElementById("topnav-icon");
  const x = document.getElementById("myTopnav");
  x.classList.toggle("responsive");
  topnavIcon.classList.toggle("active");
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const modalBody = document.querySelector(".modal-body")
const formData = document.querySelectorAll(".formData");
const formHTML = document.querySelector("#form-reserve")
const submitSucess = document.querySelector(".submit-sucess")

const FirstNameField = document.querySelector("#firstname-field")
const BirthDateField = document.querySelector("#birthdate-field")
const LocationField = document.querySelector("#location-field")
const CguField = document.querySelector("#cgu-field")

/**
 * 
 * @param {Element} e 
 */
function hidenElement(e){
  e.classList.add("hidden")
}

/**
 * 
 * @param {Element} e 
 */
function showElement(e){
  e.classList.remove("hidden")
}

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

formHTML.addEventListener("submit",submitForm)

// launch modal form
function launchModal() {
  showElement(modalbg)
}
/**
 * close modal
 */
function closeModal() {
  hidenElement(modalbg)
  hidenElement(submitSucess)
  showElement(formHTML)
}
/**
 * validate form
 * @param {FormData} form 
 */
function validateForm(form){
  

  let err = false

  
  
  if(!form.has("cgu")){
    err = true
    
    CguField.classList.add("field-error")
  }else{
    CguField.classList.remove("field-error")
  }

  if(!form.has("location")){
    err = true
    
    LocationField.classList.add("field-error")
  }else{
    LocationField.classList.remove("field-error")
  }

  if(!new RegExp("\\w{2,}").test(form.get("first"))){
    err = true
    
    FirstNameField.classList.add("field-error")
  }else{
    FirstNameField.classList.remove("field-error")
  }

  if(isNaN(new Date(form.get("birthdate")))){
    err = true
    
    BirthDateField.classList.add("field-error")
  }else{
    BirthDateField.classList.remove("field-error")
  }

  return !err
}
/**
 * subit form
 * @param {Event} e 
 */
function submitForm(e){
  e.preventDefault()
  const form = new FormData(e.target)
  if(!validateForm(form)) return
  e.target.reset()
  hidenElement(formHTML)
  showElement(submitSucess)
}



