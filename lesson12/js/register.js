const nameInput = document.getElementById("nameInput")
const phoneInput = document.getElementById("phoneInput")
const emailInput = document.getElementById("emailInput")
const resetButton = document.querySelectorAll(".grid input[type='reset']")
const confirmButton = document.getElementById("btnSubmit")
const warning = document.getElementById("warning")
let warned = false
function checkWarning(text){
    
    if(text === undefined){
        warned = false
        warning.classList.add("hidden")
        warning.classList.remove("show")
    }
    else if(text !== undefined){
        if(warned) return
        warned = true
        warning.innerText = text
        warning.classList.remove("hidden")
        warning.classList.add("show")
    }
    
}
function checkName(){    
    const nameValue = nameInput.value
    const checkNameValue = /^[а-я-їіє]{2,20}$/i
    if(nameValue.search(checkNameValue) === -1){
        checkWarning("Ви неправильно ввели ім'я")
    }
    else if(nameValue.search(checkNameValue) === 0){
        checkWarning()
        return true
    }
    
}
function checkPhone(){
    const phoneValue = phoneInput.value
    const checkPhoneValue = /^\+380\d{9}$/
    if(phoneValue.search(checkPhoneValue) === -1){
        checkWarning("Ви неправильно ввели номер телефону")
    }
    else if(phoneValue.search(checkPhoneValue) === 0){
        checkWarning()
        return true
    }
}
function checkEmail(){
    const emailValue = emailInput.value
    const checkEmailValue = /^[A-z0-9._]+@[A-z0-9]+\.[A-z]{2,6}$/
    if(emailValue.search(checkEmailValue) === -1){
        checkWarning("Ви неправильно ввели електронну адресу")
    }
    else if(emailValue.search(checkEmailValue) === 0){
        checkWarning()
        return true
    }
}
resetButton.onclick = function(){
    nameInput.value = ""
    phoneInput.value = ""
    emailInput.value = ""
}


confirmButton.onclick = function(){
    checkName()
    checkPhone()
    checkEmail()
    if(checkName() && checkPhone() && checkEmail()){
        document.location = "../index/thank-you.html"
    }
}
