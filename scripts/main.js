var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var x = canvas.width/2;
var y = canvas.height-30;
var ballRadius = 10;
var timeInterval = 10;
var dx = 2;
var dy = -2;
var velocity = 1;

const paddleHeight = 10;
const paddleWidth = 75;
let paddleX = (canvas.width - paddleWidth) / 2;

let rightPressed = false;
let leftPressed = false;

const brickRowCount = 3;
const brickColumnCount = 5;
const brickWidth = 75;
const brickHeight = 20;
const brickPadding = 10;
const brickOffsetTop = 30;
const brickOffsetLeft = 30;

let score = 0;

const bricks = [];
for (let c = 0; c < brickColumnCount; c++) {
    bricks[c] = [];
    for (let r = 0; r < brickRowCount; r++) {
        bricks[c][r] = { x: 0, y: 0, status: 1 };
        bricks[c][r].x = brickX = c * (brickWidth + brickPadding) + brickOffsetLeft;
        bricks[c][r].y = r * (brickHeight + brickPadding) + brickOffsetTop;
        // bricks[c][r].x = brickX;
        // bricks[c][r].y = brickY;
    }
}








function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI*2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

function drawBricks() {

    for (let c = 0; c < brickColumnCount; c++) {
        for (let r = 0; r < brickRowCount; r++) {
            // const brickX = c * (brickWidth + brickPadding) + brickOffsetLeft;
            // const brickY = r * (brickHeight + brickPadding) + brickOffsetTop;
            // bricks[c][r].x = brickX;
            // bricks[c][r].y = brickY;
            if (bricks[c][r].status === 1){
                ctx.beginPath();
                ctx.rect(bricks[c][r].x, bricks[c][r].y, brickWidth, brickHeight);
                ctx.fillStyle = "#0095DD";
                ctx.fill();
                ctx.closePath();
            }

        }
    }
}

function drawScore() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText(`Score: ${score}`, 8, 20);
  }


function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    x += dx;
    y += dy;
    if(canvas.width-x<=ballRadius || x<=ballRadius) dx  = -dx;
    if (y <= ballRadius) {
        dy = -dy;
    } else if (canvas.height-y<=ballRadius) {
        if (x > paddleX && x < paddleX + paddleWidth) {
            // if(dx>0) dx+=0.5;
            // else dx-=0.5;
            // dy+=0.5;
            dy = -dy;
        } else {
            alert(`GAME OVER\n Your final score: ${score}`);
            document.location.reload();
            clearInterval(interval);
        } // Needed for Chrome to end game
    }
    if (rightPressed) {
        paddleX = Math.min(paddleX + 6, canvas.width - paddleWidth);
    } else if (leftPressed) {
        paddleX = Math.max(paddleX - 6, 0);
    }

    drawBall();
    drawPaddle();
    collisionDetection();
    drawBricks(); 
    drawScore();
}



document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
    if (e.key === "Right" || e.key === "ArrowRight") {
      rightPressed = true;
    } else if (e.key === "Left" || e.key === "ArrowLeft") {
      leftPressed = true;
    }
}
  
  function keyUpHandler(e) {
    if (e.key === "Right" || e.key === "ArrowRight") {
      rightPressed = false;
    } else if (e.key === "Left" || e.key === "ArrowLeft") {
      leftPressed = false;
    }
}

function collisionDetection() {
    for (let c = 0; c < brickColumnCount; c++) {
        for (let r = 0; r < brickRowCount; r++) {
            const b = bricks[c][r];
            if(b.status === 1)
            {
                if (x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight) {
                    dy = -dy;
                    b.status = 0;
                    score++;
                    if (score === brickRowCount * brickColumnCount) {
                        alert(`YOU WIN, CONGRATULATIONS!\n Your final score: ${score}`);
                        document.location.reload();
                        clearInterval(interval); // Needed for Chrome to end game
                }
                }

             }
        }
    }
}

const interval = setInterval(draw, 10);