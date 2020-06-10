import React from 'react';
import PropTypes from 'prop-types';

import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import Draft from './Draft';
import Chat from './Chat';

export default function Room(props) {
	const messages = props.messages;
	const sendMessage = props.sendMessage;

	return (
		<Container fluid style={{ paddingTop: '1em' }}>
			<Row>
				<Col>
					<Draft />
				</Col>
				<Col>
					<Chat messages={messages} sendMessage={sendMessage} />
				</Col>
			</Row>
		</Container>
	);
}

Room.propTypes = {
	messages: PropTypes.array.isRequired,
	sendMessage: PropTypes.func.isRequired,
};
