import { useState } from "react";
import { Movie } from "../../types/types";
import { FaRegHeart, FaHeart } from "react-icons/fa6";

interface RowItemProps {
	movie: Movie;
}

export const RowItem = ({ movie }: RowItemProps) => {
	const [like, setLike] = useState(false);
	return (
		<div className="inline-block p-5" tabIndex={0}>
			<img
				className="drop-shadow-lg"
				src={`https://image.tmdb.org/t/p/w185/${movie?.poster_path}`}
				alt={movie?.title}
			></img>
			<div className="flex flex-row items-center p-1">
				<p className="truncate max-w-[16ch] grow font-maven text-white font-semibold">
					{movie.title}
				</p>
				<p>
					{like ? (
						<FaRegHeart
							className="fill-white cursor-pointer"
							size={20}
						/>
					) : (
						<FaHeart
							className="fill-white cursor-pointer"
							size={20}
						/>
					)}
				</p>
			</div>
		</div>
	);
};
