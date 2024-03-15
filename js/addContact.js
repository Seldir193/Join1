let editIndex = [];
let categorySet = ["Technical Task", "User Story"];
let selectedCategories = [];
let subtaskArray = [];
let letterArray = [];
let randomColorCollection = [];

function renderAlphabeticalCategories() {
  for (let j = 0; j < contactBook.length; j++) {
    let letter = contactBook[j].name.charAt(0).toUpperCase();
    if (!letterArray.includes(letter)) {
      letterArray.push(letter);
    }
  }

  let contacts = document.getElementById("listContactContainer");
  contacts.innerHTML = "";
  letterArray = letterArray.slice().sort();

  for (let n = 0; n < letterArray.length; n++) {
    contacts.innerHTML += `<div id="${letterArray[n]}"  class="category"><div class="letter">${letterArray[n]}</div><div class="line"></div></div>`;
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
    let firstName = contactBook[i].name.split(" ")[0].charAt(0).toUpperCase();
    let lastName;
    if (contactBook[i].name.split(" ").length > 1) {
      lastName = contactBook[i].name.split(" ")[1].charAt(0).toUpperCase();
    } else {
      lastName = " ";
    }
    contacts.innerHTML += insertRenderContacts(
      i,
      charStyle,
      firstName,
      lastName
    );
  }
}

function insertRenderContacts(i, charStyle, firstName, lastName) {
  return `
    <button id="contact_${i}" onclick="pullContact(${i},'${randomColorCollection}')" class="listContact">
      <div class="chartAt" ${charStyle}>${firstName}${lastName}</div>
      <div class="renderNameEmail" >
        <div class="listName">${contactBook[i].name} </div>
        <div class="listEmail">${contactBook[i].email}</div>
      </div>
      <input class="box" type="checkbox" id="remember" name="remember">
    </button>`;
}

function pullContact(i) {
  document.getElementById("pullContactToWindow").classList.toggle("pull");
  addHeadlineToPulledWindow(i);
}

function addHeadlineToPulledWindow(i) {
  let contactContainer = document.getElementById("pullContactToWindow");
  let char = getCharAfterEmptySpace(i);
  contactContainer.innerHTML = insertAddHeadlineToPulledWindow(i, char);
  addInformationToPulledWindow(i);
}

function insertAddHeadlineToPulledWindow(i, char) {
  return `
    <div class="responsivHeader">
      <span class="responsivContactInformation">Contact Information</span>
      <img onclick="pullContact(${i})" src="assets/img/arrow-left-line (1).png" alt="Arrow Image">
    </div>
    <div class="pulledHeadline">
      ${char}
      <div>
        <h1 class="h1Name">${contactBook[i].name}</h1>
        <div id="editAndDeletetContainer">
          <button onclick="editContact(${i})" class="editAndDeletetBtn">
            <img class="pencilAndTrashImg" src="./assets/img/pencil.png">
            Edit
          </button>
          <button onclick="deleteContact(${i})" class="editAndDeletetBtn">
            <img class="pencilAndTrashImg" src="./assets/img/mulleimer.png">
            Delete
          </button>
        </div>
      </div>
    </div>`;
}

function addInformationToPulledWindow(i) {
  let contactContainer = document.getElementById("pullContactToWindow");
  contactContainer.innerHTML += `<div class="pulledInformation">
  <h2>Contact Information</h2>
     <h4>Email</h4>
     <span style="color:rgb(27, 110, 255)">${contactBook[i].email}</span>
     <h4>Phone</h4>
     <span>${contactBook[i].number}</span></div>
     <div><div onclick="openResponsivDeleteEdit()" class="responsivDots"><img src="./assets/img/more_vert.png"></div></div>`;
}

function openResponsivDeleteEdit() {
  document.getElementById("editAndDeletetContainer").style.transform =
    "translateX(0%)";
}

function hiddeResponsivDeleteAndEditBtn() {
  let editAndDeleteContainer = document.getElementById(
    "editAndDeletetContainer"
  );
  let currentTransform = window
    .getComputedStyle(editAndDeleteContainer)
    .getPropertyValue("transform");

  if (currentTransform === "matrix(1, 0, 0, 1, 0, 0)") {
    editAndDeleteContainer.style.transform = "translateX(135%)";
  }
}

function addContact() {
  document.getElementById("blurContainer").classList.remove("d-none");
  document.getElementById("upperBody").classList.add("radiusLeft");
  document.getElementById("xBtn").classList.add("closeX");
  document.getElementById("addContactSlideCard").classList.add("slideOpen");
}

function closeAddContact() {
  document.getElementById("blurContainer").classList.add("d-none");
  document.getElementById("addContactSlideCard").classList.remove("slideOpen");
  document
    .getElementById("editDeleteSlideCard")
    .classList.remove("slideOpenEdit");
  editIndex = [];
}

function editContact(i) {
  let userImgLowerBody = document.getElementById("userImgLowerBody");
  let char = getCharAfterEmptySpace(i);
  userImgLowerBody.innerHTML = char;

  document.getElementById("xCloseBtn").classList.add("closeXEdit");
  document.getElementById("blurContainer").classList.remove("d-none");
  document.getElementById("upperBodyEditDelete").classList.add("radiusRight");
  document.getElementById("editDeleteSlideCard").classList.add("slideOpenEdit");

  document.getElementById("inputEditName").value = `${contactBook[i].name}`;
  document.getElementById("inputEditEmail").value = `${contactBook[i].email}`;
  document.getElementById("inputEditPhone").value = `${contactBook[i].number}`;

  renderButtonToEditLowerBody(i);

  editIndex.push(i);
}

