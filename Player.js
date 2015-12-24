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
	
	this.sprite = sprite
}

Player.prototype.draw = function()
{
		playerContext.save();
		playerContext.globalAlpha = this.opacity;
		this.sprite.draw(this.x, this.y, playerContext);
		playerContext.restore();			
}

Player.prototype.clear = function()
{
		playerContext.clearRect(0, 0, gameWidth, gameHeight);
}

Player.prototype.update = function(dt)
{
		this.sprite.update(dt);
		this.move(dt);
}
	
Player.prototype.move = function(dt)
{
		if(this.isUp)
		{			
			var nextPos = this.y - this.speed * dt;
			if(nextPos >= 0)
				this.y = nextPos;			
		}	
		if(this.isDown)
		{			
			var nextPos = this.y + this.height + this.speed * dt;
			if(nextPos <= gameHeight)
				this.y = nextPos - this.height;			
		}	
		if(this.isRight)
		{			
			var nextPos = this.x + this.width + this.speed * dt;
			if(nextPos <= gameWidth)
				this.x = nextPos - this.width;			
		}
		if(this.isLeft)
		{			
			var nextPos = this.x - this.speed * dt;
			if(nextPos >= 0)
				this.x = nextPos;		
		}	
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