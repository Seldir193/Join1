 users = [];

async function register() {
    const registerBtn = document.getElementById('registerBtn');
    
    registerBtn.disabled = true;
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    if (password !== confirmPassword) {
        alert("Das Passwort und die Passwortbestätigung stimmen nicht überein.");
        registerBtn.disabled = false;
        return;
    }
    
    try {
        users.push({
            name: name,
            email: email,
            password: password,
        });
        await setItem('users', JSON.stringify(users));
        resetForm();
        window.location.href = 'index.html?msg=Glückwunsch,du hast dich erfolgreich registriert!';
    } catch (error) {
        console.error('Registration error:', error);
    }
}

function resetForm() {
    document.getElementById('email').value = '';
    document.getElementById('password').value = '';
    document.getElementById('confirm-password').value = '';
    document.getElementById('name').value = '';
    document.getElementById('registerBtn').disabled = false;
}

function showLegalNotice(){
    window.location.href = 'legal.html';
}

function showPrivacyPolicy(){
    window.location.href = 'privacy.html';
}



