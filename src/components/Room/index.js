import React from 'react';
import PropTypes from 'prop-types';

import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import Draft from '../Draft';
import Chat from '../Chat';
import './room.css';

export default function Room(props) {
	const room = props.room;
	const sendMessage = props.sendMessage;

	return (
		<Container fluid style={{ padding: '1em' }}>
			<Row>
				<Col>
					<h1>Room: {room.id}</h1>
					<h2>Players:</h2>
					<Row className='players-list'>
						{room.players.map((player, index) => (
							<div key={index}>{player}</div>
						))}
					</Row>
				</Col>
			</Row>
			<Row>
				<Col>
					<Draft />
				</Col>
				<Col>
					<Chat room={room} sendMessage={sendMessage} />
				</Col>
			</Row>
		</Container>
	);
}

Room.propTypes = {
	room: PropTypes.object.isRequired,
	sendMessage: PropTypes.func.isRequired,
};
