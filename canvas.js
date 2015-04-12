/* 
 * Canvas Class
 *   by Clayton
 */
/**
 * Creates a canvas element.
 * @param {String} name
 * @param {Integer} height
 * @param {Integer} width
 * @returns {cv}
 */
cv = function (name, height, width) {
    print('<canvas id="' + name + '" height="' + height + '" width="' + width +
            '">Update your web browser to support canvas elements.</canvas>');
    this.id = name;
    this.elem = document.getElementById(this.id);
    this.ctx = this.elem.getContext("2d");
    this.h = height;
    this.w = width;
};
cv.prototype = {
    id: null,
    elem: null,
    ctx: null,
    h: null, w: null,
    /**
     * Draws an object onto this classes canvas.
     * @param {Object} drawObj
     * @returns {cv}
     */
    draw: function (drawObj) {
        drawObj.draw(this.ctx);
        return this;
    },
    /**
     * Sets a new height.
     * @param {Integer} newHieght
     * @returns {cv}
     */
    setHeight: function (newHieght) {
        this.h = newHieght;
        this.elem.style.height = newHieght;
        return this;
    },
    /**
     * Sets a new width.
     * @param {Integer} newWidth
     * @returns {cv}
     */
    setWidth: function (newWidth) {
        this.h = newWidth;
        this.elem.style.width = newWidth;
        return this;
    }
};
/**
 * A rectangle object.
 * @param {Integer} x
 * @param {Integer} y
 * @param {Integer} height
 * @param {Integer} width
 * @param {Boolean} isFilled
 * @returns {rect}
 */
rect = function (x, y, height, width, isFilled) {
    this.pos = [x, y];
    this.h = height;
    this.w = width;
    this.fill = isFilled || this.fill;
    return this;
};
rect.prototype = {
    pos: [0, 0],
    h: 10, w: 10,
    clr: "#000",
    fill: true,
    /**
     * Draws the rectangle with the given context.
     * @param {cv.ctx} ctx
     * @returns {rect}
     */
    draw: function (ctx) {
        if(fill) {
            ctx.fillStyle = this.clr;
            ctx.fillRect(this.pos[0], this.pos[1], this.w, this.h);
        } else {
            ctx.strokeStyle = this.clr;
            ctx.strokeRect(this.pos[0], this.pos[1], this.w, this.h);
        }
        return this;
    },
    /**
     * Sets a new height.
     * @param {Integer} newHieght
     * @returns {rect}
     */
    setHeight: function (newHieght) {
        this.h = newHieght;
        return this;
    },
    /**
     * Sets a new width
     * @param {Integer} newWidth
     * @returns {rect}
     */
    setWidth: function (newWidth) {
        this.w = newWidth;
        return this;
    },
    /**
     * Sets a new position.
     * @param {Integer} x
     * @param {Integer} y
     * @returns {rect}
     */
    setPos: function (x, y) {
        this.pos = [x, y];
        return this;
    },
    /**
     * Sets a new x position.
     * @param {Integer} x
     * @returns {rect}
     */
    setX: function (x) {
        this.pos = [x, this.pos[1]];
        return this;
    },
    /**
     * Sets a new y position.
     * @param {Integer} y
     * @returns {rect}
     */
    setY: function (y) {
        this.pos = [this.pos[0], y];
        return this;
    }
};

/**
 * A circle object.
 * @param {Integer} x
 * @param {Integer} y
 * @param {Integer} radius
 * @param {Boolean} isFilled
 * @returns {circ}
 */
circ = function (x, y, radius, isFilled) {
    this.pos = [x, y];
    this.r = radius;
    this.fill = isFilled || this.fill;
    return this;
};
circ.prototype = {
    pos: [0, 0],
    r: 10,
    clr: "#000",
    fill: true,
    /**
     * Draws the rectangle with the given context.
     * @param {cv.ctx} ctx
     * @returns {circ}
     */
    draw: function (ctx) {
        ctx.beginPath();
        ctx.fillStyle = ctx.strokeStyle = this.clr;
        ctx.arc(this.pos[0], this.pos[1], this.r, 0, 2 * Math.PI);
        if(fill) {
            ctx.fill();
        } else {
            ctx.stroke();
        }
        return this;
    },
    /**
     * Sets a new radius.
     * @param {Integer} newRadius
     * @returns {circ}
     */
    setRadius: function (newRadius) {
        this.r = newRadius;
        return this;
    },
    /**
     * Sets a new position.
     * @param {Integer} x
     * @param {Integer} y
     * @returns {circ}
     */
    setPos: function (x, y) {
        this.pos = [x, y];
        return this;
    },
    /**
     * Sets a new x position.
     * @param {Integer} x
     * @returns {circ}
     */
    setX: function (x) {
        this.pos = [x, this.pos[1]];
        return this;
    },
    /**
     * Sets a new y position.
     * @param {Integer} y
     * @returns {circ}
     */
    setY: function (y) {
        this.pos = [this.pos[0], y];
        return this;
    }
};

/**
 * An image object.
 * @param {URL} source
 * @param {Integer} x
 * @param {Integer} y
 * @param {Integer} height
 * @param {Integer} width
 * @returns {img}
 */
img = function (source, x, y, height, width) {
    this.pos = [x, y];
    this.h = height;
    this.w = width;
    this.img = new Image();
    this.img.onload = function () {
        this.load = true;
        if(this.req) {
            this.draw();
        }
    };
    this.img.src = source;
    return this;
};
img.prototype = {
    pos: [0, 0],
    h: 10, w: 10,
    // Image object
    img: null,
    // If the image is loaded yet
    load: false, 
    // If the image was requested before it was loaded
    req: false,
    /**
     * Draws the rectangle with the given context.
     * @param {cv.ctx} ctx
     * @returns {img}
     */
    draw: function (ctx) {
        if(this.load) { // the image is loaded
            ctx.drawImage(this.img, this.pos[0], this.pos[1], this.w, this.h);
        } else { // Not loaded yet
            console.log("Image not yet loaded.");
            // Request the image to be drawn onload
            this.req = true;
        }
        return this;
    },
    /**
     * Sets a new height.
     * @param {Integer} newHieght
     * @returns {img}
     */
    setHeight: function (newHieght) {
        this.h = newHieght;
        return this;
    },
    /**
     * Sets a new width
     * @param {Integer} newWidth
     * @returns {img}
     */
    setWidth: function (newWidth) {
        this.w = newWidth;
        return this;
    },
    /**
     * Sets a new position.
     * @param {Integer} x
     * @param {Integer} y
     * @returns {img}
     */
    setPos: function (x, y) {
        this.pos = [x, y];
        return this;
    },
    /**
     * Sets a new x position.
     * @param {Integer} x
     * @returns {img}
     */
    setX: function (x) {
        this.pos = [x, this.pos[1]];
        return this;
    },
    /**
     * Sets a new y position.
     * @param {Integer} y
     * @returns {img}
     */
    setY: function (y) {
        this.pos = [this.pos[0], y];
        return this;
    }
};