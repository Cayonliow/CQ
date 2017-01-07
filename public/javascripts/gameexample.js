
var game = new Phaser.Game(800, 600, Phaser.AUTO, 'gameexample', { preload: preload, create: create, update: update, render: render });

function preload() {
    game.load.image('background','images/assets/back.png');

    game.load.image('poison','images/assets/poison.png');
    game.load.image('bread','images/assets/bread.png');
    game.load.image('meat','images/assets/meat.png');
    game.load.image('iron','images/assets/iron.png');
    game.load.image('diamond','images/assets/diamond.png');
    game.load.image('mushroom','images/assets/mushroom.png');
    game.load.image('fire','images/assets/fire.png');
    game.load.image('water','images/assets/water.png');
    game.load.image('alien','images/assets/alien.png');
    game.load.image('mag','images/assets/mag.png');
    //game.load.image('monster','assets/red.png');

    game.load.image('ground', 'images/assets/ground.png');
    
    game.load.image('tree1','images/assets/tree1.png');
    game.load.image('tbread','images/assets/bread_tree.png');
    game.load.image('tmeat','images/assets/meat_tree.png');
    game.load.image('jewel','images/assets/jewel_tree.png');
    game.load.image('metal','images/assets/iron_tree.png');
    game.load.image('fossil','images/assets/magnet_tree.png');
    
    game.load.spritesheet('player','images/assets/player.png',60,60);
	
    game.load.audio('bgm', 'images/assets/forest.mp3');
    game.load.audio('sfx', 'images/assets/Chopping_log.mp3');
}

//var fx;

var player;
var cursors;
var item;
var hunger = 80;
var hunger_max = 80;
var temp=37;
var exp=0;
var lv=1;
var t1;
var t2;
var t3;
var t4;
var t5;

var speed=100;
var speedtemp=100;
var speedup=0;
var speeddown=0;
var attack=1;
var attackup=0;
var attackdown=0;
var hungerdown=0;//hunger decrease by time
var hungerdown_time=0;
var hungerup = 0;
var hungerup_time = 0;
var tempup = 0;
var tempup_time = 0;

var counter=0;//time count
var speedup_time=0;
var speeddown_time=0;
var attackup_time=0;
var attackdown_time=0;

var hp1=50;
var hp2=70;
var hp3=60;
var hp4=85;
var hp5=75;
var hp6=95;



