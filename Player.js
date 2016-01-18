function Player(x, y, size, sprite) {
    this.x = x;
    this.y = y;
    this.size = size;

    this.speed = 250;

    this.isLeft = false;
    this.isRight = false;
    this.isUp = false;
    this.isDown = false;

    this.opacity = 1.0;
    this.visible = true;

    this.sprite = sprite;

    this.state = "X";
    this.stay = [{ x: 0, y: 32 }];
    this.runHorizon = [
        { x: 0, y: 32 },
        { x: 32, y: 32 },
        { x: 64, y: 32 },
        { x: 96, y: 32 },
        { x: 128, y: 32 },
        { x: 160, y: 32 },
        { x: 192, y: 32 },
        { x: 224, y: 32 },
        { x: 192, y: 0 },
        { x: 224, y: 0 }];
    this.runRight = [
        { x: 0, y: 64 },
        { x: 32, y: 64 },
        { x: 64, y: 64 },
        { x: 96, y: 64 },
        { x: 128, y: 64 },
        { x: 160, y: 64 },
        { x: 192, y: 64 },
        { x: 224, y: 64 },
        { x: 0, y: 96 },
        { x: 32, y: 96 }];
    this.runLeft = [
        { x: 288, y: 64 },
        { x: 256, y: 64 },
        { x: 288, y: 96 },
        { x: 256, y: 96 },
        { x: 224, y: 96 },
        { x: 192, y: 96 },
        { x: 160, y: 96 },
        { x: 128, y: 96 },
        { x: 96, y: 96 },
        { x: 64, y: 96 }];

    this.sprite.setDirection(this.stay);
}

Player.prototype = {
    draw: function () {
        playerContext.save();
        playerContext.globalAlpha = this.opacity;
        this.sprite.draw(this.x, this.y, playerContext);
        playerContext.restore();
    },

    clear: function () {
        playerContext.clearRect(0, 0, gameWidth, gameHeight);
    },

    update: function (dt) {
        this.sprite.update(dt);
        this.move(dt);
    },

    move: function (dt) {
        var nextPos;
        if (this.isUp) {
            nextPos = this.y - this.speed * dt;
            if (nextPos <= 0)
                this.y = 0;
            else
                this.y = nextPos;
        }
        if (this.isDown) {
            nextPos = this.y + this.size.height + this.speed * dt;
            if (nextPos >= gameHeight)
                this.y = gameHeight - this.size.height;
            else
                this.y = nextPos - this.size.height;
        }
        if (this.isRight) {
            console.log(gameWidth - this.size.width);
            nextPos = this.x + this.size.width + this.speed * dt;
            if (nextPos >= gameWidth)
                this.x = gameWidth - this.size.width;
            else
                this.x = nextPos - this.size.width;
        }
        if (this.isLeft) {
            nextPos = this.x - this.speed * dt;
            if (nextPos <= 0)
                this.x = 0;
            else
                this.x = nextPos;
        }
    },

    setDirection: function (keyChar, isPressing) {
        if (keyChar === "W")
            this.isUp = isPressing;
        if (keyChar === "S")
            this.isDown = isPressing;
        if (keyChar === "D")
            this.isRight = isPressing;
        if (keyChar === "A")
            this.isLeft = isPressing;

        this.setState(keyChar, isPressing);
    },

    setState: function (keyChar, isPressing) {
        console.log(this.state);
        if (isPressing) {
            if (this.state === "X") {
                if (keyChar === "W") {
                    this.state = "W";
                    this.sprite.setDirection(this.runHorizon);
                }
                if (keyChar === "S") {
                    this.state = "S";
                    this.sprite.setDirection(this.runHorizon);
                }
                if (keyChar === "D") {
                    this.state = "D";
                    this.sprite.setDirection(this.runRight);
                }
                if (keyChar === "A") {
                    this.state = "A";
                    this.sprite.setDirection(this.runLeft);
                }
            }
        }
        else {
            if (keyChar === this.state) {
                this.state = "X"
                this.sprite.setDirection(this.stay);
            }
        }
    }

}
