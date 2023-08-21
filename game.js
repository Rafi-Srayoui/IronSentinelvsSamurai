//Main Game Class
class Game {
  constructor() {
    this.canvas = document.getElementById("myCanvas");
    this.ctx = this.canvas.getContext("2d");
    this.canvasWidth = 1200;
    this.canvasHeight = 700;
    this.sprites = [];
    this.gameOver = false;
    this.updateCounterAfterFinish = 0;
    this.finishGame = false;
    this.gamePaused = false;
    this.startGameFirst = false;
    this.gamePausedSprite = new GamePaused(150, 300, 700, 300, "", "", "Black");
    this.bgSong1 = new Audio("./sounds/backgroundMusic/Rey de Picas.mp3");
    this.bgSong2 = new Audio("./sounds/backgroundMusic/BG1.mp3");
    this.bgSong1.volume = 0.05;
    //this.bgSong2.volume = 0.5;
    this.displayGameMenu();
    this.displayGameStoryAndInstructions();
  }
  update() {
    //check user input to pause.
    window.onkeydown = (key) => {
      switch (key.keyCode) {
        case 27:
          for (var i = 0; i < this.sprites.length; i++) {
            if (this.sprites[i] instanceof GameOver) {
              if (this.sprites[i].isGameOver) {
                break;
              } else {
                if (this.gamePaused) {
                  this.gamePaused = false;
                  this.gamePausedSprite.value = "";
                  this.gamePausedSprite.value2 = "";
                } else {
                  this.gamePausedSprite.value = "Game";
                  this.gamePausedSprite.value2 = "Paused";
                  this.gamePaused = true;
                }
              }
            }
          }

          break;
        case 13:
          for (var i = 0; i < this.sprites.length; i++) {
            if (this.sprites[i] instanceof GameOver) {
              if (this.sprites[i].isGameOver) {
                this.resetGame();
              } else {
                break;
              }
            }
          }
          break;
      }
    };

    if (this.gameOver) {
    } else if (this.gamePaused) {
    } else {
      for (var i = 0; i < this.sprites.length; i++) {
        this.gameOver = this.sprites[i].update(this.sprites);

        //didn't delete menu in case i need to reuse it after reset.
        if (!this.startGameFirst && this.sprites[i] instanceof GameMenu) {
          if (this.sprites[i].startGame1) {
            this.startGameFirst = true;
            this.sprites[i].hideMenu = true;
            this.startGame();
            this.playMusic();
          }
        }
      }
    }
  }
  draw() {
    this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
    for (var i = 0; i < this.sprites.length; i++) {
      this.sprites[i].draw(this.ctx);
    }
  }

  playMusic() {
    this.bgSong1.play();
  }

  addSprite(pSprite) {
    this.sprites.push(pSprite);
  }

  displayGameMenu() {
    let gameMenu = new GameMenu(0, 0, 1, "white");
    this.addSprite(gameMenu);
  }

  displayGameStoryAndInstructions() {
    let gameTitle = new GameTitle(370, 150, "Sentinel S. Fight Game", "white");
    let gameStory = new GameStoryAndInstructions(
      200,
      200,
      850,
      400,
      210,
      235,
      "In a world of chaos and destruction, a lone Iron Sentinel\nstands guard over the last remnants of humanity. As the \nultimate defender you must face off against the greatest \nsamurai warrior of all time. Can you defeat him and save\nhumanity from certain doom? \n\n                               The fate of civilization rests in your hands.",
      "Game Instructions: \nIn this game you control an Iron Sentinel character (located to the\nleft when we the game first starts) Your objective is to beat the\nAI samurai, to do so you have to drain its HP which is to the\nright of the timer, and avoid losing your hp which is located to the\nleft of the timer. You can move to the right by pressing 'd',to the\nleft by pressing 'a', Jump by pressing 'w', dash by pressing 'f', \nand block by pressing 'e'.When blocking enemy attacks don't\ndamage you and cause the enemy to freeze for a moment. \n Enemy deals 50 dmg per hit, you deal 5",
      "black"
    );
    this.addSprite(gameStory);
    this.addSprite(gameTitle);
  }

  startGame() {
    let sentinelRightFacing = "sprites/spritesIronSentinel/rightFacing/";
    let sentinelLeftFacing = "sprites/spritesIronSentinel/leftFacing/";
    let sentinelSoundPath = "sounds/soundsIronSentinel/";

    let player = new PlayerC(
      0,
      350,
      260,
      240,
      {
        velocity: { x: 0, y: 0 },
      },
      545,
      sentinelRightFacing + "iron_sentinel_idle.png",
      sentinelLeftFacing + "iron_sentinel_idleL.png",
      2, //idle is default
      sentinelRightFacing + "iron_sentinel_run.png",
      sentinelLeftFacing + "iron_sentinel_runL.png",
      4,

      sentinelRightFacing + "iron_sentinel_combo_a.png",
      sentinelLeftFacing + "iron_sentinel_combo_aL.png",
      5,
      sentinelRightFacing + "iron_sentinel_jump.png",
      sentinelLeftFacing + "iron_sentinel_jumpL.png",
      0,
      sentinelRightFacing + "iron_sentinel_air_combo_a.png",
      sentinelLeftFacing + "iron_sentinel_air_combo_aL.png",
      5,
      sentinelRightFacing + "iron_sentinel_on_hit.png",
      sentinelLeftFacing + "iron_sentinel_on_hitL.png",
      3,
      sentinelRightFacing + "iron_sentinel_death.png",
      sentinelLeftFacing + "iron_sentinel_deathL.png",
      6,
      sentinelRightFacing + "iron_sentinel_dash.png",
      sentinelLeftFacing + "iron_sentinel_dashL.png",
      5,
      sentinelRightFacing + "iron_sentinel_block.png",
      sentinelLeftFacing + "iron_sentinel_blockL.png",
      2,
      2,
      190, //create offset for ornaments, and then
      2.7,
      { x: 307, y: 408 },
      "right",
      sentinelSoundPath + "IronSentinelAttack1.mp3",
      sentinelSoundPath + "SwordImpactOnIronS.mp3",
      sentinelSoundPath + "SwordImpactOnSentinelBlock.mp3"
    );

    let kenjiLeftPath = "./sprites/spritesKenji/leftFacing/";
    let kenjiRightPath = "./sprites/spritesKenji/rightFacing/";
    let kenjiSoundPath = "./sounds/soundsKenji/";
    let kenjiEnemy = new KenjiC(
      1100,
      350,
      260,
      250,
      { velocity: { x: 0, y: 0 } },
      545,
      kenjiRightPath + "idle.png",
      kenjiLeftPath + "idleL.png",
      4,
      kenjiRightPath + "Run.png",
      kenjiLeftPath + "RunL.png",
      8,
      kenjiRightPath + "Attack1.png",
      kenjiLeftPath + "Attack1L.png",
      4,
      kenjiRightPath + "Jump.png",
      kenjiLeftPath + "JumpL.png",
      2,
      kenjiRightPath + "TakeHit.png",
      kenjiLeftPath + "TakeHitL.png",
      3,
      kenjiRightPath + "Death.png",
      kenjiLeftPath + "DeathL.png",
      7,
      4,
      70,
      2.7,
      { x: 305, y: 178 },
      "left",
      kenjiSoundPath + "kenjiSwordAttack1Sound.mp3",
      kenjiSoundPath + "SwordImpactOnKenji.mp3"
    );

    //let enemy = new enemyC(300, 0, 55, 220, { velocity: { x: 0, y: 0 } }, 545);
    let timeU = new TimerUI();
    let healthBarPlayer = new HealthBar(20, 30, "left", "#818CF8", "player");
    let healthBarPlayer2 = new HealthBar(
      634.5,
      30,
      "right",
      "#818CF8",
      "enemy"
    );
    let bgImage1 = new BgImg(
      0,
      0,
      this.canvasWidth,
      this.canvasHeight,
      "./images/background.png"
    );
    let shopBg = new bgAN(820, 265, 118, 200, "./images/shop_anim.png");

    let gameOT = new GameOver(
      200,
      150,
      800,
      150,
      100,
      350,
      650,
      350,
      "",
      "",
      "",
      "",
      ""
    );
    this.addSprite(bgImage1);
    this.addSprite(shopBg);

    this.addSprite(gameOT);
    this.addSprite(player);
    this.addSprite(kenjiEnemy);
    this.addSprite(healthBarPlayer);
    this.addSprite(healthBarPlayer2);
    this.addSprite(timeU);
    this.addSprite(this.gamePausedSprite);
  }