function getCharAfterEmptySpace(i) {
  let fullName = contactBook[i].name;
  let firstName = fullName.split(" ")[0];
  let lastName = fullName.split(" ")[1];

  let firstNameCapitalized =
    firstName.charAt(0).toUpperCase() + firstName.slice(1);

  let lastNameCapitalized;
  if (contactBook[i].name.split(" ").length > 1) {
    lastNameCapitalized =
      contactBook[i].name.split(" ")[1].charAt(0).toUpperCase() +
      contactBook[i].name.split(" ")[1].slice(1);
  } else {
    lastNameCapitalized = " ";
  }

  return `<div class="chartAtPulledContact" style="background-color: ${
    randomColorCollection[i]
  }">
    ${firstNameCapitalized.charAt(0)}${lastNameCapitalized.charAt(0)}
  </div>`;
}

function renderButtonToEditLowerBody(i) {
  document.getElementById("editLowerBody").innerHTML = `
  <button id="deleteContactFromEditCard" class="closeAddContactBtn"
  onclick="closeAddContact(); deleteContact(${i})">Delete</button>
  <button id="saveChangesBtn" class="createUserBtn" type="submit">Save ✔</button>`;
}

async function saveChanges(event) {
  event.preventDefault();
  let index = editIndex[0];
  contactBook[index].name = document.getElementById("inputEditName").value;
  firstChar = contactBook[index].name.charAt(0);
  let letterIndex = letterArray.indexOf(firstChar);
  letterArray.splice(letterIndex, 1);

  let capitalizedChangeName = document.getElementById("inputEditName").value;
  capitalizedChangeName =
    capitalizedChangeName.charAt(0).toUpperCase() +
    capitalizedChangeName.slice(1);

  contactBook[index].name = capitalizedChangeName;
  contactBook[index].email = document.getElementById("inputEditEmail").value;
  contactBook[index].number = document.getElementById("inputEditPhone").value;
  await setItem("contact", JSON.stringify(contactBook));
  await loadUsers();
  editIndex = [];

  closeAddContact();
}

async function deleteContact(i) {
  document.getElementById("pullContactToWindow").classList.toggle("pull");
  firstChar = contactBook[i].name.charAt(0);
  let letterIndex = letterArray.indexOf(firstChar);
  contactBook.splice(i, 1);
  letterArray.splice(letterIndex, 1);
  await setItem("contact", JSON.stringify(contactBook));
  closeAddContact();
  await loadUsers();
}

async function insertContact(event) {
  event.preventDefault();
  let inputEmail = document.getElementById("inputEmail").value;
  let inputPhone = document.getElementById("inputPhone").value;
  let inputName = document.getElementById("inputName").value;
  let capitalizedInputName =
    inputName.charAt(0).toUpperCase() + inputName.slice(1);

  if (
    !contactBook.some(
      (contact) => contact.email === inputEmail || contact.number === inputPhone
    )
  ) {
    contactBook.push({
      name: capitalizedInputName,
      email: inputEmail,
      number: inputPhone,
    });

    await setItem("contact", JSON.stringify(contactBook));
    renderAlphabeticalCategories();
    clearInput();
  } else {
    clearInput();
    // alert("Kontakt ist bereits vorhanden");
  }
}

function clearInput() {
  inputName.value = "";
  inputEmail.value = "";
  inputPhone.value = "";
}

function getRandomColor() {
  let color;
  do {
    let r = Math.floor(Math.random() * 256);
    let g = Math.floor(Math.random() * 256);
    let b = Math.floor(Math.random() * 256);
    color =
      "#" +
      r.toString(16).padStart(2, "0") +
      g.toString(16).padStart(2, "0") +
      b.toString(16).padStart(2, "0");
  } while (isWhiteOrGray(color));
  return color;
}

function isWhiteOrGray(color) {
  let r = parseInt(color.substr(1, 2), 16);
  let g = parseInt(color.substr(3, 2), 16);
  let b = parseInt(color.substr(5, 2), 16);

  let brightness = (r * 299 + g * 587 + b * 114) / 1000;
  return brightness > 200;
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
          <li>
                <span id="contactText_${m}" contenteditable="true"
                  onclick="enableEditing(${m})"
                  onblur="updateSubtask(${m}, this.innerText)"
                  onkeydown="handleKeyPress(event, ${m})">
                  ${subtaskArray[m]}
                </span>
                </li>  
                <div class="subPics">
                  <img src="assets/img/delete.png" onclick="deleteToSubtask(${m})">
                  <img src="assets/img/edit.svg" onclick="enableEditing(${m})">
                  <img id="checkImage_${m}" src="assets/img/bestätigung.png" style="display:none;">
                </div>
      </ul>`;
  }
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

function clearCurrentall(position) {
  let titleEnter = document.getElementById("titleEnter");
  titleEnter.value = "";

  let descriptionInput = document.getElementById("descriptionInput");
  descriptionInput.value = "";

  let dateInput = document.getElementById("dateInput");
  dateInput.value = "";

  let listContactContainer = document.getElementById("listContactContainer");
  listContactContainer.innerHTML = "";

  let categoryInput = document.getElementById("categoryInput");
  categoryInput.value = "";

  let contactList = document.getElementById("contactList");
  contactList.innerHTML = "";
  subtaskArray.splice(position);
  addContactToSubtask();
}
