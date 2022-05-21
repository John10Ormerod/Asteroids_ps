// TODO
// make the vector maths up from scratch instead of relying on the vector functions
// mult of scalars, addition, and etc
//
// add engineering text screen to observe important factors DONE
// switchable from the standard screen showing how many of each star level DONE
// check total elements....
// make the end of game work restart from scratch without funny effects
// life bonuses
// 
//
var ship;
//var thargoid;
var asteroids = [];
var speedFactorAst = 1.0;
var particles = [];
var stars = [];
var lasers = [];
//var thargoidLasers = [];
var score = 0;
var level = 1;
var newGameLives = 3;
var lives = newGameLives;
var starVel;
var start = 1;
var engineeringMode = 1;  // 1 for useful information on screen
var animationCounter = 0;
var lifeBonusGiven1 = 0;
var lifeBonus1_score = 1500;
var lifeBonusGiven2 = 0;
var lifeBonus2_score = 5000;
var lifeBonusGiven3 = 0;
var lifeBonus3_score = 10000;

// let mySoundLaser;
// let mySoundExp1;
// let mySoundExp2;
// let mySoundExp3;

// function preload() {
//   //soundFormats('mp3', 'wav', 'ogg');
//   mySoundLaser = loadSound('sounds/Naboo-torp.wav');
//   mySoundExp1 = loadSound('sounds/boom3.wav');
//   mySoundExp2 = loadSound('sounds/kaboom.wav');
//   mySoundExp3 = loadSound('sounds/09 Explosion - debris falling.wav');
// }



function setup() {
  createCanvas(windowWidth, windowHeight);
  ship = new Ship();
//  thargoid = new Thargoid();
  angleMode(RADIANS);
  speedFactorAst = 1.0;
  for (var i = 0; i < 5; i++) {
    asteroids.push(new Asteroid());
  }
  
  for (var i = 0; i < 120; i++) {
    stars.push(new Star(random(windowWidth), random(windowHeight)));
  }
}

