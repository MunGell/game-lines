/* Grid */
var linesGrid = {
    checkSquares: [],
    init: function () {
        if (!this.ready) {
            this.obj = Class('grid');
            this.squares = [];
        }
        this.unselect();
        for (x = 0; x < 9; x++) {
            if (!this.ready) {
                this.squares[x] = [];
            }
            for (y = 0; y < 9; y++) {
                if (this.ready) {
                    this.squares[x][y].deleteBall();
                } else {
                    this.squares[x][y] = new Square(x, y);
                }
            }
        }
        Preview.init();
        Score.init();
        if (this.ready) {
            Cookies.expire('savedgame');
        }
        this.ready = true;
        this.loadGame();
    },
    reset: function () {
        for (x = 0; x < 9; x++) {
            for (y = 0; y < 9; y++) {
                var item = this.squares[x][y];
                item.step = null;
                item.from = null;
            }
        }
        pathfinder.init();
    },
    unselect: function () {
        if (this.selected) {
            classNameOf(this.selected.obj).remove('selected');
            this.selected = null;
        }
    },
    add: function () {
        var empty = [];
        for (x = 0; x < 9; x++) {
            for (y = 0; y < 9; y++) {
                var item = this.squares[x][y];
                if (!item.ball) {
                    empty.push(item);
                }
            }
        }
        if (empty.length) {
            var n = Math.floor(Math.random() * empty.length - 0, 01);
            empty[n].createBall(Preview.use());
            this.checkSquares.push(empty[n]);
        }
    },
    turn: function () {
        for (var i = 0; i < 3; i++) {
            this.add();
        }
        this.makeTurn = false;
        animation.onfinish = 'linesGrid.checkLines()';
        animation.start();
    },
    checkLines: function () {
        var item = this.checkSquares.shift();
        if (item && item.ball) {
            var same = item.findSame();
            if (same.items.length > 4) {
                same.fire();
            } else {
                this.checkLines();
            }
        } else if (this.makeTurn) {
            this.turn();
        } else {
            if (this.selected) {
                this.selected.select();
            }
            this.saveGame();
        }
    },
    saveGame: function () {
        var balls = [];
        for (x = 0; x < 9; x++) {
            for (y = 0; y < 9; y++) {
                var item = this.squares[x][y].ball;
                if (item) {
                    var coords = x.toString() + y.toString();
                    balls.push(coords + item.color);
                }
            }
        }
        if (balls.length < 81) {
            var saved = balls.join('-') + '~' + Preview.items.join('-') + '~' + Score.value;
            Cookies.set('savedgame', saved);
        } else {
            Cookies.expire('savedgame');
            alert('Game over');
        }
    },
    loadGame: function () {
        var summary = Cookies.get('savedgame');
        if (summary) {
            var values = summary.split('~');
            var balls = values[0].split('-');
            for (var i = 0, lim = balls.length; i < lim; i++) {
                var str = balls[i];
                var x = parseInt(str.charAt(0));
                var y = parseInt(str.charAt(1));
                this.squares[x][y].createBall(str.substr(2));
            }
            Preview.items = values[1].split('-');
            Preview.update();
            Score.value = parseInt(values[2]);
            Score.obj.innerHTML = Score.value;
            this.makeTurn = false;
            animation.start();
        } else {
            this.makeTurn = true;
            this.turn();
        }
        highscore.init();
    }
};
