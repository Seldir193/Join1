let currentUserMail;

async function loginForm() {
  let email = document.getElementById("email").value;
  currentUserMail = Array.of(email);
  saveCurrentUserMailToSessionStorage(currentUserMail);
  let password = document.getElementById("password").value;
  const rememberCheckbox = document.getElementById("rememberCheckbox");

  if (!email || !password) {
    console.log("E-Mail und Passwort sind erforderlich.");
    return;
  }
  if (rememberCheckbox.checked) {
    await rememberMe();
  } else {
    clearCredentials();
  }

  let user = users.find((u) => u.email === email && u.password === password);
  proofUser(user, email);
}

function saveCurrentUserMailToSessionStorage(currentUserMail) {
  // Überprüfen, ob sessionStorage unterstützt wird
  if (typeof Storage !== "undefined") {
    // Speichern von currentUserMail in sessionStorage
    sessionStorage.setItem("currentUserMail", JSON.stringify(currentUserMail));
    console.log("currentUserMail erfolgreich in sessionStorage gespeichert.");
  } else {
    console.log("SessionStorage wird in diesem Browser nicht unterstützt.");
  }
}

function getCurrentUserMailFromSessionStorage() {
  // Überprüfen, ob sessionStorage unterstützt wird
  if (typeof Storage !== "undefined") {
    // Versuche, currentUserMail aus sessionStorage abzurufen
    const currentUserMailJSON = sessionStorage.getItem("currentUserMail");
    if (currentUserMailJSON !== null) {
      // Konvertiere den JSON-String zurück in ein JavaScript-Objekt
      const currentUserMail = JSON.parse(currentUserMailJSON);
      console.log("currentUserMail erfolgreich aus sessionStorage abgerufen.");
      return currentUserMail;
    } else {
      console.log(
        "Es wurde keine currentUserMail in der sessionStorage gefunden."
      );
      return null;
    }
  } else {
    console.log("SessionStorage wird in diesem Browser nicht unterstützt.");
    return null;
  }
}

async function proofUser(user, email) {
  if (user) {
    console.log("Benutzer gefunden:", user);
    if (!currentUserKey.includes(email)) {
      currentUserKey.push(email); //Besim: Pushen des aktuellen users der eingetippt wird
      await setItem("currentUserKey", JSON.stringify(currentUserKey)); //Besim: Speichern des aktuellem users in remote
    }

    save(user.name);
    init();

    displayUserName(user.name);
    window.location.href = "summary.html";
  } else {
    console.log("Benutzer nicht gefunden");
    alert("Ungültige E-Mail oder Passwort. Bitte versuchen Sie es erneut.");
  }
  clearRememberCheckbox();
}

async function loadUsersForLogin() {
  users = JSON.parse(await getItem("users"));
  onload();
}

async function clearRememberCheckbox() {
  let rememberCheckbox = document.getElementById("rememberCheckbox");
  let emailInput = document.getElementById("email");
  let passwordInput = document.getElementById("password");

  rememberCheckbox.checked = false;
  emailInput.value = "";
  passwordInput.value = "";
  // "Entfernen Sie die Informationen aus dem Local Storage des 'Remember Me'-Kästchens."
  await clearCredentials();
}

async function clearCredentials() {
  // Löschen der gespeicherten Anmeldeinformationen aus dem Remote-Speicher
  try {
    await setItem("rememberedEmail", "");
    await setItem("rememberedPassword", "");
    console.log("Anmeldeinformationen erfolgreich gelöscht.");

    // Aktualisieren der Anmeldeinformationen im Formular
  } catch (error) {
    console.error("Fehler beim Löschen der Anmeldeinformationen:", error);
  }
}

