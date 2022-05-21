function Laser(ship_pos, ship_heading) {
  this.pos = createVector(ship_pos.x, ship_pos.y);
  this.vel = p5.Vector.fromAngle(ship_heading);
  this.vel.mult(7);
  this.age = 100;
  
  this.update = function(){
    this.pos.add(this.vel);
    this.age -= 1;
      
  }
    
  this.render = function() {
    push();
    stroke(255);
    strokeWeight(4);
    point(this.pos.x, this.pos.y);
    //   noFill();
    pop();
  }
  
  this.edges = function() {
    if (this.pos.x > width ) {
     this.pos.x = 0;
    } else if (this.pos.x <= 0) {
     this.pos.x = width;
    }
    if (this.pos.y > height) {
     this.pos.y = 0;
    } else if (this.pos.y <= 0) {
     this.pos.y = height;
    }
  }
  
  this.hitsAsteroid = function(asteroid) {
    var d = dist(this.pos.x, this.pos.y, asteroid.pos.x, asteroid.pos.y);
    if (d < asteroid.r) {
      return true;
    } else {
      return false;
    }
  }

  // this.hitsThargoid = function(thargoid) {
  //   var d = dist(this.pos.x, this.pos.y, thargoid.pos.x, thargoid.pos.y);
  //   if (d < thargoid.r) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // }

  this.hitsShip = function() {
    var d = dist(this.pos.x, this.pos.y, ship.pos.x, ship.pos.y);
    if (d < ship.r) {
      return true;
    } else {
      return false;
    }
  }

  
}