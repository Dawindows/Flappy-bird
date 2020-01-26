let	game = document.getElementById("content");
let play = game.getContext("2d");

// Картинки
let bird = new Image();
let background = new Image();
let floor = new Image();
let pipeTop = new Image();
let pipeBottom = new Image();

bird.src = "assets/img/bird.png";
background.src = "assets/img/background.png";
floor.src = "assets/img/floor.png";
pipeTop.src ="assets/img/pipe-top.png";
pipeBottom.src = "assets/img/pipe-bottom.png";

// Звук
// let fly = new Audio();
let scoreAudio = new Audio();

// fly.src = "assets/audio/fly.mp3";
scoreAudio.src = "assets/audio/score.mp3";

function draw() {
	play.drawImage(background, 0, 0);
	play.drawImage(bird, xPos, yPos);
	yPos += grav;

	for (let i = 0; i < pipe.length; i++) {
		play.drawImage(pipeTop, pipe[i].x, pipe[i].y);
		play.drawImage(pipeBottom, pipe[i].x, pipe[i].y + pipeTop.height + gap);

		pipe[i].x--;

		if (pipe[i].x == -25) {
			pipe.push ({
				x: game.width,
				y: Math.floor(Math.random() * pipeTop.height) - pipeTop.height
			});
		}
	
		if  (xPos + bird.width >= pipe[i].x 
			&& xPos <= pipe[i].x + pipeTop.width
 			&& (yPos <= pipe[i].y + pipeTop.height
 			|| yPos + bird.height - 10 >= pipe[i].y + pipeTop.height + gap) 
 			|| yPos + bird.height  >= game.height - floor.height) {
 			

 				location.reload();
 				alert("Game Over, Your score: " + score);
 						 
 		
 		} 

		if (pipe[i].x == 3) {
			 score++;
			 scoreAudio.play();
  		}
 	}

 	play.drawImage(floor, 0, game.height - floor.height);

 	play.fillText("Score: " + score, 110 , game.height - 50);

 	requestAnimationFrame(draw);
}

// Трубы
let gap = 100;
let pipe = [];

pipe[0] = {
	x: game.width,
	y: 0
}

// Позиция птицы
document.addEventListener("keydown", moveUp);

function moveUp() {
	yPos -= 38;
	// fly.play();
}

let xPos = 10;
let yPos = 150;
let grav = 1;

// Cчет
let score = 0;
 	play.fillStyle = "#000";
 	play.font = "15px Arial";

// Вывод
pipeBottom.onload = draw;

draw();