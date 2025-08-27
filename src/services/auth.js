// Local storage based auth utilities (temporary until real backend)
// Key used in localStorage
const USERS_KEY = 'app_users';
const SESSION_KEY = 'app_session_user_id';

function loadUsers() {
	try {
		const raw = localStorage.getItem(USERS_KEY);
		if (!raw) return [];
		return JSON.parse(raw);
	} catch {
		return [];
	}
}

function saveUsers(users) {
	try {
		localStorage.setItem(USERS_KEY, JSON.stringify(users));
	} catch {
		// ignore write errors
	}
}

export function listUsers() {
	return loadUsers();
}

export function findUserByEmail(email) {
	return loadUsers().find(u => u.email.toLowerCase() === email.toLowerCase());
}

export function registerUser({ username, email, password }) {
	const users = loadUsers();
	if (users.some(u => u.email.toLowerCase() === email.toLowerCase())) {
		throw new Error('Email already registered');
	}
	const newUser = {
		id: crypto.randomUUID ? crypto.randomUUID() : String(Date.now()),
		username: username.trim(),
		email: email.trim(),
		password, // NOTE: Never store plaintext passwords in production.
		createdAt: new Date().toISOString(),
	};
	users.push(newUser);
	saveUsers(users);
	return newUser;
}

	export function loginUser({ email, password }) {
		const user = findUserByEmail(email);
		if (!user || user.password !== password) {
			throw new Error('Invalid email or password');
		}
			try {
				localStorage.setItem(SESSION_KEY, user.id);
			} catch {
				// ignore
			}
		return user;
	}

	export function logoutUser() {
			try {
				localStorage.removeItem(SESSION_KEY);
			} catch {
				// ignore
			}
	}

	export function getCurrentUser() {
		try {
			const id = localStorage.getItem(SESSION_KEY);
			if (!id) return null;
			return loadUsers().find(u => u.id === id) || null;
		} catch {
			return null;
		}
	}

// Basic password strength heuristic
export function passwordStrength(pw) {
	let score = 0;
	if (pw.length >= 8) score++;
	if (/[A-Z]/.test(pw)) score++;
	if (/[a-z]/.test(pw)) score++;
	if (/\d/.test(pw)) score++;
	if (/[^A-Za-z0-9]/.test(pw)) score++;
	const labels = ['Very weak', 'Weak', 'Fair', 'Good', 'Strong', 'Very strong'];
	return { score, label: labels[score] || labels[0] };
}

