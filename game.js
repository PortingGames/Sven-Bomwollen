//window.onload = init;

var mapCanvas;
var mapContext;
var playerCanvas;
var playerContext;
var lambCanvas;
var sheepContext;

var gameTime = 0;
var gameWidth = 800;
var gameHight = 500;
var isGameOver;

resources.load([
    "images/svenactor.png",
    "images/sheep.png"
]);

resources.onReady(init);
	
var player;
var sheeps = new Array();
var barriers = new Array();

function init()
{	
	document.addEventListener("keydown", checkKeyDown, false);
	document.addEventListener("keyup", checkKeyUp, false);
	
	mapCanvas = document.getElementById("map");
	mapContext = mapCanvas.getContext("2d");	
	mapCanvas.width = gameWidth;
	mapCanvas.height = gameHight;	
	
	playerCanvas = document.getElementById("player");
	playerContext = playerCanvas.getContext("2d");
	playerCanvas.width = gameWidth;
	playerCanvas.height = gameHight;
	
	lambCanvas = document.getElementById("sheep");
	sheepContext = lambCanvas.getContext("2d");
	lambCanvas.width = gameWidth;
	lambCanvas.height = gameHight;
			
	lastTime = Date.now();
	player = new Player();	
	sheeps.push(new Sheep(getRandomInt(0, gameWidth-32), getRandomInt(0, gameHight-32)));
	sheeps.push(new Sheep(getRandomInt(0, gameWidth-32), getRandomInt(0, gameHight-32)));
	loop();
}

///GAME LOOP
var lastTime;
function loop()
{	
		var now = Date.now();
    	var dt = (now - lastTime) / 1000.0;
	
		draw();
		update(dt);
		
		lastTime = now;
    	requestAnimationFrame(loop);
}

function draw()
{
	sheepsClear();
	sheeps.forEach(function(sheep) {		
	if(sheep.isLife)
	{		
		sheep.draw();
	}
	}, this);

	player.clear();
	player.draw();	
}

function update(dt)
{
	relationship();
	
	sheeps.forEach(function(sheep) {
		if(sheep.isLife)
	{
		sheep.update();
	}	
	}, this);
	
	
	player.update(dt);
}

function relationship() 
{
	/*if(player.drawX + player.width/2 >= sheep.drawX  
	&& player.drawY + player.height/2 >= sheep.drawY 
	&& player.drawX + player.width/2 <= sheep.drawX + sheep.width
	&& player.drawY + player.height/2 <= sheep.drawY + sheep.height)
		sheep.died();*/
}

function sheepsClear()
{
	sheepContext.clearRect(0,0,gameWidth,gameHight);
}

///EVENTS
function checkKeyDown(e)
{
	var keyId = e.keyCode;
	var keyChar = String.fromCharCode(keyId);
	player.chooseDir(keyChar, true);
}

function checkKeyUp(e)
{
	var keyId = e.keyCode;
	var keyChar = String.fromCharCode(keyId);
	player.chooseDir(keyChar, false);
}