  resetGame() {
    console.log("test reset");

    for (let i = 0; i < this.sprites.length; i++) {
      if (
        this.sprites[i] instanceof PlayerC ||
        this.sprites[i] instanceof KenjiC
      ) {
        this.sprites[i].health = 545;
        if (this.sprites[i] instanceof KenjiC) {
          this.sprites[i].positionX = 1100;
        } else {
          this.sprites[i].positionX = 0;
        }
        this.sprites[i].positionY = 350;
      }

      if (this.sprites[i] instanceof GameOver) {
        this.sprites[i].value = "";
        this.sprites[i].value2 = "";
        this.sprites[i].value3 = "";
        this.sprites[i].value4 = "";
        this.sprites[i].isGameOver = false;
      }

      if (this.sprites[i] instanceof TimerUI) {
        this.sprites[i].Time = 180;
      }
    }
  }
}

//Sprite
class Sprite {
  constructor() {
    // properties to pass down to all Sprite objects
    this.speed = 5;
    this.gravity = 0.52;
    this.jumpV = 15;
    this.canvasWidth = 1200;
    this.canvasHeight = 600;
    this.attackBox = {
      positionX: this.positionX,
      positionY: this.positionY,
      width: 250,
      height: 0,
    };
    this.direction = "";
    this.scale = 2.5;
    this.imgOffset = { x: 0, y: 0 };
  }

  update() {}
  draw(ctx) {}
}

class BgImg extends Sprite {
  constructor(positionX, positionY, width, height, image) {
    super();
    this.positionX = positionX;
    this.positionY = positionY;
    this.width = width;
    this.height = height;
    this.image = new Image();
    this.image.src = image;
  }

  update() {}
  draw(ctx) {
    ctx.drawImage(
      this.image,
      this.positionX,
      this.positionY,
      this.width,
      this.height
    );
  }
}

class bgAN extends Sprite {
  constructor(positionX, positionY, width, height, image) {
    super();
    this.startPoint = 0.2;
    this.frameIndex = 0;
    this.mvX = 0;
    this.framesP = 0;
    this.positionX = positionX;
    this.positionY = positionY;
    this.width = width;
    this.height = height;
    this.image = new Image();
    this.image.src = image;
  }

  update() {
    this.framesP++;
    if (this.framesP >= 10) {
      this.frameIndex++;
      this.mvX = this.frameIndex * this.width - 0.1;
      this.framesP = 0;
    }
    if (this.frameIndex >= 5) {
      this.frameIndex = 0;
    }
  }
  draw(ctx) {
    ctx.drawImage(
      this.image,
      this.startPoint + this.mvX,
      0,
      this.width,
      this.height,
      this.positionX,
      this.positionY,
      this.width * 2.5,
      this.height * 2.5
    );
  }
}

var requestAnimFrame = (function () {
  return (
    window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    function (callback) {
      window.setTimeout(callback, 1000 / 60);
    }
  );
})();

//Game classes
class GameMenu extends Sprite {
  constructor(positionX, positionY, numberOfButtons, color) {
    super();
    this.canvasM = document.getElementById("myCanvas");

    this.positionX = positionX;
    this.positionY = positionY;
    this.numberOfButtons = numberOfButtons;
    this.color = color;
    this.height = 130;
    this.width = 650;
    this.textColorD = "#777777";
    this.startGame1 = false;
    this.hideMenu = false;
    this.gMouseX = 0;
    this.gMouseY = 0;
    this.storyElement;

    // this.gcImage = new Image();
    // this.gcImage.src = "./images/characteresPG.png";
    this.mouseListner();
  }

  //add event listener to mouse move to check where cursor is
  mouseListner() {
    if (this.hideMenu) {
      return;
    }

    document.onmousemove = () => {
      // Get the mouse coordinates relative to the document
      var rect = this.canvasM.getBoundingClientRect();
      this.gMouseX = event.pageX - rect.left;
      this.gMouseY = event.pageY - rect.top;
    };
  }

  update(spritesArray) {
    if (this.hideMenu) {
      return;
    }
    if (this.isMouseWithinRect(this.lx1, this.ly1, this.width, this.height)) {
      this.b1selected = true;
    } else {
      this.b1selected = false;
    }

    for (let i = 0; i < spritesArray.length; i++) {
      if (spritesArray[i] instanceof GameStoryAndInstructions) {
        this.storyElement = spritesArray[i];
        if (
          this.isMouseWithinRect(
            spritesArray[i].rectX,
            spritesArray[i].rectY,
            spritesArray[i].width,
            spritesArray[i].height
          )
        ) {
          this.mouseWithinStory = true;
        }
      }
    }

    document.onmousedown = (event) => {
      if (this.hideMenu) {
        return;
      }
      if (this.mouseWithinStory && this.storyElement.displayStory) {
        this.storyElement.displayStory = false;
      } else if (this.mouseWithinStory && this.storyElement.displayInst) {
        this.storyElement.displayInst = false;
      } else if (this.b1selected) {
        this.b1selected = false;
        this.startGame1 = true;
        this.hideMenu = true;
      }
    };
  }
  isMouseWithinRect(startX, startY, width, height) {
    // Add an event listener to the document to track mouse movement
    let mousewithin = false;
    // Get the mouse coordinates relative to the document
    // Check if the mouse is within the rectangle
    if (
      this.gMouseX >= startX &&
      this.gMouseX <= startX + width &&
      this.gMouseY >= startY &&
      this.gMouseY <= startY + height
    ) {
      mousewithin = true;
    } else {
      mousewithin = false;
    }
    return mousewithin;
  }

  draw(ctx) {
    // if (this.hideMenu) {
    //   return;
    // }
    // ctx.beginPath();

    // ctx.font = "100px Sans-Serif";
    // ctx.fillStyle = "white";
    // ctx.fillText("MC Fight", 420, 100);
    this.drawB1(ctx);

    ctx.closePath();
  }

  drawB1(ctx) {
    ctx.beginPath();
    if (
      this.b1selected &&
      !this.storyElement.displayStory &&
      !this.storyElement.displayInst
    ) {
      ctx.fillStyle = "white";
      this.line1w = 2;
    } else {
      ctx.fillStyle = this.textColorD;
      this.line1w = 0.5;
    }

    this.lx1 = 300;
    this.ly1 = 400;
    ctx.lineWidth = this.line1w;
    ctx.moveTo(this.lx1, this.ly1);
    ctx.lineTo(this.lx1, this.ly1 + 130);
    ctx.moveTo(this.lx1, this.ly1);
    ctx.lineTo(this.lx1 + 650, this.ly1);
    ctx.lineTo(this.lx1 + 650, this.ly1 + 130);
    ctx.lineTo(this.lx1, this.ly1 + 130);
    ctx.strokeStyle = "red";
    ctx.font = "50px Sans-Serif";
    ctx.fillText("Play Game", this.lx1 + 650 / 3.1, this.ly1 + 75);
    ctx.stroke();
    ctx.closePath();
  }
}

