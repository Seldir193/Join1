let contactBook = [];

let letterArray = [];
let randomColorCollection = [];

async function init() {
  loadUsers();
}

async function loadUsers() {
  try {
    contactBook = JSON.parse(await getItem("contact"));
    renderAlphabeticalCategories();
  } catch (e) {
    console.error("Loading error:", e);
  }
}

function renderAlphabeticalCategories() {
  for (let j = 0; j < contactBook.length; j++) {
    let letter = contactBook[j].name.charAt(0).toUpperCase();
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
  for (let i = 0; i < contactBook.length; i++) {
    let letter = contactBook[i].name.charAt(0).toUpperCase();
    let contacts = document.getElementById(letter);
    let randomColor = getRandomColor();
    randomColorCollection.push(randomColor);
    let charStyle = `style="background-color: ${randomColor}"`;
    contacts.innerHTML += `
<<<<<<< HEAD
    <button onclick="pullContact(${i}, '${randomColorCollection}')" class="listContact">
    <div class="chartAt" ${charStyle}>${contactBook[i].name.charAt(0)}</div>
    <div class="renderNameEmail">
    <div class="listName">${contactBook[i].name}</div>
    <div class="listEmail">${contactBook[i].email}</div>
    </div></button>`;
=======
    <button id="contact_${i}" onclick="toggleContactBackground(${i})" onclick="pullContact(${i}, '${randomColorCollection}')" class="listContact">
    <div class="chartAt" ${charStyle}>${nameContactBook[i].charAt(0)}</div>
<<<<<<< HEAD
    <div>
    <div class="listName">${nameContactBook[i]}</div> 
=======
    <div class="renderNameEmail">
    <div class="listName">${nameContactBook[i]}</div>
>>>>>>> 08ab289f14a6bd8aac055dbb7ad750f1e92eeeaf
    <div class="listEmail">${emailContactBook[i]}</div>
    </div><input class="box" type="checkbox" id="remember" name="remember"></button>`;
>>>>>>> 219d9d60afd7386ba2b978ce570ed05516ee6377
  }
}

function pullContact(i) {
  document.getElementById("pullContactToWindow").classList.toggle("pull");
  addHeadlineToPulledWindow(i);
}

function addHeadlineToPulledWindow(i) {
  let contactContainer = document.getElementById("pullContactToWindow");
  contactContainer.innerHTML = `<div class="pulledHeadline">
  <div class="chartAtPulledContact" style="background-color: ${
    randomColorCollection[i]
  }">
  ${contactBook[i].name.charAt(0)}</div>
  <div><h1 class="h1Name">${contactBook[i].name}</h1>
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
     <span style="color:rgb(27, 110, 255)">${contactBook[i].email}</span>
     <h4>Phone</h4>
     <span>${contactBook[i].number}</span></div>`;
}

function addContact() {
  document.getElementById("blurContainer").classList.remove("d-none");
  document.getElementById("addContactSlideCard").classList.add("slideOpen");
}

function closeAddContact() {
  document.getElementById("blurContainer").classList.add("d-none");
  document.getElementById("addContactSlideCard").classList.remove("slideOpen");
}

async function insertContact(event) {
  event.preventDefault();

  contactBook.push({
    name: inputName.value,
    email: inputEmail.value,
    number: inputPhone.value,
  });
  await setItem("contact", JSON.stringify(contactBook));
  clearInput();
}

function clearInput() {
  inputName.value = "";
  inputEmail.value = "";
  inputPhone.value = "";
}

function getRandomColor() {
  let r = Math.floor(Math.random() * 256);
  let g = Math.floor(Math.random() * 256);
  let b = Math.floor(Math.random() * 256);
  let color = "#" + r.toString(16) + g.toString(16) + b.toString(16);
  return color;
}
<<<<<<< HEAD
=======

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





>>>>>>> 219d9d60afd7386ba2b978ce570ed05516ee6377
