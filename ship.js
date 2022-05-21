function Ship() {
  this.pos = createVector(width/2, height/2);
  this.r = 16;
  this.heading = 0; //PI/2;
  this.rotation = 0;
  this.vel = createVector(0, 0);
  this.isBoosting = false;
  this.hasExploded = false;
  this.explode_timer = 0;
  //this.particles = [];
  
  this.boosting = function(b) {
      this.isBoosting = b;
  }
  
  this.update = function(){
    if(this.isBoosting) {
      this.boost();
    }
    if(!this.hasExploded) {
      this.pos.add(this.vel);
      this.vel.mult(0.995);
      
    } else {
      this.pos.add(0, 0);
      this.vel.mult(0);
    }
        
    // for (var i = this.particles.length-1; i >= 0 ; i--) {
    //   //this.particles[i].applyForce(gravity);
    //   this.particles[i].update();
    //   if(this.particles[i].done) {
    //     this.particles.splice(i,1);
    //   }
    // }
    if(this.explode_timer > 0) {
      this.explode_timer -= 0.25;
      this.hasExploded = true;
    } else {
      this.hasExploded = false;
      particles = [];
      this.explode_timer = 0;
    }
  }
    
  this.boost = function() {
    var force = p5.Vector.fromAngle(this.heading);
    force.mult(0.15);
    this.vel.add(force);
  }
  
  this.hits = function(asteroid) {
    var d = dist(this.pos.x, this.pos.y, asteroid.pos.x, asteroid.pos.y);
    if (d < this.r + asteroid.r) {
      this.hasExploded = true;
      return true;
    } else { 
      this.hasExploded = false;
      return false;
    }
  }
  
  this.explode = function(a, b) {
    x = a;
    y = b;
    for (var i = 0; i < 15; i++) {
      var p = new Particle(x, y);
      particles.push(p);
    }
    this.explode_timer = 25;
  }
  
  this.render = function() {
    if(ship.explode_timer <= 0) {
      push();
      translate(this.pos.x, this.pos.y);
      rotate(this.heading + PI/2);
      fill(0);
      stroke(55);
      triangle(-this.r*2/3, this.r, this.r*2/3, this.r, 0, -this.r);
      pop();
    } else {
      push();
      translate(this.pos.x, this.pos.y);
      rotate(this.heading + PI/2);
      noFill();
      noStroke();
      triangle(-this.r*2/3, this.r, this.r*2/3, this.r, 0, -this.r);
      pop();
    }
    if(this.isBoosting == true) {
      push();
      //fill(255, 204, 100);
      translate(this.pos.x, this.pos.y);
      rotate(this.heading + PI/2);
      fill(0);
      stroke(255);
      strokeWeight(2);
      triangle(-this.r/2, this.r/2, this.r/2, this.r/2, 0, -this.r);
      fill(204, 102, 0);
      stroke(204, 102, 0);
      strokeWeight(2);
      if (animationCounter == 0) {
        triangle(-this.r/4, this.r/2, this.r/4, this.r/2, 0, 3*this.r/2);
        animationCounter += 1;
      } else if (animationCounter == 1) {
          triangle(-this.r/4, this.r/2, this.r/4, this.r/2, 0, 1*this.r);
          animationCounter += 1;
      } else if (animationCounter == 2) {
          triangle(-this.r/4, this.r/2, this.r/4, this.r/2, -this.r/8, 3*this.r/2);
          animationCounter += 1;
      } else if (animationCounter >= 3) {
          triangle(-this.r/4, this.r/2, this.r/4, this.r/2, this.r/8, 3*this.r/2);
          animationCounter = 0;
      }
      pop();
      // push();
      // fill(255, 204, 100);
      // translate(this.pos.x, this.pos.y);
      // rotate(this.heading + PI/2);
      // //fill(0,0,255);
      // stroke(255);
      // strokeWeight(4);
      // triangle(-this.r/2, this.r/2, this.r/2, this.r/2, 0, -this.r/2);
      // fill(204, 102, 0);
      // triangle(-this.r/8, this.r/2, this.r/8, this.r/2, 0, this.r);
      // pop();
    } else {
      push();
      fill(0);
      translate(this.pos.x, this.pos.y);
      rotate(this.heading + PI/2);
      stroke(255);
      strokeWeight(2);
      triangle(-this.r/2, this.r/2, this.r/2, this.r/2, 0, -this.r);
      pop();
    }
  }
  
  this.edges = function() {
   if (this.pos.x > width + this.r) {
     this.pos.x = -this.r;
   } else if (this.pos.x < - this.r) {
     this.pos.x = width + this.r;
   }
   if (this.pos.y > height + this.r) {
     this.pos.y = -this.r;
   } else if (this.pos.y < - this.r) {
     this.pos.y = height + this.r;
   }
  }
  
  this.setRotation = function(a){
    this.rotation = a;
  }
  
  this.turn = function() {
    this.heading += this.rotation ;
  }
}