function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const modalBody = document.querySelector(".modal-body")
const formData = document.querySelectorAll(".formData");
const formHTML = document.querySelector("#form-reserve")
const submitSucess = document.querySelector(".submit-sucess")

const FirstNameFiels = document.querySelector("#firsname-field")
const BirthDateFiels = document.querySelector("#birthdate-field")
const LocationFiels = document.querySelector("#loction-field")
const CguFiels = document.querySelector("#cgu-field")

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
    console.log("cgu error")
    CguFiels.classList.add("field-error")
  }else{
    CguFiels.classList.remove("field-error")
  }

  if(!form.has("location")){
    err = true
    console.log("location error")
    LocationFiels.classList.add("field-error")
  }else{
    LocationFiels.classList.remove("field-error")
  }

  if(!new RegExp("\\w{2,}").test(form.get("first"))){
    err = true
    console.log("name error")
    FirstNameFiels.classList.add("field-error")
  }else{
    FirstNameFiels.classList.remove("field-error")
  }

  if(isNaN(new Date(form.get("birthdate")))){
    err = true
    console.log("birthdate error")
    BirthDateFiels.classList.add("field-error")
  }else{
    BirthDateFiels.classList.remove("field-error")
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



