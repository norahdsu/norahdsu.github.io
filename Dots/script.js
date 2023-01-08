let bubbles = []
/*
let colors = [
  'rgba(72,61,139,.5)',
  'rgba(65,105,225,.5)',
  'rgba(0,0,255,.5)',
  'rgba(65,105,225,.5)',
  'rgba(0,0,205,.5)',
  'rgba(0,0,139,.5)',
  'rgba(0,0,128,.5)',
  'rgba(25,25,112,.5)',
  'rgba(100,149,237,.5)',
  'rgba(70,130,180,.5)'
   ]
   */


window.onload = function(){
  let num = (window.innerWidth*window.innerHeight)/10000;
  num = num>500 ? 200 : num;

  for(let i=0; i<num; i++){
    bubbles.push(document.createElement("div"));
    bubbles[i].id = "c"+i;
    bubbles[i].class = "bubbles";
    document.body.appendChild(bubbles[i]);
  }

  for(let i=0;i<bubbles.length;i++){
    bubbles[i].id = "still";
    bubbles[i].style.left = String(rndm(100))+'%';
    bubbles[i].style.top = String(rndm(100))+'%';
    let randnum = String((Math.random()*3)+2)+'em';
    bubbles[i].style.height = randnum;
    bubbles[i].style.width = randnum;
    bubbles[i].style['animation-duration'] = String((Math.random()*3)+1)+'s, '+String((Math.random()*3)+2)+'s';
    bubbles[i].style['animation-name'] = (rndm(3)>0 ? "grow, " : "grow2, ") + (rndm(2)>0 ? 'fade' : "fade2");

    bubbles[i].style.backgroundColor = clr();    
    }
    //setInterval(ar1, 100);
  }

/*
function ar1(){
  let rndn = rndm(bubbles.length);
  bubbles[rndn].id = "moving";
  setTimeout(ar2, 3000, rndn);
}

function ar2(rndn){
  bubbles[rndn].style.left = String(rndm(100))+'%';
  bubbles[rndn].style.top = String(rndm(100))+'%';
  bubbles.id = "still";
}
*/

function _rgba(r, g, b, a){
  return ('rgba('+r+','+g+','+b+','+a+')');
}
function rndm(max){
  return (Math.floor(Math.random()*max));
}
function clr(){
  let c = _rgba(rndm(50),rndm(140), (rndm(150)+100), 0.5);
  return c;
}
