function Player()
{	
	this.x = 0;
	this.y = 0;
	this.width = 75;
	this.height = 140;
		
	this.speed = 10;
	
	this.isLeft = false;
	this.isRight = false;
	this.isUp = false;
	this.isDown = false;
	
	this.opacity = 1.0;
	this.visible = true;
	
	this.cellWidth  = 75,
    this.cellHeight  = 140,	
	this.topSpriteCells = [ 
		//{ x: 732,   y: 141 }, 
		{ x: 880,   y: 141, wight: this.cellWidth, height: 120 }, 
		{ x: 824,   y: 0, wight: this.cellWidth, height: this.cellHeight }, 
		{ x: 386,   y: 0, wight: this.cellWidth, height: this.cellHeight }, 
		{ x: 0,   y: 0, wight: this.cellWidth, height: this.cellHeight }, 
		{ x: 386,   y: 0, wight: this.cellWidth, height: this.cellHeight }, 
		{ x: 824,   y: 0, wight: this.cellWidth, height: this.cellHeight }, 
		{ x: 880,   y: 141, wight: this.cellWidth, height: 120 }, 
		{ x: 336,   y: 498, wight: this.cellWidth, height: 114 }, 
		{ x: 416,   y: 611, wight: this.cellWidth, height: 110 }, 
		{ x: 925,   y: 498, wight: this.cellWidth, height: 114 }, 
		{ x: 902,   y: 0, wight: this.cellWidth, height: this.cellHeight }, 
		{ x: 308,   y: 0, wight: this.cellWidth, height: this.cellHeight }, 
		{ x: 154,   y: 0, wight: this.cellWidth, height: this.cellHeight }, 
		{ x: 74,   y: 0, wight: this.cellWidth, height: this.cellHeight }, 
		{ x: 154,   y: 0, wight: this.cellWidth, height: this.cellHeight }, 
		{ x: 308,   y: 0, wight: this.cellWidth, height: this.cellHeight }, 
		{ x: 902,   y: 0, wight: this.cellWidth, height: this.cellHeight }, 
		{ x: 925,   y: 498, wight: this.cellWidth, height: 114 }, 
		{ x: 416,   y: 611, wight: this.cellWidth, height: 110 }, 
		{ x: 336,   y: 498, wight: this.cellWidth, height: 114 }, 
		{ x: 880,   y: 141, wight: this.cellWidth, height: 120 }, 
		{ x: 824,   y: 0, wight: this.cellWidth, height: this.cellHeight }, 
		{ x: 386,   y: 0, wight: this.cellWidth, height: this.cellHeight }, 
		{ x: 824,   y: 0, wight: this.cellWidth, height: this.cellHeight }, 
    ],		
	

	this.sprite = new SpriteSheet(resources.get("images/svenactor.png"), this.topSpriteCells)
}

Player.prototype.draw = function()
{
		playerContext.save();
		playerContext.globalAlpha = this.opacity;
		/*var i = 8;
		playerContext.drawImage(playerImage, this.topSpriteCells[i].x, this.topSpriteCells[i].y, 
			this.topSpriteCells[i].wight, this.topSpriteCells[i].height, this.drawX, this.drawY, 
			this.topSpriteCells[i].wight, this.topSpriteCells[i].height)*/
		this.sprite.draw(this.x, this.y, playerContext);
				
		playerContext.restore();			
}

Player.prototype.clear = function()
{
		playerContext.clearRect(0,0,gameWidth,gameHight);
}

Player.prototype.update = function(dt)
{
		this.sprite.advance(this.speed, dt);
		this.move(dt);
}
	
Player.prototype.move = function()
{
		if(this.isUp && this.y - this.speed > 0)
			this.y -= this.speed;
		if(this.isDown && this.y + this.speed + this.height < gameHight)
			this.y += this.speed;
		if(this.isRight && this.x + this.speed + this.width < gameWidth)
			this.x += this.speed;
		if(this.isLeft && this.x - this.speed >= 0)
			this.x -= this.speed;
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