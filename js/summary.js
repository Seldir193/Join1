async function loading() {
  await init();
  includeHTML();
  // load();
  displayGreeting();
  displayUserName(); //Besim: Funktio aufrufen
  displayUserProfile(); //Besim: Funktio aufrufen
}

function displayUserName() {
  //Besim: userName entfernt
  let userNameElement = document.getElementById("user-name");
  let index = users.findIndex((user) => user.email === currentUserMail[0]);
  let name = users[index].name;
  if (userNameElement) {
    userNameElement.textContent = `${name}`; //Besim: Eränzung des Pfades zum aktuelle nutzers
  }
}

function displayUserProfile(userName) {
  console.log("displayUserProfile wird aufgerufen");
  const userInitialElement = document.getElementById("userInitial");

  if (userInitialElement && currentUserMail[0]) {
    //Besim: userName entfernt
    // Teile den Benutzernamen in Vorname und Nachname auf
    const nameParts = currentUserMail[0].split(" "); //Besim: userName entfernt
    let initials = "";
    // Füge den ersten Buchstaben des Vornamens und des Nachnamens zu den Initialen hinzu
    nameParts.forEach((part) => {
      if (part.length > 0) {
        initials += part[0];
      }
    });
    // Konvertiere die Initialen in Großbuchstaben und zeige sie im HTML-Element an
    userInitialElement.textContent = initials.toUpperCase();
  }
}

function getGreeting() {
  const currentDate = new Date();
  const currentHour = currentDate.getHours();
  console.log("Aktuelle Stunde:", currentHour);
  if (currentHour >= 5 && currentHour < 12) {
    return "Good morning,";
  } else if (currentHour >= 12 && currentHour < 18) {
    return "Good afternoon,";
  } else if (currentHour >= 18 && currentHour < 24) {
    return "Good evening,";
  } else {
    return "Good night,";
  }
}

async function save(userName) {
  try {
    await setItem("name", userName);
    console.log("Benutzername erfolgreich im Remote-Speicher gespeichert.");
  } catch (error) {
    console.error(
      "Fehler beim Speichern des Benutzernamens im Remote-Speicher:",
      error
    );
  }
}

function displayGreeting() {
  const greetingElement = document.getElementById("greeting");

  console.log("Element für die Begrüßung:", greetingElement);

  if (greetingElement) {
    greetingElement.textContent = getGreeting();
  } else {
    console.error("Das Begrüßungselement wurde nicht gefunden.");
  }
}

async function logOut() {
  currentUserKey = []; //Besim: Aktuellen user in currentUserKey löschen
  await setItem("currentUserKey", JSON.stringify(currentUserKey)); //Besim: Leeren currentUser
  init();
  window.location.href = "index.html";
}

function showLegalNotice() {
  window.location.href = "legal.html";
}

function showPrivacyPolicy() {
  window.location.href = "privacy.html";
}

function showHelp() {
  window.location.href = "help.html";
}

function toggleMenuBar() {
  var menuBar = document.getElementById("menuBar");
  menuBar.classList.toggle("show");
}
