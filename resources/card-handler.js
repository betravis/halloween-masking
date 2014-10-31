function CardHandler(svgElement) {
    this.s = Snap(svgElement);
    this.spotlight = this.s.select("mask circle");

    /* mouse events */
    this.move = CardHandler.moveHandler.bind(this);
    this.out = CardHandler.outHandler.bind(this);
    this.click = CardHandler.clickHandler.bind(this);
    this.s.mousemove(this.move);
    this.s.mouseout(this.out);
    this.s.click(this.click);

    /* touch events */
    this.s.touchstart(CardHandler.startHandler.bind(this));
    this.s.touchend(CardHandler.endHandler.bind(this));
}

CardHandler.startHandler = function(event) {
    this.s.unmousemove(this.move);
    this.s.unmouseout(this.out);
    this.s.unclick(this.click);

    this.s.touchmove(this.move);
    this.move(event);
}

CardHandler.endHandler = function(event) {
    this.s.untouchmove(this.mousemove);
    this.out(event);

    this.s.mousemove(this.mousemove);
    this.s.mouseout(this.mouseout);
    this.s.click(this.click);
}

CardHandler.moveHandler = function(event) {
    var s = this.s;
    var spotlight = this.spotlight;
    if (spotlight.hasClass("frozen"))
            return;
    var offset = $(this.s.node).offset();
    var relX = event.pageX - offset.left;
    var relY = event.pageY - offset.top;
    if (!spotlight.hasClass("active")) {
        spotlight.addClass("active");
        spotlight.animate({ r: "160" }, 1000, mina.easeinout);
    }
    spotlight.attr({
        cx: relX,
        cy: relY
    });
}

CardHandler.outHandler = function(event) {
    var s = this.s,
        spotlight = this.spotlight;
    if (spotlight.hasClass("frozen"))
            return;
    if (spotlight.inAnim())
        spotlight.stop();
    spotlight.animate({ r: "0" }, 1000, mina.easeinout);
    spotlight.removeClass("active");
}

CardHandler.clickHandler = function(event) {
    var s = this.s,
        spotlight = this.spotlight;
    if (spotlight.inAnim())
        spotlight.stop();
    spotlight.toggleClass("frozen");
    if (spotlight.hasClass("frozen")) {
        spotlight.animate({
            cx: "160",
            cy: "100",
            r: "160"
        }, 500, mina.easeinout);
    } else {
        spotlight.animate({ r: "0" }, 500, mina.easeinout);
    }
}
