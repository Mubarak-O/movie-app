import { Fragment, useEffect, useState } from "react";
import { DetailedMediaData, dbMedia } from "../../types/types";
import { getMediaDetails } from "../../api/requests";
import { isMovie, getDirector, getCast } from "../../utils/utility";
import {
	FaHeart,
	FaRegHeart,
	FaBookmark,
	FaRegBookmark,
} from "react-icons/fa6";
import { UserAuth } from "../../context/authContext";
import { arrayUnion, doc, updateDoc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";
import toast from "react-hot-toast";

interface MediaInfoProps {
	id: string;
	mediaType: "movie" | "tv";
}

export const MediaInfo = ({ id, mediaType }: MediaInfoProps) => {
	const [mediaData, setMediaData] = useState<DetailedMediaData>(
		{} as DetailedMediaData
	);
	const title = isMovie(mediaData) ? mediaData.title : mediaData.name;

	const [liked, setLiked] = useState<boolean>(false);
	const [watchLater, setWatchLater] = useState<boolean>(false);
	const { user, userData } = UserAuth();

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

	useEffect(() => {
		const checkSaved = () => {
			if (userData?.savedMedia?.includes(+id)) {
				setLiked(true);
			}
		};

		const checkBookmarked = () => {
			if (userData?.toWatchMedia?.includes(+id)) {
				setWatchLater(true);
			}
		};

		checkSaved();
		checkBookmarked();
	}, []);

	const docId = doc(db, "users", `${user?.email}`);

	const likeMedia = async () => {
		if (user?.email) {
			setLiked(!liked);
			await updateDoc(docId, {
				savedMedia: arrayUnion({
					id: mediaData.id,
					title: title,
					img: mediaData.poster_path,
					type: isMovie(mediaData) ? "movies" : "tv-shows",
				}),
			});
			toast.success(
				<p>
					Added <b>{title}</b> to your <i>favourites</i> list!
				</p>,
				{
					icon: "❤️",
				}
			);
		} else {
			toast.error(
				`Please log in to save a ${
					isMovie(mediaData) ? "Movie" : "Tv Show"
				}`
			);
		}
	};

	const removeLikedMedia = async () => {
		if (user?.email && liked) {
			setLiked(!liked);
			try {
				const docRef = await getDoc(docId);
				const docData: dbMedia[] = docRef.data()?.savedMedia;
				const result = docData.filter((item) => item.id !== +id);
				await updateDoc(docId, {
					savedMedia: result,
				});
				toast.success(
					<p>
						Removed <b>{title}</b> from your <i>favourites</i> list!
					</p>,
					{
						icon: "🗑️",
					}
				);
			} catch (error) {
				console.log(error);
			}
		}
	};

	const bookmarkMedia = async () => {
		if (user?.email) {
			setWatchLater(!watchLater);
			await updateDoc(docId, {
				toWatchMedia: arrayUnion({
					id: mediaData.id,
					title: title,
					img: mediaData.poster_path,
					type: isMovie(mediaData) ? "movies" : "tv-shows",
				}),
			});
			toast.success(
				<p>
					Added <b>{title}</b> to your <i>watch later</i> list!
				</p>,
				{
					icon: "📌",
				}
			);
		} else {
			toast.error(
				`Please log in to bookmark a ${
					isMovie(mediaData) ? "Movie" : "Tv Show"
				}`
			);
		}
	};

	const removeBookmarkMedia = async () => {
		if (user?.email && watchLater) {
			setWatchLater(!watchLater);
			try {
				const docRef = await getDoc(docId);
				const docData: dbMedia[] = docRef.data()?.toWatchMedia;
				const result = docData.filter((item) => item.id !== +id);
				await updateDoc(docId, {
					toWatchMedia: result,
				});
				toast.success(
					<p>
						Removed <b>{title}</b> from your <i>watch later</i>
						list!
					</p>,
					{
						icon: "🗑️",
					}
				);
			} catch (error) {
				console.log(error);
			}
		}
	};

	return (
		<div className="bg-secondary-colour flex flex-row rounded-[35px] space-x-10">
			<div className="w-[25%] shrink-0">
				<img
					className="w-full h-auto object-cover rounded-l-[35px]"
					src={`https://image.tmdb.org/t/p/w342/${mediaData.poster_path}`}
					alt={title}
				></img>
			</div>
			<div className="flex-1 flex-col px-10 text-white space-y-10">
				<div className="flex flex-col space-y-2 my-10">
					<div className="flex flex-row items-center">
						<h1 className="text-5xl font-k2d capitalize grow">
							{title}
						</h1>
						<span>
							{liked ? (
								<FaHeart
									size={30}
									className="cursor-pointer"
									onClick={removeLikedMedia}
								/>
							) : (
								<FaRegHeart
									size={30}
									className="cursor-pointer"
									onClick={likeMedia}
								/>
							)}
						</span>
						<span>
							{watchLater ? (
								<FaBookmark
									size={30}
									className="cursor-pointer"
									onClick={removeBookmarkMedia}
								/>
							) : (
								<FaRegBookmark
									size={30}
									className="cursor-pointer"
									onClick={bookmarkMedia}
								/>
							)}
						</span>
					</div>
					<p className="font-maven text-lg line-clamp-3">
						{mediaData.overview}
					</p>
				</div>
				<div className="grid grid-cols-2 gap-y-4 border-2 border-green-300">
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
					<div className="mediaInfo-row items-center">
						<h2 className="mediaInfo-rowTitle">Genre:</h2>
						<p className="mediaInfo-rowText space-x-2">
							{mediaData.genres
								?.slice(0, 3)
								.map((genre, index) => (
									<Fragment key={index}>
										<span>{genre.name}</span>
										{index < mediaData.genres.length - 1 &&
											", "}
									</Fragment>
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
					<div className="mediaInfo-row col-span-2 mt-4">
						<h2 className="mediaInfo-rowTitle">Cast:</h2>
						<p className="mediaInfo-rowText space-x-2">
							{getCast(mediaData.credits?.cast).map(
								(name, index) => (
									<Fragment key={index}>
										<span>{name}</span>
										{index <
											getCast(mediaData.credits?.cast)
												.length -
												1 && ", "}
									</Fragment>
								)
							)}
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};
