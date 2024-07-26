// import { Link } from "react-router-dom";
import { Link } from "react-router-dom";
import { MediaData } from "../../types/types";
import { isMovie } from "../../utils/utility";

export const MediaCard = ({ media }: { media: MediaData }) => {
	const title = isMovie(media) ? media.title : media.original_name;
	return (
		<div className=" w-1/5 p-5 ">
			<Link to={`${media.id}`} className="float-start">
				<img
					className="media-card-poster"
					src={`https://image.tmdb.org/t/p/w185/${media.poster_path}`}
					alt={title}
				></img>
			</Link>
		</div>
	);
};
