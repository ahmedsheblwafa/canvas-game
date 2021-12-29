// **create context**
// name.getContext('2d')

// **begin and end path**
// context.beginPath()
// context.closePath()

// **set fill color**
// context.fillStyle = color

// **set stroke color**
// context.strokeStyle = color 

// **set stroke line width**
// context.lineWidth = number

// **draw rectangel**
// context.rect(x,y,w,h)
// context.clearRect(x,y,w,h)

// **draw arcs**
// ctx.arc(x,y,r,angel1,angel2)

// **draw lines**
// ctx.moveTo(x,y);
// ctx.lineTo(x,y);
// ctx.stroke();

// **write fonts****
// ctx.font = "font-size px font-family";
// ctx.fillStyle=color";
// ctx.strokeStyle="color”;
// ctx.strokeText("word",x,y);
// ctx.fillText("word",x,y);

// **use grid as fill style**
// var grd = cContext.createLinearGradient(x1,y1,x2,y2);
// grd.addColorStop(0,'color');
// grd.addColorStop(0.5,'color');
// grd.addColorStop(1,'color');
// cContext.fillStyle = grd;

// **draw an img**
// var img = document.getElementById("scream");
// ctx.drawImage(img, 0, 0,50,50);



var ctx = myCanvas.getContext('2d')

// ctx.beginPath()
// ctx.strokeStyle = "green"
// ctx.lineWidth = 20
// ctx.rect(10,10,100,100)
// ctx.fillStyle = "black"
// ctx.fill()
// ctx.closePath()
// ctx.beginPath()
// ctx.clearRect(40,40,100,100)
// ctx.fillStyle = "red"
// ctx.rect(70,70,100,100)
// ctx.fill()
// ctx.stroke()
// ctx.beginPath()
// ctx.arc(200,200,100,0,2*Math.PI)
// ctx.fill()
// ctx.closePath()
// ctx.beginPath()
// ctx.lineWidth = 5
// ctx.moveTo(100,200);
// ctx.lineTo(300,300);
// ctx.stroke();
// ctx.lineWidth = 1
// ctx.font = "40px arial";
// ctx.fillStyle = "lightgreen";
// ctx.strokeStyle = "blue";
// ctx.strokeText("word",0,40);
// ctx.fillText("word",0,40);


scoreDisplya.textContent = 0
highScoreDisplay.textContent = (localStorage.getItem("high score"))?localStorage.getItem("high score"):0
myCanvas.width = window.innerWidth-4
myCanvas.height = window.innerHeight-200
function startGame(){var x= 0
var y= 0
var dx = 10
var dy = 10
var width = 5
var playerWidth = 100
var timeIndex = 100
var playerX = myCanvas.width/2-playerWidth/2
var gameOverImg = myImg; 
scoreDisplya.textContent = 0
console.log(scoreDisplya.textContent);


document.body.addEventListener("touchmove",(e)=>{
    playerX = e.touches[0].clientX - playerWidth/2
})
function draw(){
    
    ctx.clearRect(0,0,myCanvas.width,myCanvas.height)
    ctx.arc(x,y,width,0,2*Math.PI)
    ctx.rect(playerX,myCanvas.height-10,playerWidth,10)
    ctx.fill()
    if(dx>0){
    dx=(x<myCanvas.width-width)?dx:-dx
    }else{
        dx=(x>width)?dx:-dx
    }
    if(dy>0){
        if(y>=myCanvas.height-width-10 && x<(playerX+playerWidth+width) && x>playerX-width ){
            dy=(y<myCanvas.height-width-10)?dy:-dy
            scoreDisplya.textContent++
            if(scoreDisplya.textContent%2==0){
                timeIndex-=(50/scoreDisplya.textContent)
                playerWidth-=(playerWidth>2*width)?50/scoreDisplya.textContent:0 
                clearInterval(drawInterval)
                drawInterval = setInterval(draw, timeIndex)
            }
        }
        else if(y>=myCanvas.height-width-10 ){
            clearInterval(drawInterval)
            strt.onclick = ()=>{
                startGame()
                strt.onclick = ""
            }
            if(localStorage.getItem("high score")){
                if(parseInt(scoreDisplya.textContent)>parseInt(localStorage.getItem("high score"))){
                    localStorage.setItem("high score",`${scoreDisplya.textContent}`)
                    ctx.font = "20px cursive";
                    ctx.fillStyle="green";
                    ctx.fillText("congratulations new high score "+scoreDisplya.textContent,myCanvas.width/7,myCanvas.height/3);
                }else{
                    ctx.drawImage(gameOverImg,myCanvas.width/2-100 , myCanvas.height/2-50,200,100);
                    ctx.fillStyle="black";
                }
            }else{
                localStorage.setItem("high score",`${scoreDisplya.textContent}`)
                ctx.font = "20px cursive";
                ctx.fillStyle="green";
                ctx.fillText("congratulations new high score "+scoreDisplya.textContent,myCanvas.width/7,myCanvas.height/3);
            }
        }
        
    }else{
        dy=(y>width)?dy:-dy
    }
// dy=(x<myCanvas.width-width)?dy:-dy
// dy=(x<0)?dy:-dy
    x+=dx
    y+=dy
    ctx.closePath()
    ctx.beginPath()
}
var drawInterval = setInterval(draw, timeIndex)}
strt.onclick = ()=>{
    startGame()
    strt.onclick = ""
}