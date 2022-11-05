import { useEffect, useState } from 'react';
import UserList from '../components/UserList';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import { useHttpClient } from '../../shared/hooks/http-hook';

const Users = () => {
	const { isLoading, error, sendRequest, clearError } = useHttpClient();
	const [loadedUsers, setLoadedUser] = useState([]);
	useEffect(() => {
		const fetchUsers = async () => {
			try {
				const responseData = await sendRequest(
					'http://localhost:8000/api/users'
				);
				setLoadedUser(responseData.users);
			} catch (err) {
				console.log(err);
			}
		};
		fetchUsers();
	}, [sendRequest]);
	return (
		<>
			<ErrorModal error={error} onClear={clearError} />
			{isLoading && (
				<div className='center'>
					<LoadingSpinner />
				</div>
			)}
			{!isLoading && loadedUsers && <UserList items={loadedUsers} />}
		</>
	);
};

export default Users;
