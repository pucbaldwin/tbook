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

        const cells = row.split('\t');

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
  const randomIndex = Math.floor(Math.random() * fines.length);
  const selectedFine = fines[randomIndex];
  fineTextElement.textContent = `${selectedFine.person}: ${selectedFine.text}`;
  personImageElement.src = persons[selectedFine.person];
}

generateButton.addEventListener('click', generateRandomFine);

// Fetch data and generate a random fine when the page loads
fetchData().then(generateRandomFine);
