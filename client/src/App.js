// Importing necessary hooks and components from React and utility functions from the API file.
import { useEffect, useState } from "react";
import { Posts, NavBar, ScoreInfo } from "./components";
import {
    getUserData,
    createUser,
    getUserById,
    loginWithGithub,
} from "./utils/api";

function App() {
    // Server URL
    const CONNECTION_URL = "https://commitpal.onrender.com/";

    // State variables to manage the app's data and re-rendering.
    const [rerender, setRerender] = useState(false);
    const [userData, setUserData] = useState({});
    const [userScore, setUserScore] = useState(null);

    // useEffect hook to fetch data on component mount and when 'rerender' changes.
    useEffect(() => {
        const fetchData = async () => {
            // Extracting the 'code' parameter from the URL which is used for authentication.
            const queryString = window.location.search;
            const urlParams = new URLSearchParams(queryString);
            const codeParam = urlParams.get("code");

            // If the code parameter is present and there's no access token, fetch it.
            if (codeParam && localStorage.getItem("accessToken") === null) {
                try {
                    const response = await fetch(
                        `${CONNECTION_URL}/user/getAccessToken?code=${codeParam}`,
                        { method: "GET" }
                    );
                    const data = await response.json();

                    // Store the access token in local storage and trigger a re-render.
                    if (data.access_token) {
                        localStorage.setItem("accessToken", data.access_token);
                        setRerender(!rerender);
                    }
                } catch (error) {
                    console.log(error);
                }
            }

            // Fetch and set user data.
            try {
                const githubData = await getUserData();
                setUserData(githubData);
                // Check if the user exists in the database, create a new one if not.
                createUser(githubData.id);
                // Get user's score from database.
                const scoreData = await getUserById(githubData.id);
                setUserScore(scoreData.points);
                //console.log("User Score:");
                //addPoints(githubData.id, 100);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, [rerender]);

    // Function to toggle the rerender state, causing the useEffect hook to run again.
    const handleRerender = () => {
        setRerender(!rerender);
    };

    // The main JSX for rendering the app.
    return (
        <div className="App text-xl mb-5">
            <header>
                {/* NavBar component with user data and rerender handler */}
                <NavBar userData={userData} onRerender={handleRerender} />
            </header>

            {localStorage.getItem("accessToken") ? (
                <>
                    <div className="p-2 mb-2">
                        <ScoreInfo
                            userScore={userScore}
                            onRerender={handleRerender}
                        />
                    </div>

                    <div className="p-2">
                        {/* Posts component to display user's posts */}
                        <Posts
                            userId={userData.id}
                            rerender={rerender}
                            handleRerender={handleRerender}
                        />
                    </div>
                </>
            ) : (
                <>
                    <div class="flex justify-center items-center m-5 mt-7">
                        <button
                            className="text-3xl font-bold p-7 rounded-lg bg-primaryDark hover:bg-secondaryBlue text-whiteDark shadow-lg ring-2 ring-blueDark duration-200 transform"
                            onClick={() => {
                                loginWithGithub();
                                handleRerender();
                            }}
                        >
                            Click here to login with Github and get started!
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}

export default App;
