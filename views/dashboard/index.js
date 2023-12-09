const students = document.querySelector('#students');
const monthlyPayment = document.querySelector('#monthly-payment');
const pendingRegistration = document.querySelector('#pending-registrations');
const bcv = document.querySelector('#bcv');
const textLoader = document.querySelector('#text-loader');
const mainContainer = document.querySelector('#main-container');
const loaderScreen = document.querySelector('#loader-screen');

(async () => {
    try {
        // eslint-disable-next-line no-undef
        const { data } = await axios.get('/api/dashboard');
        mainContainer.classList.remove('hide');
        loaderScreen.classList.add('hide');
        console.log(data);
        students.innerHTML = data.students.length;
        bcv.innerHTML = `${data.dollarPrice} bs`;
    } catch (error) {
        console.log(error);
        textLoader.innerHTML = 'Error del servidor';
    }
})();

