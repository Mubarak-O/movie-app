import { NavLink, useNavigate } from "react-router-dom";
import { RiMovie2Line } from "react-icons/ri";
import { UserAuth } from "../context/authContext";
import { useEffect } from "react";

export const Navbar = () => {
	const { user, logOut } = UserAuth();
	const navigate = useNavigate();

	useEffect(() => {}, [user?.email]);

	const handleLogout = async () => {
		try {
			await logOut();
			navigate("/");
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className="navbar">
			<NavLink className="mr-auto" to="/">
				<RiMovie2Line className="fill-white" size={45} />
			</NavLink>
			<NavLink to="/movies" end>
				Movies
			</NavLink>
			<NavLink to="/tv-shows" end>
				TV Shows
			</NavLink>
			{user?.email ? (
				<>
					<NavLink to="/account">Account</NavLink>
					<button onClick={handleLogout}>Log Out</button>
				</>
			) : (
				<>
					<NavLink to="/signup">Sign Up</NavLink>
					<NavLink to="/login">Log In</NavLink>
				</>
			)}
		</div>
	);
};
