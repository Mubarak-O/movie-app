import { Navigate } from "react-router-dom";
import { UserAuth } from "../context/authContext";
import { ReactNode } from "react";

export const ProtectedRoute = ({ children }: { children: ReactNode }) => {
	const { user } = UserAuth();

	if (!user) {
		return <Navigate to="/" />;
	} else {
		return children;
	}
};
