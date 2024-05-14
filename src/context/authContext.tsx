import {
	ReactNode,
	createContext,
	useContext,
	useEffect,
	useState,
} from "react";
import { auth, db } from "../firebase";
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
	onAuthStateChanged,
	UserCredential,
	User,
} from "firebase/auth";
import { setDoc, doc, onSnapshot } from "firebase/firestore";
import { dbMedia } from "../types/types";

type AuthContextType = {
	user: User | null;
	userData: UserData;
	signUp: (email: string, password: string) => Promise<UserCredential | void>;
	logIn: (email: string, password: string) => Promise<UserCredential | void>;
	logOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({
	user: null,
	userData: {} as UserData,
	signUp: (_email: string, _password: string) => Promise.resolve(),
	logIn: (_email: string, _password: string) => Promise.resolve(),
	logOut: () => Promise.resolve(),
});

type UserData = {
	savedMedia: number[];
	toWatchMedia: number[];
};

export function AuthContextProvider({ children }: { children: ReactNode }) {
	const [user, setUser] = useState<User | null>(null);
	const [userData, setUserData] = useState<UserData>({} as UserData);

	useEffect(() => {
		onSnapshot(doc(db, "users", `${user?.email}`), (doc) => {
			const userData = doc.data();
			const savedMediaIds = userData?.savedMedia.map(
				(item: dbMedia) => item.id
			);
			const toWatchMediaIds = userData?.toWatchMedia.map(
				(item: dbMedia) => item.id
			);
			setUserData({
				savedMedia: savedMediaIds,
				toWatchMedia: toWatchMediaIds,
			});
		});
	}, [user?.email]);

	function signUp(email: string, password: string) {
		const createdUser = createUserWithEmailAndPassword(
			auth,
			email,
			password
		);
		setDoc(doc(db, "users", email), {
			savedMedia: [],
			toWatchMedia: [],
		});
		return createdUser;
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
		<AuthContext.Provider value={{ signUp, logIn, logOut, user, userData }}>
			{children}
		</AuthContext.Provider>
	);
}

export function UserAuth() {
	return useContext(AuthContext);
}
