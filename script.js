// =================================
// Password Strength Checker
// =================================

// Toggle Password Visibility
function togglePassword() {
    let passwordInput = document.getElementById("password");

    if (passwordInput.type === "password") {
        passwordInput.type = "text";
    } else {
        passwordInput.type = "password";
    }
}


// Check Repeated Pattern
function checkRepeatedPattern(password) {

    if (/^(.)\1+$/.test(password)) {
        return true;
    }

    for (let i = 1; i <= password.length / 2; i++) {
        let pattern = password.substring(0, i);

        if (password === pattern.repeat(password.length / i)) {
            return true;
        }
    }

    return false;
}


// Check Password Strength
function checkPassword() {

    let password = document.getElementById("password").value;

    let score = 0;
    let suggestions = [];

    if (password.length === 0) {
        document.getElementById("result").innerHTML =
            "Please enter a password";

        document.getElementById("suggestions").innerHTML = "";
        return;
    }

    if (password.length >= 8) {
        score += 20;
    } else {
        suggestions.push("Use at least 8 characters.");
    }

    if (/[A-Z]/.test(password)) {
        score += 20;
    } else {
        suggestions.push("Add an uppercase letter.");
    }

    if (/[a-z]/.test(password)) {
        score += 20;
    } else {
        suggestions.push("Add a lowercase letter.");
    }

    if (/[0-9]/.test(password)) {
        score += 20;
    } else {
        suggestions.push("Add a number.");
    }

    if (/[^A-Za-z0-9]/.test(password)) {
        score += 20;
    } else {
        suggestions.push("Add a special character.");
    }

    if (checkRepeatedPattern(password)) {
        score -= 20;
        suggestions.push("Avoid repeated characters or patterns.");
    }

    if (score < 0) {
        score = 0;
    }

    let result = document.getElementById("result");

    if (score <= 40) {
        result.innerHTML = "Password Strength: Weak (" + score + "%)";
    }
    else if (score <= 70) {
        result.innerHTML = "Password Strength: Medium (" + score + "%)";
    }
    else {
        result.innerHTML = "Password Strength: Strong (" + score + "%)";
    }

    if (suggestions.length > 0) {
        document.getElementById("suggestions").innerHTML =
            "<h3>Suggestions:</h3><ul><li>" +
            suggestions.join("</li><li>") +
            "</li></ul>";
    } else {
        document.getElementById("suggestions").innerHTML =
            "Your password meets all requirements!";
    }
}


// Update Password Requirements Automatically
document.getElementById("password").addEventListener("input", function () {

    let password = this.value;

    let requirements = [
        {
            id: "length",
            condition: password.length >= 8,
            text: "At least 8 characters"
        },
        {
            id: "uppercase",
            condition: /[A-Z]/.test(password),
            text: "Uppercase letter"
        },
        {
            id: "lowercase",
            condition: /[a-z]/.test(password),
            text: "Lowercase letter"
        },
        {
            id: "number",
            condition: /[0-9]/.test(password),
            text: "Number"
        },
        {
            id: "special",
            condition: /[^A-Za-z0-9]/.test(password),
            text: "Special character"
        }
    ];

    requirements.forEach(function (item) {

        let element = document.getElementById(item.id);

        if (item.condition) {
            element.innerHTML = "✓ " + item.text;
            element.className = "valid";
        } else {
            element.innerHTML = "✗ " + item.text;
            element.className = "invalid";
        }

    });

});


// Reset Password
function resetPassword() {

    document.getElementById("password").value = "";

    document.getElementById("password").type = "password";

    document.getElementById("result").innerHTML = "";

    document.getElementById("suggestions").innerHTML = "";

    let requirements = [
        ["length", "At least 8 characters"],
        ["uppercase", "Uppercase letter"],
        ["lowercase", "Lowercase letter"],
        ["number", "Number"],
        ["special", "Special character"]
    ];

    requirements.forEach(function (item) {

        let element = document.getElementById(item[0]);

        element.innerHTML = "✗ " + item[1];
        element.className = "invalid";

    });

}


// =================================
// Strong Password Generator
// =================================


// Update Password Length
function updateLength() {

    let length = document.getElementById("passwordLength").value;

    document.getElementById("lengthValue").innerHTML = length;

}


// Generate Secure Random Number
function randomNumber(max) {

    let array = new Uint32Array(1);

    let limit = Math.floor(4294967296 / max) * max;

    do {
        window.crypto.getRandomValues(array);
    } while (array[0] >= limit);

    return array[0] % max;

}


// Generate Strong Password
function generatePassword() {

    if (!window.crypto || !window.crypto.getRandomValues) {

        alert("Secure password generation is not supported in this browser.");
        return;

    }

    let length = Number(document.getElementById("passwordLength").value);

    let uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let lowercase = "abcdefghijklmnopqrstuvwxyz";
    let numbers = "0123456789";
    let special = "!@#$%^&*()_+-=[]{}?";

    let allCharacters = uppercase + lowercase + numbers + special;

    let password = [];

    // Add at least one character from each group

    password.push(uppercase[randomNumber(uppercase.length)]);
    password.push(lowercase[randomNumber(lowercase.length)]);
    password.push(numbers[randomNumber(numbers.length)]);
    password.push(special[randomNumber(special.length)]);


    // Add remaining random characters

    for (let i = 4; i < length; i++) {

        password.push(allCharacters[randomNumber(allCharacters.length)]);

    }


    // Shuffle Password Characters

    for (let i = password.length - 1; i > 0; i--) {

        let j = randomNumber(i + 1);

        let temp = password[i];

        password[i] = password[j];

        password[j] = temp;

    }


    // Display Generated Password

    document.getElementById("generatedPassword").value = password.join("");

}


// Copy Generated Password
// Copy Generated Password
async function copyPassword() {

    let input = document.getElementById("generatedPassword");
    let password = input.value;

    if (password.length === 0) {
        alert("Please generate a password first.");
        return;
    }

    try {

        await navigator.clipboard.writeText(password);

        input.value = "";
        alert("Password copied successfully!");

    }

    catch (error) {

        input.select();

        let copied = document.execCommand("copy");

        if (copied) {

            input.value = "";
            alert("Password copied successfully!");

        } else {

            alert("Unable to copy password. Please copy it manually.");

        }

    }

}

function toggleGenerator() {
    let panel = document.getElementById("generatorPanel");

    if (panel.style.display === "none") {
        panel.style.display = "block";
    } else {
        panel.style.display = "none";
    }
}
