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
function editClient(id) {
  editingId = id;
  renderClients();
}

// Save Edit
function saveEdit(id, newName, newEmail, newStatus) {
  const client = clients.find(c => c.id === id);
  client.name = newName;
  client.email = newEmail;
  client.status = newStatus;

  editingId = null;
  saveClients();
  renderClients();
}

// Search filter
searchInput.addEventListener('input', renderClients);

// Render
function renderClients() {
  clientList.innerHTML = '';

  const searchTerm = searchInput.value.toLowerCase();

  let leads = 0;
  let closed = 0;

  clients
    .filter(client =>
      client.name.toLowerCase().includes(searchTerm) ||
      client.email.toLowerCase().includes(searchTerm)
    )
    .forEach(client => {

      if (client.status === 'Lead') leads++;
      if (client.status === 'Closed') closed++;

      const li = document.createElement('li');
      li.className = 'client-item';

      if (editingId === client.id) {
        li.innerHTML = `
          <input value="${client.name}" id="edit-name-${client.id}" />
          <input value="${client.email}" id="edit-email-${client.id}" />
          <select id="edit-status-${client.id}">
            <option ${client.status === 'Lead' ? 'selected' : ''}>Lead</option>
            <option ${client.status === 'In Progress' ? 'selected' : ''}>In Progress</option>
            <option ${client.status === 'Closed' ? 'selected' : ''}>Closed</option>
          </select>
          <button class="save-btn" onclick="saveEdit(
            ${client.id},
            document.getElementById('edit-name-${client.id}').value,
            document.getElementById('edit-email-${client.id}').value,
            document.getElementById('edit-status-${client.id}').value
          )">Save</button>
        `;
      } else {
        li.innerHTML = `
          <div>
            <strong>${client.name}</strong><br>
            <small>${client.email}</small>
          </div>
          <div>
            <span class="status ${client.status}">${client.status}</span>
            <button class="edit-btn" onclick="editClient(${client.id})">Edit</button>
            <button class="delete-btn" onclick="deleteClient(${client.id})">X</button>
          </div>
        `;
      }

      clientList.appendChild(li);
    });

  // Stats
  totalClientsEl.textContent = clients.length;
  totalLeadsEl.textContent = leads;
  totalClosedEl.textContent = closed;
}

// Init
renderClients();
