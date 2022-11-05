import { NavLink } from 'react-router-dom';
import { useContext } from 'react';

import './NavLinks.css';
import { AuthContext } from '../../context/auth-context';
const NavLinks = (props) => {
	const authCtx = useContext(AuthContext);

	return (
		<ul className='nav-links'>
			<li>
				<NavLink to='/' exact>
					ALL USERS
				</NavLink>
			</li>
			{authCtx.isLoggedIn && (
				<>
					<li>
						<NavLink to={`/${authCtx.userId}/places`}>
							MY PLACES
						</NavLink>
					</li>
					<li>
						<NavLink to='/places/new'>ADD PLACE</NavLink>
					</li>
					<li>
						<button onClick={authCtx.logout}>LOG OUT</button>
					</li>
				</>
			)}
			{!authCtx.isLoggedIn && (
				<li>
					<NavLink to='/auth'>AUTHENTICATE</NavLink>
				</li>
			)}
		</ul>
	);
};

export default NavLinks;
