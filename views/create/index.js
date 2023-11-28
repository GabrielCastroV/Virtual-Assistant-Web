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
const emailValidation = false;

const validation = (input, regexValidation) => {
    if (input.value === '') {
        input.classList.remove('outline-red-700', 'focus:outline-cyan-700');
        input.classList.add('outline-2', 'outline', 'focus:outline-cyan-700');
    } else if (regexValidation) {
        input.classList.remove('outline-red-700', 'focus:outline-cyan-700');
        input.classList.add('outline-green-700', 'outline-2', 'outline');
    } else {
        input.classList.remove('outline-green-700', 'focus:outline-cyan-700');
        input.classList.add('outline-red-700', 'outline-2', 'outline');
    }
};

nameInput.addEventListener('input', e => {
    nameValidation = NAME_VALIDATION.test(e.target.value);
    validation(nameInput, nameValidation);
});


form.addEventListener('submit', e => {
    e.preventDefault();
});