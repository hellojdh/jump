function spawnMonster() {
    var monsterChances = {
        "smallRed": 20
    };

	if (Math.floor(Math.random() * monsterChances['smallRed']) === 0) {
        return "smallRed";
    }
    return 0;
}

var smallRed = new function() {
    this.img = new Image();
    this.img.src = "monster.png";
    this.xDif = 10;
    this.yDif = -30;
    this.width = 65;
    this.height = 60;

    this.draw = function(blockX, blockY) {
        ctx.drawImage(this.img, blockX + this.xDif, blockY + this.yDif, this.width, this.height);
    }
}

var monsterFunctions = {
    "smallRed": smallRed
}