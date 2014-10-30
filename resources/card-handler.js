function CardHandler(svgElement) {
    this.s = Snap(svgElement);
    this.spotlight = this.s.select("mask circle");
    this.mousemove = CardHandler.moveHandler.bind(this);
    this.mouseout = CardHandler.outHandler.bind(this);
    this.click = CardHandler.clickHandler.bind(this);
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
        spotlight.animate({ r: "50%" }, 1000, mina.easeinout);
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
    spotlight.animate({ r: "0%" }, 1000, mina.easeinout);
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
            cx: "50%",
            cy: "50%",
            r: "50%"
        }, 500, mina.easeinout);
    } else {
        spotlight.animate({ r: "0%" }, 500, mina.easeinout);
    }
}
