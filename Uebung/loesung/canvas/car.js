class CarBase {
    constructor(length, height) {
        this.speed = 0;
        this.angle = 0;
        this.positionX = 350;
        this.positionY = 150;

        this.length = length || 40;
        this.height = height  || 40;
        this.keys = {};

    }

    getCanvas(){
        return this.carCanvas || (this.carCanvas = this.drawCar());
    }

    speedUp() {
        this.speed += 0.05;
    }

    slowDown() {
         this.speed > 0 ? this.speed =  Math.max(0, this.speed - 0.10): this.speed =  this.speed - 0.2;
    }

    turnLeft() {
        this.angle -= Math.PI / 50;
    }

    turnRight() {
        this.angle += Math.PI / 50;
    }


    stop() {
        this.speed = 0;
    }

    move() {
        this.positionX = this.positionX + this.speed * Math.cos(this.angle);
        this.positionY = this.positionY + this.speed * Math.sin(this.angle);
    }

    drawCar() {
        let car = document.createElement('canvas');
        let ctx = car.getContext('2d');

        ctx.fillStyle = 'rgb(255, 0, 255)';
        ctx.fillRect(0, 0, this.length, this.height);
        return car;
    }

    handleKeys() {
        if (this.keys[this.up]) {
            this.speedUp();
        }
        else if (this.speed > 0) {
            this.slowDown();
        }
        if (this.keys[this.down]) {
            this.slowDown();
        }
        if (this.keys[this.right]) {
            this.turnRight();
        }
        if (this.keys[this.left]) {
            this.turnLeft();
        }
    }

    attachHandler(car, up, down, right, left) {
        this.up = up;
        this.down = down;
        this.right = right;
        this.left = left;

        document.addEventListener("keyup",  (e) =>  {
            this.keys[e.key] = false;
        });
        document.addEventListener("keydown", (e) =>  {
            this.keys[e.key] = true;
        });
    }
}

class Car1 extends  CarBase {
    constructor() {
        super(60, 40);
    }

    drawCar() {
        let wheelSize = 5;
        let car = document.createElement('canvas');
        let ctx = car.getContext('2d');

        let colorWheels = 'rgb(255, 0, 0)';

        ctx.beginPath();
        ctx.fillStyle = colorWheels;
        ctx.arc(wheelSize * 2, wheelSize, wheelSize, 0, Math.PI * 2);
        ctx.fill();

        ctx.beginPath();
        ctx.arc(wheelSize * 2, this.height -  wheelSize, wheelSize, 0, Math.PI * 2);
        ctx.fill();

        ctx.beginPath();
        ctx.arc(this.length - wheelSize * 2, wheelSize, wheelSize, 0, Math.PI * 2);
        ctx.fill();

        ctx.beginPath();
        ctx.arc(this.length - wheelSize * 2,this.height -  wheelSize, wheelSize, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = 'rgb(255, 0, 255)';
        ctx.fillRect(0, wheelSize * 1.5, this.length, this.height - wheelSize * 3);

        return car;
    }



}


class Car2 extends  CarBase {
    constructor() {
        super(60, 40);
    }

    drawCar() {

        let mainUnit = 15;
        let car = document.createElement('canvas');
        let ctx = car.getContext('2d');

        let colorWheels = 'rgb(255, 0, 0)';


        ctx.fillStyle = 'rgb(255, 0, 255)';
        ctx.fillRect(0, (this.height  - mainUnit) / 2, this.length, mainUnit);
        ctx.fillRect(0, 0, this.length / 2, (this.height  - mainUnit) / 2);
        ctx.fillRect(0,  this.height-  (this.height  - mainUnit) / 2 , this.length / 2, (this.height  - mainUnit) / 2);

        return car;
    }
}