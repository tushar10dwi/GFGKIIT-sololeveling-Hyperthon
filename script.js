const appliances = []; // Array to store appliance objects
let totalEnergy = 0;
let totalCost = 0;

function addAppliance() {
const applianceName = document.getElementById('appliance').value;
const power = parseFloat(document.getElementById('power').value);
const hours = parseFloat(document.getElementById('hours').value);
const costPerKWh = parseFloat(document.getElementById('cost').value);

if (!applianceName || power <= 0 || hours <= 0) {
alert('Please enter valid inputs.');
return;
}

// Create an object to represent the appliance
const appliance = {
name: applianceName,
power, // Watts
hours, // Hours per day
energy: (power * hours) / 1000, // Energy in kWh
cost: ((power * hours) / 1000) * costPerKWh, // Cost in ₹
};

// Update totals
totalEnergy += appliance.energy;
totalCost += appliance.cost;

// Add appliance to the array
appliances.push(appliance);

// Update the UI
updateTotals();
updateApplianceList();
initializeChart();
updateChart(appliances);

// Clear form
document.getElementById('energy-form').reset();
}

function updateTotals() {
document.getElementById('energy-output').textContent = totalEnergy.toFixed(2);
document.getElementById('cost-output').textContent = `₹${totalCost.toFixed(2)}`;
}

function updateApplianceList() {
const listContainer = document.getElementById('appliance-list');
listContainer.innerHTML = ''; // Clear previous entries

appliances.forEach((appliance, index) => {
const row = document.createElement('tr');

row.innerHTML = `
    <td>${index + 1}</td>
    <td>${appliance.name}</td>
    <td>${appliance.power} W</td>
    <td>${appliance.hours} hrs</td>
    <td>${appliance.energy.toFixed(2)} kWh</td>
    <td>₹${appliance.cost.toFixed(2)}</td>
`;

listContainer.appendChild(row);
});
}

let energyChart;

function initializeChart() {
    const ctx = document.getElementById('energyChart').getContext('2d');
    energyChart = new Chart(ctx, {
        type: 'bar', // Chart type (bar, line, pie, etc.)
        data: {
            labels: [], // Labels for the x-axis (e.g., appliance names)
            datasets: [
                {
                    label: 'Energy Consumption (kWh)',
                    data: [], // Data for the y-axis (e.g., energy values)
                    backgroundColor: 'rgba(75, 192, 192, 0.6)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1,
                },
            ],
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                },
            },
        },
    });
}

function updateChart(appliances) {
    // Update chart labels and data
    energyChart.data.labels = appliances.map((appliance) => appliance.name);
    energyChart.data.datasets[0].data = appliances.map((appliance) => appliance.energy);
    console.log(energyChart.data.labels); // Should display an array of labels
    console.log(energyChart.data.datasets[0].data); // Should display an array of numbers



    // Refresh the chart to display updated data
    energyChart.update();
}
