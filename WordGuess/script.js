var canvas;
var ctx;
let errorCount = 0;
let correctCount = 0;
let wordSelected = "";
let guessedWord = "";
let attempts = []

let complexity = 0;

let finished = false;

canvas=document.getElementById("cv");
ctx=canvas.getContext("2d");


function clear_(){
  ctx.clearRect(0,0,canvas.width, canvas.height);
}

function restart(chosen){

  document.getElementById('result').innerText = 'Guessing...';

  let buttons = document.getElementsByClassName('b');
  for(let i=0;i<buttons.length;i++)
    buttons[i].style.visibility = 'visible';

  errorCount = 0;
  correctCount = 0;
  guessedWord = "";
  attempts = []
  complexity = 0;
  finished = false;

  if (chosen == false){
    wordSelected = "";

    let idx = randomFromTo(0, words.length - 1);
    wordSelected = words[idx];
  }

  formGuess();
  displayWord(guessedWord);


  complexity = wordSelected.length;

  if(complexity < 4){
    complexity = complexity + 2;
  }
  
  drawDesign()

}

function choose(){
  let maybeword = prompt("Would you like to choose a word? If so, type it. If not, type no");
  if(maybeword != "no" || maybeword != ""){
    wordSelected = maybeword;
  }
  restart(true);
}

function formGuess(){
  guessedWord= "";
  for (let i = 0; i < wordSelected.length; i++){
    guessedWord = guessedWord + "_";
  }
}

function displayWord(word){
  let placeholder = document.getElementById("guess");
  let outString = "";
  for(let i=0; i<word.length; i++){
    outString = outString + word.charAt(i) + " ";
  }
  placeholder.innerText = outString;
}



function guess(el){
  let lettertoCheck = el.innerText;
  let uppercaseSelectWord = wordSelected.toUpperCase();
  let found = 0;

  if (finished == false){
    for (let i = 0; i < uppercaseSelectWord.length; i++){
      if (uppercaseSelectWord.charAt(i) == lettertoCheck){
        guessedWord = guessedWord.substr(0,i) + lettertoCheck +                           guessedWord.substr(i+1);
        found++;
      }
    }

    if (found>0){
      displayWord(guessedWord);
      correctCount+=found;
      if (correctCount == wordSelected.length){
        displayWord(wordSelected.toUpperCase());
        document.getElementById("result").innerText = "You Win!";
        finished = true;
      }
    }   

    else {
      errorCount++;
      if (errorCount == complexity){
        document.getElementById("result").innerText = "Sorry, but you lost!!!"
        displayWord(wordSelected.toUpperCase());
        finished = true;
      }
    }

    //el.style.display="none";
    el.style.visibility = "hidden";
    
  }
  drawDesign();
}

function drawDesign(){
  clear_();
  ctx.beginPath();
  
  ctx.font = '50px Times New Roman';
  ctx.textAlign = 'center';
  ctx. textBaseline = 'middle';
  ctx.fillStyle = 'whitesmoke';  
  ctx.fillText('Guesses Left:', 200, 100); 
  
  ctx.closePath() ;
  
  ctx.beginPath();
  
  ctx.strokeStyle='whitesmoke';
  ctx.lineWidth = 10; 
  let p = (1/complexity)*Math.PI*2;
  ctx.arc(200,350,75,0,p * (complexity-errorCount));
  ctx.stroke();
  
  ctx.closePath();
  
  
  ctx.beginPath()
  
  ctx.font = '50px Times New Roman';
  ctx.textAlign = 'center';
  ctx. textBaseline = 'middle';
  ctx.fillStyle = 'whitesmoke';  
  ctx.fillText(complexity-errorCount, 200, 600); 
  
  ctx.closePath()
}
