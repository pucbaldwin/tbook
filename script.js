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
fetchData().then(generateRandomFine);
