let nameContactBook = ["Albert Einstein", "Nikola Tesla", "Isac Newton"];
let emailContactBook = [
  "albert@gmail.com",
  "nikola@gmail.com",
  "isac@gmail.com",
];
let phoneContactBook = ["0176458795", "0658451647", "03894568745"];

loadLocalStorage();

function getRandomColor() {
  let r = Math.floor(Math.random() * 256);
  let g = Math.floor(Math.random() * 256);
  let b = Math.floor(Math.random() * 256);
  let color = "#" + r.toString(16) + g.toString(16) + b.toString(16);
  return color;
}

function renderAlphabeticalCategories() {
  let contacts = document.getElementById("listContactContainer");
  contacts.innerHTML = "";

  for (let i = 0; i < nameContactBook.length; i++) {
    let letter = nameContactBook[i].charAt(0).toUpperCase();
    contacts.innerHTML += `<div id="${letter}" class="category"><div class="letter">${letter}</div><div class="line"></div></div>`;
    renderContacts(letter, i);
  }
}

function renderContacts(letter, i) {
  let contacts = document.getElementById(letter);

  let randomColor = getRandomColor();
  let charStyle = `style="background-color: ${randomColor}"`;

  contacts.innerHTML += `
      <div class="listContact">
        <div class="chartAt" ${charStyle}>${nameContactBook[i].charAt(0)}</div>
        <div>
          <div class="listName">${nameContactBook[i]}</div>
          <div class="listEmail">${emailContactBook[i]}</div>
        </div>
      </div>`;
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
      !nameContactBook.includes(inputName) &&
      !emailContactBook.includes(inputEmail) &&
      !phoneContactBook.includes(inputPhone)
    ) {
      nameContactBook.push(inputName);
      emailContactBook.push(inputEmail);
      phoneContactBook.push(inputPhone);
      clearInput();
      saveToLocalStorage();
    } else {
      let popupMessage = document.getElementById("popupMessage");
      popupMessage.textContent = "Der Kontakt ist bereits vorhanden.";
      clearInput();
      openPopup();
      setTimeout(closePopup, 1500);
    }
  }
  renderAlphabeticalCategories();
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
