const cvs = document.getElementById("snake");
const c = cvs.getContext("2d");

// creating the unit 
const box = 32;

//Load Images
const ground = new Image();
ground.src = "Images/ground.png";

const foodImg = new Image();
foodImg.src = "Images/food.png";

//Load Audio Files
const dead = new Audio();
const eat = new Audio();
const up = new Audio();
const right = new Audio();
const left = new Audio();
const down = new Audio();

dead.src = "Audios/snake-dead.mp3";
eat.src = "Audios/snake-eat.mp3";
up.src = "Audios/snake-up.mp3";
right.src = "Audios/snake-right.mp3";
left.src = "Audios/snake-left.mp3";
down.src = "Audios/snake-down.mp3";



//Creating Snake
let snake = [];
snake[0] = {
    x : 9 * box,
    y : 10 * box
}

//Create the food
let food = {
    x : Math.floor(Math.random() * 17+1) * box,
    y : Math.floor(Math.random() * 15+3) * box
}

//Create the score
let score = 0;
let end = "Game Over";


//Controlling the snake
let d;

document.addEventListener("keydown", direction);

function direction(event){

    if(event.keyCode == 37 && d != "RIGHT"){
        left.play();
        d = "LEFT";
        console.log("LEFT");
    }else if(event.keyCode == 38 && d != "DOWN"){
        d = "UP";
        up.play();
        console.log("UP");
    }else if(event.keyCode == 39 && d != "LEFT"){
        d = "RIGHT";
        right.play();
        console.log("RIGHT");
    }else if(event.keyCode == 40 && d != "UP"){
        d = "DOWN";
        down.play();
        console.log("DOWN");
    }
}


//Draw everything to canvas

function draw(){

    c.drawImage(ground,0,0);

    //Snake Design
    for(let i = 0; i < snake.length; i++){
        c.fillStyle = (i == 0)? "green" : "white";
        c.fillRect(snake[i].x, snake[i].y, box, box);

        c.strokeStyle = "red";
        c.strokeRect(snake[i].x, snake[i].y, box, box);
    }
    
    //Draw food on canvas
    c.drawImage(foodImg, food.x, food.y);

    //old head position
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    //Check snake Direction
    if(d == "LEFT") snakeX -= box;
    if(d == "UP") snakeY -= box;
    if(d == "RIGHT") snakeX += box;
    if(d == "DOWN") snakeY += box;

    //Check collision
    function collision(head, array){
        for(let i = 0; i < array.length; i++){
            if(head.x == array[i].x && head.y == array[i].y){
                return true;
            }
        }
        return false;
    }

    //If the snake eats the food
    if(snakeX == food.x && snakeY == food.y){
        score++;
        eat.play();
        food = {
            x : Math.floor(Math.random() * 17+1) * box,
            y : Math.floor(Math.random() * 15+3) * box
        }
    }else{
        //Remove the tail
        snake.pop();    
    }

    // //Add new snake head
    let newHead = {
        x : snakeX,
        y : snakeY
    }

    //Game Over
    if(snakeX < box || snakeX > 17 * box || snakeY < 3 * box || snakeY > 17 * box || collision(newHead, snake)){
        
        //Display game over
        c.fillStyle = "white";
        c.font = "45px Changa one";
        c.fillText(end, 7*box, 1.6*box);
        dead.play();
        
        clearInterval(game);
    }

    snake.unshift(newHead);

    c.fillStyle = "white";
    c.font = "45px Changa one";
    c.fillText(score, 2*box, 1.6*box);

}


//Call draw funtion every 100 ms

let game = setInterval(draw,100);
