let editIndex = [];
let categorySet = ["Technical Task", "User Story"];
let selectedCategories = [];
let subtaskArray = [];
let letterArray = [];
let randomColorCollection = {};
let initialColorMap = {};

function renderAlphabeticalCategories() {
  for (let j = 0; j < mainUserInfos[0].contactBook.length; j++) {
    let letter = mainUserInfos[0].contactBook[j].name.charAt(0).toUpperCase();
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
  for (let i = 0; i < mainUserInfos[0].contactBook.length; i++) {
    let letter = mainUserInfos[0].contactBook[i].name.charAt(0).toUpperCase();
    let contacts = document.getElementById(letter);
    let randomColor = getRandomColorForInitials(
      mainUserInfos[0].contactBook[i].name
    );
    randomColorCollection[i] = randomColor;
    let charStyle = `style="background-color: ${randomColor}"`;
    let firstName = mainUserInfos[0].contactBook[i].name
      .split(" ")[0]
      .charAt(0)
      .toUpperCase();
    let lastName;
    if (mainUserInfos[0].contactBook[i].name.split(" ").length > 1) {
      lastName = mainUserInfos[0].contactBook[i].name
        .split(" ")[1]
        .charAt(0)
        .toUpperCase();
    } else {
      lastName = " ";
    }
    contacts.innerHTML += insertRenderContacts (
      i,
      charStyle,
      firstName,
      lastName
    );
  }
}

function insertRenderContacts(i, charStyle, firstName, lastName) {
  return `
<<<<<<< Updated upstream
    <button id="contact_${i}" onclick="pullContact(${i})" class="listContact">
=======
    <button id="contact_${i}" onclick="toggleContactAndPullContact(${i},'${randomColorCollection}')" class="listContact">
    
>>>>>>> Stashed changes
      <div class="chartAt" ${charStyle}>${firstName}${lastName}</div>
      <div class="renderNameEmail" >
        <div id="lN" class="listName">${mainUserInfos[0].contactBook[i].name} </div>
        <div id="lE" class="listEmail">${mainUserInfos[0].contactBook[i].email}</div>
      </div>
      
      <input class="box" type="checkbox" id="contact_checkbox_${i}" name="contact_checkbox_${i}">
    </button>`;
}

function toggleContactAndPullContact(index) {
pullContact(index);
}

function pullContact(i) {
  document.getElementById("pullContactToWindow").classList.toggle("pull");
  addHeadlineToPulledWindow(i);
  changeHoverColor(i);
}

function changeHoverColor(i) {
  let hoverColor = document.getElementById(`contact_${i}`);
  let originalColor = hoverColor.style.backgroundColor;
  hoverColor.style.backgroundColor = "rgb(0,92,255)";

  let nameElement = document.getElementById(`lN${i}`);
  let emailElement = document.getElementById(`lE${i}`);
  nameElement.style.color = "white";
  emailElement.style.color = "white";

  setTimeout(function () {
    hoverColor.style.backgroundColor = originalColor;
    nameElement.style.color = "";
    emailElement.style.color = "";
  }, 100);
}

function insertRenderContacts(i, charStyle, firstName, lastName) {
  return `
    <button id="contact_${i}" onclick="pullContact(${i})" class="listContact">
      <div class="chartAt" ${charStyle}>${firstName}${lastName}</div>
      <div class="renderNameEmail" >
        <div id="lN${i}" class="listName">${mainUserInfos[0].contactBook[i].name} </div>
        <div id="lE${i}" class="listEmail">${mainUserInfos[0].contactBook[i].email}</div>
      </div>
      <input class="box" type="checkbox" id="remember" name="remember">
    </button>`;
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
        <h1 class="h1Name">${mainUserInfos[0].contactBook[i].name}</h1>
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
     <span style="color:rgb(27, 110, 255)">${mainUserInfos[0].contactBook[i].email}</span>
     <h4>Phone</h4>
     <span>${mainUserInfos[0].contactBook[i].number}</span></div>
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

  document.getElementById(
    "inputEditName"
  ).value = `${mainUserInfos[0].contactBook[i].name}`;
  document.getElementById(
    "inputEditEmail"
  ).value = `${mainUserInfos[0].contactBook[i].email}`;
  document.getElementById(
    "inputEditPhone"
  ).value = `${mainUserInfos[0].contactBook[i].number}`;

  renderButtonToEditLowerBody(i);

  editIndex.push(i);
  transformEditSlideCard();
}

function transformEditSlideCard() {
  // Hintergrundfarbe vorübergehend speichern
  let backgroundColor = document.querySelector(
    "#userImgLowerBody #chartAtPulledContact"
  ).style.backgroundColor;

  if (window.innerWidth <= 768) {
    // Klasse entfernen und neue Klasse hinzufügen
    document
      .querySelector("#userImgLowerBody #chartAtPulledContact")
      .classList.remove("chartAtPulledContact");
    document
      .querySelector("#userImgLowerBody #chartAtPulledContact")
      .classList.add("chartAtPulledContactTransformSlideCard");
  }

  // Hintergrundfarbe wieder anwenden
  document.querySelector(
    "#userImgLowerBody #chartAtPulledContact"
  ).style.backgroundColor = backgroundColor;
}

function getCharAfterEmptySpace(i) {
  let fullName = mainUserInfos[0].contactBook[i].name;
  let firstName = fullName.split(" ")[0];
  // let lastName = fullName.split(" ")[1];

  let firstNameCapitalized =
    firstName.charAt(0).toUpperCase() + firstName.slice(1);

  let lastNameCapitalized;
  if (mainUserInfos[0].contactBook[i].name.split(" ").length > 1) {
    lastNameCapitalized =
      mainUserInfos[0].contactBook[i].name
        .split(" ")[1]
        .charAt(0)
        .toUpperCase() +
      mainUserInfos[0].contactBook[i].name.split(" ")[1].slice(1);
  } else {
    lastNameCapitalized = " ";
  }
  return `<div id="chartAtPulledContact" class="chartAtPulledContact" style="background-color: ${
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
  mainUserInfos[0].contactBook[index].name =
    document.getElementById("inputEditName").value;
  firstChar = mainUserInfos[0].contactBook[index].name.charAt(0);
  let letterIndex = letterArray.indexOf(firstChar);
  letterArray.splice(letterIndex, 1);

  let capitalizedChangeName = document.getElementById("inputEditName").value;
  capitalizedChangeName =
    capitalizedChangeName.charAt(0).toUpperCase() +
    capitalizedChangeName.slice(1);

  mainUserInfos[0].contactBook[index].name = capitalizedChangeName;
  mainUserInfos[0].contactBook[index].email =
    document.getElementById("inputEditEmail").value;
  mainUserInfos[0].contactBook[index].number =
    document.getElementById("inputEditPhone").value;
  await setItem(`${currentUserKey}`, JSON.stringify(mainUserInfos));
  await loadUsers();
  editIndex = [];

  closeAddContact();
}

async function deleteContact(i) {
  document.getElementById("pullContactToWindow").classList.toggle("pull");
  firstChar = mainUserInfos[0].contactBook[i].name.charAt(0);
  let letterIndex = letterArray.indexOf(firstChar);
  mainUserInfos[0].contactBook.splice(i, 1);
  letterArray.splice(letterIndex, 1);
  await setItem(`${currentUserKey}`, JSON.stringify(mainUserInfos));
  closeAddContact();
  await loadUsers();
}

async function insertContact(event) {
  event.preventDefault();
  let inputEmail = document.getElementById("inputEmail").value;
  let inputPhone = document.getElementById("inputPhone").value;
  let inputName = document.getElementById("inputName").value;
  let words = inputName.split(" ");
  let capitalizedInputName = words
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  if (
    !mainUserInfos[0].contactBook.some(
      (contact) => contact.email === inputEmail || contact.number === inputPhone
    )
  ) {
    mainUserInfos[0]["contactBook"].push({
      name: capitalizedInputName,
      email: inputEmail,
      number: inputPhone,
    });

    await setItem(`${currentUserKey}`, JSON.stringify(mainUserInfos)); //Besim: Speichere den Array unter den Key (email)
    init();

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

function getRandomColorForInitials(name) {
  let initials = getInitials(name);
  // Überprüfen, ob bereits eine Farbe für die Initialen vorhanden ist
  if (initialColorMap.hasOwnProperty(initials)) {
    return initialColorMap[initials];
  } else {
    // Generiere eine neue zufällige Farbe
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
    // Speichere die Farbe für die Initialen
    initialColorMap[initials] = color;
    return color;
  }
}

function getInitials(name) {
  let words = name.split(" ");
  let initials = "";
  for (let i = 0; i < words.length; i++) {
    initials += words[i].charAt(0).toUpperCase();
  }
  return initials;
}

function isWhiteOrGray(color) {
  let r = parseInt(color.substr(1, 2), 16);
  let g = parseInt(color.substr(3, 2), 16);
  let b = parseInt(color.substr(5, 2), 16);

  let brightness = (r * 299 + g * 587 + b * 114) / 1000;
  return brightness > 200;
}





<<<<<<< Updated upstream
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
=======

>>>>>>> Stashed changes
