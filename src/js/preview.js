/* Colors for next turn */
var Preview = {
    colors: ["yellow", "green", "red", "blue", "violet", "aqua", "pink"],
    init: function () {
        var list = Class("preview");
        this.nodes = getNodesOf(list);
        this.items = [];
        for (var i = 0; i < 3; i++) {
            this.add();
        }
        this.update();
    },
    add: function () {
        var c = Math.floor(Math.random() * this.colors.length);
        this.items.push(this.colors[c]);
    },
    use: function () {
        var color = this.items.shift();
        this.add();
        this.update();
        return color;
    },
    update: function () {
        for (var i = 0; i < 3; i++) {
            this.nodes[i].className = 'ball ball-' + this.items[i];
        }
    }
};
