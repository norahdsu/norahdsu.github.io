let bubbles = []

window.onload = function(){
  restart(1)
}

function restart(colors){
  for(let i=0; i<bubbles.length; i++){
    bubbles[i].remove();
  }
  let num = (window.innerWidth*window.innerHeight)/10000;
  num = num>300 ? 300 : num;

  for(let i=0; i<num; i++){
    bubbles.push(document.createElement("div"));
    document.body.appendChild(bubbles[i]);

    bubbles[i].id = "bubble";
    bubbles[i].style.left = String(rndm(100))+'%';
    bubbles[i].style.top = String(rndm(100))+'%';
    let randnum = String((Math.random()*3)+2)+'em';
    bubbles[i].style.height = randnum;
    bubbles[i].style.width = randnum;
    bubbles[i].style['animation-duration'] = String((Math.random()*3)+1)+'s, '+String((Math.random()*3)+2)+'s';
    bubbles[i].style['animation-name'] = (rndm(3)>0 ? "grow, " : "grow2, ") + (rndm(2)>0 ? 'fade' : "fade2");
    
    switch(colors){
      case 1:
        bubbles[i].style.backgroundColor = clr(0,0,140,0,150,100, .5);   
        break; 
      case 2:
        bubbles[i].style.backgroundColor = clr(255,20,15,0,15,0, .8);
        break;    
      case 3:
        bubbles[i].style.backgroundColor = clr(30,200,30,170,0,135, .8);
        break;
      case 4:
        bubbles[i].style.backgroundColor = clr(255,0,255,0,255,0, Math.random());
        break;
  }
    }
  }

function _rgba(r, g, b, a){
  return ('rgba('+r+','+g+','+b+','+a+')');
}
function rndm(max){
  return (Math.floor(Math.random()*max));
}
function clr(r,ra,g,ga,b,ba, a){
  let c = _rgba(rndm(r)+ra,rndm(g)+ga, (rndm(b)+ba), a);
  return c;
}
