const menuBtn = document.querySelector('.menu-btn');
const sideMenu = document.querySelector('.side-menu');

function toggleClass(element, className)
{
    if(element.classList.contains(className))
    {
        element.classList.remove(className)
    } else {
        element.classList.add(className)
    }
}

menuBtn.addEventListener('click', () =>
{
    toggleClass(menuBtn, 'active');
    toggleClass(sideMenu, 'active');
})
