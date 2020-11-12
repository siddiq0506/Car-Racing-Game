var title,input,button,hello,db,gs,pc,index = 0;

var car1,car2,car3,car4;

var finished

var cars = []


var allPlayers

var reset;
var Rank = 0;
var crossed = 0;

function preload(){
  car1img = loadImage("images/car1.png");

  car2img = loadImage("images/car2.png");

  car3img = loadImage("images/car3.png");

  car4img = loadImage("images/car4.png");

  bg=loadImage("images/track.jpg")
  
}

function setup(){
  createCanvas (displayWidth-10,displayHeight-155)
    
  db = firebase.database()

  db.ref("gameState").on("value",function(data){
    gs = data.val()
  })
 
  db.ref("playerCount").on("value",function(data){
   pc = data.val()
  })

  db.ref("rank").on("value",function(data){
    Rank = data.val();
  })


  car1 = createSprite(200,160,30,30);
  //car1.shapeColor = "red"
  car1.addImage(car1img);
  
  
  car2 = createSprite(250,160,30,30);
  //car2.shapeColor="blue"
  car2.addImage(car2img);
  car3 = createSprite(300,160,30,30);
  //car3.shapeColor = "yellow"
  car3.addImage(car3img);


  car4 = createSprite(350,160,30,30);
  //car4.shapeColor = "green"
  car4.addImage(car4img);

cars = [car1,car2,car3,car4]
finished = false

  title = createElement("h1","Car Racing Game")
  title.position(displayWidth/2-55,45)

  input = createInput("Enter Your Name")
  input.position(displayWidth/2-20,250);

  button = createButton("Submit")
  button.position(displayWidth/2+30,285)
  button.mousePressed(enterPlayer)

  reset = createButton("reset")
  reset.position(520,25);
  reset.mousePressed(resetDb)

}

function draw(){

       console.log(finished)

        if(pc===4){
            db.ref("/").update({
                gameState : 1
                
            })
        }

        if(gs === 1){


          db.ref("players").on("value",function(data){
            allPlayers = data.val();

            })


          background("c2b280")
          // title.hide()
          // hello.hide()
          image(bg,0,-displayHeight*4,displayWidth,displayHeight*5)

               
                console.log(allPlayers)
               // background(0)

                var first = 0
                var x = 400;
                for(var i in allPlayers){
                    cars[first].x = x
                    x = x+250
                    cars[first].y=allPlayers[i].y

                     if(first===index-1){
                  camera.position.x = displayWidth/2
                  camera.position.y = cars[first].y
                
                  fill("red")
                  ellipse(cars[index-1].x,cars[index-1].y,80,80)
                   //text(cars[index-1].name,cars[index-1].x,cars[index-1].y+60)

                     }

                    first = first + 1

                   
                }
                drawSprites();

        
      
      if(cars[index-1].y<-3400 && crossed===0){
        crossed = 1;
        Rank++;
        finished = true;
        db.ref("/").update({
          rank:Rank
        })

       alert("Your Rank is "+Rank)

      }


        if (keyDown(UP_ARROW)&&finished!==true){

          cars[index-1].y-=10
          db.ref("players/player"+index).update({
          y:cars[index-1].y
          })

        }

      }
    }
      