const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
  const { method, url } = req;
  const filePath = 'data.json';

  // Log every request
  const log = `${Date.now()} - ${method} ${url}\n`;
  fs.appendFile('log.txt', log, (err) => {
    if (err) console.error('Logging failed:', err.message);
  });

  // Helper: send JSON response
  const sendJSON = (status, obj) => {
    res.writeHead(status, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(obj));
  };

  // GET: Read file and send content
  if (method === 'GET' && url === '/users') {
    fs.readFile(filePath, 'utf-8', (err, data) => {
      if (err) return sendJSON(500, { error: 'Could not read file' });
      sendJSON(200, JSON.parse(data || '[]'));
    });
  }

  // POST: Add new user
  else if (method === 'POST' && url === '/users') {
    let body = '';
    req.on('data', chunk => (body += chunk.toString()));
    req.on('end', () => {
      const newUser = JSON.parse(body);
      fs.readFile(filePath, 'utf-8', (err, data) => {
        const users = err ? [] : JSON.parse(data || '[]');
        users.push(newUser);
        fs.writeFile(filePath, JSON.stringify(users), () =>
          sendJSON(201, { message: 'User added', newUser })
        );
      });
    });
  }

  // PUT: Update user by name
  else if (method === 'PUT' && url.startsWith('/users/')) {
    const nameToUpdate = url.split('/')[2];
    let body = '';
    req.on('data', chunk => (body += chunk.toString()));
    req.on('end', () => {
      const update = JSON.parse(body);
      fs.readFile(filePath, 'utf-8', (err, data) => {
        let users = JSON.parse(data || '[]');
        users = users.map(user =>
          user.name === nameToUpdate ? { ...user, ...update } : user
        );
        fs.writeFile(filePath, JSON.stringify(users), () =>
          sendJSON(200, { message: 'User updated', nameToUpdate })
        );
      });
    });
  }

  // DELETE: Remove user by name
  else if (method === 'DELETE' && url.startsWith('/users/')) {
    const nameToDelete = url.split('/')[2];
    fs.readFile(filePath, 'utf-8', (err, data) => {
      let users = JSON.parse(data || '[]');
      const newUsers = users.filter(user => user.name !== nameToDelete);
      fs.writeFile(filePath, JSON.stringify(newUsers), () =>
        sendJSON(200, { message: 'User deleted', nameToDelete })
      );
    });
  }

  // 404 fallback
  else {
    res.writeHead(404);
    res.end('Route not found');
  }
});

server.listen(3001, () => {
  console.log('✅ Server running at http://localhost:3000');
});
