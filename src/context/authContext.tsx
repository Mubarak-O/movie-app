import {
	ReactNode,
	createContext,
	useContext,
	useEffect,
	useState,
} from "react";
import { auth } from "../firebase";
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
	onAuthStateChanged,
	UserCredential,
	User,
} from "firebase/auth";

type AuthContextType = {
	user: User | null;
	signUp: (email: string, password: string) => Promise<UserCredential | void>;
	logIn: (email: string, password: string) => Promise<UserCredential | void>;
	logOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({
	user: null,
	signUp: (_email: string, _password: string) => Promise.resolve(),
	logIn: (_email: string, _password: string) => Promise.resolve(),
	logOut: () => Promise.resolve(),
});

export function AuthContextProvider({ children }: { children: ReactNode }) {
	const [user, setUser] = useState<User | null>(null);

	function signUp(email: string, password: string) {
		return createUserWithEmailAndPassword(auth, email, password);
	}

	function logIn(email: string, password: string) {
		return signInWithEmailAndPassword(auth, email, password);
	}

	function logOut() {
		return signOut(auth);
	}

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
			setUser(currentUser);
		});
		return () => {
			unsubscribe();
		};
	});

	return (
		<AuthContext.Provider value={{ signUp, logIn, logOut, user }}>
			{children}
		</AuthContext.Provider>
	);
}

export function UserAuth() {
	return useContext(AuthContext);
}
