// import { Link } from "react-router-dom";
import { Link } from "react-router-dom";
import { MediaData } from "../../types/types";
import { isMovie } from "../../utils/utility";

export const MediaCard = ({ media }: { media: MediaData }) => {
	const handleMediaDisplay = (): void => {
		console.log(media.id);
	};

	return (
		<div onClick={handleMediaDisplay} className=" w-1/5 p-5 text-center ">
			<Link to={`${media.id}`} className="float-start">
				{isMovie(media) ? (
					<>
						<img
							className="media-card-poster"
							src={`https://image.tmdb.org/t/p/w185/${media.poster_path}`}
							alt={media.title}
						></img>
						<div className="media-card-text">{media.title}</div>
					</>
				) : (
					<>
						<img
							className="media-card-poster"
							src={`https://image.tmdb.org/t/p/w185/${media.poster_path}`}
							alt={media.original_name}
						></img>
						<div className="media-card-text">
							{media.original_name}
						</div>
					</>
				)}
			</Link>
		</div>
	);
};
