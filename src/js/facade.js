const planPathes = document.querySelectorAll('.facade-plan__path');
const floorPathes = document.querySelectorAll('.floor_path');

if(planPathes)
{
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
}
if(floorPathes)
{
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
}
