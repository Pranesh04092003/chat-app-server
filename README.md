# Chat Application

## Project Overview
This project is a chat application where students can connect with college project experts in private chat rooms. It facilitates real-time communication between students and experts, providing a platform for students to seek guidance and advice on their projects.

## Technologies Used
- **Frontend:** Next.js, TypeScript, Tailwind CSS, HTML
- **Backend:** Node.js, Express.js, Socket.io
- **Database:** MongoDB
- **Hosting:** Vercel, Cloudflare

## Features
- User login with username and password.
- Students can request to connect with an expert.
- Private chat rooms for each student-expert pair.
- Real-time messaging with timestamps and usernames.
- Chat history stored in MongoDB and retrieval of the last 10 messages upon entering the chat room.

## Demonstration Video
![Demonstration Video](link-to-your-video-file)

## Code Structure
- **frontend/**: Contains the Next.js frontend code.
- **backend/**: Contains the Node.js backend code.
- **database/**: MongoDB setup and schema definitions.

## Challenges Faced
Setting up the backend was straightforward for me. I tested all the API endpoints using Postman to ensure they worked correctly. After that, I developed the frontend using Next.js. The main struggle I faced was in the ChatArea page, where the real-time communication between students and experts took place. There were some initial issues, but I was able to resolve them.

I hosted the application on Vercel. Users need to sign up first, and by default, they are assigned the student role. Experts also start with the student role when they sign up, but the admin can change their role to experts. Students can select from available experts and send them private messages. Experts can see messages from students and reply to them, enabling real-time chat. The application uses Socket.io for real-time communication, and all sent messages have timestamps.

## How to Run
1. Clone the repository:
    ```bash
    git clone <repository-url>
    ```
2. Install dependencies for both frontend and backend:
    ```bash
    # For backend
    cd backend
    npm install

    # For frontend
    cd frontend
    npm install
    ```
3. Start the backend server:
    ```bash
    cd backend
    npm start
    ```
4. Start the frontend application:
    ```bash
    cd frontend
    npm run dev
    ```
5. Access the application via the provided URL (typically `http://localhost:3000`).

## Contact
If you have any questions, feel free to reach out to **[mansikamra4972@gmail.com](mailto:mansikamra4972@gmail.com)** or WhatsApp **9315384102**.
