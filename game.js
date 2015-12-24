var mapCanvas;
var mapContext;
var playerCanvas;
var playerContext;

var gameTime = 0;
var gameWidth = 800;
var gameHeight = 500;

resources.load([
	"images/character_001_isaac.png",
	"images/monster_014_moterfly.png"
]);

resources.onReady(init);
	
var player;

function init()
{	
	document.addEventListener("keydown", checkKeyDown, false);
	document.addEventListener("keyup", checkKeyUp, false);
	
	mapCanvas = document.getElementById("map");
	mapContext = mapCanvas.getContext("2d");	
	mapCanvas.width = gameWidth;
	mapCanvas.height = gameHeight;	
	
	playerCanvas = document.getElementById("player");
	playerContext = playerCanvas.getContext("2d");
	playerCanvas.width = gameWidth;
	playerCanvas.height = gameHeight;			
			
	lastTime = Date.now();
	player = new Player(0, 0, new Sprite(resources.get("images/monster_014_moterfly.png"), 
	[32,32], 16, 
	[
		{x: 0, y:0, width:32, height:32},
		{x: 32, y:0, width:32, height:32}
	]));	
	
	loop();
}

///GAME LOOP
var lastTime;
function loop()
{	
		var now = Date.now();
    	var dt = (now - lastTime) / 1000.0;
			
		update(dt);
		draw();
		
		lastTime = now;
    	requestAnimationFrame(loop);
}

function update(dt)
{	
	gameTime += dt;
	player.update(dt);	
}

function draw()
{
	player.clear();
	player.draw();	
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
