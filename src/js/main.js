const mainContentWrap = document.querySelector('.main-content');
const menuBtn = document.querySelector('.menu-btn');
const sideMenu = document.querySelector('.side-menu');
const callorderButtons = document.querySelectorAll('[data-modal]')
const closeButtons = document.querySelectorAll('.modal-close');
const flatVisualContainers = document.querySelectorAll('.flat-visual');
const flatVisualChangeButons = document.querySelectorAll('.changeFlatVisual');

Fancybox.defaults.closeButton = false;

function addClass(element, className)
{

    if(!element.classList.contains(className))
    {
        element.classList.add(className);
    }
    
}
function removeClass(element, className)
{
    if(element.classList.contains(className))
    {
        element.classList.remove(className);
    }
}
function toggleClass(element, className)
{
    if(element.classList.contains(className))
    {
        element.classList.remove(className);
    } else {
        element.classList.add(className);
    }
}

function toggleTabs(pressedTab, tabContainer)
{
    if (!pressedTab || !tabContainer) {
        return;
    }
    const tabsList = tabContainer.querySelectorAll('.tab');
    if(!pressedTab.classList.contains('active')) pressedTab.classList.add('active');
    
    if (tabsList && tabsList.length > 0 )
    {
        tabsList.forEach(tab => {
            if(tab === pressedTab && tab.classList.contains('active')) {
                return;
            }
            if(tab !== pressedTab && tab.classList.contains('active'))
            {   
                tab.classList.remove('active');
            }
        });
    }
}

function changeContentSlide(slideToChange , slidesContainer)
{
    if (!slideToChange || !slidesContainer) {
        return;
    }
    const slidesList = slidesContainer.querySelectorAll('.content-slide');


    if (slidesList && slidesList.length > 0 )
    {
        slidesList.forEach(slide => {
            if(slide === slideToChange && slide.style.display === 'block' ) {
                return;
            }
            if(slide !== slideToChange && slide.style.display === 'block' )
            {   
                slide.style.display = 'none';
            }
            else
            {
                slide.style.display = 'block';
            }
        });
    }
    
}

function changeFlatsVisual(pressedButton, visual)
{
    if(flatVisualContainers && visual)
    {
        flatVisualContainers.forEach((container) => {
            if(container === visual)
            {
                removeClass(container, 'd-none')
            }
            else
            {
                addClass(container, 'd-none')
            }
        })
    }
    if(flatVisualChangeButons && pressedButton)
    {
        flatVisualChangeButons.forEach((iteratedButton)=> {
            if(iteratedButton === pressedButton)
            {
                addClass(iteratedButton, 'active');
            } else {
                removeClass(iteratedButton, 'active');
            }
        })

    }

}
Fancybox.bind("[data-fancybox]", {
    // Your custom options
});

if(closeButtons)
{
    closeButtons.forEach((btn) => {
        btn.addEventListener('click', () => {
            Fancybox.getInstance().close();
        })
    })
}


if(menuBtn)
{
    menuBtn.addEventListener('click', () =>
    {
        toggleClass(menuBtn, 'active');
        toggleClass(sideMenu, 'active');
        toggleClass(mainContentWrap, 'darken');
    })
}

$(".js-range-slider").ionRangeSlider({

});

