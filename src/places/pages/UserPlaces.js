import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import PlaceList from '../components/PlaceList';
import { useHttpClient } from '../../shared/hooks/http-hook';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';

const UserPlaces = () => {
	const userId = useParams().userId;
	const { isLoading, error, sendRequest, clearError } = useHttpClient();
	const [loadedPlaces, setLoadedPlaces] = useState([]);
	const placeDeletedHandler = (deletedPlaceId) => {
		setLoadedPlaces((prevPlaces) =>
			prevPlaces.filter((place) => place.id !== deletedPlaceId)
		);
	};
	useEffect(() => {
		const fetchPlaces = async () => {
			const responseData = await sendRequest(
				`${process.env.REACT_APP_BACKEND_URL}/places/user/${userId}`
			);
			setLoadedPlaces(responseData.places);
		};
		fetchPlaces();
	}, [sendRequest, userId]);
	return (
		<>
			{isLoading && (
				<div className='center'>
					<LoadingSpinner asOverlay />
				</div>
			)}
			<ErrorModal error={error} onClear={clearError} />
			{!isLoading && loadedPlaces && (
				<PlaceList
					items={loadedPlaces}
					onDeletePlace={placeDeletedHandler}
				/>
			)}
		</>
	);
};

export default UserPlaces;
