let nameContactBook = ["Albert Einstein", "Nikola Tesla", "Isac Newton"];
let emailContactBook = [
  "albert@gmail.com",
  "nikola@gmail.com",
  "isac@gmail.com",
];
let phoneContactBook = ["0176458795", "0658451647", "03894568745"];

let letterArray = [];
let randomColorCollection = [];

loadLocalStorage();

function getRandomColor() {
  let r = Math.floor(Math.random() * 256);
  let g = Math.floor(Math.random() * 256);
  let b = Math.floor(Math.random() * 256);
  let color = "#" + r.toString(16) + g.toString(16) + b.toString(16);
  return color;
}

function renderAlphabeticalCategories() {
  for (let j = 0; j < nameContactBook.length; j++) {
    let letter = nameContactBook[j].charAt(0).toUpperCase();
    if (!letterArray.includes(letter)) {
      letterArray.push(letter);
    }
  }

  let contacts = document.getElementById("listContactContainer");
  contacts.innerHTML = "";

  for (let n = 0; n < letterArray.length; n++) {
    contacts.innerHTML += `<div id="${letterArray[n]}" class="category"></div>  <div class="letter">${letterArray[n]}</div><div class="line"></div>`;

  }
  renderContacts();
}

function renderContacts() {
  for (let i = 0; i < nameContactBook.length; i++) {
    let letter = nameContactBook[i].charAt(0).toUpperCase();
    let contacts = document.getElementById(letter);
    let randomColor = getRandomColor();
    randomColorCollection.push(randomColor);
    let charStyle = `style="background-color: ${randomColor}"`;
    contacts.innerHTML += `
    <button id="contact_${i}" onclick="toggleContactBackground(${i})" onclick="pullContact(${i}, '${randomColorCollection}')" class="listContact">
    <div class="chartAt" ${charStyle}>${nameContactBook[i].charAt(0)}</div>
    <div>
    <div class="listName">${nameContactBook[i]}</div> 
    <div class="listEmail">${emailContactBook[i]}</div>
    </div><input class="box" type="checkbox" id="remember" name="remember"></button>`;
  }
}

function pullContact(i) {
  document.getElementById("pullContactToWindow").classList.toggle("pull");
  addHeadlineToPulledWindow(i);
}

function addHeadlineToPulledWindow(i) {
  let contactContainer = document.getElementById("pullContactToWindow");
  contactContainer.innerHTML = `<div class="pulledHeadline">
  <div class="chartAt" style="background-color: ${randomColorCollection[i]}">
  ${nameContactBook[i].charAt(0)}</div>
  <div><h1 class="h1Name">${nameContactBook[i]}</h1>
  <div class="editAndDeletetContainer">
  <button onclick="editContact()" class="editAndDeletetBtn"><img class="pencilAndTrashImg" src="./assets/img/pencil.png">Edit</button>
  <button onclick="deleteContact()" class="editAndDeletetBtn"><img class="pencilAndTrashImg" src="./assets/img/mulleimer.png">Delete</button>
  </div></div>`;
  addInformationToPulledWindow(i);
}

function addInformationToPulledWindow(i) {
  let contactContainer = document.getElementById("pullContactToWindow");
  contactContainer.innerHTML += `<div class="pulledInformation">
  <h2>Contact Information</h2>
     <h4>Email</h4>
     <span style="color:rgb(27, 110, 255)">${emailContactBook[i]}</span>
     <h4>Phone</h4>
     <span>${phoneContactBook[i]}</span></div>`;
}

function addContact() {
  document.getElementById("blurContainer").classList.remove("d-none");
  document.getElementById("addContactSlideCard").classList.add("slideOpen");
}

function closeAddContact() {
  document.getElementById("blurContainer").classList.add("d-none");
  document.getElementById("addContactSlideCard").classList.remove("slideOpen");
}

function insertContact(event) {
  event.preventDefault();
  let inputName = document.getElementById("inputName").value;
  let inputEmail = document.getElementById("inputEmail").value;
  let inputPhone = document.getElementById("inputPhone").value;

  if (inputName && inputEmail && inputPhone) {
    if (
      !emailContactBook.includes(inputEmail) &&
      !phoneContactBook.includes(inputPhone)
    ) {
      nameContactBook.push(inputName);
      emailContactBook.push(inputEmail);
      phoneContactBook.push(inputPhone);
      clearInput();
      saveToLocalStorage();
      renderAlphabeticalCategories();
    } else {
      let popupMessage = document.getElementById("popupMessage");
      popupMessage.textContent = "The contact already exists!";
      clearInput();
      openPopup();
      setTimeout(closePopup, 1500);
    }
  }
}

function clearInput() {
  document.getElementById("inputName").value = "";
  document.getElementById("inputEmail").value = "";
  document.getElementById("inputPhone").value = "";
}

function openPopup() {
  document.getElementById("popup").style.display = "block";
}

function closePopup() {
  document.getElementById("popup").style.display = "none";
}

function saveToLocalStorage() {
  let nameSave = JSON.stringify(nameContactBook);
  let emailSave = JSON.stringify(emailContactBook);
  let phoneSave = JSON.stringify(phoneContactBook);
  localStorage.setItem(`nameContactBook`, nameSave);
  localStorage.setItem(`emailContactBook`, emailSave);
  localStorage.setItem(`phoneContactBook`, phoneSave);
}

function loadLocalStorage() {
  let nameSave = localStorage.getItem(`nameContactBook`);
  let emailSave = localStorage.getItem(`emailContactBook`);
  let phoneSave = localStorage.getItem(`phoneContactBook`);

  if (nameSave && emailSave && phoneSave) {
    nameContactBook = JSON.parse(nameSave);
    emailContactBook = JSON.parse(emailSave);
    phoneContactBook = JSON.parse(phoneSave);
  }
}

document.addEventListener("DOMContentLoaded", function () {
  renderAlphabeticalCategories();
});





