let pageSlider = new Swiper('.page',{
    wrapperClass: "page__wrapper",
    slideClass: "page__screen",
    direction: 'vertical',
    slidesPerView: 'auto',
    parallax: true,
    keyboard: {
        enabled: true,
        onlyInViewport: true,
        pageUpDown: true,
    },
    mousewheel: {
        sensitivity: 1,
    },
    wachOverflow: true,
    speed: 800,
    observer: true,
    observerParents: true,
    observerSlideChildren: true,
    pagination: {
        el: '.page__pagination',
        type: 'bullets',
        clickable: true,
        bulletClass: "page__bullet",
        bulletActiveClass: "page__bullet_active",
    },
    scrollbar: {
        el: '.page__scroll',
        dragClass: "page__drag-scroll",
        draggable: true,
    },

    init: false,
    
    on: {
        init: function () {
            menuSlider();
        },
        slideChange: function () {
            menuSliderRemove();
            menuLinks[pageSlider.realIndex].classList.add('_active');
        },
    },
});

let menuLinks = document.querySelectorAll('.menu__link');

function menuSlider () {
    if (menuLinks.length > 0) {
        menuLinks[pageSlider.realIndex].classList.add('_active');
        for (let index = 0; index < menuLinks.length; index++) {
            const menuLink = menuLinks[index];
            menuLink.addEventListener("click", function (e) {
                menuSliderRemove();
                pageSlider.slideTo(index, 800);
                menuLink.classList.add('_active');
                e.preventDefault();
            })
        }
    }
}

function menuSliderRemove() {
    let menuLinkActive = document.querySelector('.menu__link._active');
    if (menuLinkActive) {
        menuLinkActive.classList.remove('_active');
    }
}

pageSlider.init()

let innerCursor = document.querySelector('.inner-cursor');
let outerCursor = document.querySelector('.outer-cursor');

document.addEventListener("mousemove", moveCursor);

function moveCursor(e) {
    let x = e.clientX;
    let y = e.clientY;
    
    innerCursor.style.left = `${x}px`;
    innerCursor.style.top = `${y}px`;
    outerCursor.style.left = `${x}px`;
    outerCursor.style.top = `${y}px`;
};

let links = Array.from(document.querySelectorAll("a"));

console.log(links);

links.forEach(link =>{
    link.addEventListener('mouseover', ()=>{
        innerCursor.classList.add("grow");
    });
    link.addEventListener('mouseleave', ()=>{
        innerCursor.classList.remove("grow");
    });
});

let bull = Array.from(document.querySelectorAll(".page__pagination"));

console.log(bull);

bull.forEach(bull =>{
    bull.addEventListener('mouseover', ()=>{
        innerCursor.classList.add("grow");
    });
    bull.addEventListener('mouseleave', ()=>{
        innerCursor.classList.remove("grow");
    });
});

let arrow__left = Array.from(document.querySelectorAll(".sim-slider-arrow-left"));

console.log(arrow__left);

arrow__left.forEach(arrow__left =>{
    arrow__left.addEventListener('mouseover', ()=>{
        innerCursor.classList.add("grow");
    });
    arrow__left.addEventListener('mouseleave', ()=>{
        innerCursor.classList.remove("grow");
    });
});

let arrow__right = Array.from(document.querySelectorAll(".sim-slider-arrow-right"));

console.log(arrow__right);

arrow__right.forEach(arrow__right =>{
    arrow__right.addEventListener('mouseover', ()=>{
        innerCursor.classList.add("grow");
    });
    arrow__right.addEventListener('mouseleave', ()=>{
        innerCursor.classList.remove("grow");
    });
});

let dots = Array.from(document.querySelectorAll(".sim-slider-dots"));

console.log(dots);

dots.forEach(dots =>{
    dots.addEventListener('mouseover', ()=>{
        innerCursor.classList.add("grow");
    });
    dots.addEventListener('mouseleave', ()=>{
        innerCursor.classList.remove("grow");
    });
});

let buttons = Array.from(document.querySelectorAll("button"));

console.log(buttons);

buttons.forEach(button =>{
    button.addEventListener('mouseover', ()=>{
        innerCursor.classList.add("grow");
    });
    button.addEventListener('mouseleave', ()=>{
        innerCursor.classList.remove("grow");
    });
});

