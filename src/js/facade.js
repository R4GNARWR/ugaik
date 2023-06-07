const planPathes = document.querySelectorAll('.facade-plan__path');
Fancybox.defaults.closeButton = false;

planPathes.forEach((btn) => {
    btn.addEventListener('click', () => {
        Fancybox.show(
            [
                { src: "#flatModal", type: "inline" }
            ],
            {
                dragToClose: false,
                mainClass: 'modal-flat__container'
            }
        );
    })
})
