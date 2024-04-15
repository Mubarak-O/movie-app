import { requests } from "../../api/requests";
import { Carousel } from "../../components/carousel/carousel";
// import { Row } from "../../components/row/row";

export const Home = () => {
	return (
		<div className="flex flex-col space-y-10">
			<div className="mt-10">
				<Carousel fetchUrl={requests.movies.requestTrending} />
			</div>
			{/* <div className="flex flex-col space-y-10">
				<Row title="Upcoming" fetchUrl={requests.requestUpcoming} />
				<Row
					title="Now Playing"
					fetchUrl={requests.requestNowPlaying}
				/>
				<Row title="Top Rated" fetchUrl={requests.requestTopRated} />
			</div> */}
		</div>
	);
};
