import { useEffect, useState } from "react";
import { getRecommendedMedia } from "../../api/requests";
import { MediaData } from "../../types/types";
import { RecommendedMediaCard } from "./recommendedMediaCard";

export const RecommendedMedia = ({
	id,
	mediaType,
}: {
	id: string;
	mediaType: "movie" | "tv";
}) => {
	const [recommendedMedia, setRecommendedMedia] = useState<MediaData[]>([]);

	useEffect(() => {
		const fetchData = async () => {
			const data = await getRecommendedMedia(id, mediaType);
			setRecommendedMedia(data);
		};
		fetchData();
	}, []);

	return (
		recommendedMedia.length > 1 && (
			<div className="grid grid-cols-1 gap-4">
				<h1 className="font-rubik text-white text-4xl">Recommended </h1>
				<div className="flex flex-row justify-between">
					{recommendedMedia.map((media, index) => (
						<RecommendedMediaCard key={index} media={media} />
					))}
				</div>
			</div>
		)
	);
};
