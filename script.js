const form = document.getElementById('clientForm');
const clientList = document.getElementById('clientList');

let clients = [];

form.addEventListener('submit', function(e) {
  e.preventDefault();

  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const status = document.getElementById('status').value;

  const client = {
    id: Date.now(),
    name,
    email,
    status
  };

  clients.push(client);
  renderClients();
  form.reset();
});

function renderClients() {
  clientList.innerHTML = '';

  clients.forEach(client => {
    const li = document.createElement('li');
    li.className = 'client-item';

    li.innerHTML = `
      <div>
        <strong>${client.name}</strong><br>
        <small>${client.email}</small>
      </div>
      <span class="status ${client.status}">${client.status}</span>
    `;

    clientList.appendChild(li);
  });
}

