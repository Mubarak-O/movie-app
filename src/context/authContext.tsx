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
import { generateToasterMessage } from "../utils/errorHandler";
import { FirebaseError } from "firebase/app";
import toast from "react-hot-toast";

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
		if (user?.email) {
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
		}
	}, [user?.email]);

	async function signUp(email: string, password: string) {
		let createdUser;
		try {
			createdUser = await createUserWithEmailAndPassword(
				auth,
				email,
				password
			);
			await setDoc(doc(db, "users", email), {
				savedMedia: [],
				toWatchMedia: [],
			});
			toast.success("You have signed up successfully!");
		} catch (error) {
			if (error instanceof FirebaseError) {
				generateToasterMessage(error);
			}
			return;
		}
		return createdUser;
	}

	async function logIn(email: string, password: string) {
		let signInUser;
		try {
			signInUser = await signInWithEmailAndPassword(
				auth,
				email,
				password
			);
			toast.success("You have successfully logged in!");
		} catch (error) {
			if (error instanceof FirebaseError) {
				generateToasterMessage(error);
			}
			return;
		}
		return signInUser;
	}

	function logOut() {
		toast.success("You have logged out");
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
