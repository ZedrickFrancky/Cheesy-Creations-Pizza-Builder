const audio = document.getElementById('bgMusic');
const playButton = document.getElementById('playButton');
const startBtn = document.getElementById('start-btn');
const startcontainer = document.getElementById('start-container');
const startmenu= document.getElementById('start-menu');
const cancelbtn = document.getElementById('cancel-btn');
const logo = document.getElementById('logo-start');
const imageaxl = document.getElementById('chef-axl-img');
const nameaxl = document.getElementById('chef-axl-name');
const imagevalentina = document.getElementById('chef-valentina-img');
const namevalentina= document.getElementById('chef-valentina-name');
const imagegiorno = document.getElementById('chef-giorno-img');
const namegiorno= document.getElementById('chef-giorno-name');
const select= document.getElementById('select');



playButton.addEventListener('click', function() {
  if (audio.paused) {
    audio.play();
    playButton.classList.remove('fa-play');
    playButton.classList.remove('fa-beat');
    playButton.classList.add('fa-pause');   
  } else {
    audio.pause();
    playButton.classList.remove('fa-pause');
    playButton.classList.add('fa-play');
  }
});

startBtn.addEventListener('click', function() {
    if (cancelbtn.style.display === 'none') {
        cancelbtn.style.display = 'block';
        imageaxl.style.display = 'block';
        nameaxl.style.display = 'block';
        imagevalentina.style.display = 'block';
        namevalentina.style.display = 'block';
        imagegiorno.style.display = 'block';
        namegiorno.style.display = 'block';
        select.style.display = 'block';
        logo.style.display = 'none';
        startBtn.style.display = 'none';
    } else {
        cancelbtn.style.display = 'none';
        imageaxl.style.display = 'none'; 
        nameaxl.style.display = 'none';
        imagevalentina.style.display = 'none';
        namevalentina.style.display = 'none';
        imagegiorno.style.display = 'none';
        namegiorno.style.display = 'none';
        select.style.display = 'none';
    }
});

cancelbtn.addEventListener('click', function() {
    if (cancelbtn.style.display === 'block') {
        cancelbtn.style.display = 'none';
        imageaxl.style.display = 'none'; 
        nameaxl.style.display = 'none';
        imagevalentina.style.display = 'none';
        namevalentina.style.display = 'none';
        imagegiorno.style.display = 'none';
        namegiorno.style.display = 'none';
        select.style.display = 'none';
        logo.style.display = 'block';
        startBtn.style.display = 'block';
    } else {
        cancelbtn.style.display = 'block';
        nameaxl.style.display = 'block';
        imagevalentina.style.display = 'block';
        namevalentina.style.display = 'block';
        imagegiorno.style.display = 'block';
        select.style.display = 'block';
        namegiorno.style.display = 'block';
    }
});

function playClickSound() {
    clickSound.currentTime = 0;
    clickSound.play();
  }

  document.getElementById('start-btn').addEventListener('click', playClickSound);
  document.getElementById('cancel-btn').addEventListener('click', playClickSound);
  document.getElementById('continue').addEventListener('click', playClickSound);
  
  function playClickSound2() {
    clickSound2.currentTime = 0;
    clickSound2.play();
  }

  document.getElementById('chef-giorno-name').addEventListener('click', playClickSound2);
  document.getElementById('chef-valentina-name').addEventListener('click', playClickSound2);
  document.getElementById('chef-axl-name').addEventListener('click', playClickSound2);
  
 


const nightIcon = document.querySelector('.night-icon');
const dayIcon = document.querySelector('.day-icon');

function toggleDayNight() {
    document.body.classList.toggle('night-mode');

    nightIcon.style.display = nightIcon.style.display === 'none' ? 'inline-block' : 'none';
    dayIcon.style.display = dayIcon.style.display === 'none' ? 'inline-block' : 'none';
    nightIcon.classList.remove('fa-beat');
  }

document.getElementById('night-day-toggle').addEventListener('click', toggleDayNight);

window.onload = function() {
  openPopup(); 
};

function openPopup() {
  document.getElementById('popup').classList.add('popup-active');
  document.getElementById('overlay').style.display = 'block';
}

function closePopup() {
  document.getElementById('popup').classList.remove('popup-active');
  document.getElementById('overlay').style.display = 'none';
}

var chefAxlDiv = document.getElementById("chef-axl-name");
chefAxlDiv.addEventListener("click", function(event) {
    event.preventDefault();
    var targetHref = event.currentTarget.getAttribute("data-href");
    setTimeout(function() {
        window.location.href = targetHref;
    }, 1000);
});

var chefValentinaDiv = document.getElementById("chef-valentina-name");
chefValentinaDiv.addEventListener("click", function(event) {
    event.preventDefault();
    var targetHref = event.currentTarget.getAttribute("data-href");
    setTimeout(function() {
        window.location.href = targetHref;
    }, 1000);
});

var chefGiornoDiv = document.getElementById("chef-giorno-name");

chefGiornoDiv.addEventListener("click", function(event) {
    event.preventDefault();
    
    var targetHref = event.currentTarget.getAttribute("data-href");
    
    setTimeout(function() {
        window.location.href = targetHref;
    }, 1000); 
});

