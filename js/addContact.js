let nameContactBook = ["Albert Einstein", "Nikola Tesla", "Isac Newton"];
let emailContactBook = [
  "albert@gmail.com",
  "nikola@gmail.com",
  "isac@gmail.com",
];
let phoneContactBook = ["0176458795", "0658451647", "03894568745"];

loadLocalStorage();

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

      document.getElementById("inputName").value = "";
      document.getElementById("inputEmail").value = "";
      document.getElementById("inputPhone").value = "";
    } else {
      alert("Der Kontakt existiert bereits.");
    }
  }
  saveToLocalStorage();
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
