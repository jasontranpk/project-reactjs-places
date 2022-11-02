import { useParams } from 'react-router-dom';
import { useState } from 'react';

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

const DUMMY_PLACES = [
	{
		id: 'p1',
		title: 'Empire State Building',
		imageUrl: 'http://placeimg.com/640/480/abstract',
		description:
			'Nulla non enim deserunt laborum fugiat proident nisi reprehenderit deserunt. Velit pariatur eu est do. Enim laboris magna non consequat proident. Sit nostrud mollit excepteur ea. Ea commodo aliquip fugiat nulla. Minim elit aliqua ipsum qui culpa. Cupidatat esse Lorem voluptate aliqua enim Lorem cillum incididunt ad ullamco culpa nostrud aute eu.',
		address: '20W 34th St, New York, NY 1001',
		location: {
			lat: -34.397,
			lng: 150.644,
		},
		creator: 'u1',
	},
	{
		id: 'p2',
		title: 'Empire State Building',
		imageUrl: 'http://placeimg.com/640/480/abstract',
		description:
			'Nulla non enim deserunt laborum fugiat proident nisi reprehenderit deserunt. Velit pariatur eu est do. Enim laboris magna non consequat proident. Sit nostrud mollit excepteur ea. Ea commodo aliquip fugiat nulla. Minim elit aliqua ipsum qui culpa. Cupidatat esse Lorem voluptate aliqua enim Lorem cillum incididunt ad ullamco culpa nostrud aute eu.',
		address: '20W 34th St, New York, NY 1001',
		location: {
			lat: -34.397,
			lng: 150.644,
		},
		creator: 'u2',
	},
];

const UpdatePlace = (props) => {
	const [isLoading, setIsLoading] = useState(true);
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
	const identifiedPlace = DUMMY_PLACES.find((p) => p.id === placeId);
	useEffect(() => {
		if (identifiedPlace) {
			setFormData(
				{
					title: {
						value: identifiedPlace.title,
						isValid: true,
					},
					description: {
						value: identifiedPlace.description,
						isValid: true,
					},
				},
				true
			);
		}
		setIsLoading(false);
	}, [setFormData, identifiedPlace]);

	if (!identifiedPlace) {
		return (
			<div className='center'>
				<Card>
					<h2>Could not find place!</h2>
				</Card>
			</div>
		);
	}
	const placeSubmitHandler = (e) => {
		e.preventDefault();
		console.log(formState.inputs);
	};
	if (isLoading) {
		return (
			<div className='center'>
				<h2>Loading...</h2>
			</div>
		);
	}
	return (
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
	);
};

export default UpdatePlace;