const images = document.querySelectorAll('.slider .slider-line .block');
const sliderLine = document.querySelector('.slider .slider-line');
let count = 0;
let width;

function init() {
    console.log('resize');
    width = document.querySelector('.slider').offsetWidth;
    sliderLine.style.width = width * images.length + 'px';
    images.forEach(item => {
        item.style.width = width + 'px';
        item.style.height = 'auto';
    });
    rollSlider();
}

init();
window.addEventListener('resize', init);

document.querySelector('.slider-next').addEventListener('click', function () {
    count++;
    if (count >= images.length) {
        count = 0;
    }
    rollSlider();
});

document.querySelector('.slider-prev').addEventListener('click', function () {
    count--;
    if (count < 0) {
        count = images.length - 1;
    }
    rollSlider();
});

function rollSlider() {
    sliderLine.style.transform = 'translate(-' + count * width + 'px)';

}

function Sim(sldrId) {

    let id = document.getElementById(sldrId);
    if(id) {
        this.sldrRoot = id
    }
    else {
        this.sldrRoot = document.querySelector('.sim-slider')
    };

    // Carousel objects
    this.sldrList = this.sldrRoot.querySelector('.sim-slider-list');
    this.sldrElements = this.sldrList.querySelectorAll('.sim-slider-element');
    this.sldrElemFirst = this.sldrList.querySelector('.sim-slider-element');
    this.leftArrow = this.sldrRoot.querySelector('div.sim-slider-arrow-left');
    this.rightArrow = this.sldrRoot.querySelector('div.sim-slider-arrow-right');
    this.indicatorDots = this.sldrRoot.querySelector('div.sim-slider-dots');

    // Initialization
    this.options = Sim.defaults;
    Sim.initialize(this)
};

Sim.defaults = {

    // Default options for the carousel
    loop: true,     // Бесконечное зацикливание слайдера
    auto: true,     // Автоматическое пролистывание
    interval: 5000, // Интервал между пролистыванием элементов (мс)
    arrows: true,   // Пролистывание стрелками
    dots: true      // Индикаторные точки
};

Sim.prototype.elemPrev = function(num) {
    num = num || 1;

    let prevElement = this.currentElement;
    this.currentElement -= num;
    if(this.currentElement < 0) this.currentElement = this.elemCount-1;

    if(!this.options.loop) {
        if(this.currentElement == 0) {
            this.leftArrow.style.display = 'none'
        };
        this.rightArrow.style.display = 'block'
    };
    
    this.sldrElements[this.currentElement].style.opacity = '1';
    this.sldrElements[prevElement].style.opacity = '0';

    if(this.options.dots) {
        this.dotOn(prevElement); this.dotOff(this.currentElement)
    }
};

Sim.prototype.elemNext = function(num) {
    num = num || 1;
    
    let prevElement = this.currentElement;
    this.currentElement += num;
    if(this.currentElement >= this.elemCount) this.currentElement = 0;

    if(!this.options.loop) {
        if(this.currentElement == this.elemCount-1) {
            this.rightArrow.style.display = 'none'
        };
        this.leftArrow.style.display = 'block'
    };

    this.sldrElements[this.currentElement].style.opacity = '1';
    this.sldrElements[prevElement].style.opacity = '0';

    if(this.options.dots) {
        this.dotOn(prevElement); this.dotOff(this.currentElement)
    }
};

Sim.prototype.dotOn = function(num) {
    this.indicatorDotsAll[num].style.cssText = 'background-color:#BBB; cursor:pointer;'
};

Sim.prototype.dotOff = function(num) {
    this.indicatorDotsAll[num].style.cssText = 'background-color:#556; cursor:default;'
};

