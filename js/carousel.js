// const galleryContainer = document.querySelector('.gallery-container');
// const galleryControlsContainer = document.querySelector('.gallery-controls');
// const galleryControls = ['previous', 'next'];
// const galleryItems = document.querySelectorAll('.gallery-item');

// class Carousel {
//   constructor(container, items, controls) {
//     this.carouselContainer = container;
//     this.carouselControls = controls;
//     this.carouselArray = [...items];
//   }

//   // Assign initial css classes for gallery and nav items
//   setInitialState() {
//     this.carouselArray[0].classList.add('gallery-item-first');
//     this.carouselArray[1].classList.add('gallery-item-previous');
//     this.carouselArray[2].classList.add('gallery-item-selected');
//     this.carouselArray[3].classList.add('gallery-item-next');
//     this.carouselArray[4].classList.add('gallery-item-last');
//   }

//   // Update the order state of the carousel with css classes
//   setCurrentState(target, selected, previous, next, first, last) {

//     selected.forEach(el => {
//       el.classList.remove('gallery-item-selected');

//       if (target.className == 'gallery-controls-previous') {
//         el.classList.add('gallery-item-next');
//       } else {
//         el.classList.add('gallery-item-previous');
//       }
//     });

//     previous.forEach(el => {
//       el.classList.remove('gallery-item-previous');

//       if (target.className == 'gallery-controls-previous') {
//         el.classList.add('gallery-item-selected');
//       } else {
//         el.classList.add('gallery-item-first');
//       }
//     });

//     next.forEach(el => {
//       el.classList.remove('gallery-item-next');

//       if (target.className == 'gallery-controls-previous') {
//         el.classList.add('gallery-item-last');
//       } else {
//         el.classList.add('gallery-item-selected');
//       }
//     });

//     first.forEach(el => {
//       el.classList.remove('gallery-item-first');

//       if (target.className == 'gallery-controls-previous') {
//         el.classList.add('gallery-item-previous');
//       } else {
//         el.classList.add('gallery-item-last');
//       }
//     });

//     last.forEach(el => {
//       el.classList.remove('gallery-item-last');

//       if (target.className == 'gallery-controls-previous') {
//         el.classList.add('gallery-item-first');
//       } else {
//         el.classList.add('gallery-item-next');
//       }
//     });
//   }

//   // Construct the carousel controls
//   setControls() {
//     this.carouselControls.forEach(control => {
//       galleryControlsContainer.appendChild(document.createElement('button')).className = `gallery-controls-${control}`;
//     }); 

//     !!galleryControlsContainer.childNodes[0] ? galleryControlsContainer.childNodes[0].innerHTML = this.carouselControls[0] : null;
//     !!galleryControlsContainer.childNodes[1] ? galleryControlsContainer.childNodes[1].innerHTML = this.carouselControls[1] : null;
//   }
 
//   // Add a click event listener to trigger setCurrentState method to rearrange carousel
//   useControls() {
//     const triggers = [...galleryControlsContainer.childNodes];

//     triggers.forEach(control => {
//       control.addEventListener('click', () => {
//         const target = control;
//         const selectedItem = document.querySelectorAll('.gallery-item-selected');
//         const previousSelectedItem = document.querySelectorAll('.gallery-item-previous');
//         const nextSelectedItem = document.querySelectorAll('.gallery-item-next');
//         const firstCarouselItem = document.querySelectorAll('.gallery-item-first');


//         if ($('.gallery-item-last').next('div').length) {
//           console.log(target)
//           // console.log($('.gallery-item-last').next('div')[0])
//           // const lastCarouselItem = $('.gallery-item-last').next('div')[0];
//         }


//         const lastCarouselItem = document.querySelectorAll('.gallery-item-last');

//         this.setCurrentState(target, selectedItem, previousSelectedItem, nextSelectedItem, firstCarouselItem, lastCarouselItem);
//       });
//     });
//   }
// }

// const exampleCarousel = new Carousel(galleryContainer, galleryItems, galleryControls);

// exampleCarousel.setControls();
// exampleCarousel.setInitialState();
// exampleCarousel.useControls();




$('.gallery .gallery-container .gallery-item').each(function(index, el) {
  index == 2 ? $(el).addClass('gallery-item-first') : null;
  index == 3 ? $(el).addClass('gallery-item-previous') : null
  index == 4 ? $(el).addClass('gallery-item-selected') : null
  index == 5 ? $(el).addClass('gallery-item-next') : null
  index == 6 ? $(el).addClass('gallery-item-last') : null
});

