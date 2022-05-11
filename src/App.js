
var canvas = {
        object: null,
        ctx: null,
        width: 0,
        height: 0
    },
    animationImageList = [];

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
}

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

const indexPageStartAnimateContent = () => {
    [...document.getElementsByClassName('index-page-animate')].forEach(element => {
        element.classList.add('show')
    });
    [...document.getElementsByClassName('design-circles')].forEach(element => {
        element.classList.add('start-anim')
    });
}
const indexPageEndAnimateContent = () => {
    [...document.getElementsByClassName('index-page-animate')].forEach(element => {
        element.classList.remove('start-anim');     
        setTimeout(() => {
            element.classList.add('hide');
            element.classList.remove('show');   
        }, 1000);
    });
}

class App {
    preloader() {
        for (let animIndex = 0; animIndex < settings.animations.length; animIndex++){
            animationImageList.push([]);
            const prefix = settings.animations[animIndex].prefix;

            for (let i = 0; i <= settings.animations[animIndex].end - settings.animations[animIndex].start; i++){
                animationImageList[animIndex].push(new Image());
                const index = numToStr(i + settings.animations[animIndex].start, 4);
                animationImageList[animIndex][i].src =  `./assets/animations/${animIndex + 1}/${prefix}_${index}.png`
            }
        }
            
        const lastAnimation = settings.animations.length - 1;
        const lastIndex = settings.animations[lastAnimation].end - settings.animations[lastAnimation].start;
        animationImageList[lastAnimation][lastIndex].onload = () => {
            this.start()
        }
    }
    start(){
        canvas.object = document.getElementById(settings.canvasID);
        canvas.object.width = document.documentElement.clientWidth;
        canvas.width = document.documentElement.clientWidth;
        canvas.object.height = canvas.width * settings.canvasImgAspectRatio;
        canvas.height = canvas.width * settings.canvasImgAspectRatio;

        canvas.ctx = document.getElementById(settings.canvasID).getContext('2d');

        startAnimation(1);
        indexPageStartAnimateContent();
        
        document.getElementById('startBtn').addEventListener('click', () => {
            startAnimation(2);
            indexPageEndAnimateContent();
        })

        //window.addEventListener('resize', onWindowResize, false);
        //onWindowResize();
        //window.addEventListener('mousemove', onMouseMove, false);
        //window.addEventListener('scroll', onScroll, false);
    }
}

function onMouseMove(e) {    
    
}

function onWindowResize() {
    canvas.width = document.documentElement.clientWidth;//window.innerWidth;
    canvas.height = document.documentElement.clientHeight; //window.innerHeight;
    canvas.setAttribute('width', document.documentElement.clientWidth);
    canvas.setAttribute('height', document.documentElement.clientHeight);
}

export default App;
