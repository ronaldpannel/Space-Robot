/**@type{HTMLCanvasElement} */

window.addEventListener("load", function () {
  const canvas = document.getElementById("canvas1");
  const ctx = canvas.getContext("2d");
  canvas.width = 600;
  canvas.height = 800;
  ctx.strokeStyle = "white";
  ctx.lineWidth = 3;

  class Robot {
    constructor(canvas) {
      this.canvas = canvas;
      this.radius = 80;
      this.x = this.canvas.width * 0.5;
      this.y = this.canvas.height * 0.5;
      this.centerX = this.x;
      this.centerY = this.y;
      this.offset = this.radius * 0.5;
      this.angle = 0;
      this.spriteWidth = 370;
      this.spriteHeight = 393;
      this.frameX = 0;
      this.maXFrame = 75;
      this.movementAngle = 0;
      this.tracking = false;

      this.pointer = {
        x: undefined,
        y: undefined,
      };
      this.bodyImg = document.getElementById("body");
      this.eye1Img = document.getElementById("eye1");
      this.eye2Img = document.getElementById("eye2");
      this.reflectionImg = document.getElementById("reflection");
      this.bodySprite = document.getElementById("bodySprite");
      this.detectorLightImg = document.getElementById("detectorLight");

      this.canvas.addEventListener("pointermove", (e) => {
        this.pointer.x = e.offsetX;
        this.pointer.y = e.offsetY;
        this.tracking = true;
      });
      this.canvas.addEventListener("pointerleave", (e) => {
        this.tracking = false;
      });
    }
    draw(context) {
      //body
      context.beginPath();
      context.drawImage(
        this.bodySprite,
        this.frameX * this.spriteWidth,
        0,
        this.spriteWidth,
        this.spriteHeight,
        this.x - this.bodyImg.width * 0.5 + 62,
        this.y - this.bodyImg.height * 0.5 - 50,
        this.spriteWidth,
        this.spriteHeight
      );

      //eye 1
      context.beginPath();
      context.drawImage(
        this.eye1Img,
        this.x +
          Math.cos(this.angle) * this.radius * 0.4 -
          this.eye1Img.width * 0.5,
        this.y +
          Math.sin(this.angle) * this.radius * 0.4 -
          this.eye1Img.height * 0.5
      );

      //eye 2
      context.beginPath();
      context.drawImage(
        this.eye2Img,
        this.x +
          Math.cos(this.angle) * this.radius * 0.65 -
          this.eye2Img.width * 0.5,
        this.y +
          Math.sin(this.angle) * this.radius * 0.65 -
          this.eye2Img.height * 0.5
      );
      //reflection
      context.beginPath();
      context.drawImage(
        this.reflectionImg,
        this.x - this.reflectionImg.width * 0.5,
        this.y - this.reflectionImg.height * 0.5
      );
      //detector light
      if (this.tracking) {
        context.beginPath();
        context.drawImage(
          this.detectorLightImg,
          this.x - this.reflectionImg.width * 0.5,
          this.y - this.reflectionImg.height * 0.5 - 195
        );
      }
    }
    update() {
      //angle
      const dx = this.pointer.x - this.x;
      const dy = this.pointer.y - this.y;
      this.angle = Math.atan2(dy, dx);

      //sprite animation
      this.frameX >= this.maXFrame ? (this.frameX = 0) : this.frameX++;

      //movement
      this.movementAngle += 0.005;
      this.x = this.centerX + Math.cos(this.movementAngle * 3) * 80;
      this.y = this.centerY + Math.sin(this.movementAngle * 0.5) * 150;

      if (this.movementAngle > Math.PI * 4) {
        this.movementAngle = 0;
      }
    }
  }
  const robot = new Robot(canvas);

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    robot.draw(ctx);
    robot.update();
    requestAnimationFrame(animate);
  }
  animate();

  //load function end
});