var cl = 'gallery-item-first gallery-item-previous gallery-item-selected gallery-item-next gallery-item-last';

$(document).on('click', '.gallery-controls  button', function(){
  if($(this).hasClass('next')){
    if($('.gallery-item-last').next('div').length){

      $('.gallery-item').removeClass('gallery-item-first')
      var count = Number($('.gallery-item-last').next('div').index());

      if (count > 3) {
        $('.gallery-item').eq(count-4).removeClass(cl).addClass('gallery-item-first')
      }
      $('.gallery-item').eq(count-3).removeClass(cl).addClass('gallery-item-previous')
      $('.gallery-item').eq(count-2).removeClass(cl).addClass('gallery-item-selected')
      $('.gallery-item').eq(count-1).removeClass(cl).addClass('gallery-item-next')
      $('.gallery-item').eq(count).removeClass(cl).addClass('gallery-item-last')
    }
    else if(!$('.gallery-item-last').next('div').length && $('.gallery-item-last').length){

      $('.gallery-item').removeClass('gallery-item-first')
      var count = Number($('.gallery-item-last').index());
      $('.gallery-item').eq(count).removeClass(cl)

      $('.gallery-item').eq(count-3).removeClass(cl).addClass('gallery-item-first')
      $('.gallery-item').eq(count-2).removeClass(cl).addClass('gallery-item-previous')
      $('.gallery-item').eq(count-1).removeClass(cl).addClass('gallery-item-selected')
      $('.gallery-item').eq(count).removeClass(cl).addClass('gallery-item-next')
    }
    else if(!$('.gallery-item-next').next('div').length && $('.gallery-item-next').length){

      $('.gallery-item').removeClass('gallery-item-first')
      var count = Number($('.gallery-item-next').index());
      $('.gallery-item').eq(count).removeClass(cl)

      $('.gallery-item').eq(count-2).removeClass(cl).addClass('gallery-item-first')
      $('.gallery-item').eq(count-1).removeClass(cl).addClass('gallery-item-previous')
      $('.gallery-item').eq(count).removeClass(cl).addClass('gallery-item-selected')
    }
  }
  if($(this).hasClass('prev')){
    if($('.gallery-item-first').prev('div').length){

      $('.gallery-item').removeClass('gallery-item-last')
      var count = Number($('.gallery-item-first').prev('div').index());

      $('.gallery-item').eq(count).removeClass(cl).addClass('gallery-item-first')
      $('.gallery-item').eq(count+1).removeClass(cl).addClass('gallery-item-previous')
      $('.gallery-item').eq(count+2).removeClass(cl).addClass('gallery-item-selected')
      $('.gallery-item').eq(count+3).removeClass(cl).addClass('gallery-item-next')
      $('.gallery-item').eq(count+4).removeClass(cl).addClass('gallery-item-last')
    }
    else if(!$('.gallery-item-first').prev('div').length && $('.gallery-item-first').length){

      $('.gallery-item').removeClass('gallery-item-last')
      var count = Number($('.gallery-item-first').index());
      $('.gallery-item').eq(count).removeClass(cl)

      $('.gallery-item').eq(count).removeClass(cl).addClass('gallery-item-previous')
      $('.gallery-item').eq(count+1).removeClass(cl).addClass('gallery-item-selected')
      $('.gallery-item').eq(count+2).removeClass(cl).addClass('gallery-item-next')
      $('.gallery-item').eq(count+3).removeClass(cl).addClass('gallery-item-last')
    }
    else if(!$('.gallery-item-previous').prev('div').length && $('.gallery-item-previous').length){

      $('.gallery-item').removeClass('gallery-item-last')
      var count = Number($('.gallery-item-previous').index());
      $('.gallery-item').eq(count).removeClass(cl)

      $('.gallery-item').eq(count).removeClass(cl).addClass('gallery-item-selected')
      $('.gallery-item').eq(count+1).removeClass(cl).addClass('gallery-item-next')
      $('.gallery-item').eq(count+2).removeClass(cl).addClass('gallery-item-last')
    }
  }
});

setTimeout(function(){
  $('.gallery-container').height($('.gallery-item-selected').height());
}, 500);