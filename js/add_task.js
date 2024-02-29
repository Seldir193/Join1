function toggleMenuBar() {
    var menuBar = document.getElementById('menuBar');
    menuBar.style.display = (menuBar.style.display === 'block') ? 'none' : 'block';
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


       
document.addEventListener('DOMContentLoaded', function () {
    const contactInput = document.getElementById('contactInput');
    const contactDropdown = document.getElementById('contactDropdown');
    
    // Dummy hinzugefügte Kontakte (kann durch deine Daten ersetzt werden)
    const addedContacts = ['John Doe', 'Jane Smith', 'Alice Johnson'];

    // Füge hinzugefügte Kontakte in das Dropdown-Menü ein
    addedContacts.forEach(contact => {
        const contactItem = document.createElement('div');
        contactItem.classList.add('contact-dropdown-item');
        contactItem.textContent = contact;
        contactItem.addEventListener('click', () => selectContact(contact));
        contactDropdown.appendChild(contactItem);
        
    });

    // Event Listener für das Input-Feld
    contactInput.addEventListener('focus', showContactDropdown);
    contactInput.addEventListener('blur', hideContactDropdown);

    // Funktion zum Anzeigen des Dropdown-Menüs
    function showContactDropdown() {
        contactDropdown.style.display = 'block';
    }

    // Funktion zum Ausblenden des Dropdown-Menüs
    function hideContactDropdown() {
        // Verzögere das Ausblenden, um Klicks auf das Dropdown-Menü zu ermöglichen
        setTimeout(() => {
            contactDropdown.style.display = 'none';
        }, 200);
    }

    // Funktion zum Auswählen eines Kontakts
    function selectContact(contact) {
        contactInput.value = contact;
        hideContactDropdown();
    }
});