const form = document.querySelector('#form');
const emailInput = document.querySelector('#email-input');
const passwordInput = document.querySelector('#password-input');

form.addEventListener('submit', e => {
    e.preventDefault();
    if (emailInput.value == process.env.USER_ADMIN && passwordInput.value == process.env.PASSWORD_ADMIN) {
        console.log('correcto');
    } else {
        console.log('no');
    }
});