function create() {

    game.physics.startSystem(Phaser.Physics.ARCADE);
    

    game.add.tileSprite(0, 0, 1920, 1920, 'background');

    game.world.setBounds(0, 0, 1920, 1920);
	
	upKey = this.game.input.keyboard.addKey(Phaser.Keyboard.W);
	downKey = this.game.input.keyboard.addKey(Phaser.Keyboard.S);
	leftKey = this.game.input.keyboard.addKey(Phaser.Keyboard.A);
	rightKey = this.game.input.keyboard.addKey(Phaser.Keyboard.D);
	spaceKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR)
	
    // bgm
    this.backgroundMusic = this.game.add.audio('bgm');
    this.backgroundMusic.volume = 0.3;
    this.backgroundMusic.loop = true;
    this.backgroundMusic.play();
    
    //sound effect
    fx = game.add.audio('sfx');
    
    //Create tree
    trees1 = game.add.group();  //mushroom
    trees1.enableBody = true;
    for (var i = 0; i < 200; i++)
    {
        var tree1 = trees1.create(Math.random()*1900, Math.random()*1900, 'tree1', game.rnd.integerInRange(99,100));
        tree1.body.immovable = true;
    }
    trees2 = game.add.group();  // meat
    trees2.enableBody = true;
    for (i=0;i < 200; i++){
        var tree2 = trees2.create(Math.random()*1900, Math.random()*1900, 'tree1', game.rnd.integerInRange(99,100));
        tree2.body.immovable = true;
    }
    trees3 = game.add.group();  // bread
    trees3.enableBody = true;
    for (i = 0; i < 200; i++){
		var tree3 = trees3.create(Math.random()*1900, Math.random()*1900, 'tree1', game.rnd.integerInRange(99,100));
        tree3.body.immovable = true;
	}
    trees4 = game.add.group();  // metal
    trees4.enableBody = true;
    for (i = 0; i < 200; i++)
    {
        var tree4 = trees4.create(Math.random()*1900, Math.random()*1900, 'tree1', game.rnd.integerInRange(99,100));
        tree4.body.immovable = true;
    }	
    trees5 = game.add.group();  // magnet
    trees5.enableBody = true;
	for (i = 0; i < 200; i++){
        var tree5 = trees5.create(Math.random()*1900, Math.random()*1900, 'tree1', game.rnd.integerInRange(99,100));
        tree5.body.immovable = true;
    }
    trees6 = game.add.group();  // jewel
    trees6.enableBody = true;
    for (i = 0; i < 200; i++){
        var tree6 = trees6.create(Math.random()*1900, Math.random()*1900, 'tree1', game.rnd.integerInRange(99,100));
        tree6.body.immovable = true;
    }	
	
	
	

    player = game.add.sprite(game.world.centerX, game.world.centerY, 'player');
    game.physics.arcade.enable(player);
    player.body.collideWorldBounds = true;
    player.animations.add('left', [0, 1, 2, 3, 4, 5, 6, 7], 10, true);
    player.animations.add('right', [8, 9, 10, 11, 12, 13, 14, 15], 10, true);
    player.animations.add('up', [24, 25, 26, 27, 28, 29, 30, 31], 10, true);
    player.animations.add('down', [16, 17, 18, 19, 20, 21, 22, 23], 10, true);

    player.animations.add('leftChop', [32, 33, 34, 35, 36, 37, 38, 39], 25, true);
    player.animations.add('rightChop', [40, 41, 42, 43, 44, 45, 46, 47],25, true);
    player.animations.add('upChop', [56, 57, 58, 59, 60, 61, 62, 63], 25, true);
    player.animations.add('downChop', [48, 49, 50, 51, 52, 53, 54, 55], 25, true);


    /*monster = game.add.sprite(400, 400, 'monster');
    game.physics.arcade.enable(monster);
    monster.body.collideWorldBounds = true;
    //  Let gravity do its thing
    monster.body.velocity.y = 150;
    monster.body.velocity.x = 150; 

    //  This just gives each star a slightly random bounce value
    monster.body.bounce.y = 0.7 + Math.random() * 0.2
    monster.body.bounce.x = 0.7 + Math.random() * 0.2 
    */
	



    t1=game.add.text(32, 32, "hunger="+hunger+" / "+hunger_max, { font: "20px Arial", fill: "#f26c4f", align: "left" });
    t1.fixedToCamera = true;
    t1.cameraOffset.setTo(25, 250);
    t2=game.add.text(32, 32, "temp="+temp, { font: "20px Arial", fill: "#f26c4f", align: "left" });
    t2.fixedToCamera = true;
    t2.cameraOffset.setTo(25, 270);
    t3=game.add.text(32, 32, "attack="+attack, { font: "20px Arial", fill: "#f26c4f", align: "left" });
    t3.fixedToCamera = true;
    t3.cameraOffset.setTo(25, 290);
    t4=game.add.text(32, 32, "exp="+exp+" / "+(lv*10), { font: "20px Arial", fill: "#f26c4f", align: "left" });
    t4.fixedToCamera = true;
    t4.cameraOffset.setTo(25, 310);
    t5=game.add.text(32, 32, "level="+lv, { font: "20px Arial", fill: "#f26c4f", align: "left" });
    t5.fixedToCamera = true;
    t5.cameraOffset.setTo(25, 330);



    //Item create
    item1 = game.add.button(100, 525, 'bread', actionOnClick1, this);

    item1.fixedToCamera = true;

    item2 = game.add.button(160, 525, 'meat', actionOnClick2, this);

    item2.fixedToCamera = true;

    item3 = game.add.button(220, 525, 'mushroom', actionOnClick3, this);

    item3.fixedToCamera = true;

    item4 = game.add.button(280, 525, 'fire', actionOnClick4, this);

    item4.fixedToCamera = true;

    item5 = game.add.button(340, 525, 'iron', actionOnClick5, this);

    item5.fixedToCamera = true;

    item6 = game.add.button(400, 525, 'diamond', actionOnClick6, this);

    item6.fixedToCamera = true;

    item7 = game.add.button(460, 525, 'water', actionOnClick7, this);

    item7.fixedToCamera = true;

    item8 = game.add.button(520, 525, 'poison', actionOnClick8, this);

    item8.fixedToCamera = true;

    item9 = game.add.button(580, 525, 'alien', actionOnClick9, this);

    item9.fixedToCamera = true;

    item10 = game.add.button(640, 525, 'mag', actionOnClick10, this);

    item10.fixedToCamera = true;



    //Item info text

    info1=game.add.text(32, 32, "0", { font: "15px Arial", fill: "#f26c4f", align: "left" });
    info1.fixedToCamera = true;
    info1.cameraOffset.setTo(135, 555);

    info2=game.add.text(32, 32, "0", { font: "15px Arial", fill: "#f26c4f", align: "left" });
    info2.fixedToCamera = true;
    info2.cameraOffset.setTo(195, 555);

    info3=game.add.text(32, 32, "0", { font: "15px Arial", fill: "#f26c4f", align: "left" });
    info3.fixedToCamera = true;
    info3.cameraOffset.setTo(255, 555);

    info4=game.add.text(32, 32, "0", { font: "15px Arial", fill: "#f26c4f", align: "left" });
    info4.fixedToCamera = true;
    info4.cameraOffset.setTo(315, 555);

    info5=game.add.text(32, 32, "0", { font: "15px Arial", fill: "#f26c4f", align: "left" });
    info5.fixedToCamera = true;
    info5.cameraOffset.setTo(375, 555);

    info6=game.add.text(32, 32, "0", { font: "15px Arial", fill: "#f26c4f", align: "left" });
    info6.fixedToCamera = true;
    info6.cameraOffset.setTo(435, 555);

    info7=game.add.text(32, 32, "0", { font: "15px Arial", fill: "#f26c4f", align: "left" });
    info7.fixedToCamera = true;
    info7.cameraOffset.setTo(495, 555);

    info8=game.add.text(32, 32, "0", { font: "15px Arial", fill: "#f26c4f", align: "left" });
    info8.fixedToCamera = true;
    info8.cameraOffset.setTo(555, 555);

    info9=game.add.text(32, 32, "0", { font: "15px Arial", fill: "#f26c4f", align: "left" });
    info9.fixedToCamera = true;
    info9.cameraOffset.setTo(615, 555);

    info10=game.add.text(32, 32, "0", { font: "15px Arial", fill: "#f26c4f", align: "left" });
    info10.fixedToCamera = true;
    info10.cameraOffset.setTo(675, 555);
 

    cursors = game.input.keyboard.createCursorKeys();

    game.time.events.loop(Phaser.Timer.SECOND, updateCounter, this);

    game.camera.follow(player);

 
}


