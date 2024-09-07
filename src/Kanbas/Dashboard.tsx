import { Link } from "react-router-dom";
export default function Dashboard() {
  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      <h2 id="wd-dashboard-published">Published Courses (12)</h2> <hr />
      <div id="wd-dashboard-courses">
        <div className="wd-dashboard-course">
          <img src="/images/reactjs.jpg" width={200} />
          <div>
            <Link
              className="wd-dashboard-course-link"
              to="/Kanbas/Courses/1234/Home"
            >
              CS1234 React JS
            </Link>
            <p className="wd-dashboard-course-title">
              Full Stack software developer
            </p>
            <Link to="/Kanbas/Courses/1234/Home"> Go </Link>
          </div>
        </div>
        <div className="wd-dashboard-course">
          <img src="/images/python.jpg" width={200} />
          <div>
            <Link
              className="wd-dashboard-course-link"
              to="/Kanbas/Courses/2345/Home"
            >
              CS2345 Python Programming
            </Link>
            <p className="wd-dashboard-course-title">
              Intro to Software Development
            </p>
            <Link to="/Kanbas/Courses/2345/Home"> Go </Link>
          </div>
        </div>

        <div className="wd-dashboard-course">
          <img src="/images/java.jpg" width={200} />
          <div>
            <Link
              className="wd-dashboard-course-link"
              to="/Kanbas/Courses/3456/Home"
            >
              CS3456 Java Programming
            </Link>
            <p className="wd-dashboard-course-title">
              Object-Oriented Programming
            </p>
            <Link to="/Kanbas/Courses/3456/Home"> Go </Link>
          </div>
        </div>

        <div className="wd-dashboard-course">
          <img src="/images/ml.jpg" width={200} />
          <div>
            <Link
              className="wd-dashboard-course-link"
              to="/Kanbas/Courses/4567/Home"
            >
              CS4567 Machine Learning
            </Link>
            <p className="wd-dashboard-course-title">
              Data Science and AI Development
            </p>
            <Link to="/Kanbas/Courses/4567/Home"> Go </Link>
          </div>
        </div>

        <div className="wd-dashboard-course">
          <img src="/images/cplusplus.jpg" width={200} />
          <div>
            <Link
              className="wd-dashboard-course-link"
              to="/Kanbas/Courses/5678/Home"
            >
              CS5678 C++ Programming
            </Link>
            <p className="wd-dashboard-course-title">
              Advanced Algorithms and Data Structures
            </p>
            <Link to="/Kanbas/Courses/5678/Home"> Go </Link>
          </div>
        </div>

        <div className="wd-dashboard-course">
          <img src="/images/webdev.jpg" width={200} />
          <div>
            <Link
              className="wd-dashboard-course-link"
              to="/Kanbas/Courses/6789/Home"
            >
              CS6789 Web Development
            </Link>
            <p className="wd-dashboard-course-title">
              Front-End and Back-End Development
            </p>
            <Link to="/Kanbas/Courses/6789/Home"> Go </Link>
          </div>
        </div>

        <div className="wd-dashboard-course">
          <img src="/images/databases.jpg" width={200} />
          <div>
            <Link
              className="wd-dashboard-course-link"
              to="/Kanbas/Courses/7890/Home"
            >
              CS7890 Database Systems
            </Link>
            <p className="wd-dashboard-course-title">SQL and NoSQL Databases</p>
            <Link to="/Kanbas/Courses/7890/Home"> Go </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
