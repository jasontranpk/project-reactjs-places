import UserList from '../components/UserList';

const Users = () => {
	const USERS = [
		{
			id: 'u1',
			name: 'Jason Tran',
			image: 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/874.jpg',
			places: 3,
		},
	];
	return <UserList items={USERS} />;
};

export default Users;
