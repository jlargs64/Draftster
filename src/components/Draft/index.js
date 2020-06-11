import React from 'react';
import PropTypes from 'prop-types';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';
import Row from 'react-bootstrap/Row';

import './draft.css';

export default function Draft(props) {
	const room = props.room;

	return (
		<div style={{ border: 'solid', padding: '1em' }}>
			<h2>Draft</h2>
			<hr />
			<Row style={{ display: 'flex', justifyContent: 'space-evenly' }}>
				<h4>Current Round: {room.currentRound}</h4>
				<h4>Current Turn: {room.currentTurn}</h4>
			</Row>

			<Row className='draft-order'>
				<div className='draft-time-square'>
					<p style={{ fontSize: '1.5em' }}>Time Left:</p>
				</div>
				{room.players.map((player, index) => (
					<Card className='draft-square' key={index}>
						<p style={{ fontSize: '1.5em', fontWeight: '500' }}>{player}</p>
					</Card>
				))}
			</Row>
			<hr />
			<Table striped bordered hover responsive size='sm'>
				<thead>
					<tr>
						<th style={{ width: '10px' }}>Rank</th>
						<th>Symbol</th>
						<th> </th>
					</tr>
				</thead>
				<tbody>
					{room.availablePicks.map((stock, index) => (
						<tr key={index}>
							<td>{index + 1}</td>
							<td>{stock}</td>
							<td>
								<Button variant='success' block>
									Pick
								</Button>
							</td>
						</tr>
					))}
				</tbody>
			</Table>
		</div>
	);
}

Draft.propTypes = {
	room: PropTypes.object.isRequired,
};
