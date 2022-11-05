import { useState, useEffect, useCallback } from 'react';

let logoutTimer;
export const useAuth = () => {
	const [userId, setUserId] = useState();
	const [token, setToken] = useState();
	const [tokenExpDate, setTokenExpDate] = useState();

	const login = useCallback((uid, token, expiration) => {
		setUserId(uid);
		setToken(token);
		const tokenExp =
			expiration || new Date(new Date().getTime() + 1000 * 60 * 60);

		setTokenExpDate(tokenExp);
		localStorage.setItem(
			'userData',
			JSON.stringify({
				userId: uid,
				token: token,
				expiration: tokenExp.toISOString(),
			})
		);
	}, []);

	const logout = useCallback(() => {
		setUserId(null);
		setToken(null);
		setTokenExpDate(null);
		localStorage.removeItem('userData');
	}, []);
	useEffect(() => {
		const storedData = JSON.parse(localStorage.getItem('userData'));
		if (
			storedData &&
			storedData.token &&
			new Date(storedData.expiration) > new Date()
		) {
			login(
				storedData.userId,
				storedData.token,
				new Date(storedData.expiration)
			);
		}
	}, [login]);
	useEffect(() => {
		if (token && tokenExpDate) {
			const remainingTime = tokenExpDate.getTime() - new Date().getTime();
			logoutTimer = setTimeout(logout, remainingTime);
		} else {
			clearTimeout(logoutTimer);
		}
	}, [token, logout, tokenExpDate]);
	return { userId, token, login, logout };
};
