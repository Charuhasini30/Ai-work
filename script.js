// Handle file upload
document.getElementById('uploadBtn').addEventListener('click', () => {
    const fileInput = document.getElementById('fileInput');
    if (fileInput.files.length > 0) {
        const file = fileInput.files[0];
        const reader = new FileReader();
        reader.onload = function(e) {
            const data = e.target.result;
            processCSVData(data);  // Process the uploaded CSV data
        };
        reader.readAsText(file);
    } else {
        alert('Please select a file.');
    }
});

// Store symptoms dataset globally
let symptomDataset = [];

// Process CSV Data
function processCSVData(data) {
    const rows = data.split("\n");
    rows.forEach(row => {
        const cols = row.split(",");
        if (cols.length > 1) {  // Make sure it's not an empty row
            symptomDataset.push({
                disease: cols[0].toLowerCase().trim(),
                symptoms: cols.slice(1).map(symptom => symptom.toLowerCase().trim())
            });
        }
    });
    alert("File uploaded and data processed.");
}

// Handle diagnosis prediction
document.getElementById('predictBtn').addEventListener('click', () => {
    const symptomsInput = document.getElementById('symptoms').value.trim();
    const symptomsArray = symptomsInput.split(',').map(symptom => symptom.toLowerCase().trim());

    if (symptomsArray.length > 0) {
        const diagnosis = getDiagnosis(symptomsArray);
        document.getElementById('result').textContent = `Diagnosis: ${diagnosis}`;
    } else {
        alert('Please enter some symptoms.');
    }
});

// Get diagnosis based on symptoms
function getDiagnosis(symptomsArray) {
    // If symptoms match common wellness advice
    const adviceResponses = [
        "drink plenty of water", 
        "rest and relax", 
        "get enough sleep",
        "eat healthy food",
        "stay hydrated"
    ];

    // Check if the input contains any advice phrases
    for (const advice of adviceResponses) {
        if (symptomsArray.includes(advice.toLowerCase())) {
            return `Advice: Please ${advice}.`;
        }
    }

    // Search through the dataset for matching diseases
    for (let i = 0; i < symptomDataset.length; i++) {
        const { disease, symptoms } = symptomDataset[i];

        // Check if all entered symptoms are contained in the disease's symptoms list
        if (symptomsArray.every(symptom => symptoms.includes(symptom))) {
            return `Possible Disease: ${disease.charAt(0).toUpperCase() + disease.slice(1)}`;
        }
    }

    // If no matching disease found
    return "drink plenty of water", 
        "rest and relax", 
        "get enough sleep",
        "eat healthy food",
        "stay hydrated";
}

// Toggle Dark Mode
const darkModeToggle = document.getElementById('darkModeToggle');
darkModeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
});
