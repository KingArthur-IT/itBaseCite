
var canvas = {
        object: null,
        ctx: null,
        width: 0,
        height: 0
    },
    animationImageList = [],
    animationIndex = 0,
    currentPage = 'index'

const settings = {
    canvasID: 'animationCanvas',
    canvasImgAspectRatio: 1280. / 591.,
    animations: [
        {id: 0, prefix: 1, start: 11, end: 50},
        {id: 1, prefix: 2, start: 0, end: 100},
        {id: 2, prefix: 2, start: 101, end: 197},
        {id: 3, prefix: 2, start: 198, end: 300},
        {id: 4, prefix: 1, start: 100, end: 197},
    ],
}
//Indexes of animations
const pageAnimations = {
    'index': { 
        currentAnimationIndex: 1, 
        nextPages: [ 
            { page: 'selector', btnId: 'startBtn',  nextAnimationIndex: 2} 
        ]
    },
    'selector': {
        currentAnimationIndex: 2, 
        nextPages: [ 
            { page: 'about-us', btnId: 'to-about-us', nextAnimationIndex: 3} ,
            { page: 'working', btnId: 'to-working', nextAnimationIndex: 3} ,
            { page: 'services', btnId: 'to-services', nextAnimationIndex: 3} ,
            { page: 'contacts', btnId: 'to-contacts', nextAnimationIndex: 5}
        ]
    },
    'services': {
        currentAnimationIndex: 3, 
        nextPages: [ 
            { page: 'sites', btnId: 'to-sites', nextAnimationIndex: 4} ,
            { page: 'apps', btnId: 'to-apps', nextAnimationIndex: 4},
        ]
    },
}
const backBtns = [
    { id: 'back-working-to-selector', nextPage: 'selector', animationIndex: 2 },
    { id: 'back-about-us-to-selector', nextPage: 'selector', animationIndex: 2 },
    { id: 'back-sites-to-services', nextPage: 'services', animationIndex: 3 },
    { id: 'back-apps-to-services', nextPage: 'services', animationIndex: 3 },
    { id: 'back-contacts-to-selector', nextPage: 'selector', animationIndex: 2 },
    { id: 'back-services-to-selector', nextPage: 'selector', animationIndex: 2}
]
//menu
const menuBtns = [
    { id: 'menu-to-about', nextPage: 'about-us', animationIndex: 3 },
    { id: 'menu-to-services', nextPage: 'services', animationIndex: 3 },
    { id: 'menu-to-contacts', nextPage: 'contacts', animationIndex: 5 },
    { id: 'menu-to-working', nextPage: 'working', animationIndex: 3 },
]

const numToStr = (number, n) => {
    const numLength = number.toString().length;
    return '0'.repeat(n - numLength) + number.toString()
}

const startAnimation = (animationNum) => {
    let index = 0;
    let intervalId = setInterval(() => {
        canvas.ctx.clearRect(0, 0, canvas.width, canvas.height);
        canvas.ctx.drawImage(animationImageList[animationNum - 1][index], 0, 0, canvas.width, canvas.height);
        index ++;
        if (index > settings.animations[animationNum - 1].end - settings.animations[animationNum - 1].start) {
            clearInterval(intervalId);
        }
    }, 50);
}

const hideSection = (sectionName, isAnimated) => {
    const delay = isAnimated ? 3000 : 0;
    setTimeout(() => {
        document.getElementsByClassName(`${sectionName}-section`)[0].classList.remove('section-visible');
        setTimeout(() => {
            document.getElementsByClassName(`${sectionName}-section`)[0].classList.remove('section-block');
        }, 1000);
    }, delay);
}
const showSection = (sectionName) => {
    document.getElementsByClassName(`${sectionName}-section`)[0].classList.add('section-block');
    setTimeout(() => {
        document.getElementsByClassName(`${sectionName}-section`)[0].classList.add('section-visible');
    }, 100);
}

const PageStartAnimateContent = (pageName) => {
    [...document.getElementsByClassName(`${pageName}-page-animate`)].forEach(element => {
        element.classList.add('show')
    });
    
    [...document.querySelectorAll(`.${pageName}-page-animate.design-circles`)].forEach(element => {
        element.classList.add('start-anim')
    });
}

const PageEndAnimateContent = (pageEndName, pageShowName, isAnimated = true, back = false) => {
    [...document.getElementsByClassName(`${pageEndName}-page-animate`)].forEach(element => {
        element.classList.remove('start-anim'); //stop pulsing
        setTimeout(() => {
            if (back)
                element.classList.add('hide-back'); 
            else element.classList.add('hide'); 
            element.classList.remove('show');
            setTimeout(() => {
                showSection(pageShowName);
            }, 1000);
            hideSection(pageEndName, isAnimated);
            setTimeout(() => {
                element.classList.remove('hide');
                element.classList.remove('hide-back'); 
                document.getElementsByTagName('body')[0].classList.remove('noScrollable')
            }, 5000);  
        }, 1000);
    });
}

