import { loginWithGithub } from "../utils/api";

/*
Component for the navbar at the top of the page with logo and user info.
It also has a button for handling login and logout.
*/

const NavBar = ({ userData, onRerender }) => {
    return (
        <div className="inline-flex items-center mb-5 p-3.5 pb-3 text-whiteDark bg-primaryDark w-full justify-between">
            {/* Logo and application name */}
            <div className="flex font-bold lg:text-4xl text-2xl">
                <img
                    className="w-14"
                    src="https://i.imgur.com/RZ5OA8b.png"
                    alt="logo"
                ></img>
                <div className="ml-1 translate-y-1.5 font-mono">
                    Commit<span className=" font-sans text-greenDark">Pal</span>
                </div>
            </div>

            {/* User login/logout section */}
            <div className="flex items-center">
                {/* Check for an access token to determine login status */}
                {localStorage.getItem("accessToken") ? (
                    <>
                        {/* Display user info and logout button if logged in */}
                        <div className="font-semibold inline-flex items-center rounded-md p-1">
                            <button
                                className="text-sm inline-flex items-center rounded-3xl p-2.5 border-2 mr-3 border-softWhite duration-100 transform hover:bg-redDark font-semibold transition-all"
                                onClick={() => {
                                    localStorage.removeItem("accessToken");
                                    onRerender();
                                }}
                            >
                                Log Out
                            </button>
                            <img
                                src={userData?.avatar_url}
                                className="lg:w-14 md:w-11 w-11 rounded-full border-2 border-whiteDark"
                                alt="User Icon"
                            />
                        </div>
                    </>
                ) : (
                    <>
                        {/* Display login button if not logged in */}
                        <button
                            className="text-sm inline-flex items-center rounded-3xl p-2.5 border-2 mr-3 border-whiteDark duration-100 transform hover:bg-blueDark font-semibold transition-all"
                            onClick={() => {
                                loginWithGithub();
                                onRerender();
                            }}
                        >
                            Login
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

export default NavBar;
