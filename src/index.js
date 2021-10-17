import "./style/style.css";

const form = document.querySelector('.main-form');
const errorAlert = document.querySelector('.error');
const textHead = document.querySelector('label');
const submitButton = document.querySelector('button');
const passwordCode = document.getElementById('password');
const numberCode = document.querySelector('.number');
const numberPlace = document.querySelectorAll('div > input');
let getState = false;

function getPinInput(){
    let pin = '';
    for (let i = 0; i < 6; i++){
        pin += numberCode.children[i].value;
    }
    return pin;
}

function isAllaw(){
    errorAlert.textContent = 'Вы ввели правильный пинкод';
    errorAlert.classList.remove('error'); 
    errorAlert.classList.add('valid');
    errorAlert.style.cssText = 'display: block;';
    submitButton.disabled = true;
}

function isError(){
    errorAlert.textContent = 'Вы ввели не правильный пинкод';
    errorAlert.classList.remove('valid'); 
    errorAlert.classList.add('error');
    errorAlert.style.cssText = 'display: block;';
}

form.addEventListener('submit', (e) => {
    e.preventDefault();	
    if(passwordCode.value.length === 6){
        localStorage.setItem('password', String(form.elements.password.value));
        passwordCode.value = "";
        passwordCode.style.cssText = 'display: none;';
        numberCode.style.cssText = 'display: inline-block;';
        textHead.textContent = 'Установлен пароль! Введите его для разблокировки:';
        submitButton.textContent = 'Проверить';
        numberCode.children[0].focus();
        getState = true;
    } else {
        if(getState){
            let pin = getPinInput();
            if(localStorage.getItem('password') === pin){
                isAllaw();
            } else {
                isError();
            }
        } else alert('Введите 6 цифр!');
    }
});

function checkKeyDown(children, value){
    if(children.id !== 'password'){
        children.value = '';
    }
}

function checkKeyUp(children, value) {
    if (!value.match(/\d/g)) {
        errorAlert.style.cssText = 'display: block;';
        children.value = '';
        return;
    }
    errorAlert.style.cssText = 'display: none;';
    if (children.value.length > children.maxLength) {
        children.value = children.value.slice(0, children.maxLength);
    }
    if (children.id !== 'password') {
        children.nextElementSibling?.focus();
    }
}

window.addEventListener('keydown', (e) =>{
    if(e.target.tagName === 'INPUT'){
        checkKeyDown(e.target, e.key);
    }
});

window.addEventListener('keyup', (e) =>{
    if(e.target.tagName === 'INPUT'){
        checkKeyUp(e.target, e.key);
    }
});

numberCode.children[0].onpaste = function(event){
    event.preventDefault();
    let text = event.clipboardData.getData('text/plain');
    if (text.length === 6){
        for (let i = 0; i < 6; i++){
            numberCode.children[i].value = Number(text[i]);
            numberCode.children[i].focus();
        }
    }
}