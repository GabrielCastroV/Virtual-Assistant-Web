const navbar = document.querySelector('#nav');


const createNavHome = () => {
    navbar.innerHTML = `
    <div class="max-w-7xl h-16 mx-auto flex items-center px-4 text-allports-50 justify-between ">

        <a class="font-bold text-xl flex items-center gap-2" href="/" >
            <img src="/images/Telegram-Logo.webp" class="h-8"><div class="hidden md:block">Asistente Virtual</div></img>
        </a>

        <!-- mobile version -->

        <!--<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-10 h-10 p-2 rounded-lg hover:bg-zinc-300 dark:text-zinc-50 hover:dark:bg-slate-700 md:hidden cursor-pointer">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg> -->

        <label class="hamburger rounded-lg md:hidden">
            <input type="checkbox">
            <svg viewBox="0 0 32 32" class="p-2">
                <path class="line line-top-bottom" d="M27 10 13 10C10.8 10 9 8.2 9 6 9 3.5 10.8 2 13 2 15.2 2 17 3.8 17 6L17 26C17 28.2 18.8 30 21 30 23.2 30 25 28.2 25 26 25 23.8 23.2 22 21 22L7 22" stroke="black"></path>
                <path class="line" d="M7 16 27 16"></path>
            </svg>
        </label>
        

        <!-- tablet/pc version -->

          <div class="hidden md:flex flex-row gap-4 a">
            <a href="/login/" class=" dark:text-allports-50">Ingresar</a>
            <a href="/create/" class=" dark:text-allports-50">Crear</a>
          </div>

          <!-- menu mobile -->

            <div class="fixed top-16 right-0 hidden left-0 bottom-0 justify-center items-center flex-col gap-4 text-transparent bg-allports-900 bg-opacity-60 backdrop-blur-md">
                <a href="/login/" class="btn select-none bg-allports-50 hover:bg-allports-100 text-allports-950 border-l-allports-950 border rounded-lg p-4 w-32 text-center">Iniciar Sesión</a>
                <a href="/create/" class="btn select-none bg-gradient-to-r from-allports-400 to-allports-600 hover:from-allports-500 hover:to-allports-700 rounded-lg p-4 w-32 text-center text-allports-50">Crear</a>
            </div>          
    </div>
    `;
};
const createNavCreate = () => {
    navbar.innerHTML = `
    <div class="max-w-7xl h-16 mx-auto flex items-center px-4 text-allports-50 justify-between ">

        <a class="font-bold text-xl flex items-center gap-2" href="/" >
            <img src="/images/Telegram-Logo.webp" class="h-8"><div class="hidden md:block">Asistente Virtual</div></img>
        </a>

        <!-- mobile version -->

        <!--<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-10 h-10 p-2 rounded-lg hover:bg-zinc-300 dark:text-zinc-50 hover:dark:bg-slate-700 md:hidden cursor-pointer">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg> -->

        <label class="hamburger rounded-lg md:hidden">
            <input type="checkbox">
            <svg viewBox="0 0 32 32" class="p-2">
                <path class="line line-top-bottom" d="M27 10 13 10C10.8 10 9 8.2 9 6 9 3.5 10.8 2 13 2 15.2 2 17 3.8 17 6L17 26C17 28.2 18.8 30 21 30 23.2 30 25 28.2 25 26 25 23.8 23.2 22 21 22L7 22" stroke="black"></path>
                <path class="line" d="M7 16 27 16"></path>
            </svg>
        </label>
        

        <!-- tablet/pc version -->

          <div class="hidden md:flex flex-row gap-4">
            <a href="/login/" class="hover:underline dark:text-allports-50">Ingresar</a>
          </div>

          <!-- menu mobile -->

            <div class="fixed top-16 right-0 hidden left-0 bottom-0 justify-center items-center flex-col gap-4 text-transparent bg-allports-900 bg-opacity-60 backdrop-blur-md">
                <a href="/login/" class="btn select-none bg-allports-50 hover:bg-allports-100 text-allports-950 border-l-allports-950 border rounded-lg p-4 w-32 text-center">Iniciar Sesión</a>
            </div>          
    </div>
    `;
};

if (window.location.pathname === '/') {
    createNavHome();
} else if (window.location.pathname === '/create/') {
    createNavCreate();
}

const navBtn = navbar.children[0].children[1];


navBtn.addEventListener('change', () => {
    const menuMobile = navbar.children[0].children[3];
    if (!navBtn.classList.contains('active')) {
        navBtn.classList.add('active');
        menuMobile.classList.remove('hidden');
        menuMobile.classList.add('flex');

    } else {
        navBtn.classList.remove('active');
        menuMobile.classList.add('hidden');
        menuMobile.classList.remove('flex');
    }
});