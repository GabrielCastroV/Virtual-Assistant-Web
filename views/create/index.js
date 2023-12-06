import { createNotification } from '../components/notification.js'
const form = document.querySelector('#form');
const nameInput = document.querySelector('#name-input');
const emailInput = document.querySelector('#email-input');
const courseInput = document.querySelector('#course-input');
const moduleInput = document.querySelector('#module-input');
const attendanceInput = document.querySelector('#attendance-input');
const dateInput = document.querySelector('#date-input');
const btn = document.querySelector('#btn');
const notesContainer = document.querySelector('#notes-container');
const infoContainer = document.querySelector('#info-container');
const loader = document.querySelector('#loading-wave');
const notification = document.querySelector('#notification');
const bot = document.querySelector('#bot');


// Regex Validation
const NAME_VALIDATION = /^([A-ZÁÉÍÓÚÑ][a-záéíóúñ]{1,15}\s){1}[A-ZÁÉÍÓÚÑ][a-záéíóúñ]{1,15}$/;
const EMAIL_VALIDATION = /^[a-zA-Z0-9_+-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/;
const DATE_VALIDATION = /^(202[0-4]-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))$/;
const NUMBER_VALIDATION = /^(\d(\.\d{1})?|1?\d(\.\d{1})?|20)$/; 

// validations
let nameValidation = false;
let emailValidation = false;
let courseValidation = false;
let moduleValidation = false;
let attendanceValidation = false;
let dateValidation = false;
let noteValidation = false;

const validation = (input, regexValidation) => {

    btn.disabled = (nameValidation && emailValidation && courseValidation && moduleValidation && attendanceValidation && dateValidation && noteValidation) ? false : true;

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
        moduleValidation = true;
        validation(moduleInput, moduleValidation);
    } else {
        moduleInput.innerHTML = `
        <option value="1" >1</option>
        <option value="2" >2</option>
        <option value="3" >3</option>
        <option value="4" >4</option>
        <option value="5" >5</option>
        <option value="6" >6</option>
     `;
        moduleValidation = true;
        validation(moduleInput, moduleValidation);
    }
    let container = '';
    for (let index = 0; index < moduleInput.value; index++) {
        container += `
        <div class="flex flex-col w-full md:w-auto gap-2">
            <label for="note-input" class="font-bold text-allports-800">
                Nota módulo ${index + 1}</label>
            <input id="nota-${index + 1}" placeholder="0-20" name="note-input" class="rounded-lg p-2 bg-allports-100 outline-none duration-75 focus:outline-allports-700">
        </div>
        `;
    }
    infoContainer.innerHTML = '<p class="text-xs text-allports-950">En caso de tener notas con decimales, separelas con un punto (.) Ejemplo: 19.5</p>'
    notesContainer.innerHTML = container;
});

moduleInput.addEventListener('input', () => {
    moduleValidation = moduleInput.value ? true : false;
    validation(moduleInput, moduleValidation);
    let container = '';
    for (let index = 0; index < moduleInput.value; index++) {
        container += `
        <div class="flex flex-col w-full md:w-auto gap-2">
            <label for="note-input" class="font-bold text-allports-800">
                Nota módulo ${index + 1}</label>
            <input id="nota-${index + 1}" placeholder="0-20" name="note-input" class="rounded-lg p-2 bg-allports-100 outline-none duration-75 focus:outline-allports-700">
        </div>
        `;
    }
    infoContainer.innerHTML = '<p class="text-xs text-allports-950">En caso de tener notas con decimales, separelas con un punto (.) Ejemplo: 19.5</p>'
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

notesContainer.addEventListener('input', (e) => {
    if (e.target.id && e.target.id.startsWith('nota-')) {
        noteValidation = NUMBER_VALIDATION.test(e.target.value);
        validation(e.target, noteValidation);
    }
});

form.addEventListener('submit', async e => {
    e.preventDefault();
    loader.classList.remove('hide');
    btn.classList.add('hide');
    if (nameValidation && emailValidation && courseValidation && moduleValidation && attendanceValidation && dateValidation && noteValidation) {
        try {
            const student = {
                name: nameInput.value,
                email: emailInput.value,
                course: courseInput.value,
                module: moduleInput.value,
                payday: dateInput.value,
                attendance: attendanceInput.value,
                grades: [
                    notesContainer?.children[0]?.children[1]?.value,
                    notesContainer?.children[1]?.children[1]?.value,
                    notesContainer?.children[2]?.children[1]?.value,
                    notesContainer?.children[3]?.children[1]?.value,
                    notesContainer?.children[4]?.children[1]?.value,
                    notesContainer?.children[5]?.children[1]?.value,
                ],
            };
            // eslint-disable-next-line no-undef
            const { data } = await axios.post('/api/create', student);

            loader.classList.add('hide');
            btn.classList.remove('hide');

            notification.classList.remove('hidden');
            createNotification(false, data);
            setTimeout(() => {
                notification.classList.add('hidden');
            }, 5000);
            bot.classList.remove('hide');
            form.classList.add('hide');
        } catch (error) {
            loader.classList.add('hide');
            btn.classList.remove('hide');

            notification.classList.remove('hidden');
            createNotification(true, error.response.data.error);
            setTimeout(() => {
                notification.classList.add('hidden');
            }, 5000);
        }
    } else {
        loader.classList.add('hide');
        btn.classList.remove('hide');
        notification.classList.remove('hidden');
        createNotification(true, 'Todos los espacios deben ser completados correctamente ⚠️');
        setTimeout(() => {
            notification.classList.add('hidden');
        }, 5000);
    }
});