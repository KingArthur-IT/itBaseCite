//scene
var canvas, ctx,
    animationImageList = [];

const settings = {
    canvasID: 'animationCanvas'
}

class Letter {
    constructor(letter, color, fSize, curveSegments, rotation, position, moveDirection) {
        this.name = letter;
        this.startAngle = rotation;
        this.startPosition = position;
        this.moveDirection = moveDirection;

        const materialExtr = new MeshPhongMaterial({ color: color });
        const fontLoader = new FontLoader();
        fontLoader.load('Cera Pro_Regular.json', function (font) {
            let geometry = new TextGeometry(letter, {
                font: font,
                size: fSize,
                height: 1.5,
                curveSegments: curveSegments,
                bevelEnabled: true,
                bevelThickness: 0.4,
                bevelSize: 0.3,
                bevelOffset: 0.0,
                bevelSegments: 10
            });
            let mesh = new Mesh(geometry, materialExtr);
            mesh.scale.set(1.0, 1.1, 1.0);
            mesh.name = letter;
            mesh.rotation.setFromVector3(rotation);
            mesh.position.copy(position);
            mesh.castShadow = true; 
            scene.add(mesh);
        });
    }
}

class App {
    preloader() {
        for (let i = 0; i <= 50; i++){
            animationImageList.push(new Image());
            let index = i > 9 ? i : '0' + i
            animationImageList[i].src =  `./assets/animations/1/1_00${index}.png`
            
        }

        //image.src =  './assets/animations/1/1_0050.png'
        animationImageList[50].onload = () => {
            this.start()
        }
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
            ctx.drawImage(animationImageList[index], 0, 0, document.documentElement.clientWidth, document.documentElement.clientHeight);
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

function onMouseMove(e) {    
    
}

function onWindowResize() {
    canvas.width = document.documentElement.clientWidth;//window.innerWidth;
    canvas.height = document.documentElement.clientHeight; //window.innerHeight;
    canvas.setAttribute('width', document.documentElement.clientWidth);
    canvas.setAttribute('height', document.documentElement.clientHeight);
}

export default App;
