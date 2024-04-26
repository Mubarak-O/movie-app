import { MdEmail } from "react-icons/md";
import { FaRegEye } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../../context/authContext";
import { FormEvent, useState } from "react";

export const LogIn = () => {
	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [error, setError] = useState("");
	const { user, logIn } = UserAuth();
	const navigate = useNavigate();

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setError("");
		try {
			await logIn(email, password);
			navigate("/");
		} catch (error: unknown) {
			if (error instanceof Error) {
				console.log(error);
				setError(error.message);
			}
		}
	};

	return (
		<div className="flex flex-col absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 space-y-4">
			<div className="bg-secondary-colour p-8 rounded-2xl">
				<div className="flex flex-col items-center">
					<p className="text-white text-2xl font-k2d mb-4">Log In</p>
					<div className="flex flex-row space-x-2">
						<p className="text-gray-400/80 text-md font-k2d mb-4">
							New to MoviesIO?
						</p>
						<Link
							className="text-accent-colour font-bold font-k2d"
							to="/signup"
						>
							Sign Up
						</Link>
					</div>
					{error && <p className="p-3 bg-red-400 my-2">{error}</p>}
				</div>
				<form
					onSubmit={handleSubmit}
					className="flex flex-col space-y-6 font-maven w-[300px]"
				>
					<div className="flex flex-row items-center bg-gray-700 p-3 rounded-xl ">
						<input
							onChange={(e) => setEmail(e.target.value)}
							className="bg-transparent p-2 focus:outline-none text-white grow"
							type="email"
							autoComplete="username"
							placeholder="Email Address"
							required
						/>
						<MdEmail size={30} className="fill-slate-300" />
					</div>
					<div className="flex flex-row items-center bg-gray-700 p-3 rounded-xl">
						<input
							onChange={(e) => setPassword(e.target.value)}
							className="bg-transparent p-2 focus:outline-none text-white grow"
							type="password"
							placeholder="Password"
							autoComplete="current-password"
							required
						/>
						<FaRegEye size={30} className="fill-slate-300" />
					</div>
					<button className="bg-accent-colour p-3 rounded-xl text-xl font-semibold">
						Log In
					</button>
				</form>
			</div>
		</div>
	);
};
