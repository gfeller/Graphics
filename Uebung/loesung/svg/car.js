class CarBase {
    constructor(renderer, length, height) {
        this.renderer = renderer;
        this.speed = 0;
        this.angle = 0;
        this.positionX = 350;
        this.positionY = 100;

        this.length = length || 40;
        this.height = height  || 40;
        this.keys = {};


        this.carCanvas = this.drawCar(this.renderer);
    }

    getCanvas(){
        return this.carCanvas;
    }

    speedUp() {
        this.speed += 0.05;
    }

    slowDown() {
         this.speed > 0 ? this.speed =  this.speed - 0.10: this.speed =  this.speed - 0.2;
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

    drawCar(renderer) {
        renderer.rect(this.length, this.height).fill("red");
        return renderer;
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
    constructor(renderer) {
        super(renderer,60, 40);
    }

    drawCar() {
        let wheelSize = 10;

        let group = this.renderer.group();


        let c1 = group.circle(wheelSize);
        c1.fill("red");
        c1.x(wheelSize );
        c1.y(wheelSize);
        c1.click(()=>alert("Hello World"));

         c1 = group.circle(wheelSize);
        c1.fill("red");
        c1.x(wheelSize);
        c1.y(this.height -  wheelSize / 2);

         c1 = group.circle(wheelSize);
        c1.fill("red");
        c1.x(this.length - wheelSize * 2);
        c1.y(wheelSize);

        c1 = group.circle(wheelSize);
        c1.fill("red");
        c1.x(this.length - wheelSize * 2);
        c1.y(this.height -  wheelSize / 2);


        let rect = group.rect(this.length,this.height - wheelSize / 2 * 3)
        rect.fill("blue");
        rect.x(0);
        rect.y(wheelSize * 1.5);

        return this.renderer;
    }
}