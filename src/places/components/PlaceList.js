import Card from '../../shared/components/UIElements/Card';
import PlaceItem from './PlaceItem';

import Button from '../../shared/components/FormElements/Button';

import './PlaceList.css';
import { useEffect, useState } from 'react';

const PlaceList = (props) => {
	const [itemsAreLoaded, setItemsAreLoaded] = useState(false);
	useEffect(() => {
		setItemsAreLoaded(true);
	}, []);
	return (
		<>
			{itemsAreLoaded && props.items.length === 0 && (
				<div className='place-list center'>
					<Card>
						<h2>No places found. Maybe create one?</h2>
						<Button to='/places/new'>Share Place</Button>
					</Card>
				</div>
			)}
			{props.items.length > 0 && (
				<ul className='place-list'>
					{props.items.map((place) => (
						<PlaceItem
							key={place.id}
							id={place.id}
							image={place.image}
							title={place.title}
							description={place.description}
							address={place.address}
							coordinates={place.location}
							creatorId={place.creator}
							onDelete={props.onDeletePlace}
						/>
					))}
				</ul>
			)}
		</>
	);
};

export default PlaceList;
