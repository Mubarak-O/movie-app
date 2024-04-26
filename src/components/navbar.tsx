import { Link, useNavigate } from "react-router-dom";
import { RiMovie2Line } from "react-icons/ri";
// import { FaUser } from "react-icons/fa6";
import { UserAuth } from "../context/authContext";

export const Navbar = () => {
	const { user, logOut } = UserAuth();
	const navigate = useNavigate();
	// console.log(user);

	const handleLogout = async () => {
		try {
			await logOut();
			navigate("/");
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className="bg-secondary-colour/65 flex space-x-10 h-14 items-center px-8">
			<Link className="grow" to="/">
				<RiMovie2Line className="fill-white" size={45} />
			</Link>
			<Link className="text-2xl text-white font-k2d" to="/movies">
				Movies
			</Link>
			<Link className="text-2xl text-white font-k2d" to="/tv-shows">
				TV Shows
			</Link>
			{user?.email ? (
				<>
					<Link
						className="text-2xl text-white font-k2d"
						to="/account"
					>
						Account
					</Link>
					<button
						className="text-2xl text-white font-k2d"
						onClick={handleLogout}
					>
						Log Out
					</button>
				</>
			) : (
				<>
					<Link className="text-2xl text-white font-k2d" to="/signup">
						Sign Up
					</Link>
					<Link className="text-2xl text-white font-k2d" to="/login">
						Log In
					</Link>
				</>
			)}
		</div>
	);
};
