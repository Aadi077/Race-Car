class Player {
  constructor(){
    this.index = null;
    this.distance = 0;
    this.name = null;
    this.rank = 0;
    
  }

  getCount(){
    var playerCountRef = database.ref('playerCount');
    playerCountRef.on("value",(data)=>{
      playerCount = data.val();
    })
  }

  updateCount(count){
    database.ref('/').update({
      playerCount: count
    });
  }
getCarsAtEnd(){
  database.ref('carsInTheEnd').on("value",(data)=>{
    this.rank = data.val()
  })
}
static updateCarsAtEnd(rank){
  database.ref('/').update({
    carsInTheEnd:rank
    })
  }
  update(){
    var playerIndex = "players/player" + this.index;
    database.ref(playerIndex).set({
      name:this.name,
      distance:this.distance,
      rank:this.rank
    });
  }
  static resetPlayer(){
    database.ref("players/").set({
      player1:null,
      player2:null,
      player3:null,
      player4:null,

    })
  }

  static getPlayerInfo(){
    var playerInfoRef = database.ref('players');
    playerInfoRef.on("value",(data)=>{
      allPlayers = data.val();
    })
  }
}
