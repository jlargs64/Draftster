import React, { useState, useEffect } from 'react';

import { socket } from './utils/socket';
import Home from './components/Home';
import Room from './components/Room';

function App() {
	const [isLoggedIn, setIsLoggedin] = useState(false);
	const [room, setRoom] = useState({
		name: '',
		id: '',
		host: '',
		players: [],
		disconnectedPlayers: [],
		messages: [],
		availablePicks: [],
		playerPicks: {},
		currentTurn: 0,
		currentRound: 1,
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
				playerPicks: data.playerPicks,
				disconnectedPlayers: data.disconnectedPlayers,
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
				disconnectedPlayers: data.disconnectedPlayers,
				//players: data.updatedPlayers,
				//playerPicks: data.updatedPlayerStocks,
			}));
		});
		// Update messages with new message
		socket.on('message', (message) => {
			// Update messages on new ones
			setRoom((prev) => ({
				...prev,
				messages: prev.messages.concat(message),
			}));
		});
		// Lock the room since drafting is in progress
		socket.on('lockRoom', () => {
			setRoom((prev) => ({
				...prev,
				inProgress: true,
			}));
		});
		// Update available and player picks
		socket.on('selectPick', (data) => {
			setRoom((prev) => ({
				...prev,
				availablePicks: data.updatedAvailablePicks,
				playerPicks: data.updatedPlayerPicks,
				currentTurn: data.updatedTurnNum,
				currentRound: data.updatedRoundNum,
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
		if (room.name === room.host) {
			// Call the server to process the locked room
			socket.emit('lockRoom', (response) => {
				// Show an error if something went wrong
				if (response.hasOwnProperty('error')) {
					alert(response.error);
				} else {
					setRoom((prev) => ({ ...prev, inProgress: true }));
				}
			});
		} else {
			alert('Only the host can start the draft');
		}

		// Call the server to process the pick
	}

	function selectPick(pick) {
		// If draft is in progress AND if it's the players turn, pick the stock
		if (room.inProgress && room.name === room.players[room.currentTurn]) {
			// Call the server to process the pick
			socket.emit('selectPick', pick, (response) => {
				// Show an error if something went wrong
				if (response.hasOwnProperty('error')) {
					alert(response.error);
				}
			});
		}
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
		return (
			<Room
				room={room}
				sendMessage={sendMessage}
				lockRoom={lockRoom}
				selectPick={selectPick}
			/>
		);
	}
}

export default App;
