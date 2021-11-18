var c = document.createElement("canvas");
var canvasDiv = document.getElementById("canvasDiv");
var ctx = c.getContext("2d");


var screenWidth = 500;
var screenHeight = 700;
c.width = screenWidth;
c.height = screenHeight;
canvasDiv.appendChild(c);

window.addEventListener('keydown',this.keydown,false);
window.addEventListener('keyup',this.keyup,false);


//Variables
const gravity = 0.34;
var holdingLeftKey = false;
var holdingRightKey = false;
var keycode;
var dead = false;
var difficulty = 0;
var lowestBlock = 0;
var score = 0;
var yDistanceTravelled = 0;

var blocks = [];
var powerups = [];

//Time variables
var fps = 60;
var now;
var then = Date.now();
var interval = 1000/fps;
var delta;
var std=25;

function helpMessage(){
	ctx.font = "30px Arial";
	ctx.fillStyle = "black";
	ctx.textAlign = "center";
	ctx.fillText("[게임 방법]", screenWidth / 2, screenHeight / 2 -100);

	ctx.font = "15px Arial";
	ctx.textAlign = "left";
	ctx.fillText("1.방향키(← →)를 움직여 발판을 밟고 최대한 위로 올라가요!", std, screenHeight / 2 -50);
	ctx.font = "13px Arial";
	ctx.fillText("※ 화면을 나가면 반대편으로 돌아오니 주의!", std+8, screenHeight / 2 -30);
	ctx.font = "15px Arial";
	ctx.fillText("2.아이템(스프링 점프대/신발)을 활용, 더 빠르게 올라갈 수 있어요!", std, screenHeight /2);
	ctx.fillText("3.움직이고/부서지는 발판, 외계인(밟으면 발판!) 등", std, screenHeight /2 +30);
}

helpMessage();

function init(){
    blocks = [];
    lowestBlock = 0;
    difficulty = 0;
    score = 0;
    yDistanceTravelled = 0;
    player.springBootsDurability = 0;

    blocks.push(new block);
    blocks[0].x = 300;
    blocks[0].y = 650;
    blocks[0].monster = 0;
    blocks[0].type = 0;
    blocks[0].powerup = 0;

    blockSpawner();

    player.x = 300;
    player.y = 550;
    player.xSpeed = 6.7;
    player.ySpeed = 0;

    dead = false;
}
function startGame(){
    init();
    loop();
}

function start(){
    sendInfo();
    setTimeout(lo,1000*10);
    startGame();
}

function keydown(e) {
    if (e.keyCode === 37) {
        holdingLeftKey = true;
    }   else if (e.keyCode === 39) {
        holdingRightKey = true;
    }

    if (e.keyCode === 82 && dead) {
        init();
    }
}

function keyup(e) {
    if (e.keyCode === 37) {
        holdingLeftKey = false;
    } else if (e.keyCode === 39) {
        holdingRightKey = false;
    }
}

function showScore() {
    if (yDistanceTravelled > score) {
        score = Math.round(yDistanceTravelled);
    }

    ctx.font = "36px Arial";
    ctx.fillStyle = "black";
    ctx.textAlign = "left";
    ctx.fillText(score, 15, 40);
}

blocks.push(new block);
blocks[0].x = 300;
blocks[0].y = 650;
blocks[0].monster = 0;
blocks[0].type = 0;
blocks[0].powerup = 0;

blockSpawner();

function loop() {

    if(!dead) requestAnimationFrame(loop);

    //This sets the FPS to 60
    now = Date.now();
    delta = now - then;

    if ((delta > interval)|!dead) {
        var backgroundImage = new Image();
        backgroundImage.src = "back.png";
        ctx.drawImage(backgroundImage, 0, 0, screenWidth, screenHeight)

        for (var i = 0; i < blocks.length; i++) {
            if (blocks[i] !== 0) {
                blocks[i].update();
                blocks[i].draw();
            }
        }

        player.update();
        player.draw();

        showScore();

        ctx.fill();
        then = now - (delta % interval);
    }else{
        endGame(score);
    }
}

function lo(){
    if(!dead){
        sendInfo();
        setTimeout(lo,1000*10);
    }
}
