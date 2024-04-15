import { useParams } from "react-router-dom";
import { MediaPlayer } from "./mediaDetails/mediaPlayer";
import { MediaInfo } from "./mediaDetails/mediaInfo";
import { RecommendedMedia } from "./mediaDetails/recommendedMedia";

export const TVShowDetails = () => {
	const { tvShowId } = useParams() as { tvShowId: string };

	return (
		<div className="mt-4 flex flex-col space-y-12 w-[75%] mx-auto">
			<MediaPlayer />
			<MediaInfo id={tvShowId} mediaType={"tv"} />
			<RecommendedMedia id={tvShowId} mediaType={"tv"} />
		</div>
	);
};
