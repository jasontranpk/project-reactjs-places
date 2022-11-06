import { useHistory } from 'react-router-dom';
import { useContext } from 'react';

import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import ImageUpload from '../../shared/components/FormElements/ImageUpload';
import {
	VALIDATOR_MINLENGTH,
	VALIDATOR_REQUIRE,
} from '../../shared/util/validators';
import useForm from '../../shared/hooks/form-hook';
import { useHttpClient } from '../../shared/hooks/http-hook';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import { AuthContext } from '../../shared/context/auth-context';

import './PlaceForm.css';

const NewPlace = () => {
	const { isLoading, error, sendRequest, clearError } = useHttpClient();
	const authCtx = useContext(AuthContext);
	const history = useHistory();
	const [formState, inputHandler] = useForm({
		title: {
			value: '',
			isValid: false,
		},
		description: {
			value: '',
			isValid: false,
		},
		address: {
			value: '',
			isValid: false,
		},
		image: {
			value: null,
			isValid: false,
		},
	});

	const placeSubmitHandler = async (e) => {
		e.preventDefault();
		/* 		const body = JSON.stringify({
			title: formState.inputs.title.value,
			description: formState.inputs.description.value,
			address: formState.inputs.address.value,
			creator: authCtx.userId,
		}); */
		console.log(formState.inputs);
		const formData = new FormData();
		formData.append('title', formState.inputs.title.value);
		formData.append('description', formState.inputs.description.value);
		formData.append('address', formState.inputs.address.value);
		formData.append('image', formState.inputs.image.value);
		try {
			await sendRequest(
				process.env.REACT_APP_BACKEND_URL + '/places',
				'POST',
				formData,
				{
					Authorization: 'Bearer ' + authCtx.token,
				}
			);
			history.push('/');
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<>
			<ErrorModal error={error} onClear={clearError} />
			<form className='place-form' onSubmit={placeSubmitHandler}>
				<Input
					id='title'
					element='input'
					type='text'
					label='Title*'
					onInput={inputHandler}
					validators={[VALIDATOR_REQUIRE()]}
					errorText='Please enter a valid title'
				/>
				<ImageUpload id='image' center onInput={inputHandler} />
				<Input
					id='address'
					element='input'
					type='text'
					label='Address*'
					onInput={inputHandler}
					validators={[VALIDATOR_REQUIRE()]}
					errorText='Please enter a valid address'
				/>
				<Input
					id='description'
					element='textarea'
					label='Description*'
					onInput={inputHandler}
					validators={[VALIDATOR_MINLENGTH(5)]}
					errorText='Please enter a valid description (at least 5 characters)'
				/>
				<Button type='submit' disabled={!formState.isValid}>
					ADD PLACE
				</Button>
				<div className='center'>
					{isLoading && <LoadingSpinner asOverlay />}
				</div>
			</form>
		</>
	);
};

export default NewPlace;
