const canvas = document.getElementById("Snake-Prac");
const c = canvas.getContext("2d");

const box = 32;

//Load Images

const ground = new Image();
ground.src = "./Images/ground.png";

const foodImg = new Image();
foodImg.src = "./Images/food.png";

//Load Audios
const dead = new Audio();
const eat = new Audio();
const left = new Audio();
const up = new Audio();
const right = new Audio();
const down = new Audio();

dead.src = "Audios/snake-dead.mp3";
eat.src = "Audios/snake-eat.mp3";
left.src = "Audios/snake-left.mp3";
up.src = "Audios/snake-up.mp3";
right.src = "Audios/snake-right.mp3";
down.src = "Audios/snake-down.mp3";


//Snake Array
let snake = [];
snake[0] = {
    x : 9 * box,
    y : 10 * box
}

//VAribales
let score = 0;
let end = "Game Over";

let food = {
    x : Math.floor(Math.random() * 17 + 1) * box,
    y : Math.floor(Math.random() * 15 + 3) * box,
}

//Direction of the snake
let d;

document.addEventListener("keydown", direction);

function direction(event){
    console.log(event.keyCode);

    if(event.keyCode == 37 && d != "RIGHT"){
        d = "LEFT";
        left.play();
    }else if(event.keyCode == 38 && d != "DOWN"){
        d = "UP";
        up.play();
    }else if(event.keyCode == 39 && d != "LEFT"){
        d = "RIGHT";
        right.play();
    }else if(event.keyCode == 40 && d != "UP"){
        d = "DOWN";
        down.play();
    }
}


function draw(){
    c.drawImage(ground,0,0);

    console.log(snake.length);
    for(let i = 0; i < snake.length; i++){
        c.fillStyle = ( i == 0)? "green" : "white";
        c.fillRect(snake[i].x, snake[i].y, box, box);

        c.strokeStyle = "red";
        c.strokeRect(snake[i].x, snake[i].y, box, box);

    }

    //Draw food
    c.drawImage(foodImg, food.x, food.y);

    //old Snake head
    snakeX = snake[0].x;
    snakeY = snake[0].y;

    //snake Directions
    if(d == "LEFT") snakeX -= box;
    if(d == "UP") snakeY -= box;
    if(d == "RIGHT") snakeX += box;
    if(d == "DOWN") snakeY += box;

    //If snake eat food
    if(snakeX == food.x && snakeY == food.y){
        eat.play();
        score++;
        food = {
            x : Math.floor(Math.random() * 17 + 1) * box,
            y : Math.floor(Math.random() * 15 + 3) * box,
        }
    }
    else{
        snake.pop();
    }

    //Snake new head
    let newHead = {
        x : snakeX,
        y : snakeY
    }

    //Display score
    c.fillStyle = "white";
    c.font = "45px Changa one";
    c.fillText(score, 2*box, 1.6*box);

    function collision(head, snakearr){
        for(let i = 0; i < snakearr.length; i++){
            if(head.x == snakearr[i].x && head.y == snakearr[i].y){
                return true;
            }
        }
        return false;
    }

    //Dead Game
    //Box Game
    if(snakeX < box || snakeX > 17*box || snakeY < 3*box || snakeY > 17*box || collision(newHead, snake)){
        c.fillText(end, 6*box, 1.6*box);
        dead.play();
        clearInterval(game);
    }

    snake.unshift(newHead);
}

let game = setInterval(draw,100);