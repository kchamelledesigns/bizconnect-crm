const form = document.getElementById('clientForm');
const clientList = document.getElementById('clientList');
const searchInput = document.getElementById('searchInput');

const totalClientsEl = document.getElementById('totalClients');
const totalLeadsEl = document.getElementById('totalLeads');
const totalClosedEl = document.getElementById('totalClosed');

let clients = JSON.parse(localStorage.getItem('clients')) || [];
let editingId = null;

// Save
function saveClients() {
  localStorage.setItem('clients', JSON.stringify(clients));
}

// Add Client
form.addEventListener('submit', function(e) {
  e.preventDefault();

  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const statusInput = document.getElementById('status');

  // Prevent empty or autofill undefined values
  if (!nameInput.value || !emailInput.value) return;

  const client = {
    id: Date.now(),
    name: nameInput.value,
    email: emailInput.value,
    status: statusInput.value
  };

  clients.push(client);
  saveClients();
  renderClients();
  form.reset();
});

// Delete
function deleteClient(id) {
  clients = clients.filter(client => client.id !== id);
  saveClients();
  renderClients();
}

// Enable Edit
renderClients();
