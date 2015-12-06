function Sheep(x, y)
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
	this.image = resources.get("images/sheep.png");
}

Sheep.prototype.draw = function()
{
	sheepContext.drawImage(this.image, this.srcX, this.srcY, this.width, this.height, 
		this.drawX, this.drawY, this.width, this.height);
}

Sheep.prototype.died = function()
{
	this.isLife = false;
	sheepContext.clearRect(0,0,gameWidth,gameHight);
}

Sheep.prototype.update = function()
{
	if(this.skin + 1 <= 15)
		this.skin++;
	else
		this.skin=0;
}

/*Sheep.prototype.move = function()
{
	this.drawX -= this.speed;
}*/