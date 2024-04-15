import { useEffect, useState } from "react";
import { DetailedMediaData } from "../../types/types";
import { getMediaDetails } from "../../api/requests";
import { isMovie, getDirector, getCast } from "../../utils/utility";

interface MediaInfoProps {
	id: string;
	mediaType: "movie" | "tv";
}

export const MediaInfo = ({ id, mediaType }: MediaInfoProps) => {
	const [mediaData, setMediaData] = useState<DetailedMediaData>(
		{} as DetailedMediaData
	);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const newData = await getMediaDetails(id, mediaType);
				setMediaData(newData);
			} catch (error) {
				console.error(error);
			}
		};

		fetchData();
	}, []);

	console.log(mediaData);

	return (
		<div className="bg-secondary-colour flex flex-row rounded-[35px] space-x-10">
			<div className="">
				<img
					className="h-full rounded-l-[35px] "
					src={`https://image.tmdb.org/t/p/w300/${mediaData.poster_path}`}
					alt={
						isMovie(mediaData)
							? mediaData.title
							: mediaData.original_name
					}
				></img>
			</div>
			<div className="w-[70%] p-2 text-white space-y-10">
				<div className="flex flex-col space-y-4 pt-2">
					<h1 className="text-3xl font-k2d capitalize">
						{isMovie(mediaData)
							? mediaData.original_title
							: mediaData.original_name}
					</h1>
					<p className="font-maven text-lg">{mediaData.overview}</p>
				</div>
				<div className="grid grid-cols-2 gap-y-5">
					<div className="mediaInfo-row items-center">
						<h2 className="mediaInfo-rowTitle">Release Date:</h2>
						<p className="mediaInfo-rowText">
							{isMovie(mediaData)
								? mediaData.release_date
								: mediaData.first_air_date}
						</p>
					</div>
					<div className="mediaInfo-row items-center">
						<h2 className="mediaInfo-rowTitle">Director:</h2>
						<p className="mediaInfo-rowText">
							{getDirector(mediaData.credits?.crew)}
						</p>
					</div>
					<div className="mediaInfo-row items-center">
						<h2 className="mediaInfo-rowTitle">Country:</h2>
						<p className="mediaInfo-rowText">
							{mediaData.production_countries?.[0]?.name}
						</p>
					</div>
					<div className="mediaInfo-row">
						<h2 className="mediaInfo-rowTitle">Cast:</h2>
						<p className="mediaInfo-rowText space-x-3">
							{getCast(mediaData.credits?.cast).map(
								(name, index) => (
									<span key={index}>{name}</span>
								)
							)}
						</p>
					</div>
					<div className="mediaInfo-row items-center">
						<h2 className="mediaInfo-rowTitle">Genre:</h2>
						<p className="mediaInfo-rowText space-x-3">
							{mediaData.genres
								?.slice(0, 3)
								.map((genre, index) => (
									<span key={index}>{genre.name}</span>
								))}
						</p>
					</div>
					{!isMovie(mediaData) && (
						<div className="mediaInfo-row items-center">
							<h2 className="mediaInfo-rowTitle">Seasons:</h2>
							<p className="mediaInfo-rowText">
								{mediaData.number_of_seasons}
							</p>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};
