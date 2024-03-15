
function toggleMenuBar() {
    var menuBar = document.getElementById('menuBar');
    menuBar.style.display = (menuBar.style.display === 'block') ? 'none' : 'block';
}

function toggleBackgroundColor(element) {
    element.classList.toggle('active');
}

function logOut(){
    window.location.href = 'index.html';
}

function showLegalNotice(){
  window.location.href = 'legal.html';
}

function showPrivacyPolicy(){
  window.location.href = 'privacy.html';
}


function showContact(){
  window.location.href = 'contact.html';
}

function showHelp(){
  window.location.href = 'help.html';
}

function  toggleContactBackground(i){     // Das müssen wir noch machen.
  let clickedContact = document.getElementById(`contact_${i}`);
  if (clickedContact) {
    clickedContact.classList.toggle('active');
  }
}

function toggleContactAndPullContact(index) {
  toggleContactBackground(index);
}

function toggleIcon() {
  var listContactContainer = document.getElementById("listContactContainer");
  var listTechnical = document.getElementById("listTechnical");
  var icon = document.getElementById("icon");

  listTechnical.style.display = "none";

  if (listContactContainer.style.display === "none" || listContactContainer.style.display === "") {
    listContactContainer.style.display = "block";
    icon.src = "assets/img/arrow_drop_up.png";
  } else {
    listContactContainer.style.display = "none";
    icon.src = "assets/img/arrow_drop_down.png";
  }
}

function toggleCategory() {
  var listTechnical = document.getElementById("listTechnical");
  var categoryDropdown = document.getElementById("categoryDropdown");
  
  if (listTechnical.style.display === "none" || listTechnical.style.display === "") {
    listTechnical.style.display = "block";
    categoryDropdown.src = "assets/img/arrow_drop_up.png"; 
    categoryInput.focus();
  } else {
    listTechnical.style.display = "none";
    categoryDropdown.src = "assets/img/arrow_drop_down.png"; 
  }
}

function datePlan(){
const today = new Date();
// Bugünün tarihini ISO formatına dönüştür (YYYY-MM-DD)
const todayISO = today.toISOString().split('T')[0];

// Due input elementini seç
const dueInput = document.getElementById('dateInput');
// Minimum tarih olarak bugünün tarihini (todayISO) belirle
dueInput.min = todayISO;

}

function pullContact(i) {
  document.getElementById("listContactContainer").classList.toggle("pull");
}