function update() {

    game.physics.arcade.collide(player,trees1,chopTree1,null,this);
    game.physics.arcade.collide(player,trees2,chopTree2,null,this);
    game.physics.arcade.collide(player,trees3,chopTree3,null,this);
    game.physics.arcade.collide(player,trees4,chopTree4,null,this);
    game.physics.arcade.collide(player,trees5,chopTree5,null,this);
    game.physics.arcade.collide(player,trees6,chopTree6,null,this);

    /*game.physics.arcade.collide(monster,trees1);
    game.physics.arcade.collide(monster,trees2);
    game.physics.arcade.collide(monster,trees3);
    game.physics.arcade.collide(monster,trees4);
    game.physics.arcade.collide(monster,trees5);
    game.physics.arcade.collide(monster,trees6);
    */
	
	/*game.physics.arcade.collide(rock,trees1,null,this);
    game.physics.arcade.collide(rock,trees2,null,this);
    game.physics.arcade.collide(rock,trees3,null,this);
    game.physics.arcade.collide(rock,trees4,null,this);
    game.physics.arcade.collide(rock,trees5,null,this);
    game.physics.arcade.collide(rock,trees6,null,this);
       */

    speedtemp=(temp)*150/37;
    check();
    player.body.velocity.x = 0;
    player.body.velocity.y = 0;
	

	
    if (upKey.isDown)
    {
        hunger-=0.01;
        t1.setText("hunger="+parseInt(hunger)+" / "+hunger_max);
	temp+=0.01;
        t2.setText("temp="+parseInt(temp)); 

        if (leftKey.isDown)
        {

            if (spaceKey.isDown)
            {
                player.animations.play('leftChop');
                player.body.velocity.x = -5;
                player.body.velocity.y = -5;
            }
            else
            {
                player.body.velocity.x = -1*speed;
                player.body.velocity.y = -1*speed;
                player.animations.play('left');
            }
        }
        else if (rightKey.isDown)
        {
            if (spaceKey.isDown)
            {
                player.animations.play('rightChop');
                player.body.velocity.x = 5;
                player.body.velocity.y = -5;
            }
            else
            {
                player.body.velocity.x = speed;
                player.body.velocity.y = -1*speed;
                player.animations.play('right');
            }
        }
        else
        {
            if (spaceKey.isDown)
            {
                player.animations.play('upChop');
                player.body.velocity.y = -5;
            }
            else
            {
                player.body.velocity.y = -1*speed;
                player.animations.play('up');
            }
        }
    }
    else if (downKey.isDown)
    {
        hunger-=0.01;
        t1.setText("hunger="+parseInt(hunger)+" / "+hunger_max);
	temp+=0.01;
        t2.setText("temp="+parseInt(temp)); 
        if (leftKey.isDown)
        {
            if (spaceKey.isDown)
            {
                player.animations.play('leftChop');
                player.body.velocity.x = -5;
                player.body.velocity.y = 5;
            }
            else
            {
                player.body.velocity.x = -1*speed;
                player.body.velocity.y = speed;
                player.animations.play('left');
            }
        }
        else if (rightKey.isDown)
        {
            if (spaceKey.isDown)
            {
                player.animations.play('rightChop');
                player.body.velocity.x = 5;
                player.body.velocity.y = 5;
            }
            else
            {
                player.body.velocity.x = speed;
                player.body.velocity.y = speed;
                player.animations.play('right');
            }
        }
        else
        {
            if (spaceKey.isDown)
            {
                player.animations.play('downChop');
                player.body.velocity.y = 5;
            }
            else
            {
                player.body.velocity.y = speed;
                player.animations.play('down');
            }
        }
    }

    else if (leftKey.isDown)
    {
        hunger-=0.01;
        t1.setText("hunger="+parseInt(hunger)+" / "+hunger_max);
	temp+=0.01;
        t2.setText("temp="+parseInt(temp)); 

        if (spaceKey.isDown)
        {
            player.animations.play('leftChop');
            player.body.velocity.x = -5;
        }
        else
        {
            player.body.velocity.x = -1*speed;
            player.animations.play('left');
        }
    }
    else if (rightKey.isDown)
    {
	hunger-=0.01;
        t1.setText("hunger="+parseInt(hunger)+" / "+hunger_max);
	temp+=0.01;
        t2.setText("temp="+parseInt(temp)); 

        if (spaceKey.isDown)
        {
            player.animations.play('rightChop');
            player.body.velocity.x = 5;
        }
        else
        {
            player.body.velocity.x = speed;
            player.animations.play('right');
        }
    }
    else
    {
        //  Stand still
	hunger-=0.005;
        t1.setText("hunger="+parseInt(hunger)+" / "+hunger_max); 
	temp-=0.01;
        t2.setText("temp="+parseInt(temp)); 

        if (spaceKey.isDown)
        {
            player.animations.play('downChop');
        }
        else
        {
            player.animations.stop();
            player.frame = 23;
        }
    }

    
    check();

}

