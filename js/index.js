const loginContainer = document.getElementById("login-container");

document.getElementById("login-btn").addEventListener("click", () => {
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    const usernameError = document.getElementById("username-error");
    const passwordError = document.getElementById("password-error");

    const usernameRegex = /^[a-zA-Z0-9_]{3,15}$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).{4,}$/;

    usernameError.textContent = "";
    passwordError.textContent = "";

    let valid = true;

    if (!usernameRegex.test(username)) {
        usernameError.textContent = "Username non valido (3-15 caratteri, solo lettere/numeri/underscore)";
        valid = false;
    }

    if (!passwordRegex.test(password)) {
        passwordError.textContent = "Password non valida (minimo 4 caratteri, almeno 1 lettera e 1 numero)";
        valid = false;
    }

    if (!valid) return;

    alert("Accesso effettuato con successo!");
    window.location.href = "html/home.html";
});

// Bottone Registrati: sostituisce il contenuto con form di registrazione
document.getElementById("register-btn").addEventListener("click", () => {
    loginContainer.innerHTML = `
        <h2>Registrazione LabTV</h2>
        <input type="text" id="reg-username" placeholder="Username" />
        <p id="reg-username-error" class="error-message"></p>
        <input type="password" id="reg-password" placeholder="Password" />
        <p id="reg-password-error" class="error-message"></p>
        <input type="password" id="reg-password-confirm" placeholder="Conferma Password" />
        <p id="reg-password-confirm-error" class="error-message"></p>
        <button id="submit-register">Registrati</button>
        <button id="back-to-login">Torna al Login</button>
    `;

    // Logica di registrazione
    document.getElementById("submit-register").addEventListener("click", () => {
        const username = document.getElementById("reg-username").value.trim();
        const password = document.getElementById("reg-password").value.trim();
        const confirm = document.getElementById("reg-password-confirm").value.trim();

        const usernameError = document.getElementById("reg-username-error");
        const passwordError = document.getElementById("reg-password-error");
        const confirmError = document.getElementById("reg-password-confirm-error");

        usernameError.textContent = "";
        passwordError.textContent = "";
        confirmError.textContent = "";

        const usernameRegex = /^[a-zA-Z0-9_]{3,15}$/;
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).{4,}$/;

        let valid = true;

        if (!usernameRegex.test(username)) {
            usernameError.textContent = "Username non valido (3-15 caratteri, solo lettere/numeri/underscore)";
            valid = false;
        }
        if (!passwordRegex.test(password)) {
            passwordError.textContent = "Password non valida (minimo 4 caratteri, almeno 1 lettera e 1 numero)";
            valid = false;
        }
        if (password !== confirm) {
            confirmError.textContent = "Le password non corrispondono";
            valid = false;
        }

        if (!valid) return;

        alert("Registrazione effettuata con successo!");
        // Torna al login
        document.getElementById("back-to-login").click();
    });

    // Bottone Torna al login
    document.getElementById("back-to-login").addEventListener("click", () => {
        location.reload(); // ricarica la pagina per tornare al login
    });
});