Sim.initialize = function(that) {

    // Constants
    that.elemCount = that.sldrElements.length; // Количество элементов

    // Variables
    that.currentElement = 0;
    let bgTime = getTime();

    // Functions
    function getTime() {
        return new Date().getTime();
    };
    function setAutoScroll() {
        that.autoScroll = setInterval(function() {
            let fnTime = getTime();
            if(fnTime - bgTime + 10 > that.options.interval) {
                bgTime = fnTime; that.elemNext()
            }
        }, that.options.interval)
    };

    // Start initialization
    if(that.elemCount <= 1) {   // Отключить навигацию
        that.options.auto = false; that.options.arrows = false; that.options.dots = false;
        that.leftArrow.style.display = 'none'; that.rightArrow.style.display = 'none'
    };
    if(that.elemCount >= 1) {   // показать первый элемент
        that.sldrElemFirst.style.opacity = '1';
    };

    if(!that.options.loop) {
        that.leftArrow.style.display = 'none';  // отключить левую стрелку
        that.options.auto = false; // отключить автопркрутку
    }
    else if(that.options.auto) {   // инициализация автопрокруки
        setAutoScroll();
        // Остановка прокрутки при наведении мыши на элемент
        that.sldrList.addEventListener('mouseenter', function() {clearInterval(that.autoScroll)}, false);
        that.sldrList.addEventListener('mouseleave', setAutoScroll, false)
    };

    if(that.options.arrows) {  // инициализация стрелок
        that.leftArrow.addEventListener('click', function() {
            let fnTime = getTime();
            if(fnTime - bgTime > 1000) {
                bgTime = fnTime; that.elemPrev()
            }
        }, false);
        that.rightArrow.addEventListener('click', function() {
            let fnTime = getTime();
            if(fnTime - bgTime > 1000) {
                bgTime = fnTime; that.elemNext()
            }
        }, false)
    }
    else {
        that.leftArrow.style.display = 'none'; that.rightArrow.style.display = 'none'
    };

    if(that.options.dots) {  // инициализация индикаторных точек
        let sum = '', diffNum;
        for(let i=0; i<that.elemCount; i++) {
            sum += '<span class="sim-dot"></span>'
        };
        that.indicatorDots.innerHTML = sum;
        that.indicatorDotsAll = that.sldrRoot.querySelectorAll('span.sim-dot');
        // Назначаем точкам обработчик события 'click'
        for(let n=0; n<that.elemCount; n++) {
            that.indicatorDotsAll[n].addEventListener('click', function() {
                diffNum = Math.abs(n - that.currentElement);
                if(n < that.currentElement) {
                    bgTime = getTime(); that.elemPrev(diffNum)
                }
                else if(n > that.currentElement) {
                    bgTime = getTime(); that.elemNext(diffNum)
                }
                // Если n == that.currentElement ничего не делаем
            }, false)
        };
        that.dotOff(0);  // точка[0] выключена, остальные включены
        for(let i=1; i<that.elemCount; i++) {
            that.dotOn(i)
        }
    }
};

new Sim();

"use strict"

document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('form');
    form.addEventListener('submit', formSend);

    async function formSend(e) {
        e.preventDefault();

        let error = formValidate(form);

        let formData = new FormData(form);
        /*
        formData.append('image', formImage.files[0]);
        */
        if (error === 0) {
            form.classList.add('_sending');
            let response = await fetch('sendmail.php', {
                method: 'POST',
                body: formData
            });
            if (response.ok) {
                let result = await response.json();
                alert(result.message);
                formPreview.innerHTML = '';
                form.reset();
                form.classList.remove('_sending');
            } else {
                alert('Ошибка');
                form.classList.remove('_sending');
            }
        } else {
            alert('Заполните обязательные поля *');
        }
    }


    function formValidate(form) {
        let error = 0;
        let formReq = document.querySelectorAll('._req');

        for (let index = 0; index < formReq.length; index++) {
            const input = formReq[index];
            formRemoveError(input);

            if (input.classList.contains('_email')){
                if (emailTest(input)){
                    formAddError(input);
                    error++;
                }
            } else if (input.getAttribute("type") === "checkbox" && input.checked === false) {
                formAddError(input);
                error++;
            } else {
                if (input.value === '') {
                    formAddError(input);
                    error++;
                }
            }

        }
        return error;
    }
    function formAddError(input) {
        input.parentElement.classList.add('_error');
        input.classList.add('_error');
    }
    function formRemoveError(input) {
        input.parentElement.classList.remove('_error');
        input.classList.remove('_error');
    }
    //Функция текста email
    function emailTest(input) {
        return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
    }
});