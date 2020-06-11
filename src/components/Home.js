import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

export default function Home(props) {
	const createRoom = props.createRoom;
	const joinRoom = props.joinRoom;
	const [name, setName] = useState('');
	const [roomId, setRoomId] = useState('');

	function createRoomBtnPressed(e) {
		e.preventDefault();

		createRoom(name, roomId);
	}

	function joinRoomBtnPressed(e) {
		e.preventDefault();

		joinRoom(name, roomId);
	}

	return (
		<Container fluid>
			<Col className='mx-auto'>
				<Row className='mx-auto justify-content-center'>
					<h1>Draftster</h1>
				</Row>
				<Row className='mx-auto justify-content-center'>
					<Card style={{ padding: '1em', width: '70%' }}>
						<h1 className='text-center'>Play Now!</h1>
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
			</Col>
		</Container>
	);
}

Home.propTypes = {
	joinRoom: PropTypes.func.isRequired,
	createRoom: PropTypes.func.isRequired,
};
