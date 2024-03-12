function loginForm(){
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    let rememberCheckbox = document.getElementById('remember');
    
    if (!email || !password || !rememberCheckbox.checked) {
        console.log('E-Mail und Passwort sind erforderlich.');
        return;
    }
    
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

const urlParams = new URLSearchParams(window.location.search);
const msg = urlParams.get('msg');

if(msg){
    msgBox.innerHTML = msg;
}else {
    console.log('Nachricht ist nicht vorhanden');
}

function load() {
    let userName = localStorage.getItem('name');
    if (userName) {
        displayUserName(userName);
    }
}

function displayUserName(userName) {
    const userNameElement = document.getElementById('user-name');

    if (userNameElement) {
        userNameElement.textContent =`${userName}`;
    }  
}

function save(userName) {
    localStorage.setItem('name', userName);
}

load();

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




