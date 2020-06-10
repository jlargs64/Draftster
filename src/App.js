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

	function createRoom(roomId) {
		socket.emit('createRoom', roomId);
	}

	function joinRoom(roomId) {
		socket.emit('joinRoom', roomId);
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
		return (
			<Home
				createRoom={createRoom}
				joinRoom={joinRoom}
				setLogin={setIsLoggedin}
				setLoginInfo={setLoginInfo}
			/>
		);
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