function render() {

}

//time_counter
function updateCounter(){

   check();
   counter++;
   if(hungerdown==1)
   {
      hunger-=1;
      t1.setText("hunger="+hunger+" / "+hunger_max);
   }
   if(hungerup==1)
   {
      hunger+=1;
      t1.setText("hunger="+hunger+" / "+hunger_max);
   }
   if(tempup==1.5){
       temp+=1.5;
       t2.setText("temp="+temp);
   }
   t3.setText("attack="+attack);
   
}


//Item click
var count=0;
var num1=0;
var num2=0;
var num3=0;
var num4=0;
var num5=0;
var num6=0;
var num7=0;
var num8=0;
var num9=0;
var num10=0;

//bread
function actionOnClick1(){
	if(num1>0){
		hunger+=10;
		t1.setText("hunger="+parseInt(hunger)+" / "+hunger_max);
        temp+=1 ;
		t2.setText("temp="+temp);
		num1--;
		info1.setText(num1);
	}
}
//meat
function actionOnClick2() {
	if(num2>0){
		hunger+=5;
		t1.setText("hunger="+parseInt(hunger)+" / "+hunger_max);
        temp+=3 ;
        t2.setText("temp="+temp);
		attackup+=1;
		attackup_time=counter+6;
		t3.setText("attack="+parseInt(attack));
		num2--;
		info2.setText(num2);
	}
}
//mushroom
function actionOnClick3() {
	if(num3>0){
        temp+=5 ;
        t2.setText("temp="+temp);
		speedup+=80;
		speedup_time=counter+15;
	
		num3--;
		info3.setText(num3);
	}
}
//fire_gem
function actionOnClick4() {
	if(num4>0){
		tempup+=1.5;
        tempup_time=counter+10;
        speedup+=20;
		speedup_time=counter+30;
	
		num4--;
		info4.setText(num4);
	}
}
//iron_ore
function actionOnClick5() {
	if(num5>0){
		speeddown+=150;
		speeddown_time=counter+15;
	
		hunger+=20;
		t1.setText("hunger="+parseInt(hunger)+" / "+hunger_max);
	
		num5--;
		info5.setText(num5);
	}
}
//diamond
function actionOnClick6() {
	if(num6>0){
		attackup+=2;
		attackup_time=counter+8;
		t3.setText("attack="+parseInt(attack));

		num6--;
		info6.setText(num6);
	}
}
//water_gem
function actionOnClick7() {
	if(num7>0){
		temp-=15;

		t2.setText("temp="+parseInt(temp));
		hunger+=25;
		t1.setText("hunger="+parseInt(hunger)+" / "+hunger_max);

		num7--;
		info7.setText(num7);
	}
}
//poison_dirt 
function actionOnClick8() {
	if(num8>0){
		attackup+=5;
		attackup_time=counter+10;
		t3.setText("attack="+parseInt(attack));
		hungerdown=1;
		hungerdown_time=counter+20;

		num8--;
		info8.setText(num8);
	}
}
//alien_alloy
function actionOnClick9() {
	if(num9>0){
		attackdown+=attack;
		attackdown_time=counter+20;
		t3.setText("attack="+parseInt(attack));
        
        speedup+=100;
		speedup_time=counter+5;
	
		temp-=10;	
		t2.setText("temp="+parseInt(temp));
		hunger-=30;
		t1.setText("hunger="+parseInt(hunger)+" / "+hunger_max);    
        
        hungerup=1;
		hungerup_time=counter+40;
	
		num9--;
		info9.setText(num9);
	}
}
//magnet
function actionOnClick10() {
	if(num10>0){
		num10--;
		info10.setText(num10);
        
        num9++;
		info9.setText(num9);
        num8++;
		info8.setText(num8);
        num7++;
		info7.setText(num7);
        num6++;
		info6.setText(num6);
        num5++;
		info5.setText(num5);
        num4++;
		info4.setText(num4);
        num3++;
		info3.setText(num3);
        num2++;
		info2.setText(num2);
        num1++;
		info1.setText(num1);
        
        speeddown+=100;
		speeddown_time=counter+30;
	}
}



