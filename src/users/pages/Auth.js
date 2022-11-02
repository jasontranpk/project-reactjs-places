import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import {
	VALIDATOR_MINLENGTH,
	VALIDATOR_EMAIL,
	VALIDATOR_REQUIRE,
} from '../../shared/util/validators';
import useForm from '../../shared/hooks/form-hook';
import Card from '../../shared/components/UIElements/Card';

import './Auth.css';
import { useState } from 'react';

const Auth = () => {
	const [formState, inputHandler, setFormData] = useForm({
		email: {
			value: '',
			isValid: false,
		},
		password: {
			value: '',
			isValid: false,
		},
	});
	const [isSignupMode, setIsSignupMode] = useState(false);

	const switchModeHandler = () => {
		if (isSignupMode) {
			setFormData(
				{
					...formState.inputs,
					name: undefined,
				},
				formState.inputs.email.isValid &&
					formState.inputs.password.isValid
			);
		} else {
			setFormData(
				{
					...formState.inputs,
					name: {
						value: '',
						isValid: false,
					},
				},
				false
			);
		}

		setIsSignupMode((prevState) => !prevState);
	};
	const loginOnSubmit = (e) => {
		e.preventDefault();
		console.log(formState.inputs);
	};
	return (
		<Card className='authentication'>
			<h2>{isSignupMode ? 'SIGN UP FORM' : 'LOGIN REQUIRED'}</h2>
			<hr />
			<form className='place-form' onSubmit={loginOnSubmit}>
				{isSignupMode && (
					<Input
						id='name'
						element='input'
						type='text'
						label='Name'
						onInput={inputHandler}
						validators={[VALIDATOR_REQUIRE()]}
						errorText='Please enter a valid name, at least 3 characters'
					/>
				)}
				<Input
					id='email'
					element='input'
					type='email'
					label='Email'
					onInput={inputHandler}
					validators={[VALIDATOR_EMAIL()]}
					errorText='Please enter a valid email address'
				/>
				<Input
					id='password'
					element='input'
					type='text'
					label='Password'
					onInput={inputHandler}
					validators={[VALIDATOR_MINLENGTH(5)]}
					errorText='Please enter a valid password, at least 5 characters'
				/>
				<Button type='submit' disabled={!formState.isValid}>
					{isSignupMode ? 'SIGN UP' : 'LOGIN'}
				</Button>
			</form>
			<Button inverse onClick={switchModeHandler}>
				{isSignupMode ? 'SWITCH TO LOGIN' : 'SWITCH TO SIGNUP'}
			</Button>
		</Card>
	);
};

export default Auth;
