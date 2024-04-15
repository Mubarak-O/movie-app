export const Auth = () => {
	// TODO:
	// Auth will be done using Firebase

	return (
		<div className="flex flex-col absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 space-y-4">
			<p className="text-white text-xl font-k2d">
				Welcome! Login by registering as a Guest below!
			</p>
			<form className="flex flex-col">
				<button
					className="bg-accent-colour p-3 rounded-lg text-lg font-semibold"
					onClick={() => null}
				>
					Log In
				</button>
			</form>
		</div>
	);
};
