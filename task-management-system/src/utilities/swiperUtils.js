import Swiper from 'swiper';
import 'swiper/swiper-bundle.css';

export const initializeSwiper = (containerSelector, slidesData) => {
  const swiperContainer = document.querySelector(containerSelector);
  if (!swiperContainer) return;

  const slides = slidesData
    .map(
      (slide, index) => `
      <div class="swiper-slide">  
        <div class="slide-content">
          <div class="slide-text">
            <h2 style="color: ${slide.textColor};">${slide.title}</h2>
            <button class="btn-get-started" style="background-color: ${slide.textColor};">
              Get Started
            </button>
          </div>
          <div class="slide-image">
            <img src="${slide.image}" alt="${slide.title} loading="lazy" />
          </div>
        </div>
      </div>
    `
    )
    .join('');

  swiperContainer.innerHTML = `
    <div class="swiper-wrapper">
      ${slides}
    </div>
    <div class="swiper-pagination"></div>
  `;

  const swiper = new Swiper(containerSelector, {
    loop: true,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  });

  return swiper;
};