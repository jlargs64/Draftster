import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

export default function Home(props) {
	const createRoom = props.createRoom;
	const joinRoom = props.joinRoom;
	const setLoginInfo = props.setLoginInfo;
	const setLogin = props.setLogin;
	const [name, setName] = useState('');
	const [roomId, setRoomId] = useState('');

	function createRoomBtnPressed(e) {
		e.preventDefault();
		createRoom(roomId);
		setLoginInfo({
			name: name,
			roomId: roomId,
		});
		setLogin(true);
	}

	function joinRoomBtnPressed(e) {
		e.preventDefault();
		joinRoom(roomId);
		setLoginInfo({
			name: name,
			roomId: roomId,
		});
		setLogin(true);
	}

	return (
		<Container
			style={{
				display: 'flex',
				flexFlow: 'column wrap',
				justifyContent: 'center',
				padding: '1em',
			}}
		>
			<Row className='mx-auto'>
				<h1>Draftster</h1>
			</Row>
			<Row className='mx-auto'>
				<Card style={{ padding: '1em' }}>
					<h1>Join A Draft</h1>
					<Form>
						<Form.Group>
							<Form.Label>Name</Form.Label>
							<Form.Control
								type='text'
								placeholder='Enter your name'
								value={name}
								onChange={(e) => {
									setName(e.target.value);
								}}
							/>
						</Form.Group>
						<Form.Group>
							<Form.Label>Room Id</Form.Label>
							<Form.Control
								type='text'
								placeholder='Enter the room id'
								value={roomId}
								onChange={(e) => {
									setRoomId(e.target.value);
								}}
							/>
						</Form.Group>
						<Form.Row>
							<Button
								variant='primary'
								size='md'
								onClick={createRoomBtnPressed}
								block
							>
								Create
							</Button>
							<Button
								variant='outline-success'
								size='md'
								onClick={joinRoomBtnPressed}
								block
							>
								Join
							</Button>
						</Form.Row>
					</Form>
				</Card>
			</Row>
		</Container>
	);
}

Home.propTypes = {
	setLoginInfo: PropTypes.func.isRequired,
	setLogin: PropTypes.func.isRequired,
	joinRoom: PropTypes.func.isRequired,
	createRoom: PropTypes.func.isRequired,
};
