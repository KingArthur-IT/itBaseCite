(function (factory) {
    typeof define === 'function' && define.amd ? define(factory) :
    factory();
})((function () { 'use strict';

    var canvas = {
            object: null,
            ctx: null,
            width: 0,
            height: 0
        },
        animationImageList = [],
        animationIndex = -1;

    const settings = {
        canvasID: 'animationCanvas',
        canvasImgAspectRatio: 1280. / 591.,
        animations: [
            {id: 0, prefix: 1, start: 0, end: 50},
            {id: 1, prefix: 2, start: 0, end: 100},
            {id: 2, prefix: 2, start: 101, end: 197},
            {id: 3, prefix: 2, start: 198, end: 330},
        ],
        contentAnimationTime: 3
    };

    const numToStr = (number, n) => {
        const numLength = number.toString().length;
        return '0'.repeat(n - numLength) + number.toString()
    };

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
    };

    const hideSection = (sectionName) => {
        setTimeout(() => {
            document.getElementsByClassName(`${sectionName}-section`)[0].classList.remove('section-visible');
            setTimeout(() => {
                document.getElementsByClassName(`${sectionName}-section`)[0].classList.remove('section-block');
            }, 1000);
        }, 3000);
    };
    const showSection = (sectionName) => {
        document.getElementsByClassName(`${sectionName}-section`)[0].classList.add('section-block');
        setTimeout(() => {
            document.getElementsByClassName(`${sectionName}-section`)[0].classList.add('section-visible');
        }, 100);
    };

    const PageStartAnimateContent = (pageName) => {
        [...document.getElementsByClassName(`${pageName}-page-animate`)].forEach(element => {
            element.classList.add('show');
        });
        [...document.getElementsByClassName('design-circles')].forEach(element => {
            element.classList.add('start-anim');
        });
    };

    const PageEndAnimateContent = (pageEndName, pageShowName) => {
        [...document.getElementsByClassName(`${pageEndName}-page-animate`)].forEach(element => {
            element.classList.remove('start-anim'); //stop pulsing
            setTimeout(() => {
                element.classList.add('hide'); 
                element.classList.remove('show');
                showSection(pageShowName);
                hideSection(pageEndName);
                setTimeout(() => {
                    element.classList.remove('hide'); 
                }, 5000);  
            }, 1000);
        });
    };

    class App {
        preloader() {
            for (let animIndex = 0; animIndex < settings.animations.length; animIndex++){
                animationImageList.push([]);
                const prefix = settings.animations[animIndex].prefix;

                for (let i = 0; i <= settings.animations[animIndex].end - settings.animations[animIndex].start; i++){
                    animationImageList[animIndex].push(new Image());
                    const index = numToStr(i + settings.animations[animIndex].start, 4);
                    animationImageList[animIndex][i].src =  `./assets/animations/${animIndex + 1}/${prefix}_${index}.png`;
                }
            }
                
            const lastAnimation = settings.animations.length - 1;
            const lastIndex = settings.animations[lastAnimation].end - settings.animations[lastAnimation].start;
            animationImageList[lastAnimation][lastIndex].onload = () => {
                this.start();
            };
        }
        start(){
            onWindowResize();
            canvas.ctx = document.getElementById(settings.canvasID).getContext('2d');

            startAnimation(1);
            animationIndex = 1;
            PageStartAnimateContent('index');
            
            document.getElementById('startBtn').addEventListener('click', () => {
                startAnimation(2);
                PageEndAnimateContent('index', 'selector');
                setTimeout(() => {
                    PageStartAnimateContent('selector');
                }, 2500);
            });

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
                });
            });
        }
    }

    function onWindowResize() {
        canvas.object = document.getElementById(settings.canvasID);
        canvas.object.width = document.documentElement.clientWidth;
        canvas.width = document.documentElement.clientWidth;
        canvas.object.height = canvas.width * settings.canvasImgAspectRatio;
        canvas.height = canvas.width * settings.canvasImgAspectRatio;

        const canvasTop = (document.documentElement.clientHeight - canvas.height) / 2.;
        canvas.object.style.top = canvasTop + 'px';

        if (animationIndex > 0){
            canvas.ctx.clearRect(0, 0, canvas.width, canvas.height);
            const index = animationImageList[animationIndex - 1].length - 1;
            canvas.ctx.drawImage(animationImageList[animationIndex - 1][index], 0, 0, canvas.width, canvas.height);
        }
    }

    const app = new App();
    app.preloader();

}));
