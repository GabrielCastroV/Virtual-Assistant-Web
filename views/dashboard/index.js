const students = document.querySelector('#students');
const monthlyPayment = document.querySelector('#monthly-payment');
const pendingRegistration = document.querySelector('#pending-registrations');
const bcv = document.querySelector('#bcv');
const textLoader = document.querySelector('#text-loader');
const mainContainer = document.querySelector('#main-container');
const loaderScreen = document.querySelector('#loader-screen');
const registrationContainer = document.querySelector('#registrations-scroll');
const moduleContainer = document.querySelector('#modules-scroll');

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

        // relleno los contenedores con sus pagos pendientes
        for (let i = 0; i < unverifiedRegistration.length; i++) {
            if (unverifiedRegistration[i].currency === 'USD') {
                // en caso de ser el pago en tarjeta de credito
                registrationContainer.innerHTML += `
                <div id="registrations-info-container" class="w-full bg-allports-100 shadow-md p-4 rounded-lg flex flex-col justify-center items-center">
                    <div id="registrations-title-container" class="flex gap-2 mb-4">
                        <p id="registrations-title" class="text-allports-950 font-bold text-base">
                            Tarjeta de crédito
                        </p>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
                        </svg>
                    </div>
                    <p class="break-all text-sm text-allports-900 lg:text-base"> 
                        <span class="font-semibold text-allports-950">Nombre:</span> ${unverifiedRegistration[i].name} <br>
                        <span class="font-semibold text-allports-950">Email:</span>  ${unverifiedRegistration[i].email} <br>
                        <span class="font-semibold text-allports-950">Teléfono:</span>  ${unverifiedRegistration[i].phone} <br>
                        <span class="font-semibold text-allports-950">Curso:</span>  ${unverifiedRegistration[i].course} (${'pendiente'})<br>
                        <span class="font-semibold text-allports-950">Monto:</span>   ${unverifiedRegistration[i].total} ${unverifiedRegistration[i].currency}<br>
                        <span class="font-semibold text-allports-950">Orden:</span> #${unverifiedRegistration[i].order_id}
                    </p>
                    <div id="btn-container" class="flex gap-4">
                        <button id="registrations-btn" class="bg-allports-700 hover:bg-allports-800 text-sm p-4 text-allports-50 rounded-lg mt-4 font-semibold">Confirmar</button>
                        <button id="registrations-btn" class="bg-red-400 hover:bg-red-500 text-sm p-4 text-allports-50 rounded-lg mt-4 font-semibold">Rechazar</button>
                    </div>
                </div>
                `;
            } else if (unverifiedRegistration[i].currency === 'VES') {
                // en caso de ser un pago movil
                registrationContainer.innerHTML += `
                <div id="registrations-info-container" class="w-full bg-allports-100 shadow-md p-4 rounded-lg flex flex-col justify-center items-center">
                    <div id="registrations-title-container" class="flex gap-2 mb-4">
                        <p id="registrations-title" class="text-allports-950 font-bold text-base">
                            Pago Movil 
                        </p>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
                        </svg>
                    </div>
                    <p class="break-all text-sm text-allports-900 lg:text-base"> 
                        <span class="font-semibold text-allports-950">Email:</span>  ${unverifiedRegistration[i].email} <br>
                        <span class="font-semibold text-allports-950">Curso:</span>  ${unverifiedRegistration[i].course} (${'pendiente'})<br>
                        <span class="font-semibold text-allports-950">Monto:</span>   ${unverifiedRegistration[i].total} ${unverifiedRegistration[i].currency}<br>
                        <span class="font-semibold text-allports-950">Referencia:</span> #${unverifiedRegistration[i].order_id}
                    </p>
                    <div id="btn-container" class="flex gap-4">
                        <button id="registrations-btn" class="bg-allports-700 hover:bg-allports-800 text-sm p-4 text-allports-50 rounded-lg mt-4 font-semibold">Confirmar</button>
                        <button id="registrations-btn" class="bg-red-400 hover:bg-red-500 text-sm p-4 text-allports-50 rounded-lg mt-4 font-semibold">Rechazar</button>
                    </div>
                </div>
                `;
            }
        }
        // de no haber pagos relleno el contenedor con un mensaje de ausencia de pagos
        registrationContainer.classList.remove('justify-center');
        if (unverifiedRegistration.length === 0) {
            registrationContainer.innerHTML = `
            <div id="no-registrations" class="flex justify-center items-center gap-4 bg-allports-50 p-6 rounded-3xl font-semibold text-allports-900">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-16 h-16">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M10.125 2.25h-4.5c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125v-9M10.125 2.25h.375a9 9 0 019 9v.375M10.125 2.25A3.375 3.375 0 0113.5 5.625v1.5c0 .621.504 1.125 1.125 1.125h1.5a3.375 3.375 0 013.375 3.375M9 15l2.25 2.25L15 12" />
                </svg>
                <p class="text-center">No hay registros pendientes</p>
            </div>
            `;
            registrationContainer.classList.add('justify-center');
        }

        // relleno el contenedor de pagos de módulos
        for (let i = 0; i < unverifiedPagoMovil.length; i++) {
            // en caso de ser un pago movil
            moduleContainer.innerHTML += `
                <div id="modules-info-container" class="w-full bg-allports-100 shadow-md p-4 rounded-lg flex flex-col justify-center items-center">
                    <div id="modules-title-container" class="flex gap-2 mb-4">
                        <p id="modules-title" class="text-allports-950 font-bold text-base">
                            Pago Movil 
                        </p>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
                        </svg>
                    </div>
                    <p class="break-all text-sm text-allports-900 lg:text-base"> 
                    <span class="font-semibold text-allports-950">Email:</span>  ${unverifiedPagoMovil[i].email} <br>
                    <span class="font-semibold text-allports-950">Curso:</span>  ${unverifiedPagoMovil[i].course} (${'pendiente'})<br>
                    <span class="font-semibold text-allports-950">Monto:</span>   ${unverifiedPagoMovil[i].amount} bs<br>
                    <span class="font-semibold text-allports-950">Referencia:</span> #${unverifiedPagoMovil[i].ref_number}
                    </p>
                    <div id="btn-container" class="flex gap-4">
                        <button id="modules-btn" class="bg-allports-700 hover:bg-allports-800 text-sm p-4 text-allports-50 rounded-lg mt-4 font-semibold">Confirmar</button>
                        <button id="modules-btn" class="bg-red-400 hover:bg-red-500 text-sm p-4 text-allports-50 rounded-lg mt-4 font-semibold">Rechazar</button>
                    </div>
                </div>
                `;
        }
        // de no haber pagos relleno el contenedor con un mensaje de ausencia de pagos
        moduleContainer.classList.remove('justify-center');
        if (unverifiedPagoMovil.length === 0) {
            moduleContainer.innerHTML = `
            <div id="no-registrations" class="flex justify-center items-center gap-4 bg-allports-50 p-6 rounded-3xl font-semibold text-allports-900">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-16 h-16">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M10.125 2.25h-4.5c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125v-9M10.125 2.25h.375a9 9 0 019 9v.375M10.125 2.25A3.375 3.375 0 0113.5 5.625v1.5c0 .621.504 1.125 1.125 1.125h1.5a3.375 3.375 0 013.375 3.375M9 15l2.25 2.25L15 12" />
                </svg>
                <p class="text-center">No hay registros pendientes</p>
            </div>
            `;
            moduleContainer.classList.add('justify-center');
        }

        // finalmente muestro la pantalla principal y escondo la pantalla de carga
        mainContainer.classList.remove('hide');
        loaderScreen.classList.add('hide');
    } catch (error) {
        console.log(error);

        // mensaje de error para el usuario en caso de que algo falle
        textLoader.outerHTML = `<h2 id="text-loader" class="font-extrabold text-2xl text-red-500">${error.response.data.error}</h2>`;
    }
})();

