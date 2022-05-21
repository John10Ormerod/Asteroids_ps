function Star(x, y) {
  //vel = vel;
  this.pos = createVector(x, y);
  this.direction = createVector(0, 0);
  var layerLevel = random(1);
  if (layerLevel < 0.4){
    this.layer = -1;
  } else if (layerLevel < 0.7) {
    this.layer = -2;
  } else if (layerLevel < 0.85) {
    this.layer = -3;
  } else {
    this.layer = -4;
  }
  
  //this.layer = floor(random(1, 4));
  this.r = abs(this.layer) * 1;

  this.update = function() {
    var x = ship.vel.x;
    var y = ship.vel.y;
    var new_x = x * 0.15 * this.layer;  // note layer is -ve
    var new_y = y * 0.15 * this.layer;
    this.direction.x = new_x;
    this.direction.y = new_y;
    //this.direction = ship.vel;
    //this.direction.rotate(PI);
    //this.direction.setHeading = this.direction.heading;// + PI/2;
    //this.direction.setMag(this.direction.mag * this.layer * 10);
    //this.direction.mult(this.layer*0.05);
    this.pos.add(this.direction); 
  }  
  
  this.render = function() {
    push();
    fill(150, 150, 250);
    strokeWeight(1);//6 - abs(this.layer)); 
    stroke(255-(abs(this.layer) * 50), 100, abs(this.layer) * 50);
    ellipse(this.pos.x, this.pos.y, this.r, this.r);
    pop();
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
  
  this.count = function(p) { // hand it any star to access the counter
    var count = 0;
    for(var i = 0; i < stars.length; i++) {
      if (stars[i].layer == p) {
        count+=1;
      }
    }
    return count;
  }

  
}