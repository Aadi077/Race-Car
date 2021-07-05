class Game {
  constructor(){}

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }
    car1 = createSprite(100,200);
    car1.addImage("car1",car1img)
    car2 = createSprite(300,200);
    car2.addImage("car2",car2img)
    car3 = createSprite(500,200);
    car3.addImage("car3",car3img)
    car4 = createSprite(700,200);
    car4.addImage("car4",car4img)
    cars = [car1,car2,car3,car4];
  }

  play(){
    form.hide();
    textSize(30);
    text("Game Start", 120, 100)
    Player.getPlayerInfo();
    player.getCarsAtEnd();
    if(allPlayers !== undefined){

      background (ground);
      image (track,0,-displayHeight*4,displayWidth,displayHeight*5);
      var index = 0;
      var x = 200;
      var y
      for(var plr in allPlayers){
        index +=1;
        x+=300;
        y=displayHeight - allPlayers[plr].distance-100;
        cars[index-1].x=x
        cars[index-1].y=y
        if(index==player.index){
        fill("lightblue");
        stroke(10);
        ellipse(x,y,80,120);
        camera.position.x=displayWidth/2
        camera.position.y=cars[index-1].y
        }
      }
    }

    if(keyIsDown(UP_ARROW) && player.index !== null && player.distance<=displayHeight*5-200){
      player.distance +=20
      player.update();
    }

    if (player.distance==displayHeight*5-200){
      gameState = 2;
      player.rank+=1;
      Player.updateCarsAtEnd(player.rank)
      player.distance = displayHeight*5-180;
      player.update();
      this.update(2);
      swal({
        title:'Your Rank Is: '+player.rank,
        text:"Congratulations!", 
        imageUrl:'https://raw.githubusercontent.com/vishalgaddam873/p5-multiplayer-car-race-game/master/assets/cup.png',
        imageSize:"100x100",
        confirmButtonText:"Great!"
      })
    }

    drawSprites();

  }
  end(){
    console.log("Game Over");
    console.log(player.rank);
  }
}
