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

    addPlayer(carType, up, down, right, left) {
        let newCar = new carType();

        this.cars.push(newCar);
        newCar.attachHandler(newCar, up, down, right, left)
    }

    loadImage(imgPath, callback) {
        let img = new Image();
        img.addEventListener('load', function () {
            callback(img);
        }, false);
        img.src = imgPath;
    }

    drawBase() {
        this.groundContext.fillRect(0,0, this.groundCanvas.width, this.groundCanvas.height ); //TODO 2 Zeile löschen
        //TODO 2 Background - Tipp: https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Using_images und this.loadImage()
    }

    handleFieldLimit(context, car) {
        let w1 = (car.speed >= 0 ? car.length : 0) - car.length / 2.0;
        let h1 = 0;

        let nX = car.positionX + w1 * Math.cos(car.angle) - h1 * Math.sin(car.angle);
        let nY = car.positionY + w1 * Math.sin(car.angle) + h1 * Math.cos(car.angle);

        let color = CanvasUtil.getColorAt(this.groundContext, nX, nY);
        //TODO 5
    }

    drawField() {
        //TODO 3/4/5

    }


    timer() {
        this.drawField();
        //TODO 4
    }
}