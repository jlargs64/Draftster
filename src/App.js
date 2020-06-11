import React, { useState, useEffect } from 'react';

import { socket } from './utils/socket';
import Home from './components/Home';
import Room from './components/Room';

function App() {
	const [isLoggedIn, setIsLoggedin] = useState(false);
	const [loginInfo, setLoginInfo] = useState({});
	const [messages, setMessages] = useState([]);

	useEffect(() => {
		socket.on('message', (message) => {
			setMessages((prev) => prev.concat(message));
		});
	}, []);

	function createRoom(name, roomId) {
		// Room data to send to server
		const data = {
			name: name,
			roomId: roomId,
		};
		// Send room data to server
		socket.emit('createRoom', data, (response) => {
			// Check if room exists or not
			if (response.roomExists === true) {
				alert('Room id already in use, choose a new room id.');
			} else {
				// Room does not exist so continue
				setIsLoggedin(true);
				setLoginInfo({ name: name, roomId: roomId });
			}
		});
	}

	function joinRoom(name, roomId) {
		const data = {
			name: name,
			roomId: roomId,
		};
		socket.emit('joinRoom', data, (response) => {
			//Check if room exists
			if (response.roomExists === false) {
				alert('No room exists with that id, so you should create it!');
			}
			// Check if name is available
			if (response.nameInUse === true) {
				alert(
					'That name is already in use in that room, please choose another.'
				);
			} else {
				setIsLoggedin(true);
				setLoginInfo({ name: name, roomId: roomId });
				setMessages(response.messages);
			}
		});
	}

	function sendMessage(body) {
		const message = { name: loginInfo.name, body: body };
		const data = {
			roomId: loginInfo.roomId,
			message: message,
		};
		setMessages((prev) => prev.concat(message));
		socket.emit('message', data);
	}

	if (!isLoggedIn) {
		return <Home createRoom={createRoom} joinRoom={joinRoom} />;
	} else {
		return (
			<Room
				loginInfo={loginInfo}
				messages={messages}
				sendMessage={sendMessage}
			/>
		);
	}
}

export default App;
