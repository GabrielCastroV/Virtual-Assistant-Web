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
let nameValidation = false;
let emailValidation = false;
let courseValidation = false;
let moduleValidation = false;
let attendanceValidation = false;
btn.disabled = true;

const validation = (input, regexValidation) => {

    btn.disabled = nameValidation && emailValidation && courseValidation && moduleValidation ? false : true;

    if (input.value === '') {
        input.classList.remove('outline-red-700', 'focus:outline-red-700', 'focus:outline-japanese-laurel-300', 'outline-japanese-laurel-300');
        input.classList.add('focus:outline-allports-700');
    } else if (regexValidation) {
        input.classList.remove('outline-red-700', 'focus:outline-red-700', 'focus:outline-allports-700');
        input.classList.add('focus:outline-japanese-laurel-300', 'outline-japanese-laurel-300');
    } else {
        input.classList.remove('focus:outline-allports-700', 'focus:outline-japanese-laurel-300', 'outline-japanese-laurel-300');
        input.classList.add('focus:outline-red-700', 'outline-red-700', 'outline');
    }
};

nameInput.addEventListener('input', e => {
    nameValidation = NAME_VALIDATION.test(e.target.value);
    validation(nameInput, nameValidation);
});

emailInput.addEventListener('input', e => {
    emailValidation = EMAIL_VALIDATION.test(e.target.value);
    validation(emailInput, emailValidation);
});

courseInput.addEventListener('input', () => {
    courseValidation = true;
    validation(courseInput, courseValidation);
});

moduleInput.addEventListener('input', () => {
    moduleValidation = true;
    validation(moduleInput, moduleValidation);
});

attendanceInput.addEventListener('input', () => {
    attendanceValidation = true;
    validation(attendanceInput, attendanceValidation);
});

form.addEventListener('submit', e => {
    e.preventDefault();
});