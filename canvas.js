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
    printf('<canvas id="' + name + '" height="' + height + '" width="' + width +
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
    clr: "#00000",
    fill: true,
    /**
     * Draws the rectangle with the given context.
     * @param {cv.ctx} ctx
     * @returns {rect}
     */
    draw: function (ctx) {
        if(this.fill) {
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
    },
    /**
     * Sets a new color.
     * @param {String} newColor
     * @returns {rect}
     */
    setColor: function (newColor) {
        this.clr = newColor;
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
        if(this.fill) {
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
    },
    /**
     * Sets a new color.
     * @param {String} newColor
     * @returns {circ}
     */
    setColor: function (newColor) {
        this.clr = newColor;
        return this;
    }
};

imgList = [];
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
    // Look through all the images to see if the image was already loaded
    for(var i in imgList) {
        if(imgList[i].img.source === source) {
            this.ind = i; // Use that image
            if(imgList[i].req !== null) { // If the image hasn't loaded
                // Request a null canvas drawing; 
                // This enable this object when the image loads
                imgList[i].req.push({
                    ctx: null, 
                    ref: this
                });
            } else { // If the image has loaded
                // Enable this object
                this.load = true;
            }
            return this;
        }
    }
    // Load a new image onto the list
    var i = this.ind = imgList.length;
    imgList.push({
        img: new Image(), 
        req: [{
            ctx: null, 
            ref: this
        }]
    });
    // When it loads
    imgList[this.ind].img.onload = function () {
        // Tell that it's loaded
        for(var j in imgList[i].req) {
            // Set load to true in all image objects using this image
            imgList[i].req[j].ref.loaded()
                    .draw(imgList[i].req[j].ctx);
            // Draw on the requested canvas
        }
        imgList[i].req = null;
    };
    imgList[this.ind].img.src = source;
    return this;
};
img.prototype = {
    pos: [0, 0],
    h: 10, w: 10,
    // Index of image
    ind: null,
    // If the image is loaded yet
    load: false,
    loaded: function () {
        this.load = true;
        return this;
    },
    /**
     * Draws the rectangle with the given context.
     * @param {cv.ctx} ctx
     * @returns {img}
     */
    draw: function (ctx) {
        if(ctx !== null) {
            if(this.load) { // the image is loaded
                ctx.drawImage(imgList[this.ind].img, this.pos[0], 
                    this.pos[1], this.w, this.h);
            } else { // Not loaded yet
               console.log("Image not yet loaded.");
                // Request the image to be drawn onload
                imgList[this.ind].req.push({ctx: ctx, ref: this});
            }
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