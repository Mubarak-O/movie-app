import { MediaData } from "../../types/types";
import { MediaCard } from "./mediaCard";

export const MediaCards = ({ mediaData }: { mediaData: MediaData[] }) => {
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
