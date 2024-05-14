import { useEffect, useState } from "react";
import { Row } from "../../components/row/row";
import { onSnapshot, doc } from "firebase/firestore";
import { UserAuth } from "../../context/authContext";
import { db } from "../../firebase";
import { dbMedia } from "../../types/types";

export const Account = () => {
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

	const userRefDoc = doc(db, "users", `${user?.email}`);

	return (
		<>
			<h1 className="p-2 ml-10 text-xl text-white font-maven">
				Welcome: {user?.email}
			</h1>
			<Row
				title="My Movies & TV Shows"
				media={savedMedia}
				type="saved"
				userRefDoc={userRefDoc}
			/>
			<Row
				title="My Bookmarked Movies & TV Shows"
				media={toWatchMedia}
				type="bookmarked"
				userRefDoc={userRefDoc}
			/>
		</>
	);
};
