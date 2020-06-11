import React from 'react';
import PropTypes from 'prop-types';

import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import Draft from '../Draft';
import Chat from '../Chat';
import './room.css';
import Button from 'react-bootstrap/Button';
import MyTeam from '../MyTeam';

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
						<ul className='players-list'>
							{room.players.map((player, index) => (
								<li key={index}>{player}</li>
							))}
						</ul>
					</Row>
					<Row className='justify-content-center' style={{ padding: '1em' }}>
						<Button variant='primary' block>
							Start Draft
						</Button>
					</Row>
				</Col>
			</Row>
			<Row style={{ display: 'flex', flexFlow: 'row wrap' }}>
				<Col sm={8}>
					<Draft room={room} />
				</Col>
				<Col
					sm={4}
					style={{
						display: 'flex',
						flexFlow: 'column nowrap',
						justifyContent: 'space-evenly',
					}}
				>
					<Row>
						<Col>
							<MyTeam room={room} />
						</Col>
					</Row>
					<Row>
						<Col>
							<Chat room={room} sendMessage={sendMessage} />
						</Col>
					</Row>
				</Col>
			</Row>
		</Container>
	);
}

Room.propTypes = {
	room: PropTypes.object.isRequired,
	sendMessage: PropTypes.func.isRequired,
};