class PlayerC extends Sprite {
  constructor(
    positionX,
    positionY,
    width,
    height,
    { velocity },
    health,

    imageIdleR,
    imageIdleL,
    maxFramesImageIdle,
    imageRunR,
    imageRunL,
    maxFramesImageRun,

    imageAttack1R,
    imageAttack1L,
    maxFramesImageAttack1,

    imageJumpR,
    imageJumpL,
    maxFramesImageJump,

    imageJumpAttack1R,
    imageJumpAttack1L,
    maxFramesImageJumpAttack1,

    imageTakeHitR,
    imageTakeHitL,
    imageTakeHitMaxFrames,

    imageDeathR,
    imageDeathL,
    imageDeathMaxFrames,

    imageDashR,
    imageDashL,
    imageDashMaxFrames,

    imageBlockR,
    imageBlockL,
    imageBlockMaxFrames,

    numberOfFrames,
    spriteOrnamentOffset,
    scale,
    offset,
    direction,
    ironSentinelAttack1Sound,
    swordImpactOnSentinel,
    swordImpactOnSentinelBlocked
  ) {
    super();
    this.positionX = positionX;
    this.positionY = positionY;
    this.width = width;
    this.height = height;
    this.trueCharacterHeight = height / 3;
    this.velocity = velocity;
    //    this.speed = speed;
    // this.jumpV = jumpV;
    // this.gravity = 0.52;
    this.aPressed = false;
    this.dPressed = false;
    this.wPressed = false;
    this.ePressed = false;
    this.lastKeyPressed;
    this.jumping = false;
    this.attacking = false;
    this.attackBox.positionX = this.positionX;
    this.attackBox.positionY = this.positionY;
    this.offsetDirectionForAttack = 0;
    this.health = health;
    this.alive = true;

    this.imageIdleR = new Image();
    this.imageIdleR.src = imageIdleR;
    this.imageIdleL = new Image();
    this.imageIdleL.src = imageIdleL;
    this.maxFramesImageIdle = maxFramesImageIdle;

    this.imageRunR = new Image();
    this.imageRunR.src = imageRunR;
    this.imageRunL = new Image();
    this.imageRunL.src = imageRunL;
    this.maxFramesImageRun = maxFramesImageRun;

    this.imageJumpR = new Image();
    this.imageJumpR.src = imageJumpR;
    this.imageJumpL = new Image();
    this.imageJumpL.src = imageJumpL;
    this.maxFramesImageJump = maxFramesImageJump;

    this.imageAttack1R = new Image();
    this.imageAttack1R.src = imageAttack1R;
    this.imageAttack1L = new Image();
    this.imageAttack1L.src = imageAttack1L;

    this.maxFramesImageAttack1 = maxFramesImageAttack1;

    this.imageJumpAttack1R = new Image();
    this.imageJumpAttack1R.src = imageJumpAttack1R;
    this.imageJumpAttack1L = new Image();
    this.imageJumpAttack1L.src = imageJumpAttack1L;
    this.maxFramesImageJumpAttack1 = maxFramesImageJumpAttack1;

    this.imageTakeHitR = new Image();
    this.imageTakeHitR.src = imageTakeHitR;
    this.imageTakeHitL = new Image();
    this.imageTakeHitL.src = imageTakeHitL;
    this.imageTakeHitMaxFrames = imageTakeHitMaxFrames;

    this.imageDeathR = new Image();
    this.imageDeathR.src = imageDeathR;
    this.imageDeathL = new Image();
    this.imageDeathL.src = imageDeathL;
    this.imageDeathMaxFrames = imageDeathMaxFrames;

    this.imageDashR = new Image();
    this.imageDashR.src = imageDashR;
    this.imageDashL = new Image();
    this.imageDashL.src = imageDashL;
    this.imageDashMaxFrames = imageDashMaxFrames;

    this.imageBlockR = new Image();
    this.imageBlockR.src = imageBlockR;
    this.imageBlockL = new Image();
    this.imageBlockL.src = imageBlockL;
    this.imageBlockMaxFrames = imageBlockMaxFrames;

    //console.log(imageJumpAttack1);
    this.imageToDraw = new Image();

    this.spriteOrnamentOffset = spriteOrnamentOffset; //if sprite carries a sword, player is only hit if the character is hit not it's sword
    this.scale = scale;
    this.offset = offset;
    this.numberOfMaxFrames = numberOfFrames;
    this.mvX = 0;
    this.framesPS = 20;
    this.framesP = 0;
    this.frameIndex = 0;
    this.currentBehaviour = "idle";
    this.direction = direction;
    this.gotHit = false;
    this.trueCharacterWidth = width / 2;
    this.timeSinceLastHit = 0;
    this.timeSinceLastAttacked = 0;
    this.maxAttackSpeed = 60;

    this.ironSentinelAttack1Sound = new Audio(ironSentinelAttack1Sound);
    this.swordImpactOnSentinel = new Audio(swordImpactOnSentinel);
    this.swordImpactOnSentinelBlocked = new Audio(swordImpactOnSentinelBlocked);
    this.ironSentinelAttack1Sound.volume = 0.22;
    this.swordImpactOnSentinel.volume = 0.22;
    this.swordImpactOnSentinelBlocked.volume = 0.22;
  }
  // document.addEventListener("keydown", this.handleKeyDownPlayer);
  // document.addEventListener("keyup", this.handleKeyUpPlayer);

  // handleKeyDownPlayer({ key }) {
  //   console.log(this.velocity);
  // }

  // handleKeyUpPlayer({ key }) {
  //   console.log(key);
  // }

  checkIfAttackHits(enemyX, enemyY, enemyWidth, enemyHeight, ornamentToOffset) {
    if (this.direction == "right") {
      if (
        this.attackBox.positionX + this.width / 2 <=
          enemyX + enemyWidth - ornamentToOffset &&
        this.attackBox.positionX + this.width / 2 + this.attackBox.width >=
          enemyX + enemyWidth - ornamentToOffset &&
        ((enemyY >= this.attackBox.positionY &&
          enemyY <= this.attackBox.positionY + this.trueCharacterHeight) ||
          (enemyY + enemyHeight >= this.attackBox.positionY + 80 &&
            enemyY + enemyHeight <=
              this.attackBox.positionY + this.trueCharacterHeight))
      ) {
        return true;
      }
    } else {
      if (
        this.attackBox.positionX >= enemyX + enemyWidth - ornamentToOffset &&
        this.attackBox.positionX - this.attackBox.width <=
          enemyX + enemyWidth - ornamentToOffset &&
        ((enemyY >= this.attackBox.positionY &&
          enemyY <= this.attackBox.positionY + this.trueCharacterHeight) ||
          (enemyY + enemyHeight >= this.attackBox.positionY + 80 &&
            enemyY + enemyHeight <=
              this.attackBox.positionY + this.trueCharacterHeight))
      ) {
        return true;
      }
    }
    return false;
  }

