import { MediaData } from "../../types/types";
import { MediaCard } from "./mediaCard";

export const MediaCards = ({ mediaData }: { mediaData: MediaData[] }) => {
	if (mediaData.length === 0) {
		return (
			<p className="text-white text-3xl font-poppins flex justify-center items-center h-[20rem]">
				No media data found! Please try another set of filters.
			</p>
		);
	}

	return (
		<>
			<div className="flex flex-wrap items-center space-y-1 max-w-[90rem] mx-auto my-10">
				{mediaData.map((media, index) => (
					<MediaCard key={index} media={media} />
				))}
			</div>
		</>
	);
};
