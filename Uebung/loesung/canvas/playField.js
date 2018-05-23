class PlayField {
    constructor(width, height, groundCanvas, canvasPlayfield, multiplayer) {
        this.multiplayer = multiplayer;
        this.cars = [];
        let size = Math.min(height, width) - 2;

        this.groundCanvas = groundCanvas;
        this.canvasPlayfield = canvasPlayfield;

        this.groundContext = groundCanvas.getContext("2d");
        this.contextPlayfield = canvasPlayfield.getContext("2d");

        this.canvasPlayfield.width = this.groundCanvas.width = size;
        this.canvasPlayfield.height = this.groundCanvas.height = size;

        this.addPlayer(Car1, "ArrowUp", "ArrowDown", "ArrowRight", "ArrowLeft");
        if (this.multiplayer) {
            this.addPlayer(Car2, "w", "s", "d", "a");
        }
        this.drawBase();
        this.timer();
    }

    loadImage(imgPath, callback) {
        let img = new Image();
        img.addEventListener('load', function () {
            callback(img);
        }, false);
        img.src = imgPath;
    }

    drawBase() {
        this.loadImage('assets/grass.jpg', x => {
            this.groundContext.drawImage(x, 0, 0, this.groundCanvas.width, this.groundCanvas.height);
            this.loadImage('assets/Racing02.svg', x => {
                this.groundContext.drawImage(x, 0, 0, this.groundCanvas.width, this.groundCanvas.height);
            })
        });
    }

    addPlayer(carType, up, down, right, left) {
        let newCar = new carType();

        this.cars.push(newCar);
        newCar.attachHandler(newCar, up, down, right, left)
    }


    drawWithRestore(context, positionX, positionY, angle, action) {
        context.save();
        context.translate(positionX, positionY);
        context.rotate(angle);

        action();

        context.restore();
    }

    handleFieldLimit(context, car) {
        let w1 = (car.speed >= 0 ? car.length : 0) - car.length / 2.0;
        let h1 = 0;

        let nX = car.positionX + w1 * Math.cos(car.angle) - h1 * Math.sin(car.angle);
        let nY = car.positionY + w1 * Math.sin(car.angle) + h1 * Math.cos(car.angle);

        let color = CanvasUtil.getColorAt(this.groundContext, nX, nY);

        context.fillStyle = 'rgb(255, 255, 255)';
        context.fillRect(nX, nY, 1, 1);

        this.drawWithRestore(context, car.positionX, car.positionY, car.angle, () => {
            if (car.speed < 0) {
                context.fillStyle = 'rgb(255, 0, 0)';
            }
            context.fillRect(w1 - 2, -12, 2, 5);
            context.fillRect(w1 - 2, 7, 2, 5);
        });

        if (color[0] + color[1] + color[2] != 0) {
            car.stop()
        }
    }


    drawField() {
        this.contextPlayfield.clearRect(0, 0, this.canvasPlayfield.width, this.canvasPlayfield.height);

        this.cars.forEach(x => x.handleKeys());
        this.cars.forEach(x => x.move());

        this.cars.forEach(car => {
            this.drawWithRestore(this.contextPlayfield, car.positionX, car.positionY, car.angle, () => {
                this.contextPlayfield.drawImage(car.getCanvas(), -car.length / 2.0, -(car.height) / 2.0);
            });
        });

        this.cars.forEach(car => {
            this.handleFieldLimit(this.contextPlayfield, car)
        });
    }


    timer() {
        this.drawField();
        setTimeout(() => this.timer(), 15);
    }
}