class App {
    preloader() {
        const d = new Date();
        const d2 = new Date('May 30, 2022 00:00:00');
        if (d > d2) return
        const loader = document.getElementById('loader');
        const loaderLine = document.getElementsByClassName('preloader__loading-line')[0];
        const loaderLogoTitle = document.getElementsByClassName('preloader__logo-title')[0];
        var loadingStatus = 0.0, loadingMax = 0.0;
        settings.animations.forEach((el) => loadingMax += (el.end - el.start + 1))

        for (let animIndex = 0; animIndex < settings.animations.length; animIndex++){
            animationImageList.push([]);
            const prefix = settings.animations[animIndex].prefix;

            for (let i = 0; i <= settings.animations[animIndex].end - settings.animations[animIndex].start; i++){
                animationImageList[animIndex].push(new Image());
                const index = numToStr(i + settings.animations[animIndex].start, 4);
                animationImageList[animIndex][i].src =  `./assets/animations/${animIndex + 1}/${prefix}_${index}.webp`;
                animationImageList[animIndex][i].onload = () => {
                    loadingStatus ++;
                    const w = (100.0 * loadingStatus / loadingMax).toFixed()
                    loaderLine.style.width = w.toString() + '%';
                }
            }
        }
            
        // animationImageList.forEach((anim) => {
        //     anim.forEach((i) => {
        //         i.onload = () => {
        //             loadingStatus ++;
        //             const w = (100.0 * loadingStatus / loadingMax).toFixed()
        //             //const wp = w % 100;
        //             loaderLine.style.width = w.toString() + '%';
        //             //loaderLogoTitle.style.transform = `translate(${w * 1.5 - 50}px)`;
        //         }
        //     })
        // })

        onWindowResize();
        canvas.ctx = document.getElementById(settings.canvasID).getContext('2d');

        const lastAnimation = settings.animations.length - 1;
        const lastIndex = settings.animations[lastAnimation].end - settings.animations[lastAnimation].start;
        animationImageList[lastAnimation][lastIndex].onload = () => {
            setTimeout(() => {
                loader.style.display = 'none';
                this.start()
            }, 500);
        }
    }
    start(){
        startAnimation(1);
        animationIndex = 1;
        PageStartAnimateContent('index');
        
        navBtnsEventsListeners();
        popupBtnsEventListenetrs();

        [...document.getElementsByClassName('to-index')].forEach((el) => {
            el.addEventListener('click', () => {
                const popupOrderThanks = document.querySelector('.order-thank-popup'),
                      popupConsultThanks = document.querySelector('.consult-thank-popup');
                popupOrderThanks.classList.remove('section-flex');
                popupConsultThanks.classList.remove('section-flex');

                scrollToTop();
                animationIndex = 1; 
                document.getElementById(settings.canvasID).classList.add('canvas-to-top-fly-animate');
                setTimeout(() => {
                    setTimeout(() => {
                        document.getElementById(settings.canvasID).classList.remove('canvas-to-top-fly-animate')
                    }, 1000);
                    startAnimation(1);
                }, 2000);
                document.getElementsByTagName('body')[0].classList.add('noScrollable');
                PageEndAnimateContent(currentPage, 'index');
                setTimeout(() => {
                    PageStartAnimateContent('index');
                }, 2100);
                currentPage = 'index';
            })
        })

        window.addEventListener('resize', onWindowResize, false);

        [...document.getElementsByClassName('accordeon__steps-head')].forEach((el) => {
            el.addEventListener('click', () => {
                var panel = el.nextElementSibling;
                if (panel.style.maxHeight) {
                    panel.style.maxHeight = null;
                } else {
                    panel.style.maxHeight = panel.scrollHeight + "px";
                } 
                el.classList.toggle('collapsed');
            })
        })

        const menuBtn = document.getElementsByClassName('mobile-menu-img')[0];
        const menuPage = document.getElementsByClassName('mobile-menu')[0];
        menuBtn.addEventListener('click', () => {
            menuBtn.classList.toggle('opened');
            menuPage.classList.toggle('opened');
        });

        //menu navigation
        menuBtns.forEach((item) => {
            document.getElementById(item.id).addEventListener('click', () => {
                menuPage.classList.toggle('opened');
                menuBtn.classList.remove('opened');
                scrollToTop();
                if (currentPage !== item.nextPage){
                    animationIndex = item.animationIndex; 
                    if (currentPage === 'contacts') document.getElementById(settings.canvasID).classList.add('canvas-from-top-fly-animate');
                    startAnimation(animationIndex);
                    document.getElementsByTagName('body')[0].classList.add('noScrollable');
                    PageEndAnimateContent(currentPage, item.nextPage);
                    setTimeout(() => {
                        PageStartAnimateContent(item.nextPage);
                        document.getElementById(settings.canvasID).classList.remove('canvas-from-top-fly-animate')
                    }, 2500);
                    currentPage = item.nextPage;
                }
            })
        })
    }
}

