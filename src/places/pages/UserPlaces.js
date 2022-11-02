import { useParams } from 'react-router-dom';

import PlaceList from '../components/PlaceList';

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

const UserPlaces = () => {
	const userId = useParams().userId;
	const loadedPlace = DUMMY_PLACES.filter(
		(place) => place.creator === userId
	);
	return <PlaceList items={loadedPlace} />;
};

export default UserPlaces;
