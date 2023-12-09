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
        students.innerHTML = data.students.length;
        bcv.innerHTML = `${data.dollarPrice} bs`;
        const verifiedRegistration = data.registrations.filter(e => !e.verified);
        pendingRegistration.innerHTML = verifiedRegistration.length;
        const verifiedPagoMovil = data.pagoMovil.filter(e => !e.verified);
        monthlyPayment.innerHTML = verifiedPagoMovil.length;
    } catch (error) {
        console.log(error);
        textLoader.outerHTML = '<h2 id="text-loader" class="font-extrabold text-2xl text-red-500">Error del servidor :(</h2>';
    }
})();

