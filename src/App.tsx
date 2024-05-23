import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/navbar";
// import { Searchbar } from "./components/searchbar";
import "./App.css";
import { SignUp } from "./pages/signup";
import { Home } from "./pages/home";
import { Movies } from "./pages/movies";
import { MovieDetails } from "./components/movieDetails";
import { TVShows } from "./pages/tv-shows";
import { TVShowDetails } from "./components/tvshowDetails";
import { AuthContextProvider } from "./context/authContext";
import { LogIn } from "./pages/login";
import { ProtectedRoute } from "./components/protectedRoute";
import { Account } from "./pages/account";
import { Toaster } from "react-hot-toast";

function App() {
	return (
		<AuthContextProvider>
			<BrowserRouter>
				<Toaster
					position="top-center"
					toastOptions={{
						success: {
							duration: 2500,
						},
					}}
				/>
				<Navbar />
				{/* <Searchbar /> */}
				<Routes>
					<Route path={"/"} element={<Home />} />
					<Route path={"/signup"} element={<SignUp />} />
					<Route path={"/login"} element={<LogIn />} />
					<Route
						path="/account"
						element={
							<ProtectedRoute>
								<Account />
							</ProtectedRoute>
						}
					/>
					<Route path={"/movies"}>
						<Route index element={<Movies />} />
						<Route path={":movieId"} element={<MovieDetails />} />
					</Route>
					<Route path={"tv-shows"}>
						<Route index element={<TVShows />} />
						<Route path={":tvShowId"} element={<TVShowDetails />} />
					</Route>
				</Routes>
			</BrowserRouter>
		</AuthContextProvider>
	);
}

export default App;
