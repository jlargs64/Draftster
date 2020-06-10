import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import './chat.css';

export default function Chat(props) {
	const messages = props.messages;
	const sendMessage = props.sendMessage;
	const [draftMessage, setDraftMessage] = useState('');

	function sendBtnClicked(e) {
		e.preventDefault();

		sendMessage(draftMessage);

		setDraftMessage('');
	}

	return (
		<div style={{ border: 'solid', padding: '1em' }}>
			<h2>Chat</h2>
			<hr />
			<ul>
				{messages.map((msg, index) => {
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
						<li key={index}>
							<strong>{msg.name}:</strong> {msg.body}
						</li>
					);
				})}
			</ul>
			<Form>
				<Form.Row style={{ padding: '0.5em 0em' }}>
					<Col sm={8}>
						<Form.Control
							type='text'
							placeholder='Enter message'
							value={draftMessage}
							onChange={(e) => setDraftMessage(e.target.value)}
						/>
					</Col>
					<Col sm={4}>
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
	messages: PropTypes.array.isRequired,
	sendMessage: PropTypes.func.isRequired,
};
