const form = document.getElementById('clientForm');
const clientList = document.getElementById('clientList');

const totalClientsEl = document.getElementById('totalClients');
const totalLeadsEl = document.getElementById('totalLeads');
const totalClosedEl = document.getElementById('totalClosed');

let clients = JSON.parse(localStorage.getItem('clients')) || [];

// Save to localStorage
function saveClients() {
  localStorage.setItem('clients', JSON.stringify(clients));
}

// Add Client
form.addEventListener('submit', function(e) {
  e.preventDefault();

  const client = {
    id: Date.now(),
    name: name.value,
    email: email.value,
    status: status.value
  };

  clients.push(client);
  saveClients();
  renderClients();
  form.reset();
});

// Delete Client
function deleteClient(id) {
  clients = clients.filter(client => client.id !== id);
  saveClients();
  renderClients();
}

// Render Clients
function renderClients() {
  clientList.innerHTML = '';

  let leads = 0;
  let closed = 0;

  clients.forEach(client => {
    if (client.status === 'Lead') leads++;
    if (client.status === 'Closed') closed++;

    const li = document.createElement('li');
    li.className = 'client-item';

    li.innerHTML = `
      <div>
        <strong>${client.name}</strong><br>
        <small>${client.email}</small>
      </div>
      <div>
        <span class="status ${client.status}">${client.status}</span>
        <button class="delete-btn" onclick="deleteClient(${client.id})">X</button>
      </div>
    `;

    clientList.appendChild(li);
  });

  // Update stats
  totalClientsEl.textContent = clients.length;
  totalLeadsEl.textContent = leads;
  totalClosedEl.textContent = closed;
}

// Initial render
renderClients();
