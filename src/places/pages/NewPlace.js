import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import {
	VALIDATOR_MINLENGTH,
	VALIDATOR_REQUIRE,
} from '../../shared/util/validators';
import useForm from '../../shared/hooks/form-hook';
import './PlaceForm.css';

const NewPlace = () => {
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
	});

	const placeSubmitHandler = (e) => {
		e.preventDefault();
		console.log(formState.inputs);
	};

	return (
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
		</form>
	);
};

export default NewPlace;
