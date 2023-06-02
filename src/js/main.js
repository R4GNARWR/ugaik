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

function toggleTabs(pressedTab, tabContainer)
{
    const tabs = tabContainer.querySelectorAll('.tab');
    if (tabs && tabs.length > 0 )
    {
        tabs.forEach(tab => {
            if(tab === pressedTab && tab.classList.contains('active'))
            {
                return;
            }
            else if(tab !== pressedTab && tab.classList.contains('active'))
            {
                tab.classList.remove('active');
                return;
            }
            else
            {
                tab.classList.add('active');
            }
        });
    }

}
if(menuBtn)
{
    menuBtn.addEventListener('click', () =>
    {
        toggleClass(menuBtn, 'active');
        toggleClass(sideMenu, 'active');
    })
}

$(".js-range-slider").ionRangeSlider({

});

