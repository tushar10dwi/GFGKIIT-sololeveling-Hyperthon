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