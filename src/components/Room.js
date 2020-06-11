import React from 'react';
import PropTypes from 'prop-types';

import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import Draft from './Draft';
import Chat from './Chat';

export default function Room(props) {
	const room = props.room;
	const sendMessage = props.sendMessage;

	return (
		<Container fluid style={{ paddingTop: '1em' }}>
			<Row>
				<h1>Room: {room.id}</h1>
			</Row>
			<Row>
				<h2>Players</h2>
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
