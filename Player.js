function Player(x, y, sprite)
{	
	this.x = x;
	this.y = y;
	this.width = 32;
	this.height = 32;
		
	this.speed = 250;
	
	this.isLeft = false;
	this.isRight = false;
	this.isUp = false;
	this.isDown = false;
	
	this.opacity = 1.0;
	this.visible = true;		
	
	this.sprite = sprite;
	
	this.stayCells = [{x: 0, y: 32, width: 32, height: 32}];
	this.runBot = [
				{x: 32, y: 32, width: 32, height: 32},
				{x: 64, y: 32, width: 32, height: 32},
				{x: 96, y: 32, width: 32, height: 32},
				{x: 128, y: 32, width: 32, height: 32},
				{x: 160, y: 32, width: 32, height: 32},
				{x: 192, y: 32, width: 32, height: 32},
				{x: 224, y: 32, width: 32, height: 32},
				{x: 192, y: 0, width: 32, height: 32},
				{x: 224, y: 0, width: 32, height: 32},
				{x: 0, y: 32, width: 32, height: 32},
				];
				
	this.sprite.setDirection(this.stayCells);
}

Player.prototype = {
	
draw: function()
{
	playerContext.save();
	playerContext.globalAlpha = this.opacity;
	this.sprite.draw(this.x, this.y, playerContext);
	playerContext.restore();			
},

clear: function()
{
	playerContext.clearRect(0, 0, gameWidth, gameHeight);
},

update: function(dt)
{
	this.sprite.update(dt);
	this.move(dt);
},

move: function(dt)
{
	var nextPos;
	if(this.isUp)
	{			
		nextPos = this.y - this.speed * dt;
		if(nextPos >= 0)
			this.y = nextPos;			
	}	
	if(this.isDown)
	{			
		nextPos = this.y + this.height + this.speed * dt;
		if(nextPos <= gameHeight)
			this.y = nextPos - this.height;			
	}	
	if(this.isRight)
	{			
		nextPos = this.x + this.width + this.speed * dt;
		if(nextPos <= gameWidth)
			this.x = nextPos - this.width;			
	}
	if(this.isLeft)
	{			
		nextPos = this.x - this.speed * dt;
		if(nextPos >= 0)
			this.x = nextPos;		
	}	
},

setDirection: function(keyChar, isPressing)
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


}
