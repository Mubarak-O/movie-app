import { FaCirclePlay } from "react-icons/fa6";

export const MediaPlayer = () => {
	return (
		<div className="py-4">
			<div className="bg-black rounded-lg h-[60vh] flex justify-center items-center">
				<FaCirclePlay
					className="fill-slate-100 cursor-pointer"
					size={80}
				/>
			</div>
		</div>
	);
};
