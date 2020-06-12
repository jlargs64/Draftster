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
	const lockRoom = props.lockRoom;
	const selectPick = props.selectPick;

	const currentTurn = room.currentTurn;

	return (
		<Container fluid style={{ padding: '1em' }}>
			<Row>
				<Col>
					<h1>Room: {room.id}</h1>
					<Row className='justify-content-center' style={{ padding: '1em' }}>
						{!room.inProgress && (
							<Button
								variant='primary'
								onClick={lockRoom}
								size='lg'
								disabled={room.inProgress}
							>
								Start Draft
							</Button>
						)}
						{room.inProgress && (
							<h3>It's {room.players[room.currentTurn]}'s turn to draft!</h3>
						)}
					</Row>
				</Col>
			</Row>
			<Row style={{ display: 'flex', flexFlow: 'row wrap' }}>
				<Col sm={8}>
					<Draft room={room} selectPick={selectPick} />
				</Col>
				<Col
					sm={4}
					style={{
						display: 'flex',
						flexFlow: 'column nowrap',
						justifyContent: 'space-evenly',
					}}
				>
					<Row style={{ height: '50%' }}>
						<Col>
							<MyTeam room={room} />
						</Col>
					</Row>
					<Row style={{ height: '50%' }}>
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
	lockRoom: PropTypes.func.isRequired,
	selectPick: PropTypes.func.isRequired,
};
