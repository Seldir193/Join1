load();

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

function displayGreeting() {
    const greetingElement = document.getElementById('greeting');

    console.log('Element für die Begrüßung:', greetingElement);

    if (greetingElement) {
        greetingElement.textContent = getGreeting();
       
    } else {
        console.error('Das Begrüßungselement wurde nicht gefunden.');
    }
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

function toggleMenuBar() {
    var menuBar = document.getElementById('menuBar');
    menuBar.style.display = (menuBar.style.display === 'block') ? 'none' : 'block';
}


