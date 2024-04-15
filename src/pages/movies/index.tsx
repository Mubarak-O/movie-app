import { requests } from "../../api/requests";
import { Media } from "../../components/mediaList/media";

export const Movies = () => {
	return (
		<Media fetchUrl={requests.movies.requestDefault} mediaType={"movie"} />
	);
};
