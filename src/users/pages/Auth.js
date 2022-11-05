import { useContext, useState } from 'react';
import { useHttpClient } from '../../shared/hooks/http-hook';

import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import ImageUpload from '../../shared/components/FormElements/ImageUpload';
import {
	VALIDATOR_MINLENGTH,
	VALIDATOR_EMAIL,
	VALIDATOR_REQUIRE,
} from '../../shared/util/validators';
import useForm from '../../shared/hooks/form-hook';
import Card from '../../shared/components/UIElements/Card';
import { AuthContext } from '../../shared/context/auth-context';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import './Auth.css';

const Auth = () => {
	const authCtx = useContext(AuthContext);
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
	const { isLoading, error, sendRequest, clearError } = useHttpClient();
	const switchModeHandler = () => {
		if (isSignupMode) {
			setFormData(
				{
					...formState.inputs,
					name: undefined,
					image: undefined,
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
					image: {
						value: null,
						isValid: false,
					},
				},
				false
			);
		}

		setIsSignupMode((prevState) => !prevState);
	};

	const formSubmitHandler = async (e) => {
		e.preventDefault();

		if (isSignupMode) {
			try {
				const formData = new FormData();
				formData.append('email', formState.inputs.email.value);
				formData.append('name', formState.inputs.name.value);
				formData.append('password', formState.inputs.password.value);
				formData.append('image', formState.inputs.image.value);
				console.log('image data' + formState.inputs.image.value);
				const responseData = await sendRequest(
					'http://localhost:8000/api/users/signup',
					'POST',
					formData
				);
				authCtx.login(responseData.userId, responseData.token);
			} catch (err) {
				console.log(err);
			}
		} else {
			const body = JSON.stringify({
				email: formState.inputs.email.value,
				password: formState.inputs.password.value,
			});
			try {
				const responseData = await sendRequest(
					'http://localhost:8000/api/users/login',
					'POST',
					body,
					{
						'Content-Type': 'application/json',
					}
				);
				console.log(responseData.user);
				const userId = responseData.userId;
				authCtx.login(userId, responseData.token);
			} catch (err) {
				console.log(err);
			}
		}
	};

	return (
		<>
			<ErrorModal error={error} onClear={clearError} />
			<Card className='authentication'>
				{isLoading && <LoadingSpinner asOverlay />}
				<h2>{isSignupMode ? 'SIGN UP FORM' : 'LOGIN REQUIRED'}</h2>
				<hr />
				<form className='place-form' onSubmit={formSubmitHandler}>
					{isSignupMode && (
						<>
							<Input
								id='name'
								element='input'
								type='text'
								label='Name'
								onInput={inputHandler}
								validators={[VALIDATOR_REQUIRE()]}
								errorText='Please enter a valid name, at least 3 characters'
							/>
							<ImageUpload
								id='image'
								center
								onInput={inputHandler}
							/>
						</>
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
						type='password'
						label='Password'
						onInput={inputHandler}
						validators={[VALIDATOR_MINLENGTH(5)]}
						errorText='Please enter a valid password, at least 6 characters'
					/>
					<Button type='submit' disabled={!formState.isValid}>
						{isSignupMode ? 'SIGN UP' : 'LOGIN'}
					</Button>
				</form>
				<Button inverse onClick={switchModeHandler}>
					{isSignupMode ? 'SWITCH TO LOGIN' : 'SWITCH TO SIGNUP'}
				</Button>
			</Card>
		</>
	);
};

export default Auth;
