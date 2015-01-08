/* Square */
function Square(x, y) {
    this.x = x;
    this.y = y;
    var obj = document.createElement("div");
    obj.className = "square square-col" + (x+1) + " square-row" + (y+1);
    this.obj = Class("grid").appendChild(obj);
    this.obj.onclick = processEvent(this, "click");
    this.ball = null;
}

Square.prototype = {
    createBall: function (color, state) {
        this.ball = new Ball(color, state);
        this.ball.parent = this;
        this.obj.appendChild(this.ball.obj);
        animation.items.push(this.ball);
    },
    deleteBall: function () {
        if (this.ball) {
            this.obj.removeChild(this.ball.obj);
            this.ball = null;
        }
        if (this == linesGrid.selected) {
            linesGrid.unselect();
        }
    },
    click: function () {
        if (this.ball && this.ball.state == 7) {
            this.select();
        }
        if (!this.ball && !animation.disableClick && linesGrid.selected && this.step) {
            this.invite();
        }
    },
    select: function () {
        linesGrid.reset();
        this.step = 1;
        pathfinder.add(this);
        pathfinder.process();
        linesGrid.unselect();
        linesGrid.selected = this;
        classNameOf(this.obj).add("selected");
    },
    invite: function () {
        var clone = linesGrid.selected.ball;
        this.createBall(clone.color, 0 - this.step);
        clone.aim = 0;
        animation.items.push(clone, this.ball);
        var last = this.from;
        while (last.step > 1) {
            last.createBall(clone.color, 7 + last.step);
            last.ball.aim = 0;
            animation.items.push(last.ball);
            last = last.from;
        }
        linesGrid.makeTurn = true;
        linesGrid.checkSquares.push(this);
        linesGrid.unselect();
        animation.onfinish = "linesGrid.checkLines()";
        animation.start();
    },
    findSteps: function () {
        this.checkStep(this.x - 1, this.y);
        this.checkStep(this.x + 1, this.y);
        this.checkStep(this.x, this.y - 1);
        this.checkStep(this.x, this.y + 1);
    },
    checkStep: function (x, y) {
        var column = linesGrid.squares[x];
        if (!column) return false;
        var item = column[y];
        var value = this.step + 1;
        if (item && !item.ball && (!item.step || item.step > value)) {
            item.step = value;
            item.from = this;
            pathfinder.add(item);
        }
    },
    findSame: function () {
        var sameMax = new Line(this);
        var sameDiagonalDown = new Line(this);
        sameDiagonalDown.addLine(-1, -1);
        sameDiagonalDown.addLine(1, 1);
        sameMax.replace(sameDiagonalDown.items);
        var sameDiagonalUp = new Line(this);
        sameDiagonalUp.addLine(-1, 1);
        sameDiagonalUp.addLine(1, -1);
        sameMax.replace(sameDiagonalUp.items);
        var sameVertical = new Line(this);
        sameVertical.addLine(0, -1);
        sameVertical.addLine(0, 1);
        sameMax.replace(sameVertical.items);
        var sameHorizontal = new Line(this);
        sameHorizontal.addLine(-1, 0);
        sameHorizontal.addLine(1, 0);
        sameMax.replace(sameHorizontal.items);
        var directCross = false;
        if (sameHorizontal.items.length > 2) {
            sameMax.replace(this.findCross(-1, 0, 0));
            sameMax.replace(this.findCross(1, 0, 0));
            directCross = true;
        }
        if (sameVertical.items.length > 2) {
            sameMax.replace(this.findCross(0, -1, 0));
            sameMax.replace(this.findCross(0, 1, 0));
            directCross = true
        }
        if (directCross) {
            sameMax.replace(this.findCross(0, 0, 0));
        }
        var diagonslCross = false;
        if (sameDiagonalDown.items.length > 2) {
            sameMax.replace(this.findCross(-1, -1, 1));
            sameMax.replace(this.findCross(1, 1, 1));
            diagonslCross = true;
        }
        if (sameDiagonalUp.items.length > 2) {
            sameMax.replace(this.findCross(-1, 1, 1));
            sameMax.replace(this.findCross(1, -1, 1));
            diagonslCross = true
        }
        if (diagonslCross) {
            sameMax.replace(this.findCross(0, 0, 1));
        }
        return sameMax;
    },
    findCross: function (dx, dy, dd) {
        var cross = new Line(this);
        var xc = this.x + dx;
        var yc = this.y + dy;
        cross.items = [];
        cross.add(xc, yc);
        if (cross.items.length) {
            cross.add(xc + 1, yc + dd);
            cross.add(xc - 1, yc - dd);
            cross.add(xc + dd, yc - 1);
            cross.add(xc - dd, yc + 1);
        }
        return cross.items;
    }
};
