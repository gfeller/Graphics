class PlayField {
    constructor(target, multiplayer) {

        this.multiplayer = multiplayer;
        this.cars = [];


        this.playField = SVG(target);
        this.playField.viewbox({ x: 0, y: 0, width: 800, height: 800 });

        this.playField.attr("preserveAspectRatio", "xMinYMin");
        this.drawBase();
         this.addPlayer(Car1, "ArrowUp", "ArrowDown", "ArrowRight", "ArrowLeft");
         if (this.multiplayer) {
            this.addPlayer(CarBase, "w", "s", "d", "a");
         }

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
        this.playField.image('assets/grass.jpg', "100%", "100%");
        this.playField.image('assets/Racing02.svg', "100%", "100%");
    }

    addPlayer(carType, up, down, right, left) {
        let newCar = new carType( this.playField.nested());
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
           //TODO
    }


    drawField() {

        this.cars.forEach(x => x.handleKeys());
        this.cars.forEach(x => x.move());


        this.cars.forEach(car => {
            car.getCanvas().each(function(i, children) {
                car.getCanvas().attr({ x: 0, y:  0});
                this.rotate(car.angle * 180 / Math.PI, car.getCanvas().bbox().cx, car.getCanvas().bbox().cy);
                car.getCanvas().attr({ x: car.positionX, y: car.positionY });
            })
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