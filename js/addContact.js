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
    contacts.innerHTML += `<div id="${letterArray[n]}" class="category"><div class="letter">${letterArray[n]}</div><div class="line"></div></div>`;
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
    <button onclick="pullContact(${i}, '${randomColorCollection}')" class="listContact">
    <div class="chartAt" ${charStyle}>${contactBook[i].name.charAt(0)}</div>
    <div class="renderNameEmail">
    <div class="listName">${contactBook[i].name}</div>
    <div class="listEmail">${contactBook[i].email}</div>
    </div></button>`;
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
