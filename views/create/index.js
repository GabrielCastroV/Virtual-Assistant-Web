const form = document.querySelector('#form');
const nameInput = document.querySelector('#name-input');
const emailInput = document.querySelector('#email-input');
const courseInput = document.querySelector('#course-input');
const moduleInput = document.querySelector('#module-input');
const attendanceInput = document.querySelector('#attendance-input');
const dateInput = document.querySelector('#date-input');
const btn = document.querySelector('.btn');
const notesContainer = document.querySelector('#notes');


// Regex Validation
const NAME_VALIDATION = /^([A-ZÁÉÍÓÚÑ][a-záéíóúñ]{1,15}\s){1}[A-ZÁÉÍÓÚÑ][a-záéíóúñ]{1,15}$/;
const EMAIL_VALIDATION = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
const DATE_VALIDATION = /^(2023-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])|2024-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))$/;


// validations
let nameValidation = false;
let emailValidation = false;
let courseValidation = false;
let moduleValidation = false;
let attendanceValidation = false;
let dateValidation = false;
btn.disabled = true;

const validation = (input, regexValidation) => {

    btn.disabled = nameValidation && emailValidation && courseValidation && moduleValidation && attendanceValidation && dateValidation ? false : true;

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
    if (courseInput.value === '3') {
        moduleInput.innerHTML = ` 
        <option value="1" >1</option>
        <option value="2" >2</option>
        <option value="3" >3</option>
        <option value="4" >4</option>
        `;
    } else {
        moduleInput.innerHTML = `
        <option value="1" >1</option>
        <option value="2" >2</option>
        <option value="3" >3</option>
        <option value="4" >4</option>
        <option value="5" >5</option>
        <option value="6" >6</option>
     `;
    }
    let container = '';
    for (let index = 0; index < moduleInput.value; index++) {
        container += `
        <div class="flex flex-col w-full md:w-auto">
            <label for="note-input" class="font-bold text-allports-800">
                Nota módulo ${index + 1}</label>
            <input id="nota-${index + 1}" placeholder="0-20" name="note-input" class="rounded-lg p-2 bg-allports-100 outline-none duration-75 focus:outline-allports-700" type="number" max="20" min="0">
        </div>
        `;
    }
    notesContainer.innerHTML = container;
});

moduleInput.addEventListener('input', () => {
    moduleValidation = true;
    validation(moduleInput, moduleValidation);
    let container = '';
    for (let index = 0; index < moduleInput.value; index++) {
        container += `
        <div class="flex flex-col w-full md:w-auto">
            <label for="note-input" class="font-bold text-allports-800">
                Nota módulo ${index + 1}</label>
            <input id="nota-${index + 1}" placeholder="0-20" name="note-input" class="rounded-lg p-2 bg-allports-100 outline-none duration-75 focus:outline-allports-700" type="number" max="20" min="0">
        </div>
        `;
    }
    notesContainer.innerHTML = container;
});

attendanceInput.addEventListener('input', () => {
    attendanceValidation = true;
    validation(attendanceInput, attendanceValidation);
});

dateInput.addEventListener('input', e => {
    dateValidation = DATE_VALIDATION.test(e.target.value);
    validation(dateInput, dateValidation);
});

form.addEventListener('submit', e => {
    e.preventDefault();
});