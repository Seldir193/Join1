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

function toggleIcon() {
    var listContactContainer = document.getElementById("listContactContainer");
    var icon = document.getElementById("icon");
  
    if (listContactContainer.style.display === "none") {
      listContactContainer.style.display = "block";
      icon.src = "assets/img/arrow_drop_up.png"; 
    } else {
      listContactContainer.style.display = "none";
      icon.src = "assets/img/arrow_drop_down.png"; 
    }
  }

  function toggleContactBackground(i) {
    let clickedContact = document.getElementById(`contact_${i}`);
    if (clickedContact) {
      clickedContact.classList.toggle('active');
    }
  }

  


 

  