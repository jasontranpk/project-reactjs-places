import React, { Suspense } from 'react';

import {
	BrowserRouter as Router,
	Redirect,
	Route,
	Switch,
} from 'react-router-dom';
import MainNavigation from './shared/components/Navigation/MainNavigation';
import './App.css';
// import UserPlaces from './places/pages/UserPlaces';
import Users from './users/pages/Users';
// import NewPlace from './places/pages/NewPlace';
// import UpdatePlace from './places/pages/UpdatePlace';
import Auth from './users/pages/Auth';
import { AuthContext } from './shared/context/auth-context';
import { useAuth } from './shared/hooks/auth-hook';
import LoadingSpinner from './shared/components/UIElements/LoadingSpinner';

const UserPlaces = React.lazy(() => import('./places/pages/UserPlaces'));
// const Users = React.lazy(() => import('./users/pages/Users'));
const NewPlace = React.lazy(() => import('./places/pages/NewPlace'));
const UpdatePlace = React.lazy(() => import('./places/pages/UpdatePlace'));
// const Auth = React.lazy(() => import('./users/pages/Auth'));

const App = () => {
	const { userId, token, login, logout } = useAuth();
	let routes;
	if (token) {
		routes = (
			<Switch>
				<Route path='/' exact>
					<Users />
				</Route>
				<Route path='/:userId/places' exact>
					<UserPlaces />
				</Route>
				<Route path='/places/new' exact>
					<NewPlace />
				</Route>
				<Route path='/places/:placeId'>
					<UpdatePlace />
				</Route>
				<Redirect to='/' />
			</Switch>
		);
	} else {
		routes = (
			<Switch>
				<Route path='/' exact>
					<Users />
				</Route>
				<Route path='/:userId/places' exact>
					<UserPlaces />
				</Route>
				<Route path='/auth'>
					<Auth />
				</Route>
				<Redirect to='/auth' />
			</Switch>
		);
	}
	return (
		<AuthContext.Provider
			value={{ isLoggedIn: !!token, token, login, logout, userId }}
		>
			<Router>
				<MainNavigation />
				<main>
					<Switch>
						<Suspense
							fallback={
								<div className='center'>
									<LoadingSpinner />
								</div>
							}
						>
							{routes}
						</Suspense>
						<Redirect to='/auth' />
					</Switch>
				</main>
			</Router>
		</AuthContext.Provider>
	);
};

export default App;
