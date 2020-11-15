//Import navbar and footer.
$(function(){
  $('#importNav').load('navbar.html')
});

$(function(){
  $('#importFooter').load('footer.html')
});

//GAME:

//Colocando as imagens nos cartões
const cardBoard = document.querySelector("#cardboard");
const imgs = [
  "vue.svg",
  "angular.svg",
  "react.svg",
  "ember.svg",
  "backbone.svg",
  "aurelia.svg"
];

let cardHTML = "";

imgs.forEach(img=>{

  cardHTML += `
    <div class="memory-card" data-card="${img}">

      <img draggable = false class="front-face" src="../../image/imgMemo/${img}"/>
      <img draggable = false class="back-face" src="../../image/imgMemo/js-badge.svg">
    </div>`;
});

cardBoard.innerHTML = cardHTML + cardHTML;

const cards = document.querySelectorAll(".memory-card");

//Variaveis importantes
let firstCard, secondCard;
let lockCards = false;
let cartas = [];

//Funções:

//Gira o cartão
function flipCard(){

  if(lockCards){
    return false;
  }

  this.classList.add("flip");

  if(!firstCard){

    firstCard = this;
    return false;
  }

  secondCard = this;

  checkForMatch();
}

//Verifica se o jogo esta em andamento.
function checkForMatch(){

  let isMatch = firstCard.dataset.card === secondCard.dataset.card;

  !isMatch ? unFlipCards() : resetCards(isMatch);
}

//Desvirar o cartão
function unFlipCards(){

  lockCards = true;

  setTimeout(() => {

    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");

    resetCards();
  }, 600);
}

(function random(){

  cards.forEach(card=>{

    let randm = Math.floor(Math.random() * 12);
    card.style.order = randm;
  });
})();

//Verifica as "pontuações" e Finaliza o jogo
function resetCards(isMatch = false){

  if(isMatch){
    removeListener();
    cartas.push(true);
  }
  
  if(cartas.length >= 6) finishPopUp();

  [firstCard, secondCard, lockCards] = [null, null, false];
}

//Para remover o click quando o cartão é pontuado.
function removeListener(){
  firstCard.removeEventListener("dblclick",flipCard);
  secondCard.removeEventListener("dblclick",flipCard);
}

//Popup final
function finishPopUp(){
  swal({
    icon:"success",
    title: "Você ganhou !",
    text: " =)",
    buttons: {
      cancel: "Voltar",
      confirm: { value: "reset", text: "Reiniciar!"},
    },
    closeOnClickOutside: false,
    closeOnEsc: false,
  }).then((value) => {
    switch(value){
      
      case 'reset':
        location.reload();
        break;
      case null:
        window.location.replace("index.html");
    }
  });
}

//Adicionando o evento de clique duplo e retirando o click padrão.
cards.forEach(card => card.addEventListener("dblclick", flipCard));
cards.forEach(card => card.addEventListener("click", function(e){
  e.preventDefault();
}));