  update(spritesArray) {
    if (this.health <= 0) {
      for (let i = 0; i < spritesArray.length; i++) {
        if (spritesArray[i] instanceof GameOver) {
          spritesArray[i].value = "You";
          spritesArray[i].value2 = "Lose";
          spritesArray[i].value3 = "Press Enter";
          spritesArray[i].value4 = "to Restart";

          spritesArray[i].color = "red";
          spritesArray[i].isGameOver = true;
        }
      }
    }
    let isMyGameOver = false;
    let enemyWins = false;
    //check if game is over
    for (let i = 0; i < spritesArray.length; i++) {
      if (spritesArray[i] instanceof GameOver) {
        if (spritesArray[i].isGameOver) {
          this.gotHit = false;
          this.velocity = { x: 0, y: 20000 };
          this.jumping = false;
          isMyGameOver = true;
          this.attacking = false;
          if (!enemyWins) {
            this.pickBehaviour();
          }
          if (this.health <= 0) {
            enemyWins = true;
          }
        }
      }
    }

    this.offsetDirectionForAttack = 0;
    if (this.direction == "left") {
      this.offsetDirectionForAttack = this.attackBox.width - this.width;
    }

    this.attackBox.positionX = this.positionX - this.offsetDirectionForAttack;
    this.attackBox.positionY = this.positionY - 10;

    //check collision between attack and enemy player
    for (let i = 0; i < spritesArray.length; i++) {
      if (spritesArray[i] instanceof KenjiC) {
        if (spritesArray[i].positionX > this.positionX) {
          this.direction = "right";
        } else {
          this.direction = "left";
        }

        if (this.attacking) {
          if (
            this.checkIfAttackHits(
              spritesArray[i].positionX,
              spritesArray[i].positionY,
              spritesArray[i].trueCharacterWidth,
              spritesArray[i].trueCharacterHeight,
              spritesArray[i].spriteOrnamentOffset
            )
          ) {
            if (
              spritesArray[i].health > 0 &&
              spritesArray[i].timeSinceLastHit >= 60
            ) {
              spritesArray[i].gotHit = true;
              spritesArray[i].health -= 5;
              spritesArray[i].timeSinceLastHit = 0;
              spritesArray[i].swordImpactOnKenji.play();
            }
          }
        }
        spritesArray[i].timeSinceLastHit++;
      }
    }
    if (
      this.attacking &&
      this.timeSinceLastAttacked < this.maxAttackSpeed &&
      this.framesP >= this.framesPS
    ) {
      this.attacking = false;
    }
    this.timeSinceLastAttacked++;
    //    this.attacking = false;
    document.onkeydown = ({ key }) => {
      if (this.gotHit || isMyGameOver) {
        //so that the player can't move if hit
        this.aPressed = false;
        this.dPressed = false;
        this.wPressed = false;
        return;
      }
      console.log(key);
      switch (key) {
        case "a":
          this.aPressed = true;
          this.lastKeyPressed = "a";
          break;
        case "d":
          this.dPressed = true;
          this.lastKeyPressed = "d";
          break;
        case "w":
          if (!this.jumping) {
            if (this.currentBehaviour != "dashing") {
              this.wPressed = true;
              this.velocity.y = -this.jumpV;
              this.jumping = true;
            }
            if (this.currentBehaviour == "attack1") {
              this.currentBehaviour = "jumpAttack1";
            }
            if (this.currentBehaviour == "blocking") {
              this.block = false;
              this.sOffsetD = 1;
            }
            if (this.gotHit) {
              this.sOffsetD = 2;
            }
          }
          break;
        case " ":
          console.log("attack");
          if (
            this.timeSinceLastAttacked >= this.maxAttackSpeed &&
            !this.block
          ) {
            this.timeSinceLastAttacked = 0;
            this.attacking = true;
            console.log(this.timeSinceLastAttacked);

            this.ironSentinelAttack1Sound.play();
          } else {
            this.attacking = false;
          }
          break;
        case "f":
          if (!this.jumping) {
            this.dash = true;
          }
          break;
        case "e":
          if (!this.jumping) {
            this.block = true;
          }
          break;
      }
    };

    document.onkeyup = ({ key }) => {
      switch (key) {
        case "a":
          this.aPressed = false;
          this.velocity.x = 0;
          this.lastKeyPressed = "d";
          break;
        case "d":
          this.dPressed = false;
          this.velocity.x = 0;
          this.lastKeyPressed = "a";
          break;
        case " ":
          this.attacking = false;
        case "f":
          this.dash = false;
        case "e":
          this.block = false;
      }
    };

    if (this.aPressed && this.lastKeyPressed == "a") {
      this.velocity.x = -this.speed;
    } else if (this.dPressed && this.lastKeyPressed == "d") {
      this.velocity.x = this.speed;
    }

    //check collision on Y-axis
    if (
      this.positionY + this.height + this.velocity.y >=
      this.canvasHeight - 16
    ) {
      this.velocity.y = 0;
      this.positionY = this.canvasHeight - this.height - 16;
      this.jumping = false;
    } else {
      this.velocity.y += this.gravity;
    }
    //check collision on X-axis
    if (this.positionX <= 0) {
      if (this.velocity.x < 0) {
        this.velocity.x = 0;
      }
    } else if (
      this.positionX >=
      this.canvasWidth - this.width + this.spriteOrnamentOffset - 20
    ) {
      if (this.velocity.x > 0) {
        this.velocity.x = 0;
      }
    }

    this.positionX += this.velocity.x;
    this.positionY += this.velocity.y;

    this.pickBehaviour();

    // console.log(
    //   "CURRENT BEHAVIOUS IS ",
    //   this.currentBehaviour,
    //   this.frameIndex
    // );

    this.framesP++;
    this.timeSinceLastHit++;
    if (this.framesP >= this.framesPS && this.health > 0) {
      this.mvX = this.frameIndex * 192;
      this.frameIndex++;
      this.framesP = 0;
    } else if (
      this.framesP >= this.framesPS &&
      this.health <= 0 &&
      this.direction == "left"
    ) {
      this.frameIndex--;
      if (this.frameIndex <= 0) {
        this.frameIndex = 0;
      }
      this.mvX = this.frameIndex * 192;
      this.framesP = 0;
    } else if (
      this.framesP >= this.framesPS &&
      this.health <= 0 &&
      this.direction == "right"
    ) {
      this.mvX = this.frameIndex * 192;
      this.framesP = 0;
      this.frameIndex++;
    }

    if (this.frameIndex >= this.numberOfMaxFrames) {
      if (this.health <= 0 && this.direction == "right") {
        this.frameIndex = this.numberOfMaxFrames - 1;
      } else if (this.health > 0) {
        this.pickBehaviour();
        this.frameIndex = 0;
      }
    }

    return false;
  }

