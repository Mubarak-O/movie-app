import { Link } from "react-router-dom";
import { RiMovie2Line } from "react-icons/ri";

export const Navbar = () => {
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
			<Link className="text-2xl text-white font-k2d" to="/auth">
				Log In
			</Link>
		</div>
	);
};
