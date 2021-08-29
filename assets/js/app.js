
var selectableWords =
  // Word list
  [
    'CSHARP',
    'CPLUSPLUS',
    'RUBYONRAILS',
    'PYTHON',
    'JAVASCRIPT',
    'ANSIC',
    'COBOL',
    'FORTRAN',
    'VISUALBASIC',
    'COMPILER',
    'ALGORITHM',
    'QBASIC',
    'ASPNET',
    'FRAMEWORK'
  ];

  const maxTries=10;
  var gussedLetters=[]
  var currenWordIndex;
  var gussingWord=[];
  var remaingGuesses=0;
  var hasFinished=false;
  var wins=0;

  var keySound=new Audio('./assets/sounds/typewriter-key.wav');
  var winSound=new Audio('./assets/sounds/you-win.wav');
  var loseSound=new Audio('./assets/sounds/you-lose.wav');

  function resetGame()
  {
      remaingGuesses=maxTries;

      currenWordIndex=Math.floor(Math.random()*selectableWords.length);

      gussingWord=[];
      gussedLetters=[];

      document.getElementById("hangmanImage").src="";

      for(var i=0;i<selectableWords[currenWordIndex].length;i++)
      {
        console.log(selectableWords[currenWordIndex].length)
        console.log(selectableWords[currenWordIndex])
        gussingWord.push('_');
      }
      document.getElementById('pressKeytotry').style.cssText='display:none';
      document.getElementById('gameover-image').style.cssText='display:none';
      document.getElementById('youwin-image').style.cssText='display:none';

      updateDisplay();
  }
  function updateDisplay(){
      document.getElementById('totalWins').innerText=wins;

      var guessingWordText='';
      for(var i=0;i<gussingWord.length;i++)
      {
          guessingWordText+=gussingWord[i];
      }
      document.getElementById('CurrentWord').innerText=guessingWordText;
      document.getElementById('remaingGuesses').innerText=remaingGuesses;
      document.getElementById('gueesedLetters').innerText=gussedLetters;
  }

  function updateHangmanImage()
  {
      document.getElementById('hangmanImage').src='assets/images/'+(maxTries-remaingGuesses)+'.png';
  }

  function evaluateGuess(letter)
  {
      var position=[];

      for(var i=0;i<selectableWords[currenWordIndex].length;i++)
      {
          if(selectableWords[currenWordIndex][i]===letter)
          {
              position.push(i);
          }
      }
      if(position.length<=0){
          remaingGuesses--;
          updateHangmanImage();
      }
      else{
          for(var i=0;i<position.length;i++)
          {
              gussingWord[position[i]]=letter;
          }
      }
  }
  function checkWin()
  {
      if(gussingWord.indexOf('_')===-1)
      {
        document.getElementById('youwin-image').style.cssText='display:block';
        document.getElementById('pressKeytotry').style.cssText='display:block';
        wins++;
        winSound.play();
        hasFinished=true;
      }
  }
  function checkLoss()
  {
      if(remaingGuesses<=0)
      {
        document.getElementById('gameover-image').style.cssText='display:block';
        document.getElementById('pressKeytotry').style.cssText='display:block';
        loseSound.play();
        hasFinished=true;
      }
  }
  function makeGuess(letter)
  {
      if(remaingGuesses>0){
          if(gussedLetters.indexOf(letter)===-1)
          {
              gussedLetters.push(letter);
              evaluateGuess(letter);
          }
      }
  }
  document.onkeydown=function(event)
  {
      if(hasFinished){
          resetGame();
          hasFinished=false;
      }
      else
      {
          if(event.keyCode >=65 && event.keyCode<=90)
          {
              keySound.play();
              makeGuess(event.key.toUpperCase());
              updateDisplay();
              checkWin();
              checkLoss();

          }
      }
  }