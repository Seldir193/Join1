<<<<<<< Updated upstream
function toggleMenuBar() {
  var menuBar = document.getElementById("menuBar");
  menuBar.style.display = menuBar.style.display === "block" ? "none" : "block";
}

=======
>>>>>>> Stashed changes
function toggleBackgroundColor(element) {
  element.classList.toggle("active");
}

<<<<<<< Updated upstream
//Besim: Diese logOut funktion gibt es schon in summary. Brauchen wir diese?
function logOut() {
  window.location.href = "index.html";
}

function showLegalNotice() {
  window.location.href = "legal.html";
}

function showPrivacyPolicy() {
  window.location.href = "privacy.html";
}

function showContact() {
  window.location.href = "contact.html";
}

function showHelp() {
  window.location.href = "help.html";
}

function toggleContactBackground(i) {
  // Das müssen wir noch machen.
=======
function  toggleContactBackground(i){     // Das müssen wir noch machen.
>>>>>>> Stashed changes
  let clickedContact = document.getElementById(`contact_${i}`);
  if (clickedContact) {
    clickedContact.classList.toggle("active");
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

  if (
    listContactContainer.style.display === "none" ||
    listContactContainer.style.display === ""
  ) {
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

  if (
    listTechnical.style.display === "none" ||
    listTechnical.style.display === ""
  ) {
    listTechnical.style.display = "block";
    categoryDropdown.src = "assets/img/arrow_drop_up.png";
    categoryInput.focus();
  } else {
    listTechnical.style.display = "none";
    categoryDropdown.src = "assets/img/arrow_drop_down.png";
  }
}

function datePlan() {
  const today = new Date();
  // Bugünün tarihini ISO formatına dönüştür (YYYY-MM-DD)
  const todayISO = today.toISOString().split("T")[0];

  // Due input elementini seç
  const dueInput = document.getElementById("dateInput");
  // Minimum tarih olarak bugünün tarihini (todayISO) belirle
  dueInput.min = todayISO;
}

function pullContact(i) {
  document.getElementById("listContactContainer").classList.toggle("pull");
}
<<<<<<< Updated upstream
=======

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









>>>>>>> Stashed changes
