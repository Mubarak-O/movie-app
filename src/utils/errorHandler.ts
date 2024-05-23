import { FirebaseError } from "firebase/app";
import toast from "react-hot-toast";

export const generateToasterMessage = (error: FirebaseError) => {
	switch (error?.code) {
		// Sign Up errors
		case "auth/weak-password":
			toast.error(
				"The password is too weak. Please choose a stronger password."
			);
			break;
		case "auth/email-already-in-use":
			toast.error(
				"This email is already in use. Please use a different email."
			);
			break;
		case "auth/invalid-email":
			toast.error(
				"The email address is not valid. Please enter a valid email address."
			);
			break;

		// Log In errors
		case "auth/invalid-login-credentials":
			toast.error(
				"Invalid login credentials. Please check your email and password."
			);
			break;

		// Uknown errors
		default:
			console.log(`Uknown error: ${error.code}`);
	}
};
