import { createContext } from 'react';

export const AuthContext = createContext({
	isLoggedIn: false,
	userId: null,
	token: null,
	login: () => {},
	logout: () => {},
});

/* export const AuthContextProvider = (props) => {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const login = () => {
		setIsLoggedIn(true);
	};
	const logout = () => {
		setIsLoggedIn(false);
	};
	return (
		<AuthContext.Provider value={{ isLoggedIn, login, logout }}>
			{props.children}
		</AuthContext.Provider>
	);
}; */
