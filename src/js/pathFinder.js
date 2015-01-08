/* Find path for a ball */
var pathfinder = {
    init: function () {
        this.items = [];
        this.size = 0;
    },
    add: function (item) {
        this.size = this.items.push(item);
    },
    process: function () {
        var i = 0;
        while (i < this.size) {
            this.items[i].findSteps();
            i++;
        }
    }
};
