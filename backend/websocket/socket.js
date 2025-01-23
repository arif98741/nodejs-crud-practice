import WebSocket from 'ws';

const connectSockets = (app) => { 
    //socket url created by laravel rever
    const wsUrl = 'ws://127.0.0.1:8080/app/b4l5a0qyex1b9uyazxxc?protocol=7&client=js&version=8.4.0-rc2&flash=false';

    // Create a new WebSocket connection
    const ws = new WebSocket(wsUrl);

    // Event: Connection opened
    ws.on('open', () => {
        console.log('Connected to the WebSocket server.');
        
        // Send a message to the server (optional)
        //ws.send(JSON.stringify({ message: 'Hi I am knocking from nodejs' }));


        // Subscribe to a channel
        const subscriptionMessage = {
            event: 'user.notification',
            data: {
                
            },
            channel: 'user133.notification', // Replace with the actual channel name
        };

        ws.send(JSON.stringify(subscriptionMessage));
        console.log('Subscribed to user.notification event.');
    });

    // Event: Message received from server
    ws.on('message', (data) => {
        try {
            
            // Parse the incoming message (assume JSON format)
            const message = JSON.parse(data); 
                       
            // Check if the event is `user.notification`
            if (message.event === 'user.notification') {
                console.log('User Notification Event:', message.data);
            } else {
                console.log('Other Message:', message);
            }
        } catch (err) {
            console.error('Error parsing message:', data);
        }
    });

    // Event: Connection closed
    ws.on('close', () => {
        console.log('Disconnected from the WebSocket server.');
    });

    // Event: Error occurred
    ws.on('error', (error) => {
        console.error('WebSocket error:', error);
    });
};

export default connectSockets;