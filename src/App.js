import React, { useState, useEffect } from 'react';

import { socket } from './utils/socket';
import Home from './components/Home';
import Room from './components/Room';

function App() {
	const [isLoggedIn, setIsLoggedin] = useState(false);
	const [room, setRoom] = useState({
		name: '',
		id: '',
		players: [],
		messages: [],
	});

	useEffect(() => {
		// Notify players of a new connection
		socket.on('userConnected', (name) => {
			setRoom((prev) => ({
				...prev,
				messages: prev.messages.concat({
					name: '',
					body: `${name} has connected.`,
				}),
			}));
		});

		// Notify players of a new disconnection
		socket.on('userDisconnected', (name) => {
			setRoom((prev) => ({
				...prev,
				messages: prev.messages.concat({
					name: '',
					body: `${name} has disconnected.`,
				}),
			}));
		});
		socket.on('message', (message) => {
			// Update messages on new ones
			setRoom((prev) => ({
				...prev,
				messages: prev.messages.concat(message),
			}));
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
			}
			if (response.nameValid === false) {
				alert(
					"That name is not valid. Your name can't be empty or include a dash."
				);
			}
			if (response.roomExists === false && response.nameValid === true) {
				// Room does not exist so continue
				setIsLoggedin(true);

				setRoom((prev) => ({
					...prev,
					name: name,
					id: roomId,
					players: [name],
				}));
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
			}
			if (response.nameValid === false) {
				alert(
					"That name is not valid. Your name can't be empty or include a dash."
				);
			}
			if (
				response.nameInUse === false &&
				response.nameValid === true &&
				response.roomExists === true
			) {
				setIsLoggedin(true);
				setRoom((prev) => ({
					...prev,
					name: name,
					id: roomId,
					players: response.players,
					messages: response.messages,
				}));
			}
		});
	}

	function sendMessage(body) {
		if (isLoggedIn) {
			const message = { name: room.name, body: body };
			const data = {
				roomId: room.id,
				message: message,
			};

			socket.emit('message', data);
		}
	}

	if (!isLoggedIn) {
		return <Home createRoom={createRoom} joinRoom={joinRoom} />;
	} else {
		return <Room room={room} sendMessage={sendMessage} />;
	}
}

export default App;
