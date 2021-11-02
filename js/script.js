const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

const ground = new Image();
ground.src = "img/field.png";

const berry = new Image();
berry.src = "img/berry.png";

let box = 32;

let score = 0;


let food = {
    x: Math.floor(Math.random() * 17 + 1) * box,
    y: Math.floor(Math.random() * 15 + 3) * box,
};

let snake = [];
snake[0] = {
    x: 9 * box,
    y: 10 * box,
};

document.addEventListener('keydown', direction);

let dir;

function direction(e){
    if(e.keyCode == 37 && dir != 'right'){
        dir = 'left';
    } else if(e.keyCode == 38 && dir != 'down'){
        dir = 'up';
    } else if(e.keyCode == 39 && dir != 'left'){
        dir = 'right';
    } else if(e.keyCode == 40 && dir != 'up'){
        dir = 'down';
    }  
}

function eatTail(head, arr){
    for(let i = 0; i < arr.length; i++){
        if(head.x == arr[i].x && head.y == arr[i].y){
            clearInterval(game);
        }
    }
}
function checkFood(food,snake){
    for(let i = 0; i < snake.length; i++){
        if(food.x == snake[i].x && food.y == snake[i].y) {
            food = {
                x: Math.floor(Math.random() * 17 + 1) * box,
                y: Math.floor(Math.random() * 15 + 3) * box,
            }
            checkFood(food,snake)
        }
    }
}

function drawGame(){
    ctx.drawImage(ground, 0, 0);

    ctx.drawImage(berry, food.x, food.y);
    checkFood(food,snake);

    for(let i = 0; i < snake.length; i++){
        ctx.fillStyle = i == 0 ? "black" : "green";
        ctx.fillRect(snake[i].x, snake[i].y, box, box);
    }

    ctx.fillStyle = "black";
    ctx.font = "45px Arial";
    ctx.fillText(score, box * 2.5, box * 1.6)

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if(snakeX == food.x && snakeY == food.y) {
        score++;
        food = {
            x: Math.floor(Math.random() * 17 + 1) * box,
            y: Math.floor(Math.random() * 15 + 3) * box,
        };
        checkFood(food,snake)
    } else {
        snake.pop();
    }

    if(snakeX < box || snakeX > box * 17
         || snakeY < 3 * box || snakeY > box * 17){
             clearInterval(game);
         }

    if(dir == 'left') snakeX -= box;
    if(dir == 'right') snakeX += box;
    if(dir == 'down') snakeY += box;
    if(dir == 'up') snakeY -= box;

    let newHead = {
        x: snakeX,
        y: snakeY
    };

    eatTail(newHead,snake);

    snake.unshift(newHead);

}

let game = setInterval(drawGame,150);

