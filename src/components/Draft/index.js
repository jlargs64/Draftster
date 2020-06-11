import React from 'react';
import PropTypes from 'prop-types';

import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

export default function Draft(props) {
	const room = props.room;

	return (
		<div style={{ border: 'solid', padding: '1em' }}>
			<h2>Draft</h2>
			<hr />
			<Table striped bordered hover>
				<thead>
					<tr>
						<th>Rank</th>
						<th>Symbol</th>
						<th></th>
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
