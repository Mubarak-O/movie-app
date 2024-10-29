import { useEffect, useState } from "react";
import { Grid } from "../../components/grid/grid";
import {
	FaHeart,
	FaRegHeart,
	FaBookmark,
	FaRegBookmark,
} from "react-icons/fa6";
import { onSnapshot, doc } from "firebase/firestore";
import { UserAuth } from "../../context/authContext";
import { db } from "../../firebase";
import { dbMedia } from "../../types/types";

export const Account = () => {
	const [currentView, setCurrentView] = useState<string>("liked");
	const [savedMedia, setSavedMedia] = useState<dbMedia[]>([] as dbMedia[]);
	const [toWatchMedia, setToWatchMedia] = useState<dbMedia[]>(
		[] as dbMedia[]
	);
	const { user } = UserAuth();

	useEffect(() => {
		onSnapshot(doc(db, "users", `${user?.email}`), (doc) => {
			setSavedMedia(doc.data()?.savedMedia);
			setToWatchMedia(doc.data()?.toWatchMedia);
		});
	}, [user?.email]);

	const toggleView = (view: "liked" | "bookmarked") => {
		setCurrentView(view);
	};

	const userRefDoc = doc(db, "users", `${user?.email}`);

	return (
		<>
			<h1 className="p-2 ml-10 text-xl text-white font-maven">
				Welcome: {user?.email}
			</h1>
			<div className="text-white text-3xl font-poppins flex flex-row max-w-fit mx-auto">
				<button
					className={`flex flex-row gap-x-4 p-3 rounded-tl-2xl bg-neutral-700/45 ${
						currentView === "liked" ? "bg-neutral-950" : ""
					}`}
					onClick={() => toggleView("liked")}
					aria-pressed={currentView === "liked"}
				>
					{currentView === "liked" ? (
						<FaHeart className="fill-red-500" />
					) : (
						<FaRegHeart className="text-white/50" />
					)}{" "}
					<span
						className={`${
							currentView === "liked"
								? "text-white"
								: "text-white/50"
						}`}
					>
						Liked
					</span>
				</button>

				<button
					className={`flex flex-row gap-x-4 p-3 rounded-tr-2xl bg-neutral-700/45 ${
						currentView === "bookmarked" ? "bg-neutral-950" : ""
					}`}
					onClick={() => toggleView("bookmarked")}
					aria-pressed={currentView === "bookmarked"}
				>
					{currentView === "bookmarked" ? (
						<FaBookmark className="fill-yellow-500" />
					) : (
						<FaRegBookmark className="text-white/50" />
					)}
					<span
						className={`${
							currentView === "bookmarked"
								? "text-white"
								: "text-white/50"
						}`}
					>
						Bookmarked
					</span>
				</button>
			</div>
			<div>
				{currentView === "liked" ? (
					<Grid
						media={savedMedia}
						type="saved"
						userRefDoc={userRefDoc}
					/>
				) : (
					<Grid
						media={toWatchMedia}
						type="bookmarked"
						userRefDoc={userRefDoc}
					/>
				)}
			</div>
		</>
	);
};
