import { useParams } from "react-router-dom";
import { MediaPlayer } from "./mediaDetails/mediaPlayer";
import { MediaInfo } from "./mediaDetails/mediaInfo";
import { RecommendedMedia } from "./mediaDetails/recommendedMedia";

export const MovieDetails = () => {
	const { movieId } = useParams() as { movieId: string };

	return (
		<div className="grid grid-cols-1 gap-y-20 w-[1400px] mx-auto my-10">
			<MediaPlayer />
			<MediaInfo id={movieId} mediaType={"movie"} />
			<RecommendedMedia id={movieId} mediaType={"movie"} />
		</div>
	);
};
