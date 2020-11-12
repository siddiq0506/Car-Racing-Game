function enterPlayer(){
    var name = input.value()

   button.hide();
   title.hide();
   input.hide();

    fill("red")
    hello = createElement("h3","Hello "+name+" Waiting For Players")
    hello.position(480,250);

    pc+=1

   
    db.ref("/").update({
        playerCount : pc
    })
    
    db.ref("players/player"+pc).set({
    y : 830,
    index : pc,
    
    name : name


    })

    input.hide()
    button.hide()

    index = pc 

}


function resetDb(){

db.ref("/").update({
playerCount : 0,
gameState : 0,rank : 0

})

db.ref("players").remove()


}