  pickBehaviour() {
    if (this.health <= 0) {
      this.numberOfMaxFrames = this.imageDeathMaxFrames;
      this.framesPS = 20;
      if (this.currentBehaviour != "dead") {
        if (this.direction == "left") {
          this.imageToDraw = this.imageDeathL;
          this.frameIndex = this.numberOfMaxFrames;
        } else {
          this.imageToDraw = this.imageDeathR;
          this.frameIndex = 0;
        }
        this.framesP = this.framesPS;
      }
      this.currentBehaviour = "dead";
      return;
    }

    if (this.currentBehaviour == "dashing") {
      if (this.frameIndex < this.numberOfMaxFrames) {
        return;
      } else {
        this.velocity.x = 0;
        this.dash = false;
      }
    }

    if (this.block) {
      if (this.direction == "left") {
        this.imageToDraw = this.imageBlockL;
      } else {
        this.imageToDraw = this.imageBlockR;
      }
      this.numberOfMaxFrames = this.imageBlockMaxFrames;
      this.framesPS = 20;
      if (this.currentBehaviour != "blocking") {
        this.frameIndex = 0;
        this.framesP = this.framesPS;
      }
      this.currentBehaviour = "blocking";
      return;
    }

    if (this.dash) {
      if (this.direction == "left") {
        this.imageToDraw = this.imageDashL;
        this.velocity.x = -this.speed * 4;
      } else {
        this.imageToDraw = this.imageDashR;
        this.velocity.x = this.speed * 4;
      }
      this.numberOfMaxFrames = this.imageDashMaxFrames;
      this.framesPS = 3;
      if (this.currentBehaviour != "dashing") {
        this.frameIndex = 0;
        this.framesP = this.framesPS;
      }
      this.currentBehaviour = "dashing";
      return;
    }

    if (this.gotHit) {
      this.sOffsetD = 1;
      if (this.direction == "right") {
        this.velocity.x = -this.speed;
      } else {
        this.velocity.x = this.speed;
      }

      if (this.currentBehaviour == "tookHitF") {
        if (this.frameIndex < this.numberOfMaxFrames) {
          return;
        } else {
          this.velocity.x = 0;
          console.log(this.velocity.x);
          this.gotHit = false;
          console.log("hit false");
        }
      } else {
        if (this.direction == "left") {
          this.imageToDraw = this.imageTakeHitL;
        } else {
          this.imageToDraw = this.imageTakeHitR;
        }
        this.numberOfMaxFrames = this.imageTakeHitMaxFrames;
        this.framesPS = 10;
        if (this.currentBehaviour != "tookHitF") {
          this.frameIndex = 0;
          this.framesP = this.framesPS;
        }
        console.log(this.currentBehaviour);

        this.currentBehaviour = "tookHitF";
        return;
      }
    }

    if (this.currentBehaviour == "attack1") {
      if (this.frameIndex < this.numberOfMaxFrames) {
        return;
      }
    }
    if (
      this.velocity.x == 0 &&
      this.velocity.y == 0 &&
      !this.attacking &&
      !this.jumping
    ) {
      if (this.direction == "left") {
        this.imageToDraw = this.imageIdleL;
      } else {
        this.imageToDraw = this.imageIdleR;
      }
      this.numberOfMaxFrames = this.maxFramesImageIdle;
      this.framesPS = 20;
      if (this.currentBehaviour != "idle") {
        this.frameIndex = 0;
        this.framesP = this.framesPS;
      }
      this.currentBehaviour = "idle";
    } else if (this.attacking && this.jumping) {
      if (this.direction == "left") {
        this.imageToDraw = this.imageJumpAttack1L;
      } else {
        this.imageToDraw = this.imageJumpAttack1R;
      }
      this.numberOfMaxFrames = this.maxFramesImageJumpAttack1;
      this.framesPS = 3;
      if (this.currentBehaviour != "jumpAttack1") {
        this.frameIndex = 0;
        this.framesP = this.framesPS;
      }
      this.currentBehaviour = "jumpAttack1";
    } else if (this.attacking) {
      if (this.direction == "left") {
        this.imageToDraw = this.imageAttack1L;
      } else {
        this.imageToDraw = this.imageAttack1R;
      }

      this.numberOfMaxFrames = this.maxFramesImageAttack1;
      this.framesPS = this.maxAttackSpeed / this.maxFramesImageAttack1 / 2;
      if (this.currentBehaviour != "attack1") {
        this.frameIndex = 0;
        this.framesP = this.framesPS;
      }
      this.currentBehaviour = "attack1";
    } else if (
      (this.velocity.x > 0 || this.velocity.x < 0) &&
      this.velocity.y == 0
    ) {
      if (this.direction == "left") {
        this.imageToDraw = this.imageRunL;
      } else {
        this.imageToDraw = this.imageRunR;
      }
      this.numberOfMaxFrames = this.maxFramesImageRun;
      this.framesPS = 10;
      if (this.currentBehaviour != "run") {
        this.frameIndex = 0;
        this.framesP = this.framesPS;
      }
      this.currentBehaviour = "run";
    } else if (this.velocity.y < 0) {
      if (this.direction == "left") {
        this.imageToDraw = this.imageJumpL;
      } else {
        this.imageToDraw = this.imageJumpR;
      }

      this.numberOfMaxFrames = this.maxFramesImageJump;
      this.framesPS = 20;
      if (this.currentBehaviour != "jumping") {
        this.frameIndex = 0;
        this.framesP = this.framesPS;
      }
      this.currentBehaviour = "jumping";
    }
  }

  draw(ctx) {
    if (this.jumping) {
      if (this.gotHit) {
        if (this.direction == "left") {
          this.imageToDraw = this.imageTakeHitL;
        } else {
          this.imageToDraw = this.imageTakeHitR;
        }
      } else {
        this.sOffsetD = 2;
      }
    } else {
      this.sOffsetD = 1;
    }

    ctx.drawImage(
      this.imageToDraw,
      this.mvX,
      0,
      192, //  this.width,
      192, // this.height,
      this.positionX - this.offset.x,
      this.positionY - this.offset.y / this.sOffsetD,
      this.width * this.scale,
      this.height * this.scale
    );

    // ctx.drawImage(
    //   this.image,
    //   84,
    //   136,
    //   56, //  this.width,
    //   56, // this.height,
    //   this.positionX, // - this.imgOffset.x,
    //   this.positionY, // - this.imgOffset.y,
    //   this.width,
    //   this.height
    // );

    // ctx.fillStyle = "red";
    // ctx.fillRect(this.positionX, this.positionY, this.width, this.height);

    // ctx.fillStyle = "blue";
    // //draw attack
    // ctx.fillRect(
    //   this.attackBox.positionX,
    //   this.attackBox.positionY,
    //   this.attackBox.width,
    //   this.attackBox.height
    // );
  }
}

class KenjiC extends Sprite {
  constructor(
    positionX,
    positionY,
    width,
    height,
    { velocity },
    health,

    imageIdleR,
    imageIdleL,
    maxFramesImageIdle,

    imageRunR,
    imageRunL,
    maxFramesImageRun,

    imageAttack1R,
    imageAttack1L,
    maxFramesImageAttack1,

    imageJumpR,
    imageJumpL,
    maxFramesImageJump,

    imageTakeHitR,
    imageTakeHitL,
    imageTakeHitMaxFrames,

    imageDeadR,
    imageDeadL,
    imageDeadMaxFrames,

    numberOfFrames,
    spriteOrnamentOffset,
    scale,
    offset,
    direction,
    kenjiSwordAttack1Sound,
    swordImpactOnKenji
  ) {
    super();
    this.positionX = positionX;
    this.positionY = positionY;
    this.width = width;
    this.height = height;
    this.velocity = velocity;
    //    this.speed = speed;
    // this.jumpV = jumpV;
    // this.gravity = 0.52;
    this.jumping = false;
    this.attacking = false;
    this.attackBox.positionX = this.positionX;
    this.attackBox.positionY = this.positionY;
    this.offsetDirectionForAttack = 0;
    this.health = health;
    this.alive = true;

    this.imageIdleR = new Image();
    this.imageIdleR.src = imageIdleR;
    this.imageIdleL = new Image();
    this.imageIdleL.src = imageIdleL;
    this.maxFramesImageIdle = maxFramesImageIdle;

    this.imageRunR = new Image();
    this.imageRunR.src = imageRunR;
    this.imageRunL = new Image();
    this.imageRunL.src = imageRunL;
    this.maxFramesImageRun = maxFramesImageRun;

    this.imageJumpR = new Image();
    this.imageJumpR.src = imageJumpR;
    this.imageJumpL = new Image();
    this.imageJumpL.src = imageJumpL;
    this.maxFramesImageJump = maxFramesImageJump;

    this.imageAttack1R = new Image();
    this.imageAttack1R.src = imageAttack1R;
    this.imageAttack1L = new Image();
    this.imageAttack1L.src = imageAttack1L;
    this.maxFramesImageAttack1 = maxFramesImageAttack1;

    this.imageTakeHitR = new Image();
    this.imageTakeHitR.src = imageTakeHitR;
    this.imageTakeHitL = new Image();
    this.imageTakeHitL.src = imageTakeHitL;
    this.imageTakeHitMaxFrames = imageTakeHitMaxFrames;

    this.imageDeadR = new Image();
    this.imageDeadR.src = imageDeadR;
    this.imageDeadL = new Image();
    this.imageDeadL.src = imageDeadL;
    this.imageDeadMaxFrames = imageDeadMaxFrames;

    this.imageToDraw = new Image();

    this.spriteOrnamentOffset = spriteOrnamentOffset; //if sprite carries a sword, player is only hit if the character is hit not it's sword
    this.scale = scale;
    this.offset = offset;
    this.numberOfMaxFrames = numberOfFrames;
    this.mvX = 0;
    this.framesPS = 20;
    this.framesP = 0;
    this.frameIndex = 0;
    this.currentBehaviour = "";
    this.direction = direction;
    this.gotHit = false;
    this.trueCharacterWidth = width / 2;
    this.trueCharacterHeight = height / 4;
    this.timeSinceLastHit = 0;
    this.timeSinceLastAttacked = 0;
    this.maxAttackSpeed = 60;
    this.kenjiSwordAttack1Sound = new Audio(kenjiSwordAttack1Sound);
    this.swordImpactOnKenji = new Audio(swordImpactOnKenji);
    this.kenjiSwordAttack1Sound.volume = 0.22;
    this.swordImpactOnKenji.volume = 0.22;
  }

