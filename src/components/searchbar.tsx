import { FaSearch } from "react-icons/fa";

export const Searchbar = () => {
	return (
		<form className="w-[600px] relative mx-auto">
			<div className="relative">
				<input
					type="search"
					placeholder="Enter keywords..."
					className="w-full p-4 rounded-xl bg-secondary-colour/65 text-white font-k2d"
				/>
				<button className="absolute right-0 top-1/2 -translate-y-1/2 p-3 bg-accent-colour rounded-r-xl">
					<FaSearch className="fill-white" size={32} />
				</button>
			</div>
		</form>
	);
};