//Chop
function chopTree1(player,tree1) {

    if (spaceKey.isDown)
    {
        fx.play();
        hp1-=attack;
        hunger-=0.075;
        t1.setText("hunger="+hunger+" / "+hunger_max);    
    }
    if(hp1>0)
    {
    }
    else
    {
        tree1.kill();
        hp1=50;
        if(game.rnd.integerInRange(1,10) <= 5){  // mushroom
            num3++;
            info3.setText(num3);     
        }
        
        if(game.rnd.integerInRange(1,12) == 1){ //bread
            num1++;
            info1.setText(num1);        
        }
        
        if(game.rnd.integerInRange(1,12) == 1){ // meat
            num2++;
            info2.setText(num2);
        }
        
        exp+=1;
        t4.setText("exp="+exp+" / "+(lv*10));   
    }  
}

function chopTree2(player,tree2) {
    if (spaceKey.isDown)
    {
        fx.play();
        hp2-=attack;
        hunger-=0.075;
        t1.setText("hunger="+hunger+" / "+hunger_max);    
    }
    if(hp2>0){}
    else{
        tree2.kill();
        hp2=70;
        if(game.rnd.integerInRange(1,10) <= 4){ // meat
            num2++;
            info2.setText(num2);
        }
        exp+=3;
        t4.setText("exp="+exp+" / "+(lv*10) );
	}
}
function chopTree3(player,tree3) {
    if (spaceKey.isDown)
    {
        fx.play();
        hp3-=attack;
        hunger-=0.075;
        t1.setText("hunger="+hunger+" / "+hunger_max);    
    }
    if(hp3>0){}
    else{
        tree3.kill();
        hp3=60;
        
        if(game.rnd.integerInRange(1,10) <= 4){ //bread
            num1++;
            info1.setText(num1);        
        }
        
        exp+=2;
        t4.setText("exp="+exp+" / "+(lv*10) );
	}
}
function chopTree4(player,tree4) {
    if (spaceKey.isDown)
    {
        fx.play();
        hp4-=attack;
        hunger-=0.075;
        t1.setText("hunger="+hunger+" / "+hunger_max);    
    }
    if(hp4>0){}
    else{
        tree4.kill();
        hp4=85;
        
        if(game.rnd.integerInRange(1,10) <= 2){// iron ore
            num5++;
            info5.setText(num5);
        }
        
        if(game.rnd.integerInRange(1,16) <= 2){// alien alloy
            num9++;
            info9.setText(num9);
        }
        
        exp+=5;
        t4.setText("exp="+exp+" / "+(lv*10) );
	}
}
function chopTree5(player,tree5) {
    if (spaceKey.isDown)
    {
        fx.play();
        hp5-=attack;
        hunger-=0.075;
        t1.setText("hunger="+hunger+" / "+hunger_max);    
    }
    if(hp5>0){}
    else{
        tree5.kill();
        hp5=75;
        
        if(game.rnd.integerInRange(1,16) == 1){ // magnet
            num10++;
            info10.setText(num10);
        }
        
        if(game.rnd.integerInRange(1,15) <= 2){ // poison dirt
            num8++;
            info8.setText(num8);
        }
        
        exp+=4;
        t4.setText("exp="+exp+" / "+(lv*10) );
	}
}
function chopTree6(player,tree6) {
    if (spaceKey.isDown)
    {
        fx.play();
        hp6-=attack;
        hunger-=0.075;
        t1.setText("hunger="+hunger+" / "+hunger_max);    
    }
    if(hp6>0){}
    else{
        tree6.kill();
        hp6=95;
        
        if(game.rnd.integerInRange(1,10) <= 4){ // fire gem
            num4++;
            info4.setText(num4);
        }
        
        if(game.rnd.integerInRange(1,12) <= 2){ // diamond
            num6++;
            info6.setText(num6);
        }
        
        if(game.rnd.integerInRange(1,14) <= 2){ // water gem
            num7++;
            info7.setText(num7);
        }
            
        exp+=6;
        t4.setText("exp="+exp+" / "+(lv*10) );
	}
}

