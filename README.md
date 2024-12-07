# Kanbas React Web App

Kanbas is a full-stack web application built using the MERN stack that mimics the functionality of the Canvas Learning Management System (LMS). It provides tailored dashboards and features for different user roles, including students, faculty, admins, and TAs. The application enables users to manage courses, modules, assignments, and quizzes efficiently.

### **Live Deployment**

- [Kanbas React Web App (Deployed)](https://a5new--kanbas-react-web-app-yichizhang.netlify.app/#/Labs/Lab5)
- The latest branch is project branch but the most updated deployed branch is a5 which has several commits behind.

### **Node Server**

The backend of this application is hosted at [Kanbas Node Server](https://github.com/AliciaZYC/kanbas-node-server).

---

## **Features**

### **User Types and Role-Specific Features**

1. **Students**:
    - View personalized dashboards, view all courses and choose to enroll or unenroll.
    - Access course modules, assignments, and quizzes (if published faculty and are still available).
    - Submit assignments and participate in quizzes and the scores.
2. **Faculty**:
    - Create and manage courses.
    - Add, edit, and remove modules, assignments, and quizzes (including questions for quizzes) .
3. **Admins**:
    - Oversee the entire system.
    - Manage user accounts and permissions.
    - Ensure smooth operation of the LMS.
4. **TAs (to be continued)**:
    - Assist faculty in grading and managing course materials.
    - Provide feedback on student submissions.

---

### **Core Screens and Functionality**

1. **Dashboard**:
    - Role-specific views showing relevant updates and actions.
2. **Courses**:
    - Detailed course pages with modules, assignments, and quizzes.
3. **Modules**:
    - Organized course content with easy navigation.
4. **Assignments**:
    - Submission tracking, grading, and feedback.
5. **Quizzes**:
    - Timed assessments with automated grading.
6. **Peoples:**
    - All the users who are enrolled in the course.
7. **Grades:**
    - All the student’s grades of the course on their assignments and quizzes.

---

## **Tech Stack**

- **Frontend**: React, Bootstrap for responsive UI components.
- **Backend**: Node.js with Express.js.
- **Database**: MongoDB for scalable and efficient data storage.
- **Hosting**: Deployed on Netlify (frontend) and Render/Node server (backend).

---

## **Getting Started**

### **Prerequisites**

- Node.js
- MongoDB
- npm/yarn

### **Setup**

1. Clone the frontend and backend repositories:
    
    ```bash
    git clone https://github.com/AliciaZYC/kanbas-react-web-app.git
    git clone https://github.com/AliciaZYC/kanbas-node-server.git
    ```
    
2. Install dependencies:
    
    ```bash
    cd kanbas-react-web-app
    npm install
    cd ../kanbas-node-server
    npm install
    ```
    
3. Start the backend server:
    
    ```bash
    Copy code
    nodemon index.js
    ```
    
4. Start the frontend:
    
    ```bash
    cd kanbas-react-web-app
    npm start
    ```
    
5. Open the application in your browser at `http://localhost:3000`.

---

## **License**

This project is licensed under the MIT License.

---

## **Contributions**

Contributions are welcome! Feel free to fork the repository and submit a pull request.
