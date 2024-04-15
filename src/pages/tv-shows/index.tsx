import { requests } from "../../api/requests";
import { Media } from "../../components/mediaList/media";

export const TVShows = () => {
	return (
		<Media fetchUrl={requests.tvshows.requestDefault} mediaType={"tv"} />
	);
};
