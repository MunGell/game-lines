function Line(obj) {
    this.color = obj.ball.color;
    this.x = obj.x;
    this.y = obj.y;
    this.items = [];
    this.items.push(obj.ball);
}

Line.prototype = {
    addLine: function (dx, dy) {
        for (var i = 1, result = true; result; i++) {
            result = this.add(this.x + i * dx, this.y + i * dy);
        }
    },
    add: function (x, y) {
        var column = linesGrid.squares[x];
        if (!column) return false;
        var item = column[y];
        if (item && item.ball && item.ball.state == 7 && item.ball.color == this.color) {
            this.items.push(item.ball);
            return true;
        } else return false;
    },
    fire: function () {
        for (var i = 0, lim = this.items.length; i < lim; i++) {
            var ball = this.items[i];
            ball.aim = 0;
            animation.items.push(ball);
        }
        Score.current += this.items.length * 2;
        animation.items.push(Score);
        linesGrid.makeTurn = false;
        animation.onfinish = "linesGrid.checkLines()";
        animation.start();
    },
    replace: function (items) {
        if (items.length > this.items.length) {
            this.items = items;
        }
    }
};
