const div = document.querySelector('#notification');

export const createNotification = (isError, message) => {
    div.classList.remove('hidden')
    if (isError) {
        div.innerHTML = `
        <div class="max-w-7xl mx-auto px-4 flex justify-end">
            <p class="bg-red-400 p-4 w-2/4 md:w-3/12 rounded-lg font-bold">${message}</p>
        </div>
        `;
    } else {
        div.innerHTML = `
        <div class="max-w-7xl mx-auto px-4 flex justify-end">
            <p class="bg-japanese-laurel-300 p-4 w-2/4 md:w-3/12 rounded-lg font-bold">${message}</p>
        </div>
        `;
    }
};