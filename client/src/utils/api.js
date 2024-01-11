import axios from "axios";
const CLIENT_ID = "7107eaeb61258e70aab9";
const CONNECTION_URL = "https://commitclipstest.onrender.com";

export const loginWithGithub = () => {
    window.location.assign(
        `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}`
    );
};

/*
 Function to fetch all commits made in a specific repo from the backend. 
 Params:
    - repoName : name of the repo to get commits from.
*/
export const createUser = async (id) => {
    return await fetch(`${CONNECTION_URL}/user/${id}`, {
        method: "POST",
        headers: {
            Authorization: `token ${localStorage.getItem("accessToken")}`,
        },
    })
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            return data;
        });
};

export const getUserById = async (id) => {
    return await fetch(`${CONNECTION_URL}/user/${id}`, {
        method: "GET",
        headers: {
            Authorization: `token ${localStorage.getItem("accessToken")}`,
        },
    })
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            return data;
        });
};

export const addPoints = async (id, pointsToAdd) => {
    fetch(`${CONNECTION_URL}/user/${id}/addPoints`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ pointsToAdd }),
    })
        .then((response) => response.json())
        .then((data) => console.log(data))
        .catch((error) => console.error("Error:", error));
};

/*
 Function to retrieve data about logged in user from backend.
*/
export const getUserData = async () => {
    let returnData = {};
    await fetch(`${CONNECTION_URL}/user/getUserData`, {
        method: "GET",
        headers: {
            Authorization: `token ${localStorage.getItem("accessToken")}`,
        },
    })
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            returnData = data;
        });
    return returnData;
};

/*
 Function to get all public repos on the users account from the backend.
*/
export const getRepos = async () => {
    return await fetch(`${CONNECTION_URL}/user/getRepos`, {
        method: "GET",
        headers: {
            Authorization: `token ${localStorage.getItem("accessToken")}`,
        },
    })
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            return data;
        });
};

/*
 Function to fetch all commits made in a specific repo from the backend. 
 Params:
    - repoName : name of the repo to get commits from.
*/
export const getCommitsInRepo = async (repoName, userId) => {
    return await fetch(`${CONNECTION_URL}/user/getCommits/${repoName}`, {
        method: "GET",
        headers: {
            Authorization: `token ${localStorage.getItem("accessToken")}`,
        },
    })
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            // Grab all of the commits that have been made by the user.
            let commits = [];
            for (let i in data) {
                try {
                    if (data[i].author.id === userId) {
                        commits.push(data[i]);
                    }
                } catch (error) {}
            }
            console.log(commits);
            return commits;
        });
};

/*
 Function to fetch all commits a user has made in any repo from the sever backend. 
*/
export const getCommits = async (userId) => {
    return await fetch(`${CONNECTION_URL}/user/getCommits`, {
        method: "GET",
        headers: {
            Authorization: `token ${localStorage.getItem("accessToken")}`,
        },
    })
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            let commits = [];
            for (let i in data) {
                try {
                    if (data[i].author.id === userId) {
                        commits.push(data[i]);
                    }
                } catch (error) {}
            }
            console.log(commits);
            return commits;
        });
};

/* 
 Function to process and organize commit data based on a specified date range.
 Params:
    -fetchedCommits : an array of commit objects that have been retrieved and need to be stored and filtered.
    -startDate : the beginning of the date range within which commits should be considered.
    -endDate : the end of the date range within which commits should be considered.
*/
export const sortCommits = (fetchedCommits, startDate, endDate) => {
    const sortedCommits = fetchedCommits.reduce((acc, commit) => {
        // Get date from raw commit data and format it
        const commitDate = new Date(commit.commit.author.date);
        const date = formatDate(commitDate);

        // Only filter commits within the date range
        if (
            (!startDate || commitDate >= startDate) &&
            (!endDate || commitDate <= endDate)
        ) {
            // Check if an object for that date already exists
            const foundIndex = acc.findIndex((obj) => obj.date === date);
            if (foundIndex !== -1) {
                // If so, increment it
                acc[foundIndex].count++;
            } else {
                // Otherwise, create a new object and add it
                acc.push({
                    date: date,
                    count: 1,
                });
            }
        }
        return acc;
    }, []);

    // Create an array of all dates within the range
    const dateRange = [];
    const currentDate = new Date(startDate);
    while (currentDate <= endDate) {
        dateRange.push(formatDate(currentDate));
        currentDate.setDate(currentDate.getDate() + 1);
    }

    // Add missing dates with count 0
    dateRange.forEach((date) => {
        const foundIndex = sortedCommits.findIndex((obj) => obj.date === date);
        if (foundIndex === -1) {
            sortedCommits.push({
                date: date,
                count: 0,
            });
        }
    });

    // Sort the commits by date in ascending order
    sortedCommits.sort((a, b) => new Date(a.date) - new Date(b.date));

    return sortedCommits;
};

/*
 Function to format date into YYYY/MM/DD.
 Params:
    - date : date object to format.
*/
export const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
};
/*
 Function to convert a date string in the from YYYY/MM/DD into the form Month DD (e.g. December 25).
*/
export const formatDateString = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
    });
};

// Function to calculate the number of commits within a specific date range
export const getCommitsInRange = (commits, sDate, eDate) => {
    let commitsNumber = 0;
    let startDate = new Date(sDate);
    let endDate = new Date(eDate);

    commits.forEach((commit) => {
        let commitDate = new Date(commit.commit.author.date);
        if (startDate < commitDate && commitDate <= endDate) commitsNumber++;
    });
    return commitsNumber;
};

// Function to handle the deletion of a goal
export const handleDelete = async (postId, handleRerender) => {
    try {
        const response = await axios.delete(
            `${CONNECTION_URL}/goals/${postId}`
        );
        console.log(response.data);
        handleRerender();
    } catch (error) {
        console.error("Error deleting submitting post:", error);
    }
};
