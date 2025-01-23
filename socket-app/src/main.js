// WebSocket URL
const socketUrl = 'ws://127.0.0.1:8080/app/b4l5a0qyex1b9uyazxxc?protocol=7&client=js&version=8.4.0-rc2&flash=false';

// Establish WebSocket connection
const socket = new WebSocket(socketUrl);

// DOM elements
const messagesDiv = document.getElementById('messages');

// Helper function to log messages
const logMessage = (message) => {
  const messageElement = document.createElement('p');
  messageElement.textContent = message;
  messagesDiv.appendChild(messageElement);
};

// Event: Connection opened
socket.addEventListener('open', () => {
  logMessage('Connected to WebSocket server');

  // Example: Subscribe to an event (if required by the server)
  const subscriptionMessage = {
    event: 'pusher:subscribe',
    data: {
      channel: 'your-channel-name', // Replace with your channel name
    },
  };

  socket.send(JSON.stringify(subscriptionMessage));
  logMessage('Sent subscription message to the server');
});

// Event: Message received
socket.addEventListener('message', (event) => {
  logMessage(`Message from server: ${event.data}`);

  // Parse and handle the message (if it's JSON)
  try {
    const data = JSON.parse(event.data);
    if (data.event === 'user.notification') {
      logMessage(`Notification: ${JSON.stringify(data.data)}`);
    }
  } catch (err) {
    logMessage('Non-JSON message received');
  }
});

// Event: Connection closed
socket.addEventListener('close', () => {
  logMessage('Disconnected from WebSocket server');
});

// Event: Error occurred
socket.addEventListener('error', (error) => {
  logMessage(`WebSocket error: ${error.message}`);
});
