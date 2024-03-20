users = [];


async function onload() {
  await getRemoteUsers();
  load();
}


async function getRemoteUsers() {
  if(users.length > 1){
    await getItem("users", JSON.stringify(users));
    console.log("Users DATA:", users);
  }
  else(console.log('Keine User angelegt'))
}


async function register() {
  const registerBtn = document.getElementById("registerBtn");

  registerBtn.disabled = true;

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirm-password").value;

  if (password !== confirmPassword) {
    alert("Das Passwort und die Passwortbestätigung stimmen nicht überein.");
    registerBtn.disabled = false;
    return;
  }

  // Kullanıcının daha önce kayıtlı olup olmadığını kontrol et
  const userExists = users.some((user) => user.email === email);

  if (userExists) {
    alert("Diese E-Mail-Adresse wird bereits verwendet.");
    registerBtn.disabled = false;
    return;
  }

  try {
    users.push({
      name: name,
      email: email,
      password: password,
    });
    await setItem("users", JSON.stringify(users));
    createBasicJason(email); //Besim: Funktion in die stelle einfügen wenn der user erstellt wird
    resetForm();
    window.location.href =
      "index.html?msg=Glückwunsch,du hast dich erfolgreich registriert!";
  } catch (error) {
    console.error("Registration error:", error);
  }
}

//Besim: Funktion zum erstellen des Basisarrays mit der spezifischen email. In diesem Array werden alle Infos gepusht(contactbook...)
async function createBasicJason(email) {
  await setItem(`${email}`, JSON.stringify(mainUserInfos));
  console.log(email);
}

function resetForm() {
  document.getElementById("email").value = "";
  document.getElementById("password").value = "";
  document.getElementById("confirm-password").value = "";
  document.getElementById("name").value = "";
  document.getElementById("registerBtn").disabled = false;
}

function guestLegalNotice() {
  window.location.href = "guestLegal.html";
}

function guestPrivacyPolicy() {
  window.location.href = "guestPrivacy.html";
}
