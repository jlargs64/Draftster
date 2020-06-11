import React from 'react';
import PropTypes from 'prop-types';

//import Table from 'react-bootstrap/Table';

export default function MyTeam(props) {
	//const room = props.room;

	return (
		<div
			style={{
				border: 'solid',
				padding: '1em',
				height: '100%',
			}}
		>
			<h2>My Team</h2>
			<hr />
			{/* <Table striped bordered hover>
				<thead>
					<tr>
						<th>Rank</th>
						<th>Symbol</th>
					</tr>
				</thead>
				<tbody>
					{room.availablePicks.map((stock, index) => (
						<tr key={index}>
							<td>{index + 1}</td>
							<td>{stock}</td>
						</tr>
					))}
				</tbody>
			</Table> */}
		</div>
	);
}

MyTeam.propTypes = {
	room: PropTypes.object.isRequired,
};
