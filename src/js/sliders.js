
document.addEventListener('DOMContentLoaded', () => {
  const swiperMain = new Swiper('.main-slider', {
    

    speed: 500,
    
    slidesPerView: 1,
    loop: true,
    
    pagination: {
      el: '.main-slider__pagination',
    },
    
    navigation: {
      nextEl: '.main-slider__nav-next',
      prevEl: '.main-slider__nav-prev',
    },
  });
  
  
  const swiperAboutGallery = new Swiper('.about-gallery__slider', {
    
    speed: 500,
    
    slidesPerView: 1,
    loop: true,
    
    pagination: {
      el: '.about-gallery__pagination',
    },
    
    navigation: {
      nextEl: '.about-gallery__nav-next',
      prevEl: '.about-gallery__nav-prev',
    },
  });
})
