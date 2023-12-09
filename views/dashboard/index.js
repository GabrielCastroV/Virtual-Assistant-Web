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
        const unverifiedRegistration = data.registrations.filter(e => !e.verified);
        const unverifiedPagoMovil = data.pagoMovil.filter(e => !e.verified);

        // muestro la cantidad de pagos que no han sido verificados
        pendingRegistration.innerHTML = unverifiedRegistration.length;
        monthlyPayment.innerHTML = unverifiedPagoMovil.length;

        // finalmente muestro la pantalla principal y escondo la pantalla de carga
        mainContainer.classList.remove('hide');
        loaderScreen.classList.add('hide');
    } catch (error) {
        console.log(error);

        // mensaje de error para el usuario en caso de que algo falle
        textLoader.outerHTML = '<h2 id="text-loader" class="font-extrabold text-2xl text-red-500">Error del servidor :(</h2>';
    }
})();

