# CommitPal

## Introduction

CommitPal is a web application designed to assist developers in setting and achieving their coding objectives. It enables users to define a desired number of commits they aim to contribute to one of their public repositories, along with a specific target date. By fulfilling these self-imposed goals, users accumulate points, introducing an element of gamification to their coding experience.

Moreover, this project not only exhibits my technical prowess in web development but also highlights my creative approach in making the coding experience more enjoyable.

#### **You can view the project [on this page](https://commit-pal-git-main-bennettlarue.vercel.app/)**!

**Important Note:** The server takes a some time to spin up after not being used for awhile. **_If your authentication does not go through right away, give the application about 15-20 seconds and it should start up and work normally._** If you are away from the page for awhile and your information is not appearing, just refresh the page and it should also start up again after around 15 seconds.

## ⚙️ Features

-   **Goal Setting:** Users can set personalized commit goals for their repositories.
-   **Progress Tracking:** The app tracks the number of commits made, providing real-time progress updates.
-   **Gamification:** Earn points for completing goals, adding a fun and competitive edge to coding.
-   **Repository Integration:** Seamlessly integrates with user repositories for accurate tracking.
-   **Responsive Design:** A user-friendly interface that works across various devices.

## 🛠️ Technologies Used

-   ##### **🎨 Frontend:**
    -   **React.js**, **Tailwind CSS** for a sleek, responsive design.
-   ##### **⚙️ Backend:**
    -   **Node.js** with **Express.js**, managing RESTful API services.
-   ##### **📦 Database:**
    -   **MongoDB** for storing user data and goals.
-   ##### **🌐 API Integration:**
    -   **GitHub API** for repository and commit tracking.

## 💻 Installation

If you would like to run CommitPal on your own machine, you can follow these steps:

### Prerequisites

-   **GitHub API key**: You'll need to set up a GitHub OAuth application to obtain a client ID and client secret. This can be done in your [GitHub Developer Settings](https://github.com/settings/developers).

-   **MongoDB database setup**: The project uses MongoDB for data storage. You can set up a local MongoDB server or use a cloud-based solution like [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).

### Steps

1. Clone the repository to your local machine.
2. Within your code editor, create two terminal windows. Run `cd server` on one and `cd client` on the other.
3. On both terminals, install necessary dependencies via `npm install`.
4. Create a `server/.env` file for storing environmental variables. Include the following:
    - `MONGO_PASSWORD={your MongoDB password}`
    - `GITHUB_CLIENT_ID={your GitHub client ID}`
    - `GITHUB_CLIENT_SECRET={your GitHub client secret}`
5. Run the application using `npm start` on both the `client` and `server` terminals.
