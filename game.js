window.onload = init;

var mapCanvas;
var mapContext;

var playerCanvas;
var playerContext;

var lambCanvas;
var lambContext;

var gameWidth = 800;
var gameHight = 500;

var playerImages;
var lambImage = new Image();
lambImage.src = "images/lamb.png";

var player;
var lamb;

var isPlaying;

function init()
{	
	playerImages = new PlayerImages();
	
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
	
	lambCanvas = document.getElementById("lamb");
	lambContext = lambCanvas.getContext("2d");
	lambCanvas.width = gameWidth;
	lambCanvas.height = gameHight;
			
		
	player = new Player();	
	lamb = new Lamb(getRandomInt(0, gameWidth-32), getRandomInt(0, gameHight-32));
	
	startLoop();
}


function PlayerImages()
{
	this.images = new Array();
	
	for(var i=0; i <= 15; i++)
	{
		this.images[i] = new Image()
		this.images[i].src = "images/spikey/spikey" + i.pad(4) + ".png";		
	}
}

PlayerImages.prototype.getImage = function(i)
{
	return this.images[i];
}


///GAME LOOP
function loop()
{
	if(isPlaying)
	{
		draw();
		update();
		requestAnimationFrame(loop);
	}
}

function startLoop()
{
	isPlaying = true;
	loop();
}

function stopLoop()
{
	isPlaying = false;
}

function draw()
{
	if(lamb.isLife)
	{
		lamb.clear();
		lamb.draw();
	}

	player.clear();
	player.draw();	
}

function update()
{
	relationship();
	
	if(lamb.isLife)
	{
		lamb.update();
	}	
	
	player.update();
}

function relationship() 
{
	if(player.drawX + player.width/2 >= lamb.drawX  
	&& player.drawY + player.height/2 >= lamb.drawY 
	&& player.drawX + player.width/2 <= lamb.drawX + lamb.width
	&& player.drawY + player.height/2 <= lamb.drawY + lamb.height)
		lamb.died();
}

///ENTITIES
function Player()
{
	this.srcX = 0;
	this.srcY = 0;
	this.drawX = 0;
	this.drawY = 0;
	this.width = 128;
	this.height = 128;
		
	this.speed = 5;
	
	this.isLeft = false;
	this.isRight = false;
	this.isUp = false;
	this.isDown = false;
	
	this.skin=0;
}

Player.prototype.draw = function()
{
	var image = playerImages.getImage(Math.round(this.skin));
	playerContext.drawImage(image, this.srcX, this.srcY, this.width, this.height, 
		this.drawX, this.drawY, this.width, this.height);
}

Player.prototype.clear = function()
{
	playerContext.clearRect(0,0,gameWidth,gameHight);
}

Player.prototype.update = function()
{
	if(this.skin + 1 <= 15)
		this.skin+=0.2;
	else
		this.skin = 0;
	
	this.move();
}

Player.prototype.move = function()
{
	if(this.isUp && this.drawY - this.speed > 0)
		this.drawY -= this.speed;
	if(this.isDown && this.drawY + this.speed + this.height < gameHight)
		this.drawY += this.speed;
	if(this.isRight && this.drawX + this.speed + this.width < gameWidth)
		this.drawX += this.speed;
	if(this.isLeft && this.drawX - this.speed >= 0)
		this.drawX -= this.speed;
}

Player.prototype.chooseDir = function(keyChar, isPressing)
{
	if(keyChar == "W")
		this.isUp = isPressing;
	if(keyChar == "S")
		this.isDown = isPressing;
	if(keyChar == "D")
		this.isRight = isPressing;
	if(keyChar == "A")
		this.isLeft = isPressing;
}

function Lamb(x, y)
{
	this.srcX = 0;
	this.srcY = 0;
	this.drawX = x;
	this.drawY = y;
	this.width = 32;
	this.height = 32;
	
	this.speed = 3;
	
	this.isLife = true;
	
	this.skin = 0;
}

Lamb.prototype.draw = function()
{
	lambContext.drawImage(lambImage, this.srcX, this.srcY, this.width, this.height, 
		this.drawX, this.drawY, this.width, this.height);
}

Lamb.prototype.clear = function()
{
	lambContext.clearRect(0,0,gameWidth,gameHight);
}

Lamb.prototype.died = function()
{
	this.isLife = false;
	lambContext.clearRect(0,0,gameWidth,gameHight);
}

Lamb.prototype.update = function()
{
	if(this.skin + 1 <= 15)
		this.skin++;
	else
		this.skin=0;
}

/*Lamb.prototype.move = function()
{
	this.drawX -= this.speed;
}*/

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


///HELPER
Number.prototype.pad = function(size) {
      var s = String(this);
      while (s.length < (size || 2)) {s = "0" + s;}
      return s;
    }
		

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}