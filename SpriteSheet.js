function SpriteSheet (spritesheet, cells) { 
   this.cells = cells;
   this.spritesheet = spritesheet;
   this.cellIndex = 0;
}

SpriteSheet.prototype = { 
   advance: function (speed, dt) {    
      if (Math.round(this.cellIndex) >= this.cells.length-1) {
         this.cellIndex = 0;
      }
      else {
         this.cellIndex += speed*dt;
      }
   },

   draw: function (x, y, context) {
      var max = this.cells.length;
      var idx = Math.floor(this.cellIndex);
      
      var cell = this.cells[idx % max];

      context.drawImage(this.spritesheet,
               cell.x,   cell.y,    
               cell.wight,  cell.height,  
               x, y,   
               cell.wight,  cell.height); 
   }
}