async function loading() {
  init();
  includeHTML(); 
  load(); 
}

function toggleBackgroundColor(element) {
  element.classList.toggle("active");
}

function toggleContactBackground(i) {
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
  const todayISO = today.toISOString().split("T")[0];
  const dueInput = document.getElementById("dateInput");
  dueInput.min = todayISO;
}

function pullContact(i) {
  document.getElementById("listContactContainer").classList.toggle("pull");
}

