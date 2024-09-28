//Change Color 
const title = document.getElementById("id1")
const img = document.getElementById("id2")

img.addEventListener("mouseover",SetNewColor,true)
img.addEventListener("mouseout",SetOldColor,true)

function SetNewColor() {
    title.style.color="#3385ff"
}

function SetOldColor() {
    title.style.color="white"
}


//Search Google
const form = document.getElementById('form')

form.addEventListener("submit",google)

function google() {
    const search = document.getElementById('search').value;

    window.open('http://google.com/search?q=danau+toba+'+search)
    
    google.preventDefault()
}


//Img Slider
let slideIndex = 0;
showSlides();

function showSlides() {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";  
  }
  slideIndex++;
  if (slideIndex > slides.length) {slideIndex = 1}    
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace("active", "");
  }
  slides[slideIndex-1].style.display = "block";  
  dots[slideIndex-1].className += " active";
  setTimeout(showSlides, 2000);
}


//Responsive NavBar
const nav = document.querySelector('nav ul');
const menuList = document.getElementById('list');

menuList.addEventListener('click', function() {
  nav.classList.toggle('slide');
})


//CountDown
const F1CD = new Date("October 1, 2023 00:00:00").getTime();
const RallyCD = new Date ("january 1, 2024 00:00:00").getTime();

const seconds = 1000 ;
const minutes = seconds * 60;
const hours = minutes * 60;
const days = hours * 24;

const x = setInterval( function() {
  const now = new Date().getTime();
  const distance = F1CD - now;
  const Rdistance = RallyCD - now; 

  const day = Math.floor(distance/days);
  const hour = Math.floor((distance % days) / hours);
  const minute = Math.floor((distance % hours) / minutes); 
  const second = Math.floor((distance % minutes) / seconds);
  
  const dayR = Math.floor(Rdistance/days);
  const hourR = Math.floor((Rdistance % days) / hours);
  const minuteR = Math.floor((Rdistance % hours) / minutes); 
  const secondR = Math.floor((Rdistance % minutes) / seconds);

  document.getElementById('countDown').innerHTML = day + ' Day ' + hour + ' Hour ' + minute + ' Minute ' + second + ' Second ';
  document.getElementById('countDown2').innerHTML = dayR + ' Day ' + hourR + ' Hour ' + minuteR + ' Minute ' + secondR + ' Second ';

},1000)


//OpenWeather
const icon = document.getElementById('icon');
const cuaca = document.getElementById('cuaca');
const angin = document.getElementById('angin');
const suhu = document.getElementById('suhu');
 
async function getData() {
  const res= await fetch('https://api.openweathermap.org/data/2.5/weather?lat=2.73555492283273&lon=98.72744816437375&appid=1484709ee30fef113310633001f1dd86');
  const data = await res.json();
  icon.src = "http://openweathermap.org/img/w/"  + data.weather[0].icon + ".png";
  cuaca.innerHTML = data.weather[0].description;
  angin.innerHTML = data.wind.speed + " km/h";
  suhu.innerHTML = Math.floor(data.main.temp-273) + "&#8451";
  
}

getData();


//LightBox
const galleryItem = document.getElementsByClassName("gallery-item");
const lightBoxContainer = document.createElement("div");
const lightBoxContent = document.createElement("div");
const lightBoxImg = document.createElement("img");
const lightBoxPrev = document.createElement("div");
const lightBoxNext = document.createElement("div");

lightBoxContainer.classList.add("lightbox");
lightBoxContent.classList.add("lightbox-content");
lightBoxPrev.classList.add("fa", "fa-angle-left", "lightbox-prev");
lightBoxNext.classList.add("fa", "fa-angle-right", "lightbox-next");

lightBoxContainer.appendChild(lightBoxContent);
lightBoxContent.appendChild(lightBoxImg);
lightBoxContent.appendChild(lightBoxPrev);
lightBoxContent.appendChild(lightBoxNext);
document.body.appendChild(lightBoxContainer);

let index = 1;

function showLightBox(n) {
    if (n > galleryItem.length) {
        index = 1;
    } else if (n < 1) {
        index = galleryItem.length;
    }
    let imageLocation = galleryItem[index-1].children[0].getAttribute("src");
    lightBoxImg.setAttribute("src", imageLocation);
}

function currentImage() {
    lightBoxContainer.style.display = "block";

    let imageIndex = parseInt(this.getAttribute("data-index"));
    showLightBox(index = imageIndex);
}
for (let i = 0; i < galleryItem.length; i++) {
    galleryItem[i].addEventListener("click", currentImage);
}

function slideImage(n) {
    showLightBox(index += n);
}
function prevImage() {
    slideImage(-1);
}
function nextImage() {
    slideImage(1);
}
lightBoxPrev.addEventListener("click", prevImage);
lightBoxNext.addEventListener("click", nextImage);

function closeLightBox() {
    if (this === event.target) {
        lightBoxContainer.style.display = "none";
    }
}
lightBoxContainer.addEventListener("click", closeLightBox);