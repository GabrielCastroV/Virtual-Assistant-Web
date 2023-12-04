const form = document.querySelector('#form');
const emailInput = document.querySelector('#email-input');
const passwordInput = document.querySelector('#password-input');
const loader = document.querySelector('.loading-wave');
const btn = document.querySelector('#form-btn');

form.addEventListener('submit', async e => {
    e.preventDefault();
    loader.classList.remove('hidden');
    loader.classList.add('flex');
    btn.classList.add('hidden');
    try {
        const user = {
            email: emailInput.value,
            password: passwordInput.value,
        };
        // eslint-disable-next-line no-undef
        await axios.post('/api/login', user);
        loader.classList.add('hidden');
        loader.classList.remove('flex');
        btn.classList.remove('hidden');
        window.location.pathname = '/dashboard/';
    } catch (error) {
        loader.classList.add('hidden');
        loader.classList.remove('flex');
        btn.classList.remove('hidden');
        console.log(error.response.data.error);
    }
});