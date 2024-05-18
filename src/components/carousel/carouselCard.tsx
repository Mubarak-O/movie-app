import { Movie } from "../../types/types";
import { FaPlay } from "react-icons/fa6";
import { getGenreNameById } from "../../utils/utility";
import { FaRegClock } from "react-icons/fa6";
import { TbCategory } from "react-icons/tb";
import { Link } from "react-router-dom";

interface CarouselCardProps {
	movie: Movie;
}

export const CarouselCard = ({ movie }: CarouselCardProps) => {
	const genres = movie?.genre_ids
		.map((genre_id) => getGenreNameById(genre_id))
		.slice(0, 3);

	const release_year = movie?.release_date.split("-")[0];

	return (
		<div className="relative group">
			<img
				className="group-hover:opacity-50 transition-opacity duration-300"
				src={`https://image.tmdb.org/t/p/w500/${movie?.poster_path}`}
				alt={movie?.title}
			></img>
			<div className="invisible absolute inset-0 flex flex-col space-y-2 justify-end px-6 py-8 bg-fade">
				<div className="text-3xl font-bold font-maven">
					{movie?.title}
				</div>
				<div className="flex flex-row space-x-8 items-center">
					<div className="flex flex-row items-center">
						<FaRegClock className="fill-accent-colour mr-2" />
						{release_year}
					</div>
					<div className="flex flex-row space-x-3 items-center">
						<TbCategory
							className="stroke-accent-colour"
							size={20}
						/>
						{genres?.map((genre, index) => (
							<p className="font-maven" key={index}>
								{genre}
							</p>
						))}
					</div>
					<div className="text-sm font-maven font-medium bg-accent-colour rounded-lg p-[6px]">
						IMDB {movie?.vote_average.toFixed(1)}
					</div>
				</div>
				<p className="text-md line-clamp-4 font-maven">
					{movie?.overview}
				</p>
				<div className="py-2 mx-auto w-[50%]">
					<Link to={`/movies/${movie.id}`}>
						<div className="btn-primary">
							<FaPlay size={25} />
							<span className="font-k2d text-xl">Watch Now</span>
						</div>
					</Link>
				</div>
			</div>
		</div>
	);
};