  checkIfAttackHits(enemyX, enemyY, enemyWidth, enemyHeight, ornamentToOffset) {
    if (this.direction == "right") {
      if (
        this.attackBox.positionX + this.width / 2 <=
          enemyX + enemyWidth - ornamentToOffset &&
        this.attackBox.positionX + this.width / 2 + this.attackBox.width >=
          enemyX + enemyWidth - ornamentToOffset &&
        ((enemyY >= this.attackBox.positionY &&
          enemyY <= this.attackBox.positionY + this.height) ||
          (enemyY + enemyHeight >= this.attackBox.positionY + 80 &&
            enemyY + enemyHeight <= this.attackBox.positionY + this.height))
      ) {
        return true;
      }
    } else {
      if (
        this.attackBox.positionX >= enemyX + enemyWidth - ornamentToOffset &&
        this.attackBox.positionX - this.attackBox.width <=
          enemyX + enemyWidth - ornamentToOffset &&
        ((enemyY >= this.attackBox.positionY &&
          enemyY <= this.attackBox.positionY + this.height) ||
          (enemyY + enemyHeight >= this.attackBox.positionY + 80 &&
            enemyY + enemyHeight <= this.attackBox.positionY + this.height))
      ) {
        return true;
      }
    }
    return false;
  }

  update(spritesArray) {
    if (this.health <= 0) {
      for (let i = 0; i < spritesArray.length; i++) {
        if (spritesArray[i] instanceof GameOver) {
          spritesArray[i].value = "You";
          spritesArray[i].value2 = "Win";
          spritesArray[i].value3 = "Press Enter";
          spritesArray[i].value4 = "to Restart";

          spritesArray[i].color = "green";
          spritesArray[i].isGameOver = true;
        }
      }
    }
    let isMyGameOver = false;
    let playerWins = false;
    //check if game is over
    for (let i = 0; i < spritesArray.length; i++) {
      if (spritesArray[i] instanceof GameOver) {
        if (spritesArray[i].isGameOver) {
          isMyGameOver = true;
          if (this.health <= 0) {
            this.velocity = { x: 0, y: 200000 };
            playerWins = true;
          } else {
            playerWins = false;
          }
        }
      }
    }

    //check wchich way the character is facing and adjust the attack box accordingly
    this.offsetDirectionForAttack = 0;
    if (this.direction == "left") {
      this.offsetDirectionForAttack = this.attackBox.width - this.width;
    }
    this.attackBox.positionX = this.positionX - this.offsetDirectionForAttack;
    this.attackBox.positionY = this.positionY;

    for (let i = 0; i < spritesArray.length; i++) {
      if (spritesArray[i] instanceof PlayerC) {
        if (spritesArray[i].positionX > this.positionX) {
          this.direction = "right";
        } else {
          this.direction = "left";
        }

        if (
          this.checkIfAttackHits(
            spritesArray[i].positionX,
            spritesArray[i].positionY,
            spritesArray[i].width,
            spritesArray[i].height,
            spritesArray[i].spriteOrnamentOffset
          )
        ) {
          if (
            this.attacking &&
            spritesArray[i].timeSinceLastAttacked >= spritesArray[i].framesPS &&
            spritesArray[i].timeSinceLastHit >= 60
          ) {
            if (!spritesArray[i].block) {
              if (this.frameIndex <= 2 || this.frameIndex > 3) {
                break;
              }
              spritesArray[i].health -= 50;

              spritesArray[i].gotHit = true;
              spritesArray[i].timeSinceLastAttacked = 0;
              spritesArray[i].swordImpactOnSentinel.play();
            } else {
              spritesArray[i].swordImpactOnSentinelBlocked.play();
              this.attackBlocked = true;
            }
            this.kenjiSwordAttack1Sound.play();
          }
        }
        spritesArray[i].timeSinceLastAttacked++;
      }
    }
    if (!isMyGameOver) {
      this.pickBehaviourToDo(spritesArray);
    } else {
      this.velocity = { x: 0, y: 0 };
      this.attacking = false;
      this.jumping = false;
    }

    this.imgBehaviour();
    //this.attacking = true;
    //update sprites
    this.framesP++;
    if (this.framesP >= this.framesPS) {
      this.mvX = this.frameIndex * 200;
      this.framesP = 0;

      if (this.currentBehaviour == "dead" && this.direction == "left") {
        this.frameIndex--;
        if (this.frameIndex == 0) {
          this.frameIndex = 1;
        }
      } else if (this.currentBehaviour == "dead") {
        if (this.frameIndex != this.numberOfMaxFrames - 1) {
          this.frameIndex++;
        }
      } else {
        this.frameIndex++;
      }
    }
    if (this.frameIndex >= this.numberOfMaxFrames) {
      if (this.currentBehaviour == "dead") {
      } else {
        this.imgBehaviour();
        this.frameIndex = 0;
      }
    }
    //check collision with ground
    if (
      this.positionY + this.height + this.velocity.y >=
      this.canvasHeight - 16
    ) {
      this.velocity.y = 0;
      this.positionY = this.canvasHeight - this.height - 16;
      this.jumping = false;
    } else {
      this.velocity.y += this.gravity;
    }

    //check collision on X-axis
    if (this.positionX <= 0) {
      if (this.velocity.x < 0) {
        this.velocity.x = 0;
      }
    } else if (
      this.positionX >=
      this.canvasWidth - this.width + this.spriteOrnamentOffset - 20
    ) {
      if (this.velocity.x > 0) {
        this.velocity.x = 0;
      }
    }
    //update position
    this.positionX += this.velocity.x;
    this.positionY += this.velocity.y;
    return false;
  }

  imgBehaviour() {
    // if (this.currentBehaviour == "attack1") {
    //   if (this.frameIndex < this.numberOfMaxFrames) {
    //     if (this.direction == "left") {
    //       this.imageToDraw = this.imageAttack1L;
    //     } else {
    //       this.imageToDraw = this.imageAttack1R;
    //     }
    //     this.numberOfMaxFrames = this.maxFramesImageAttack1;
    //     this.framesPS = this.maxAttackSpeed / this.maxFramesImageAttack1 / 2;
    //     return;
    //   }
    // }

    if (this.health <= 0) {
      if (this.direction == "left") {
        this.imageToDraw = this.imageDeadL;
        if (this.currentBehaviour != "dead") {
          this.frameIndex = this.imageDeadMaxFrames;
          this.framesP = this.framesPS;
        }
      } else {
        this.imageToDraw = this.imageDeadR;
        if (this.currentBehaviour != "dead") {
          this.frameIndex = 0;
          this.framesP = this.framesPS;
        }
      }
      this.numberOfMaxFrames = this.imageDeadMaxFrames;
      this.framesPS = 20;
      this.currentBehaviour = "dead";
      return;
    }

    if (this.gotHit || this.attackBlocked) {
      this.sOffsetD = 1;
      if (this.direction == "right") {
        this.velocity.x = -this.speed / 2;
      } else {
        this.velocity.x = this.speed / 2;
      }
      if (this.currentBehaviour == "tookHitF") {
        if (this.frameIndex < this.numberOfMaxFrames) {
          return;
        } else {
          this.velocity.x = 0;
          this.gotHit = false;
          this.attackBlocked = false;
        }
      } else {
        if (this.direction == "left") {
          this.imageToDraw = this.imageTakeHitL;
        } else {
          this.imageToDraw = this.imageTakeHitR;
        }
        this.numberOfMaxFrames = this.imageTakeHitMaxFrames;
        this.framesPS = 2;
        if (this.attackBlocked) {
          this.framesPS = 30;
        }
        if (this.currentBehaviour != "tookHitF") {
          this.frameIndex = 0;
          this.framesP = this.framesPS;
        }

        this.currentBehaviour = "tookHitF";
        return;
      }
    }

    if (
      this.velocity.x == 0 &&
      this.velocity.y == 0 &&
      !this.attacking &&
      !this.jumping
    ) {
      if (this.direction == "left") {
        this.imageToDraw = this.imageIdleL;
      } else {
        this.imageToDraw = this.imageIdleR;
      }
      this.numberOfMaxFrames = this.maxFramesImageIdle;
      this.framesPS = 20;
      if (this.currentBehaviour != "idle") {
        this.frameIndex = 0;
        this.framesP = this.framesPS;
      }
      this.currentBehaviour = "idle";
    } else if (this.attacking) {
      if (this.direction == "left") {
        this.imageToDraw = this.imageAttack1L;
      } else {
        this.imageToDraw = this.imageAttack1R;
      }
      this.numberOfMaxFrames = this.maxFramesImageAttack1;
      this.framesPS = this.maxAttackSpeed / this.maxFramesImageAttack1 / 2;
      if (this.currentBehaviour != "attack1") {
        this.frameIndex = 0;
        this.framesP = this.framesPS;
      }
      this.currentBehaviour = "attack1";
    } else if (
      (this.velocity.x > 0 || this.velocity.x < 0) &&
      this.velocity.y == 0
    ) {
      if (this.direction == "left") {
        this.imageToDraw = this.imageRunL;
      } else {
        this.imageToDraw = this.imageRunR;
      }
      this.numberOfMaxFrames = this.maxFramesImageRun;
      this.framesPS = 10;
      if (this.currentBehaviour != "run") {
        this.frameIndex = 0;
        this.framesP = this.framesPS;
      }
      this.currentBehaviour = "run";
    } else if (this.velocity.y < 0) {
      if (this.direction == "left") {
        this.imageToDraw = this.imageJumpL;
      } else {
        this.imageToDraw = this.imageJumpR;
      }
      this.numberOfMaxFrames = this.maxFramesImageJump;
      this.framesPS = 20;
      if (this.currentBehaviour != "jumping") {
        this.frameIndex = 0;
        this.framesP = this.framesPS;
      }
      this.currentBehaviour = "jumping";
    }
  }

