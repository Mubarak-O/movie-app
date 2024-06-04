import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { createFilteredMediaData, createSearchMediaData } from "./requests";
import { MediaData } from "../types/types";

export function useFilteredMedia(
	fetchUrl: string,
	genre?: string,
	sorting?: string,
	year?: string[]
): UseQueryResult<MediaData[]> {
	return useQuery({
		queryKey: ["mediaData", fetchUrl, genre, sorting, year],
		queryFn: async () =>
			createFilteredMediaData(fetchUrl, genre, sorting, year),
		initialData: [] as MediaData[],
	});
}

export function useSearchedMedia(
	query: string,
	mediaType: "movie" | "tv"
): UseQueryResult<MediaData[]> {
	return useQuery({
		queryKey: ["mediaData", query],
		queryFn: async () => createSearchMediaData(query, mediaType),
		initialData: [] as MediaData[],
	});
}