async function rememberMe() {
  console.log("rememberMe() wird aufgerufen!");

  const rememberCheckbox = document.getElementById("rememberCheckbox");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");

  if (rememberCheckbox && rememberCheckbox.checked) {
    // E-posta adresi değişmişse, sistemde kayıtlı olan e-posta adresine ait şifreyi hatırla
    const rememberedEmail = await getItem("rememberedEmail");
    const rememberedPassword = await getItem("rememberedPassword");
    if (rememberedEmail !== emailInput.value) {
      // E-posta adresi değiştiğinde, sistemde kayıtlı olan e-posta adresine ait şifreyi otomatik olarak doldur
      const user = users.find((u) => u.email === emailInput.value);
      if (user) {
        passwordInput.value = user.password || ""; // Kullanıcıya ait şifreyi doldur veya boşalt
      }
    }
    // Speichern der Anmeldeinformationen und des Checkbox-Status im Remote-Speicher
    try {
      await setItem("rememberedEmail", emailInput.value);
      await setItem("rememberedPassword", passwordInput.value);
      await setItem("rememberCheckbox", true); // Checkbox-Status speichern
      console.log("Anmeldeinformationen erfolgreich gespeichert.");
    } catch (error) {
      console.error("Fehler beim Speichern der Anmeldeinformationen:", error);
    }
  } else {
    // Hatırla kutusu işaretlenmemişse, diğer işlemleri gerçekleştir
    await clearCredentials();
  }
  await loadRememberedCredentials(); // Aktualisieren der Anmeldeinformationen im Formular
}

async function loadRememberedCredentials() {
  try {
    const rememberedEmail = await getItem("rememberedEmail");
    const rememberedPassword = await getItem("rememberedPassword");

    if (rememberedEmail && rememberedPassword) {
      // Setze die Werte der Felder und aktiviere das Kontrollkästchen "Remember me"
      document.getElementById("email").value = rememberedEmail;
      document.getElementById("password").value = rememberedPassword;
      document.getElementById("rememberCheckbox").checked = true;
    }
  } catch (error) {
    console.error(
      "Fehler beim Laden der gespeicherten Anmeldeinformationen:",
      error
    );
  }
}

function displayMessage() {
  const urlParams = new URLSearchParams(window.location.search);
  const msg = urlParams.get("msg");
  const msgBox = document.getElementById("msgBox");

  if (msg) {
    msgBox.innerHTML = msg;
  } else {
    console.log("Nachricht ist nicht vorhanden");
  }
}

function signForm() {
  window.location.href = "signup.html";
}

function guestLegalNotice() {
  window.location.href = "guestLegal.html";
}

function guestPrivacyPolicy() {
  window.location.href = "guestPrivacy.html";
}

function returnToOriginalPage(page) {
  if (page) {
    window.location.href = page;
  } else {
    window.history.back();
  }

  document.getElementById("policyLink").addEventListener("click", function () {
    returnToOriginalPage("privacy.html");
  });

  document.getElementById("legalLink").addEventListener("click", function () {
    returnToOriginalPage("legal.html");
  });

  document.getElementById("helpLink").addEventListener("click", function () {
    returnToOriginalPage("help.html");
  });

  function returnToOriginalPage() {
    history.back();
  }
}
function togglePasswordVisibility() {
  const passwordInput = document.getElementById("password");
  const togglePasswordIcon = document.getElementById("togglePassword");

  if (passwordInput.type === "password") {
    passwordInput.type = "text";
    togglePasswordIcon.src = "assets/img/eye-regular.svg";
  } else {
    passwordInput.type = "password";
    togglePasswordIcon.src = "assets/img/eyecloseregular.svg";
  }
}

function togglePasswordConfirmVisibility() {
  const passwordConfirmInput = document.getElementById("confirm-password");
  const togglePasswordConfirmIcon = document.getElementById(
    "togglePasswordConfirm"
  );

  if (passwordConfirmInput.type === "password") {
    passwordConfirmInput.type = "text";
    togglePasswordConfirmIcon.src = "assets/img/eye-regular.svg";
  } else {
    passwordConfirmInput.type = "password";
    togglePasswordConfirmIcon.src = "assets/img/eyecloseregular.svg";
  }
}

function guestToLogin() {
  const guestUser = { name: "Gast" };
  save(guestUser.name);
  window.location.href = "summary.html";
}