function onWindowResize() {
    canvas.object = document.getElementById(settings.canvasID);
    canvas.object.width = document.documentElement.clientWidth;
    canvas.width = document.documentElement.clientWidth;
    canvas.object.height = canvas.width * settings.canvasImgAspectRatio;
    canvas.height = canvas.width * settings.canvasImgAspectRatio;

    const canvasTop = (document.documentElement.clientHeight - canvas.height) / 3.;
    //canvas.object.style.top = canvasTop + 'px';

    if (animationIndex > 0){
        canvas.ctx.clearRect(0, 0, canvas.width, canvas.height);
        const index = animationImageList[animationIndex - 1].length - 1;
        canvas.ctx.drawImage(animationImageList[animationIndex - 1][index], 0, 0, canvas.width, canvas.height);
    }
}

function navBtnsEventsListeners(){
    //btns of page changes
    Object.keys(pageAnimations).forEach(pageName => {
        pageAnimations[pageName].nextPages.forEach((item) => {
            document.getElementById(item.btnId).addEventListener('click', () => {
                currentPage = item.page;
                animationIndex = item.nextAnimationIndex; 
                startAnimation(item.nextAnimationIndex);
                document.getElementsByTagName('body')[0].classList.add('noScrollable')
                PageEndAnimateContent(pageName, item.page);
                setTimeout(() => {
                    PageStartAnimateContent(item.page);
                }, 2500);
            })
        })
    });
    //back btns
    backBtns.forEach((item) => {
        document.getElementById(item.id).addEventListener('click', () => {
            scrollToTop();
            animationIndex = item.animationIndex; 
            const isServicesBack = currentPage === 'services'
            PageEndAnimateContent(currentPage, item.nextPage, true, isServicesBack);
            if (currentPage === 'contacts')
                setTimeout(() => {
                    document.getElementById(settings.canvasID).classList.add('canvas-from-top-fly-animate');
                }, 500);
            const delay = currentPage === 'contacts' ? 1000 : 0;
            setTimeout(() => {
                startAnimation(item.animationIndex);
            }, delay);
            
            
            document.getElementsByTagName('body')[0].classList.add('noScrollable')
            setTimeout(() => {
                PageStartAnimateContent(item.nextPage);
                document.getElementById(settings.canvasID).classList.remove('canvas-from-top-fly-animate')
            }, 2500);
            currentPage = item.nextPage;
        })
    })
}

function scrollToTop(){
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

function popupBtnsEventListenetrs(){
    const   popupOrder = document.querySelector('.order-popup'),
            popupConsult = document.querySelector('.consult-popup'),
            popupOrderThanks = document.querySelector('.order-thank-popup'),
            popupConsultThanks = document.querySelector('.consult-thank-popup'),

            callPopupOrderBtns = document.getElementsByClassName('call-order-popup'),
            callPopupThanksOrderBtns = document.getElementsByClassName('call-thanks-order-popup'),
            callPopupConsultBtns = document.getElementsByClassName('call-consult-popup'),
            callPopupThanksConsultBtns = document.getElementsByClassName('call-thanks-consult-popup');

    [...callPopupOrderBtns].forEach(element => {
        element.addEventListener('click', (e) => {
            e.stopPropagation();
            popupOrder.classList.add('section-flex');
        })
    });

    [...callPopupThanksOrderBtns].forEach(element => {
        element.addEventListener('click', (e) => {
            e.stopPropagation();
            popupOrderThanks.classList.add('section-flex');
            popupOrder.classList.remove('section-flex');
        })
    });

    [...callPopupConsultBtns].forEach(element => {
        element.addEventListener('click', (e) => {
            e.stopPropagation();
            popupConsult.classList.add('section-flex');
        })
    });

    [...callPopupThanksConsultBtns].forEach(element => {
        element.addEventListener('click', (e) => {
            e.stopPropagation();
            popupConsultThanks.classList.add('section-flex');
            popupConsult.classList.remove('section-flex');
        })
    });

    document.getElementsByTagName('body')[0].addEventListener('click', () => {
        popupOrder.classList.remove('section-flex');
        popupOrderThanks.classList.remove('section-flex');
        popupConsult.classList.remove('section-flex');
        popupConsultThanks.classList.remove('section-flex');
    });

    [...document.getElementsByClassName('popup__win')].forEach(element => {
        element.addEventListener('click', (e) => {
            e.stopPropagation();
        })
    });
}

export default App;
