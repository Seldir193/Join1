let users = [{
     'email':  'selcuk.80@outlook.de',
     'password': 'asd123'
}
];

function addUser(){
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    users.push({email: email.value, password: password.value});

    window.location.href = 'index.html?msg= Du hast dich erfolgreich registriert';
}




function redirectToSignUp() {
    window.location.href = 'summary.html';
    // Weitere benutzerdefinierte Logik hier...
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










                    
                   