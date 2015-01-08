/* Scores */
var Scores = {
    init: function () {
        this.value = 0;
        this.current = 0;
        this.obj = Class("score");
        this.obj.innerHTML = this.value;
    },
    animate: function () {
        if (this.current) {
            this.current--;
            this.value++;
            this.obj.innerHTML = this.value;
        }
        if (!this.current) {
            highscores.show();
        }
        return this.current;
    }
};

var highscores = {
    active: false,
    init: function () {
        this.obj = Class("highscore");
        var record = Cookies.get("highscore");
        if (record) {
            this.value = parseInt(record);
            this.show();
        }
    },
    show: function () {
        if (this.value) {
            if (Scores.value <= this.value) {
                this.obj.innerHTML = this.value;
            }
            if (Scores.value > this.value) {
                this.obj.innerHTML = Scores.value;
                this.save();
            }
        } else {
            this.save();
        }
    },
    save: function () {
        Cookies.set("highscore", Scores.value);
    }
};
