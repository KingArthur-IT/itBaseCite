var  animationIndex = 0,
        currentPage = 'index',
        isAnimating = false

const mobileAnimations = [
    document.getElementById('mobile-anim-1'),
    document.getElementById('mobile-anim-2'),
    document.getElementById('mobile-anim-3'),
    document.getElementById('mobile-anim-4'),
    document.getElementById('mobile-anim-5')
]
const desctopAnimations = [
    document.getElementById('desctop-anim-1'),
    document.getElementById('desctop-anim-2'),
    document.getElementById('desctop-anim-3'),
    document.getElementById('desctop-anim-4'),
    document.getElementById('desctop-anim-5')
]

var videoAnimationElements = window.innerWidth > 599 ? desctopAnimations : mobileAnimations;

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
            { page: 'about-us', btnId: 'to-about-us', nextAnimationIndex: 3},
            { page: 'working', btnId: 'to-working', nextAnimationIndex: 3},
            { page: 'services', btnId: 'to-services', nextAnimationIndex: 3},
            { page: 'contacts', btnId: 'to-contacts', nextAnimationIndex: 5},
            { page: 'ceo', btnId: 'to-ceo', nextAnimationIndex: 5}
        ]
    },
    'services': {
        currentAnimationIndex: 3, 
        nextPages: [ 
            { page: 'sites', btnId: 'to-sites', nextAnimationIndex: 4},
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
    { id: 'back-services-to-selector', nextPage: 'selector', animationIndex: 2},
    { id: 'back-ceo-to-selector', nextPage: 'selector', animationIndex: 2}
]
//menu
const menuBtns = [
    { class: 'menu-to-about', nextPage: 'about-us', animationIndex: 3 },
    { class: 'menu-to-services', nextPage: 'services', animationIndex: 3 },
    { class: 'menu-to-contacts', nextPage: 'contacts', animationIndex: 5 },
    { class: 'menu-to-working', nextPage: 'working', animationIndex: 3 },
]

const startAnimation = (animationNum) => {
    if (isAnimating) return
    isAnimating = true;
    videoAnimationElements.forEach((el) => {
        el.classList.remove('video-visible');
    });
    videoAnimationElements[animationNum - 1].classList.add('video-visible');
    videoAnimationElements[animationNum - 1].currentTime = '0.0';
    videoAnimationElements[animationNum - 1].play();
    setTimeout(() => {
        isAnimating = false;
    }, 2000);
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
    if (sectionName === 'index')
        document.getElementsByClassName('navbar')[0].classList.add('hidden-nav')
    else document.getElementsByClassName('navbar')[0].classList.remove('hidden-nav')
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
            //setTimeout(() => {
                hideSection(pageEndName, isAnimated);
            //}, 1000);

            setTimeout(() => {
                showSection(pageShowName);
            }, 1000);
            
            setTimeout(() => {
                element.classList.remove('show');
                element.classList.remove('hide');
                element.classList.remove('hide-back'); 
                document.getElementsByTagName('body')[0].classList.remove('noScrollable')
            }, 5000);  
        }, 100);
    });
}

class App {
    preloader() {
        const d = new Date();
        const d2 = new Date('June 30, 2022 00:00:00');
        if (d > d2) return
        //onWindowResize();

        const loader = document.getElementById('loader');
        const loaderLine = document.getElementsByClassName('preloader__loading-line')[0];
        var loadingStatus = 0.0, loadingMax = 0.0;
        loadingMax = videoAnimationElements.length;

        // if (/iPad|iPhone|iPod/.test(navigator.userAgent))
        //     videoAnimationElements.forEach((videoElem) => {
        //         videoElem.autoplay = true;
        //     });

        videoAnimationElements.forEach((videoElem) => {
            videoElem.addEventListener('loadeddata', () => {
                loadingStatus ++;
                const w = (100.0 * loadingStatus / loadingMax).toFixed()
                loaderLine.style.width = w.toString() + '%';
                if (w >= 100){
                    loader.style.display = 'none';
                    this.start();
                }
            }, {once : true})
        })
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
                document.getElementsByTagName('body')[0].classList.add('noScrollable');
                PageEndAnimateContent(currentPage, 'index');
                setTimeout(() => {
                    startAnimation(1);
                    PageStartAnimateContent('index');
                }, 200);
                currentPage = 'index';
            })
        });

        //window.addEventListener('resize', onWindowResize, false);

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
            [...document.getElementsByClassName(item.class)].forEach((nav) => {
                nav.addEventListener('click', () => {
                    menuPage.classList.remove('opened');
                    menuBtn.classList.remove('opened');
                    scrollToTop();
                    if (currentPage !== item.nextPage){
                        animationIndex = item.animationIndex; 
                        startAnimation(animationIndex);
                        document.getElementsByTagName('body')[0].classList.add('noScrollable');
                        const isServicesBack = currentPage === 'services'
                        PageEndAnimateContent(currentPage, item.nextPage, true, isServicesBack);
                        PageEndAnimateContent(currentPage, item.nextPage);
                        setTimeout(() => {
                            PageStartAnimateContent(item.nextPage);
                        }, 2500);
                        currentPage = item.nextPage;
                    }
                })
            })
        })
    }
}

function onWindowResize() {

}

function navBtnsEventsListeners(){
    //btns of page changes
    Object.keys(pageAnimations).forEach(pageName => {
        pageAnimations[pageName].nextPages.forEach((item) => {
            document.getElementById(item.btnId).addEventListener('click', () => {
                if (!isAnimating){
                    currentPage = item.page;
                    animationIndex = item.nextAnimationIndex; 
                    startAnimation(item.nextAnimationIndex);
                    document.getElementsByTagName('body')[0].classList.add('noScrollable')
                    PageEndAnimateContent(pageName, item.page);
                    //const delay = item.page === 'contacts' || item.page === 'ceo' ? 1000 : 2500;
                    setTimeout(() => {
                        PageStartAnimateContent(item.page);
                    }, 2500);
                }
            })
        })
    });
    //back btns
    backBtns.forEach((item) => {
        document.getElementById(item.id).addEventListener('click', () => {
            if (!isAnimating){
                scrollToTop();
                animationIndex = item.animationIndex; 
                const isServicesBack = currentPage === 'services';
                document.getElementsByTagName('body')[0].classList.add('noScrollable')
                PageEndAnimateContent(currentPage, item.nextPage, true, isServicesBack);
                if (currentPage === 'ceo' || currentPage === 'contacts')
                    setTimeout(() => {
                        startAnimation(item.animationIndex);
                    }, 100);
                else startAnimation(item.animationIndex);
                setTimeout(() => {
                    PageStartAnimateContent(item.nextPage);
                }, 2500);
                currentPage = item.nextPage;
            }
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

    [...document.getElementsByClassName('popup__close')].forEach(element => {
        element.addEventListener('click', () => {
            popupOrder.classList.remove('section-flex');
            popupOrderThanks.classList.remove('section-flex');
            popupConsult.classList.remove('section-flex');
            popupConsultThanks.classList.remove('section-flex');
        });
    });

    [...document.getElementsByClassName('popup__win')].forEach(element => {
        element.addEventListener('click', (e) => {
            e.stopPropagation();
        })
    });
}

export default App;
