function Sprite(image, size, speed, cells, once) {
        this.size = size;
        this.speed = typeof speed === 'number' ? speed : 0;
        this.cells = cells;
        this.cellIndex = 0;
        this._index = 0;
        this.image = image;
        this.once = once;
    };
    
    Sprite.prototype = {
        update: function(dt) {
            this._index += this.speed*dt;
        },

        draw: function(x, y, ctx) {
            var cellIndex;

            if(this.speed > 0) {
                var max = this.cells.length;
                var idx = Math.floor(this._index);
                cellIndex = idx % max;

                if(this.once && idx >= max) {
                    this.done = true;
                    return;
                }
            }
            else {
                cellIndex = 0;
            }
           
            var cell = this.cells[cellIndex];
 
            ctx.drawImage(this.image,
                          cell.x, cell.y,
                          cell.width, cell.height,
                          x, y,
                          this.size[0], this.size[1]);
        }
    };