let categorySet = ["Technical Task", "User Story"];
let selectedCategories = [];
let subtaskArray = [];

let editIndex = [];

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
    <button id="contact_${i}"  onclick="pullContact(${i}, '${randomColorCollection}')" class="listContact">
    <div class="chartAt" ${charStyle}>${contactBook[i].name.charAt(0)}</div>
    <div class="renderNameEmail" >
    <div class="listName">${contactBook[i].name} </div>
    <div class="listEmail">${contactBook[i].email}</div>
    
    </div><input class="box" type="checkbox" id="remember" name="remember">
   </button>`;
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
  <button onclick="editContact(${i})" class="editAndDeletetBtn"><img class="pencilAndTrashImg" src="./assets/img/pencil.png">Edit</button>
  <button onclick="deleteContact(${i})" class="editAndDeletetBtn"><img class="pencilAndTrashImg" src="./assets/img/mulleimer.png">Delete</button>
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
  document.getElementById("upperBody").classList.add("radiusLeft");
  document.getElementById("addContactSlideCard").classList.add("slideOpen");
}

function closeAddContact() {
  document.getElementById("blurContainer").classList.add("d-none");
  document.getElementById("addContactSlideCard").classList.remove("slideOpen");
  document.getElementById("editDeleteSlideCard").classList.remove("slideOpen");
  editIndex = [];
}

function editContact(i) {
  document.getElementById("blurContainer").classList.remove("d-none");
  document.getElementById("upperBodyEditDelete").classList.add("radiusRight");
  document.getElementById("editDeleteSlideCard").classList.add("slideOpen");

  document.getElementById("inputEditName").value = `${contactBook[i].name}`;
  document.getElementById("inputEditEmail").value = `${contactBook[i].email}`;
  document.getElementById("inputEditPhone").value = `${contactBook[i].number}`;

  editIndex.push(i);
}

function saveChanges(event) {
  event.preventDefault();
  let index = editIndex[0];
  contactBook[index].name = document.getElementById("inputEditName").value;
  contactBook[index].email = document.getElementById("inputEditEmail").value;
  contactBook[index].number = document.getElementById("inputEditPhone").value;
  editIndex = [];
  closeAddContact();
}

async function deleteContact() {
  let index = editIndex[0];
  contactBook.splice(index, 1);
  await setItem("contact", JSON.stringify(contactBook));
  init();
}

async function insertContact(event) {
  event.preventDefault();
  let inputEmail = document.getElementById("inputEmail").value;
  let inputPhone = document.getElementById("inputPhone").value;
  let inputName = document.getElementById("inputName").value;

  if (
    !contactBook.some(
      (contact) => contact.email === inputEmail || contact.number === inputPhone
    )
  ) {
    contactBook.push({
      name: inputName,
      email: inputEmail,
      number: inputPhone,
    });

    // contactBook = []; -> Nutzen zum löschen der serverdaten

    await setItem("contact", JSON.stringify(contactBook));
    renderAlphabeticalCategories();
    clearInput();
  } else {
    clearInput();
    alert("Kontakt ist bereits vorhanden");
  }
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

function selectCategory(category) {
  var categoryInput = document.querySelector(".categoryHeader input");
  categoryInput.value = category;
  toggleCategory();
  selectedCategories.push(category);
  categoryInput.value = selectedCategories.join(", ");
}

function technicalUser() {
  let technical = document.getElementById("listTechnical");
  technical.innerHTML = "";

  for (let k = 0; k < categorySet.length; k++) {
    technical.innerHTML += `<div class="select" onclick="selectCategory('${categorySet[k]}')">${categorySet[k]}</div>`;
  }
}

function addContactToSubtask() {
  let contactList = document.getElementById("contactList");
  contactList.innerHTML = "";

  for (let m = 0; m < subtaskArray.length; m++) {
    contactList.innerHTML += `
      <ul class="contactUser">
          <li >
                <span id="contactText_${m}" contenteditable="true"
                  onclick="enableEditing(${m})"
                  onblur="updateSubtask(${m}, this.innerText)"
                  onkeydown="handleKeyPress(event, ${m})">
                  ${subtaskArray[m]}
                </span>
                  <img src="assets/img/delete.png" onclick="deleteToSubtask(${m})">
                  <img src="assets/img/edit.svg" onclick="enableEditing(${m})">
                  <img id="checkImage_${m}" src="assets/img/bestätigung.png" style="display:none;">
          </li>
      </ul>`;
  }
  toggleIcon();
}

function enableEditing(position) {
  let spanElement = document.getElementById(`contactText_${position}`);
  spanElement.focus();
}

function updateSubtask(position, newText) {
  subtaskArray[position] = newText;
}

function handleKeyPress(event, position) {
  if (event.key === "Enter") {
    let checkImage = document.getElementById(`checkImage_${position}`);
    checkImage.style.display = "inline";
  }
}

function subCurrentContact() {
  let taska = document.getElementById("subTaskInput").value;

  if (taska.trim() === "") {
    alert("Bitte ausfüllen.");
    return;
  }
  subtaskArray.push(taska);
  document.getElementById("subTaskInput").value = "";
  addContactToSubtask();
}

function deleteToSubtask(position) {
  subtaskArray.splice(position, 1);
  addContactToSubtask();
}
