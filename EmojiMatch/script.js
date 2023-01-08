let canvas;
let ctx;

let cardImages = [
    "cool", "laughing", "sad", "wink", 
    "anger", "poo", "cold", "greed",
    "famous", "crying", "ghost", "zany", 
    "thief", "upside down", "hug", "robot",
];

let deck = [];
let chosen = [];
let flipped = 0;

const cardWidth = 150;
const cardHeight = 150;
const offsetX = 50;
const offsetY = 50;
const gapX = 35;
const gapY = 35;

function begin(level){
    canvas=document.getElementById("cv");
    ctx=canvas.getContext("2d");

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    deck = [];
    chosen = [];
    flipped = 0;

    let img = document.getElementById("cool");
    let img2 = document.getElementById("laughing");
    let card = new Card(1,1,img,1);
    
    canvas.onmousedown = turn;

    cardImages = cardImages.sort((a, b) => 0.5 - Math.random());

    makeDeck((level+1)*4);
    shuffle();
    displayDeck();
}

function Card(px, py, pimg, pParIndex, pidx){
    this.x=px;
    this.y=py;
    this.width=cardWidth;
    this.height=cardWidth;
    this.img=pimg;
    this.CardBack = document.getElementById("back");
    this.face = false;
    this.paringIndex=pParIndex;
    this.display=displayCard;
    this.show = showCard;
    this.found = false;
}

function makeDeck(num){
    let card;
    let img;
    for (var i=0; i<num; i++){
        img = document.getElementById(cardImages[i]);
        let x; 
        let y1;
        let y2;
        
        if(i<8){
            x = (cardWidth + gapX) * i;
            y1 = 0;
            y2 = cardHeight + gapY;
        }
        else{
            x = (cardWidth + gapX) * (i-8);
            y1 = (cardHeight + gapY)*2;
            y2 = (cardHeight + gapY)*3;
        }

        card = new Card (x,y1, img, i);
        deck.push(card);
        card = new Card (x,y2, img, i);
        deck.push(card);
    }
    
}

function shuffle(){
    let tmpCardImg;
    let tmpCardParing;
    let k;
    const repeat_ = 3;
    for(let j = 0; j < repeat_; j++){
        for(let i = 0; i < deck.length; i++){
            k = randomFromTo(0, deck.length-1);
                while (k == i){
                    k = randomFromTo(0, deck.length-1);
                }
            tmpCardImg = deck[i].img;
            tmpCardParing = deck[i].paringIndex;

            deck[i].img = deck[k].img;
            deck[i].paringIndex = deck[k].paringIndex;

            deck[k].img = tmpCardImg;
            deck[k].paringIndex = tmpCardParing;
        }
    }
}

function displayCard(){
    if(this.face){
        ctx.drawImage(this.img,this.x,this.y,this.width, this.height);
    }
    else{
        ctx.drawImage(this.CardBack, this.x,this.y,this.width,this.height);
    }

}

function displayDeck(){
    for(var i=0; i<deck.length; i++){
        deck[i].display();
    }
}

function turn(e){
    let clickX = e.pageX - canvas.offsetLeft;
    let clickY = e.pageY - canvas.offsetTop;

    if(flipped>1){
        if(chosen[0][0].paringIndex == chosen[1][0].paringIndex){
            deck[chosen[0][1]].found = true;
            deck[chosen[1][1]].found = true;
        }
        for(i=0;i<deck.length;i++){
            if(deck[i].found == false){
                deck[i].face=false;
                deck[i].display();
                chosen = [];
            }
        }
        flipped=0;
    }

    for (let i = 0; i < deck.length; i++){
        if (clickX >= deck[i].x && clickX <= deck[i].x + deck[i].width){
            if (clickY >= deck[i].y && clickY <= deck[i].y + deck[i].height){
                if(deck[i].face==false)
                    flipped++;   
                deck[i].face=true;
                deck[i].display();
                chosen.push([deck[i],i]);              
                console.log(i);    
            }
        }
    }
    console.log(flipped);
    console.log(chosen);
}

function done(){
    for(var i=0; i<deck.length; i++){
        deck[i].show();
    }
}

function showCard(){
    ctx.drawImage(this.img,this.x,this.y,this.width, this.height);
}

function randomFromTo(from, to) {
    return Math.floor(Math.random() * (to + 1 - from  ) + from);
}