  pickBehaviourToDo(spritesArray) {
    this.timeSinceLastAttacked++;
    if (this.gotHit || this.attackBlocked) {
      return;
    }
    let enemyPlayer;
    for (let i = 0; i < spritesArray.length; i++) {
      if (spritesArray[i] instanceof PlayerC) {
        enemyPlayer = spritesArray[i];
        break;
      }
    }
    if (this.positionX < enemyPlayer.positionX) {
      this.direction = "right";
    } else {
      this.direction = "left";
    }

    if (
      enemyPlayer.currentBehaviour == "idle" ||
      enemyPlayer.currentBehaviour == "run"
    ) {
      if (
        this.checkIfAttackHits(
          enemyPlayer.positionX,
          enemyPlayer.positionY,
          enemyPlayer.width,
          enemyPlayer.height,
          enemyPlayer.spriteOrnamentOffset
        )
      ) {
        if (this.timeSinceLastAttacked >= this.maxAttackSpeed) {
          this.currentBehaviour = "attack1";
          this.velocity.x = 0;
          this.attacking = true;
          this.timeSinceLastAttacked = 0;
        } else {
          this.attacking = true;
        }
      } else {
        if (this.direction == "right") {
          this.velocity.x = this.speed;
        } else {
          this.velocity.x = -this.speed;
        }
      }
      this.imgBehaviour();
    }

    // if (enemyPlayer.currentBehaviour == "attack1") {
    //   if(enemyPlayer.jumping){

    //   }
    // }
  }

  draw(ctx) {
    // if (this.jumping) {
    //   this.sOffsetD = 2;
    // } else {
    //   this.sOffsetD = 1;
    // }
    // console.log("image kenji ", this.imageToDraw);

    // let imaget = new Image();
    // imaget.src = "./sprites/spritesKenji/rightFacing/Idle.png";
    // console.log(imaget.src);
    ctx.drawImage(
      this.imageToDraw,
      this.mvX,
      0,
      200, //  this.width,
      200, // this.height,
      this.positionX - this.offset.x,
      this.positionY - this.offset.y, /// this.sOffsetD,
      this.width * this.scale,
      this.height * this.scale
    );
  }
}

class enemyC extends Sprite {
  constructor(positionX, positionY, width, height, { velocity }, health) {
    super();
    this.positionX = positionX;
    this.positionY = positionY;
    this.width = width;
    this.height = height;
    this.velocity = velocity;
    this.health = health;
    this.direction = "left";
    this.jumping = false;
    this.attacking = true;
    this.attackBox.positionX = this.positionX;
    this.attackBox.positionY = this.positionY;
    this.offsetDirectionForAttack = 0;
    this.alive = true;
  }

  update(spritesArray) {
    if (this.health <= 0) {
      for (let i = 0; i < spritesArray.length; i++) {
        if (spritesArray[i] instanceof GameOver) {
          spritesArray[i].value = "You";
          spritesArray[i].value2 = "Win";
          spritesArray[i].color = "Green";
        }
      }

      return false;
    }

    this.offsetDirectionForAttack = 0;
    if (this.direction == "left") {
      this.offsetDirectionForAttack = this.attackBox.width - this.width;
    }

    this.attackBox.positionX = this.positionX - this.offsetDirectionForAttack;
    this.attackBox.positionY = this.positionY;

    //check collision between attack and enemy player
    for (let i = 0; i < spritesArray.length; i++) {
      if (spritesArray[i] instanceof PlayerC) {
        if (this.attacking) {
          if (
            (this.attackBox.positionX + this.attackBox.width >=
              spritesArray[i].positionX &&
              this.attackBox.positionX <= spritesArray[i].positionX &&
              this.attackBox.positionY + this.attackBox.height >=
                spritesArray[i].positionY &&
              this.attackBox.positionY <=
                spritesArray[i].positionY + spritesArray[i].height) ||
            (this.attackBox.positionX <=
              spritesArray[i].positionX +
                spritesArray[i].width -
                spritesArray[i].spriteOrnamentOffset && //here
              this.attackBox.positionX + this.attackBox.width >=
                spritesArray[i].positionX &&
              this.attackBox.positionY + this.attackBox.height >=
                spritesArray[i].positionY &&
              this.attackBox.positionY <=
                spritesArray[i].positionY + spritesArray[i].height)
          ) {
            if (spritesArray[i].health > 0) {
              console.log("attack success");
              spritesArray[i].health -= 1;
            }
          }
        }
      }
    }

    if (
      this.positionY + this.height + this.velocity.y >=
      this.canvasHeight - 16
    ) {
      this.velocity.y = 0;
      this.positionY = this.canvasHeight - this.height - 16;
      this.jumping = false;
    } else {
      this.velocity.y += this.gravity;
    }

    this.positionX += this.velocity.x;
    this.positionY += this.velocity.y;
  }

  draw(ctx) {
    ctx.fillStyle = "green";
    ctx.fillRect(this.positionX, this.positionY, this.width, this.height);
    ctx.fillStyle = "violet";
    //draw attack
    ctx.fillRect(
      this.attackBox.positionX,
      this.attackBox.positionY,
      this.attackBox.width,
      this.attackBox.height
    );
  }
}

class TimerUI extends Sprite {
  constructor() {
    super();
    this.barWidth = this.canvasWidth / 2.2;
    // this.barHeight = 60;
    // this.player1Health;
    // this.positionX1 = 20;
    // this.positionY1 = 20;
    // this.player2Health;
    // this.positionX2 = this.barWidth + 89;
    // this.positionY2 = 20;

    this.Time = 180;

    this.positionX3 = this.barWidth + 20;
    this.positionX3T = this.positionX3 + 2;
    this.positionY3 = 30;
    this.timerWidth = 68;
    this.timerHeight = 45;

    this.secondsP = 0;
    this.numberWidth = 13;
    this.added1 = false;
    this.added2 = false;
  }

