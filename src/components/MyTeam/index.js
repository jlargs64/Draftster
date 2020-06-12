import React from 'react';
import PropTypes from 'prop-types';

import Table from 'react-bootstrap/Table';

export default function MyTeam(props) {
  const room = props.room;

  const playerPicks = room.playerPicks[room.name];
  if (!playerPicks || playerPicks.length === 0) {
    return (
      <div
        style={{
          border: 'solid',
          padding: '1em',
          height: '100%'
        }}
      >
        <h2>My Team</h2>
        <hr />
        <p>No picks yet! Start the draft to pick your team.</p>
      </div>
    );
  } else {
    return (
      <div
        style={{
          border: 'solid',
          padding: '1em',
          height: '100%'
        }}
      >
        <h2>My Team</h2>
        <hr />
        <Table striped bordered hover responsive size="sm">
          <thead>
            <tr>
              <th>Pick</th>
              <th>Symbol</th>
            </tr>
          </thead>
          <tbody>
            {room.playerPicks[room.name].map((pick, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{pick}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    );
  }
}

MyTeam.propTypes = {
  room: PropTypes.object.isRequired
};
