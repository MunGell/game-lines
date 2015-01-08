/* Animation */
var animation = {
    items: [],
    active: false,
    timer: null,
    endTimer: null,
    disableClick: false,
    start: function () {
        clearTimeout(this.endTimer);
        this.disableClick = true;
        if (!this.active) {
            this.apply();
        }
    },
    end: function () {
        clearTimeout(this.endTimer);
        this.disableClick = false;
    },
    apply: function () {
        clearTimeout(this.timer);
        this.active = false;
        for (var i = 0, lim = this.items.length; i < lim; i++) {
            var item = this.items.shift(0);
            if (item.animate()) {
                this.items.push(item);
            }
        }
        if (this.items.length) {
            this.active = true;
            this.timer = setTimeout("animation.apply()", 50);
        } else if (this.onfinish) {
            this.endTimer = setTimeout("animation.end()", 300);
            setTimeout(this.onfinish, 250);
            this.onfinish = null;
        } else {
            this.end();
        }
    }
};