const fines = [];
const persons = {};

async function fetchData() {
    const response = await fetch('fines.csv');
    const data = await response.text();
    const rows = data.split('\n');

    for (let i = 0; i < rows.length; i++) {
        const row = rows[i].trim();

        if (row === '') {
            continue;
        }

        const cells = row.split(',');

        if (cells.length !== 3) {
            console.log(`Skipping row ${i}: "${row}"`);
            continue;
        }

        const fine = {
            person: cells[0],
            text: cells[1],
        };

        fines.push(fine);

        if (!persons[fine.person]) {
            persons[fine.person] = cells[2];
        }
    }
}

function checkPassword() {
    const password = "finesbook";

    // Check if the user already entered the correct password during this session
    if (sessionStorage.getItem("passwordCorrect") === "true") {
        document.getElementById("content").style.display = "block";
        fetchData().then(generateRandomFine);
        return;
    }

    const inputPassword = prompt("Enter the password to view this page:");

    if (inputPassword === password) {
        // Set the sessionStorage flag to indicate the correct password was entered
        sessionStorage.setItem("passwordCorrect", "true");
        document.getElementById("content").style.display = "block";
        fetchData().then(generateRandomFine);
    } else {
        alert("Incorrect password. Please try again.");
        checkPassword();
    }
}



const fineTextElement = document.getElementById('fine-text');
const personImageElement = document.getElementById('person-image');
const generateButton = document.getElementById('generate-button');

function generateRandomFine() {
    if (fines.length === 0) {
        console.log('No fines available.');
        return;
    }

    const randomIndex = Math.floor(Math.random() * fines.length);
    const selectedFine = fines[randomIndex];

    if (selectedFine && selectedFine.person && persons[selectedFine.person]) {
        fineTextElement.textContent = `${selectedFine.person}: ${selectedFine.text}`;
        personImageElement.src = persons[selectedFine.person];
    } else {
        console.log('Invalid fine data:', selectedFine);
    }
}

generateButton.addEventListener('click', generateRandomFine);

// Fetch data and generate a random fine when the page loads
checkPassword();

