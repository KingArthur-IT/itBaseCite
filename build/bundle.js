(function (factory) {
    typeof define === 'function' && define.amd ? define(factory) :
    factory();
})((function () { 'use strict';

    //scene
    var canvas, ctx,
        animationImageList = [];

    const settings = {
        canvasID: 'animationCanvas'
    };

    class App {
        preloader() {
            for (let i = 0; i <= 50; i++){
                animationImageList.push(new Image());
                let index = i > 9 ? i : '0' + i;
                animationImageList[i].src =  `./assets/animations/1/1_00${index}.png`;
                
            }

            //image.src =  './assets/animations/1/1_0050.png'
            animationImageList[50].onload = () => {
                this.start();
            };
        }
        start(){
            canvas = document.getElementById(settings.canvasID);
            canvas.width = document.documentElement.clientWidth;
            canvas.height = document.documentElement.clientHeight;
            canvas.setAttribute('width', window.innerWidth);
            canvas.setAttribute('height', window.innerHeight);

            ctx = document.getElementById(settings.canvasID).getContext('2d');

            let index = 0;
            let intervalId = setInterval(() => {
                ctx.clearRect(0,0,canvas.width,canvas.height);
                ctx.drawImage(animationImageList[index], 0, 0);
                index ++;
                if (index > 50) clearInterval(intervalId);
            }, 50);
            

            //window.addEventListener('resize', onWindowResize, false);
            //onWindowResize();
            //window.addEventListener('mousemove', onMouseMove, false);
            //window.addEventListener('scroll', onScroll, false);

            //window.requestAnimationFrame(draw);
        }
    }

    const app = new App();
    app.preloader();

}));