  update(spritesArray) {
    for (var i = 0; i < spritesArray.length; i++) {
      if (spritesArray[i] instanceof GameOver) {
        if (spritesArray[i].isGameOver) {
          return;
        }
      }
    }
    this.secondsP++;
    if (this.secondsP >= 60) {
      this.Time--;
      this.secondsP = 0;
      if (this.Time < 100 && !this.added1) {
        this.positionX3T += this.numberWidth;
        this.added1 = true;
      }
      if (this.Time < 10 && !this.added2) {
        this.positionX3T += this.numberWidth;
        this.added2 = true;
      }
    }
  }

  draw(ctx) {
    ctx.fillStyle = "black";
    ctx.fillRect(
      this.positionX3,
      this.positionY3,
      this.timerWidth,
      this.timerHeight
    );
    ctx.fillStyle = "white";
    ctx.font = "40px  sans";
    ctx.fillText(this.Time, this.positionX3T, this.positionY3 + 35);

    ctx.beginPath();
    ctx.strokeStyle = "white";
    ctx.moveTo(this.positionX3, this.positionY3);
    ctx.lineTo(this.positionX3 + this.timerWidth, this.positionY3);
    ctx.lineTo(
      this.positionX3 + this.timerWidth,
      this.positionY3 + this.timerHeight
    );
    ctx.lineTo(this.positionX3, this.positionY3 + this.timerHeight);
    ctx.lineTo(this.positionX3, this.positionY3);
    ctx.lineWidth = 2.5;
    ctx.stroke();
  }
}

class HealthBar extends Sprite {
  constructor(positionX, positionY, positionRTimer, color, belongsTo) {
    super();

    this.belongsTo = belongsTo;
    this.positionX = positionX;
    this.positionY = positionY;
    this.positionRTimer = positionRTimer;
    this.barWidth = Math.floor(this.canvasWidth / 2.2);
    this.barHeight = 45;
    this.healthlost = 0;
    this.color = color;
  }

  update(spritesArray) {
    for (var i = 0; i < spritesArray.length; i++) {
      if (
        (spritesArray[i] instanceof PlayerC && this.belongsTo == "player") ||
        (spritesArray[i] instanceof KenjiC && this.belongsTo == "enemy")
      ) {
        this.healthlost = 545 - spritesArray[i].health;
      }
    }
  }

  draw(ctx) {
    ctx.fillStyle = this.color;

    if (this.positionRTimer == "left") {
      ctx.fillRect(
        this.positionX + this.healthlost,
        this.positionY,
        this.barWidth - this.healthlost,
        this.barHeight
      );
      ctx.fillStyle = "red";
      ctx.fillRect(
        this.positionX,
        this.positionY,
        this.healthlost,
        this.barHeight
      );

      ctx.beginPath();
      ctx.strokeStyle = "white";
      ctx.moveTo(this.positionX, this.positionY);
      ctx.lineTo(this.positionX + this.barWidth, this.positionY);
      ctx.lineTo(
        this.positionX + this.barWidth,
        this.positionY + this.barHeight
      );
      ctx.lineTo(this.positionX, this.positionY + this.barHeight);
      ctx.lineTo(this.positionX, this.positionY);
      ctx.lineWidth = 2.5;
      ctx.stroke();
    } else {
      ctx.fillRect(
        this.positionX,
        this.positionY,
        this.barWidth - this.healthlost,
        this.barHeight
      );
      ctx.fillStyle = "red";
      ctx.fillRect(
        this.positionX + this.barWidth - this.healthlost,
        this.positionY,
        this.healthlost,
        this.barHeight
      );

      ctx.beginPath();
      ctx.strokeStyle = "white";
      ctx.moveTo(this.positionX, this.positionY);
      ctx.lineTo(this.positionX + this.barWidth, this.positionY);
      ctx.lineTo(
        this.positionX + this.barWidth,
        this.positionY + this.barHeight
      );
      ctx.lineTo(this.positionX, this.positionY + this.barHeight);
      ctx.lineTo(this.positionX, this.positionY);
      ctx.lineWidth = 2.5;
      ctx.stroke();
    }
  }
}

class GameOver extends Sprite {
  constructor(
    x,
    y,
    x2,
    y2,
    x3,
    y3,
    x4,
    y4,
    value,
    value2,
    value3,
    value4,
    color
  ) {
    super();
    this.x = x;
    this.y = y;
    this.x2 = x2;
    this.y2 = y2;
    this.x3 = x3;
    this.y3 = y3;
    this.x4 = x4;
    this.y4 = y4;
    this.value = value;
    this.value2 = value2;
    this.value3 = value3;
    this.value4 = value4;
    this.color = color;
    this.isGameOver = false;
  }
  update() {}
  draw(ctx) {
    ctx.font = "100px Arial";
    ctx.fillStyle = this.color;
    ctx.fillText(this.value, this.x, this.y);
    ctx.fillText(this.value2, this.x2, this.y2);
    ctx.fillText(this.value3, this.x3, this.y3);
    ctx.fillText(this.value4, this.x4, this.y4);
  }
}

class GameTitle extends Sprite {
  constructor(tX, tY, value, color) {
    super();
    this.tX = tX;
    this.tY = tY;
    this.value = value;
    this.color = color;
  }
  update() {}
  draw(ctx) {
    ctx.font = "50px Arial";
    ctx.fillStyle = this.color;

    ctx.fillText(this.value, this.tX, this.tY);
  }
}

class GameStoryAndInstructions extends Sprite {
  constructor(rectX, rectY, width, height, tX, tY, value, value2, color) {
    super();
    this.rectX = rectX;
    this.rectY = rectY;
    this.width = width;
    this.height = height;
    this.tX = tX;
    this.tY = tY;
    this.height2 = height + 100;
    this.width2 = width + 20;
    this.value = value;
    this.color = color;
    this.framesP = 0;
    this.framesS = 60;
    this.dAdd = 0.1;
    this.value2 = value2;
    this.displayStory = true;
    this.displayInst = true;
  }
  update() {
    if (!this.displayStory) {
      return;
    }
    this.framesP++;

    if (this.framesP >= this.framesS) {
      if (this.dAdd > 0) {
        this.dAdd = -0.2;
      } else {
        this.dAdd = 0.2;
      }
      this.framesP = 0;
    }
    //this.tX += this.dAdd;
    this.tY += this.dAdd;
    //this.rectX += this.dAdd;
    this.rectY += this.dAdd;
  }
  draw(ctx) {
    if (!this.displayStory && this.displayInst) {
      this.value = this.value2;
      this.height = this.height2;
      this.width = this.width2;
    }
    if (!this.displayInst) {
      return;
    }

    ctx.fillStyle = "rgba(225,225,225,0.5)";
    ctx.fillRect(this.rectX, this.rectY, this.width, this.height);

    ctx.font = "30px Arial";
    ctx.fillStyle = this.color;
    var lineheight = 50;
    var lines = this.value.split("\n");
    for (var i = 0; i < lines.length; i++) {
      ctx.fillText(lines[i], this.tX, this.tY + i * lineheight);
    }

    //ctx.fillText(this.value, this.tX, this.tY);
  }
}

class GamePaused extends Sprite {
  constructor(x, y, x2, y2, value, value2, color) {
    super();
    this.x = x;
    this.y = y;
    this.x2 = x2;
    this.y2 = y2;
    this.value = value;
    this.value2 = value2;
    this.color = color;
  }
  update() {}
  draw(ctx) {
    ctx.font = "100px Arial";
    ctx.fillStyle = this.color;
    ctx.fillText(this.value, this.x, this.y);
    ctx.fillText(this.value2, this.x2, this.y2);
  }
}

//Create game
let myGame = new Game();

//Game engine loop
function gameEngineLoop() {
  myGame.update();
  myGame.draw();
  requestAnimFrame(gameEngineLoop);
}
gameEngineLoop();
