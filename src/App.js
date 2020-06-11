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
		availablePicks: [],
		currentTurn: 0,
		inProgress: false,
	});

	useEffect(() => {
		// Notify players of a new connection
		socket.on('userConnected', (data) => {
			setRoom((prev) => ({
				...prev,
				messages: prev.messages.concat({
					name: '',
					body: `${data.name} has connected.`,
				}),
				players: data.players,
			}));
		});

		// Notify players of a new disconnection
		socket.on('userDisconnected', (data) => {
			setRoom((prev) => ({
				...prev,
				messages: prev.messages.concat({
					name: '',
					body: `${data.name} has disconnected.`,
				}),
				players: data.updatedPlayers,
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
			// Show an error if something went wrong
			if (response.hasOwnProperty('error')) {
				alert(response.error);
			} else {
				setIsLoggedin(true);
				setRoom({ ...response.room, name: name });
			}
		});
	}

	function joinRoom(name, roomId) {
		const data = {
			name: name,
			roomId: roomId,
		};
		socket.emit('joinRoom', data, (response) => {
			// Show an error if something went wrong
			if (response.hasOwnProperty('error')) {
				alert(response.error);
			} else {
				setIsLoggedin(true);
				setRoom({ ...response.room, name: name });
			}
		});
	}

	function lockRoom() {
		socket.emit('lockRoom');
		setRoom((prev) => ({ ...prev, inProgress: true }));
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
