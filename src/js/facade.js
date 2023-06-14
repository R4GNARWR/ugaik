const planPathes = document.querySelectorAll('.facade-plan__path');
const floorPathes = document.querySelectorAll('.floor_path');
const closeButtons = document.querySelectorAll('.modal-close');

Fancybox.defaults.closeButton = false;

closeButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
        Fancybox.close();
    })
})

planPathes.forEach((btn) => {
    btn.addEventListener('click', () => {
        Fancybox.show(
            [
                { src: "#floorModal", type: "inline" }
            ],
            {
                dragToClose: false,
                mainClass: 'modal-floor__container'
            }
        );
    })
})

Fancybox.bind("[data-fancybox]", {
    // Your custom options
  });


floorPathes.forEach((btn) => {
    btn.addEventListener('click', () => {
        Fancybox.show(
            [
                { src: "#flatModal", type: "inline" }
            ],
            {
                dragToClose: false,
                mainClass: 'modal-floor__container'
            }
        );
    })
})