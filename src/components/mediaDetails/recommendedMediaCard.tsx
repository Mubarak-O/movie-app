import { Link } from "react-router-dom";
import { MediaData } from "../../types/types";
import { isMovie } from "../../utils/utility";
import { FaPlay } from "react-icons/fa6";

export const RecommendedMediaCard = ({ media }: { media: MediaData }) => {
	return (
		<div className="bg-secondary-colour rounded-2xl space-y-3 pb-4">
			<img
				className=" rounded-t-2xl "
				src={`https://image.tmdb.org/t/p/w300/${media.poster_path}`}
				alt={isMovie(media) ? media.title : media.original_name}
			></img>
			<div className="text-slate-400/90 font-maven font-semibold flex flex-row p-2 mx-10">
				<p className="grow">
					{isMovie(media)
						? media.release_date.split("-")[0]
						: media.first_air_date.split("-")[0]}
				</p>
				<p>{isMovie(media) ? "Movie" : "TV-Show"}</p>
			</div>
			<div className="text-white text-2xl font-medium font-rubik flex justify-center pb-4">
				<p className="truncate max-w-[15ch]">
					{isMovie(media)
						? media.original_title
						: media.original_name}
				</p>
			</div>
			<Link to={`../${media.id}`} reloadDocument>
				<button className="text-white flex flex-row mx-auto items-center justify-center space-x-6 bg-accent-colour rounded-md p-1 w-[85%]">
					<FaPlay className="" size={22} />
					<span className="text-lg font-maven font-semibold">
						Watch Now
					</span>
				</button>
			</Link>
		</div>
	);
};