function check()
{
    if(counter==speedup_time)
    {
        speedup=0;
    }
    if(counter==speeddown_time)
    {
        speeddown=0;
    }
    if(counter==attackup_time)
    {
        attackup=0;
    }
    if(counter==attackdown_time)
    {
        attackdown=0;
    }
    if(counter==hungerdown_time)
    {
        hungerdown=0;
    }
     if(counter==hungerup_time)
    {
        hungerup=0;
    }
    if(counter == tempup_time){
        tempup = 0;
    }

    speed=speedtemp+speedup-speeddown;
    attack= 1 + ((lv-1)*0.02) +attackup-attackdown;

    //limit
    if(speed<=0)
    {
        speed=5;
    }
    if(attack<=0)
    {
        attack=0;
    }
    if(hunger<=0)
    {
        hunger=0;
        player.kill();
    }
    if(hunger>=hunger_max){
        hunger = hunger_max;
    }
    if(temp>=37)
    {
        temp=37;
    }
    else if(temp<=0)
    {
        temp=0;
    }

    if(exp >= lv*10)
    {
        exp = exp - lv*10;
        lv = lv+1;
        t5.setText("level="+lv);    
        
        t4.setText("exp="+exp+" / "+(lv*10) );
  
        speed += 5;
        hunger_max = hunger_max + lv*3 + 5;
        hunger = hunger + lv*3 + 5;
        t1.setText("hunger="+hunger+" / "+hunger_max);  
        
        attack = attack + ((lv-1)*0.02);
        t3.setText("attack="+attack); 
    }


}

