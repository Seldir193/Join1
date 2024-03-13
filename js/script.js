function loginForm(){
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    const rememberCheckbox = document.getElementById('rememberCheckbox');
    
    if (!email || !password || !rememberCheckbox.checked) {
        console.log('E-Mail und Passwort sind erforderlich.');
        return;
    }
    
    rememberMe();
    
    let user = users.find(u => u.email === email && u.password === password);

    if (user) {
        console.log('Benutzer gefunden:', user);
        save(user.name); 
        displayUserName(user.name);
        window.location.href = 'summary.html';
    } else {
        console.log('Benutzer nicht gefunden');
    }
}

async function clearCredentials() {
    // Löschen der gespeicherten Anmeldeinformationen aus dem Remote-Speicher
    try {
        await setItem('rememberedEmail', '');
        await setItem('rememberedPassword', '');
        console.log('Anmeldeinformationen erfolgreich gelöscht.');
        loadRememberedCredentials(); // Aktualisieren der Anmeldeinformationen im Formular
    } catch (error) {
        console.error('Fehler beim Löschen der Anmeldeinformationen:', error);
    }
}

async function rememberMe() {
    console.log('rememberMe() wird aufgerufen!');
    
    const rememberCheckbox = document.getElementById('rememberCheckbox');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
  
    if (rememberCheckbox && rememberCheckbox.checked) {
        // Speichern der Anmeldeinformationen und des Checkbox-Status im Remote-Speicher
        try {
            await setItem('rememberedEmail', emailInput.value);
            await setItem('rememberedPassword', passwordInput.value);
            await setItem('rememberCheckbox', true); // Checkbox-Status speichern
            console.log('Anmeldeinformationen erfolgreich gespeichert.');
        } catch (error) {
            console.error('Fehler beim Speichern der Anmeldeinformationen:', error);
        }
    } else {
        // Löschen der Anmeldeinformationen und des Checkbox-Status im Remote-Speicher
        await clearCredentials();
    }
  
    await loadRememberedCredentials(); // Aktualisieren der Anmeldeinformationen im Formular
}

async function loadRememberedCredentials() {
    try {
        const rememberedEmail = await getItem('rememberedEmail');
        const rememberedPassword = await getItem('rememberedPassword');

        if (rememberedEmail && rememberedPassword) {
            // Setze die Werte der Felder und aktiviere das Kontrollkästchen "Remember me"
            document.getElementById('email').value = rememberedEmail;
            document.getElementById('password').value = rememberedPassword;
            document.getElementById('rememberCheckbox').checked = true;
        }
    } catch (error) {
        console.error('Fehler beim Laden der gespeicherten Anmeldeinformationen:', error);
    }
}

async function save(userName) {
    try {
        await setItem('name', userName);
        console.log('Benutzername erfolgreich im Remote-Speicher gespeichert.');
    } catch (error) {
        console.error('Fehler beim Speichern des Benutzernamens im Remote-Speicher:', error);
    }
}

async function load() {
    try {
        let userName = await getItem('name');
        if (userName) {
            displayUserName(userName);
            displayUserProfile(userName);
        }
    } catch (error) {
        console.error('Fehler beim Laden des Benutzernamens aus dem Remote-Speicher:', error);
    }
}
load();

const urlParams = new URLSearchParams(window.location.search);
const msg = urlParams.get('msg');

if(msg){
    msgBox.innerHTML = msg;
}else {
    console.log('Nachricht ist nicht vorhanden');
}

function displayUserName(userName) {
    const userNameElement = document.getElementById('user-name');
    if (userNameElement ) {
        userNameElement.textContent = `${userName}`;
    }  
}

function displayUserProfile(userName) {
    console.log('displayUserProfile wird aufgerufen');
    const userInitialElement = document.getElementById('userInitial');

    if (userInitialElement && userName) {
        // Teile den Benutzernamen in Vorname und Nachname auf
        const nameParts = userName.split(' ');
        let initials = '';
        // Füge den ersten Buchstaben des Vornamens und des Nachnamens zu den Initialen hinzu
        nameParts.forEach(part => {
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

    console.log('Aktuelle Stunde:', currentHour);

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

function displayGreeting() {
    const greetingElement = document.getElementById('greeting');

    console.log('Element für die Begrüßung:', greetingElement);

    if (greetingElement) {
        greetingElement.textContent = getGreeting();
       
    } else {
        console.error('Das Begrüßungselement wurde nicht gefunden.');
    }
}

displayGreeting();

function togglePasswordVisibility() {
    const passwordInput = document.getElementById('password');
    const togglePasswordIcon = document.getElementById('togglePassword');

    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        togglePasswordIcon.src = 'assets/img/eye-regular.svg';
     
    } else {
        passwordInput.type = 'password';
        togglePasswordIcon.src = 'assets/img/eyecloseregular.svg'; 
    }
}

function togglePasswordConfirmVisibility() {
    const passwordConfirmInput = document.getElementById('confirm-password');
    const togglePasswordConfirmIcon = document.getElementById('togglePasswordConfirm');

    if (passwordConfirmInput.type === 'password') {
        passwordConfirmInput.type = 'text';
        togglePasswordConfirmIcon.src = 'assets/img/eye-regular.svg';
     
    } else {
        passwordConfirmInput.type = 'password';
        togglePasswordConfirmIcon.src = 'assets/img/eyecloseregular.svg'; 
    }
}

function redirectToSignUp() {                                  
    window.location.href = 'summary.html';
}
 function guestToLogin(){   
    save('');                               
    window.location.href = 'summary.html'; 
 }

function toggleMenuBar() {
    var menuBar = document.getElementById('menuBar');
    menuBar.style.display = (menuBar.style.display === 'block') ? 'none' : 'block';
}

function signForm(){
    window.location.href = 'signup.html';
}

function logOut(){
    window.location.href = 'index.html';
}

function showLegalNotice(){
    window.location.href = 'legal.html';
}

function showPrivacyPolicy(){
    window.location.href = 'privacy.html';
}

function showHelp(){
    window.location.href = 'help.html';
}