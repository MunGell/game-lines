/* Ball */

function Ball(color, state) {
    this.color = color;
    this.obj = document.createElement('div');
    this.obj.className = 'ball ball-responsive ball-' + color;
    this.state = state || 0;
    this.active = (this.state < 8);
    this.aim = this.active ? 7 : 0;
};

Ball.prototype = {
    show: function () {
        var y = this.state;
        if (y > 0 && y < 8) {
            if (!this.active) y = 1;
            this.obj.style.backgroundPosition = '0 ' + (y - 7) * this.obj.offsetWidth* 1.1 + 'px';
            this.obj.style.visibility = 'visible';
        } else {
            this.obj.style.visibility = 'hidden';
        }
    },
    animate: function () {
        if (this.state > this.aim) this.state--;
        if (this.state < this.aim) this.state++;
        if (this.state == 0 && this.aim == 0) {
            this.parent.deleteBall();
            return false;
        } else {
            this.show();
            return (this.state != this.aim);
        }
    }
};
