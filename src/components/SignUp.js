import React, { useRef, useState } from 'react';
import { Form, Button, Card, Alert } from 'react-bootstrap';

import { auth } from '../firebase-config';
import { createUserWithEmailAndPassword } from 'firebase/auth';

async function loginUser(email, password) {}
async function signOut(email, password) {}

export default function SignUp() {
	const emailRef = useRef();
	const passRef = useRef();
	const passCNFRef = useRef();

	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);

	async function registerUser(email, password) {
		try {
			const user = await createUserWithEmailAndPassword(auth, email, password);
			console.log(user);
		} catch (e) {
			setError(e.message.split('Firebase: ')[1]);
		}
	}

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (passRef.current.value !== passCNFRef.current.value) {
			return setError('Password does not match.');
		}

		try {
			setLoading(true);
			setError('');
			registerUser(emailRef.current.value, passRef.current.value);
		} catch (e) {
			setError(e.message);
		}
		setLoading(false);
	};
	return (
		<>
			<Card>
				<Card.Body>
					<h2 className="text-center mb-4">Sign Up</h2>

					{error && <Alert variant="danger">{error}</Alert>}
					<Form onSubmit={handleSubmit}>
						<Form.Group id="email">
							<Form.Label>Email</Form.Label>
							<Form.Control type="email" ref={emailRef} required></Form.Control>
						</Form.Group>
						<Form.Group id="password">
							<Form.Label>Password</Form.Label>
							<Form.Control
								type="password"
								ref={passRef}
								required
							></Form.Control>
						</Form.Group>
						<Form.Group id="passwordCNF">
							<Form.Label>Password Confirm</Form.Label>
							<Form.Control
								type="password"
								ref={passCNFRef}
								required
							></Form.Control>
						</Form.Group>
						<Button disabled={loading} type="submit" className="w-100 mt-4">
							CREATE ACCOUNT
						</Button>
					</Form>
				</Card.Body>
			</Card>
			<div className="w-100 text-center mt-2">
				Already have an Account? Log in
			</div>
		</>
	);
}