function draw() {
  background(0);
  start = 0;
  fill(0, 255, 255);
  textSize(24);
  if(engineeringMode && start != 0) {
    text("Level: " + level + " Score: " + score + "   Lives: " + lives + "     n_Particles: " + particles.length + " n_stars: " + stars.length + " n_asteroids: " + asteroids.length, 10, 25);
    fill(255, 0, 255);
  textSize(18);
    text("Stars - n_Level1: " + stars[0].count(-1) + " n_Level2: " + stars[0].count(-2) + " n_Level3: " + stars[0].count(-3) + " n_Level4: " + stars[0].count(-4), 10, 50);

  } else {
      fill(255, 160, 255);
      text("Asteroids, Johnny O", 400, 25);
      fill(110, 110, 255);
      text("Level: " + level + "   Score: " + score + "   Lives: " + lives, 10, 25);
  }
  
  for (var i = stars.length - 1; i >= 0; i--) {
    stars[i].update();
    stars[i].edges();
    stars[i].render();
  }
  
  for (var i = 0; i < asteroids.length; i++) {
    if (ship.hits(asteroids[i])) {
      //console.log('oops!');
      lives -= 1;
      ship.hasExploded = true;
      ship.explode(ship.pos.x, ship.pos.y);
      asteroids.splice(i, 1);
      //next ship, and subtract from total, maintain score
      break;
    }
    asteroids[i].update();
    asteroids[i].edges();
    asteroids[i].render();
  }
  
  for (var j = lasers.length - 1; j >= 0; j--) {
    //console.log(lasers[j].age);
    if (lasers[j].age <= 0) {
      lasers.splice(j, 1);
    }
    if (lasers[j]) {
      //lasers[j].age -= 6; // age is updated in sketch
    }
  }
  
  for (var i = lasers.length - 1; i >= 0; i--) {
    lasers[i].update();
    lasers[i].edges();
    lasers[i].render();
    for(var j = asteroids.length - 1; j >= 0 ; j--) {
      if (lasers[i].hitsAsteroid(asteroids[j])) {
        if (asteroids[j].r > 15) {
          var newAsteroids = asteroids[j].breakup();
          asteroids = asteroids.concat(newAsteroids);
        }
        asteroids.splice(j, 1);
        if(lasers[i] != null) {
          lasers.splice(i, 1);
          score += 20;
        }
        break;
      }
    }
    // if (lasers[i] !== null) {      // avoid the nulls if when the lasers all disappear
    //   if (lasers[i] && lasers[i].hitsThargoid(thargoid) && thargoid.exist)  {      // ditto
    //     thargoid.explode(lasers[i].pos.x, lasers[i].pos.y);
    //     thargoid.exist = false;
    //     lasers.splice(i, 1);
    //     score += 500;
    //     //break;  
    //   }
    // }
  }
  
  // for (var k = thargoidLasers.length - 1; k >= 0; k--) {
  //   thargoidLasers[k].update();
  //   thargoidLasers[k].edges();
  //   thargoidLasers[k].render();
  //   if (thargoidLasers[k] && thargoidLasers[k].hitsShip()) {
  //     ship.hasExploded = true;
  //     thargoidLasers.splice(k, 1);
  //   }
  //   if (thargoidLasers[k] && (thargoidLasers[k].age <= 0)) {
  //     thargoidLasers.splice(k,1);
  //   }
  // }
  
  if(frameCount % 100 == 0) {
    //console.log(lasers);
    //console.log(thargoidLasers);
    //console.log(lasers);
    //console.log(stars);
    //console.log(asteroids);
    //console.log(particles);
  }
  
  // thargoid.update();
  // thargoid.edges();
  // thargoid.render();
  
  ship.turn(0.25);
  ship.update();
  ship.edges();
  ship.render();
  
  if(score > lifeBonus1_score && lifeBonusGiven1 == 0) {
    lives+=1;
    lifeBonusGiven1 = 1;
  }
  if(score > lifeBonus2_score && lifeBonusGiven2 == 0) {
    lives+=1;
    lifeBonusGiven2 = 1;
  }
  if(score > lifeBonus3_score && lifeBonusGiven3 == 0) {
    lives+=1;
    lifeBonusGiven3 = 1;
  }
  
var lifeBonusGiven2 = 0;
var lifeBonus2_score = 5000;
var lifeBonusGiven3 = 0;
var lifeBonus3_score = 10000;

  
  for (var i = particles.length-1; i >= 0 ; i--) {
    //particles[i].applyForce(gravity);
    particles[i].update();
    particles[i].render();
    if(particles[i].done) {
      particles.splice(i,1);
    }
  }


  if (lives <= 0 && ship.explode_timer <= 0) {
    //background(0);
    start = 1;
    fill(0, 255, 255);
    textSize(36);
    text("Level: " + level + "   Score: " + score + "   Lives: " + lives, 50, 150);
    text("Final Score", 50, 200);
    text("Insert Coin: Press i", 50, 250);
    noLoop();
    asteroids = [];
    stars = [];
    level = 1;
    //loop();
    //setup();
  }
  if (asteroids.length == 0){
    // you won this level
    // print score
    level += 1;
    speedFactorAst = speedFactorAst * 1.15;
    for (var i = 0; i < (5-1+level); i++) {
      asteroids.push(new Asteroid());
    }

  } else {
    // print score
    // update speeds and number of asteroids on screen
    // reset and start again but maintain score
  }
}

function keyPressed() {
  if(keyCode == RIGHT_ARROW) {
    ship.setRotation(0.05);
  } else if(keyCode == LEFT_ARROW) {
    ship.setRotation(-0.05);
  } else if(keyCode == UP_ARROW) {
    ship.boosting(true);
  } else if(key == ' ') {
    lasers.push(new Laser(ship.pos, ship.heading));
  } else if(key == 'i') {
    //splice(asteroids, 0, asteroids.length);
    asteroids = [];
    lives = newGameLives;
    score = 0;
    level = 1;
    speedFactorAst = 1.0;
    loop();
    setup();
  }
}

function keyReleased() {
if(keyCode == RIGHT_ARROW) {
    ship.setRotation(0.0);
  } else if(keyCode == LEFT_ARROW) {
    ship.setRotation(0.0);
  } else if(keyCode == UP_ARROW) {
    ship.boosting(false);
  }   
}