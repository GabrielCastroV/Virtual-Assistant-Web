const students = document.querySelector('#students');
const monthlyPayment = document.querySelector('#monthly-payment');
const pendingRegistration = document.querySelector('#pending-registrations');
const bcv = document.querySelector('#bcv');
const textLoader = document.querySelector('#text-loader');
const mainContainer = document.querySelector('#main-container');
const loaderScreen = document.querySelector('#loader-screen');

(async () => {
    try {
        // obtengo la data desde el backend de los estudiantes, pagos y precio del dolar.
        // eslint-disable-next-line no-undef
        const { data } = await axios.get('/api/dashboard');

        // muestro el numero de estudiantes
        students.innerHTML = data.students.length;

        // muestro el precio del dolar actual
        bcv.innerHTML = `${data.dollarPrice ?? '-'} bs`;

        // filtro los pagos que no han sido verificados
        const verifiedRegistration = data.registrations.filter(e => !e.verified);
        const verifiedPagoMovil = data.pagoMovil.filter(e => !e.verified);

        // muestro los pagos no verificados
        pendingRegistration.innerHTML = verifiedRegistration.length;
        monthlyPayment.innerHTML = verifiedPagoMovil.length;

        // finalmente muestro la pantalla principal y escondo la pantalla de carga
        mainContainer.classList.remove('hide');
        loaderScreen.classList.add('hide');
    } catch (error) {
        console.log(error);
        textLoader.outerHTML = '<h2 id="text-loader" class="font-extrabold text-2xl text-red-500">Error del servidor :(</h2>';
    }
})();

