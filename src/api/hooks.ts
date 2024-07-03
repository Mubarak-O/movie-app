import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { initMediaData } from "./requests";
import { MediaData } from "../types/types";

export function useMediaData(
	mediaType: "movie" | "tv"
): UseQueryResult<MediaData[]> {
	return useQuery({
		queryKey: ["mediaData", mediaType],
		queryFn: async () => initMediaData(mediaType),
	});
}
