import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import './chat.css';

export default function Chat(props) {
	const room = props.room;
	const sendMessage = props.sendMessage;
	const [draftMessage, setDraftMessage] = useState('');

	function sendBtnClicked(e) {
		e.preventDefault();

		sendMessage(draftMessage);

		setDraftMessage('');
	}

	return (
		<div style={{ border: 'solid', padding: '1em', height: '100%' }}>
			<h2>Chat</h2>
			<hr />
			<ul className='messages'>
				{room.messages.map((msg, index) => {
					if (msg.name === '') {
						return (
							<li key={index}>
								<center>
									<strong>{msg.body}</strong>
								</center>
							</li>
						);
					}
					return (
						<li key={index} style={{ wordWrap: 'break-word' }}>
							<strong>{msg.name}:</strong> {msg.body}
						</li>
					);
				})}
			</ul>
			<Form>
				<Form.Row style={{ padding: '0.5em 0.5em' }}>
					<Col sm={8} style={{ padding: '0em 0.5em' }}>
						<Form.Control
							type='text'
							placeholder='Enter message'
							value={draftMessage}
							onChange={(e) => setDraftMessage(e.target.value)}
						/>
					</Col>
					<Col sm={4} style={{ padding: '0em 0.5em' }}>
						<Button
							variant='primary'
							type='submit'
							onClick={sendBtnClicked}
							block
						>
							Send
						</Button>
					</Col>
				</Form.Row>
			</Form>
		</div>
	);
}

Chat.propTypes = {
	room: PropTypes.object.isRequired,
	sendMessage: PropTypes.func.isRequired,
};
