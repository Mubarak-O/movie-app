import { requests } from "../../api/requests";
import { Carousel } from "../../components/carousel/carousel";

export const Home = () => {
	return (
		<div className="flex flex-col space-y-10">
			<div className="mt-10">
				<Carousel fetchUrl={requests.movies.requestTrending} />
			</div>
		</div>
	);
};
