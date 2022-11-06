import { useParams, useHistory } from 'react-router-dom';
import { useState, useContext } from 'react';

import { AuthContext } from '../../shared/context/auth-context';
import { useHttpClient } from '../../shared/hooks/http-hook';
import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import {
	VALIDATOR_REQUIRE,
	VALIDATOR_MINLENGTH,
} from '../../shared/util/validators';
import useForm from '../../shared/hooks/form-hook';
import Card from '../../shared/components/UIElements/Card';
import './PlaceForm.css';
import { useEffect } from 'react';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';

const UpdatePlace = (props) => {
	const authCtx = useContext(AuthContext);
	const { isLoading, error, sendRequest, clearError } = useHttpClient();
	const history = useHistory();
	const placeId = useParams().placeId;
	const [formState, inputHandler, setFormData] = useForm({
		title: {
			value: '',
			isValid: false,
		},
		description: {
			value: '',
			isValid: false,
		},
	});
	const [identifiedPlace, setIdentifiedPlace] = useState({});
	const { title, description } = identifiedPlace;
	useEffect(() => {
		const fetchPlace = async () => {
			try {
				const responseData = await sendRequest(
					`${process.env.REACT_APP_BACKEND_URL}/places/${placeId}`
				);
				await setIdentifiedPlace(responseData.place);
				setFormData(
					{
						title: {
							value: title,
							isValid: true,
						},
						description: {
							value: description,
							isValid: true,
						},
					},
					true
				);
			} catch (err) {}
		};
		fetchPlace();
	}, [title, description, sendRequest, setFormData, placeId]);

	if (!identifiedPlace) {
		return (
			<div className='center'>
				<Card>
					<h2>Could not find place!</h2>
				</Card>
			</div>
		);
	}
	const placeSubmitHandler = async (e) => {
		e.preventDefault();
		try {
			await sendRequest(
				`${process.env.REACT_APP_BACKEND_URL}/places/${placeId}`,
				'PATCH',
				JSON.stringify({
					title: formState.inputs.title.value,
					description: formState.inputs.description.value,
				}),
				{
					Authorization: 'Bearer ' + authCtx.token,
					'Content-Type': 'application/json',
				}
			);
			history.push(`/${authCtx.userId}/places`);
		} catch {}
	};
	if (isLoading) {
		return (
			<div className='center'>
				<LoadingSpinner />
			</div>
		);
	}
	return (
		<>
			<ErrorModal error={error} onClear={clearError} />

			<form className='place-form' onSubmit={placeSubmitHandler}>
				<Input
					id='title'
					element='input'
					type='text'
					label='Title*'
					validators={[VALIDATOR_REQUIRE()]}
					errorText='Please enter a valid title'
					onInput={inputHandler}
					initialValue={formState.inputs.title.value}
					initialIsValid={formState.inputs.title.isValid}
				/>
				<Input
					id='description'
					element='textarea'
					label='Description*'
					validators={[VALIDATOR_MINLENGTH(5)]}
					errorText='Please enter a valid description'
					onInput={inputHandler}
					initialValue={formState.inputs.description.value}
					initialIsValid={formState.inputs.description.isValid}
				/>
				<Button type='submit' disabled={!formState.isValid}>
					UPDATE PLACE
				</Button>
			</form>
		</>
	);
};

export default UpdatePlace;
