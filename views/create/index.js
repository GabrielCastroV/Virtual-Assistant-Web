const form = document.querySelector('#form');
const nameInput = document.querySelector('#name-input');
const emailInput = document.querySelector('#email-input');
const courseInput = document.querySelector('#course-input');
const moduleInput = document.querySelector('#module-input');
const attendanceInput = document.querySelector('#attendance-input');
const dateInput = document.querySelector('#date-input');
const btn = document.querySelector('.btn');


// Regex Validation
const NAME_VALIDATION = /^([A-ZÁÉÍÓÚÑ][a-záéíóúñ]{1,15}\s){1}[A-ZÁÉÍÓÚÑ][a-záéíóúñ]{1,15}$/;
const EMAIL_VALIDATION = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

// validations
const nameValidation = false;
const emailValidation = false;

const validation = (input, regex) => {

};


form.addEventListener('submit', e => {
    e.preventDefault();
    btn.disabled = nameInput;
});