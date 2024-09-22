import { Link } from "react-router-dom";
export default function Dashboard() {
  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      <h2 id="wd-dashboard-published">Published Courses (7)</h2> <hr />
      <div id="wd-dashboard-courses" className="row">
        <div className="row row-cols-1 row-cols-md-5 g-4">
          <div className="wd-dashboard-course col" style={{ width: "300px" }}>
            <div className="card">
              <Link
                className="wd-dashboard-course-link text-decoration-none text-dark"
                to="/Kanbas/Courses/1234/Home"
              >
                <img
                  src="/images/reactjs.jpg"
                  style={{ width: "100%", height: "150px", objectFit: "cover" }}
                />
                <div className="card-body">
                  <h5
                    className="wd-dashboard-course-title card-title"
                    style={{ height: "48px" }}
                  >
                    CS1234 React JS
                  </h5>
                  <p className="card-text">Full Stack software developer</p>
                  <button className="btn btn-primary"> Go </button>
                </div>
              </Link>
            </div>
          </div>

          <div className="wd-dashboard-course col" style={{ width: "300px" }}>
            <div className="card">
              <Link
                className="wd-dashboard-course-link text-decoration-none text-dark"
                to="/Kanbas/Courses/2345/Home"
              >
                <img
                  src="/images/python.jpg"
                  style={{ width: "100%", height: "150px", objectFit: "cover" }}
                />
                <div className="card-body">
                  <h5
                    className="wd-dashboard-course-title card-title"
                    style={{ height: "48px" }}
                  >
                    CS2345 Python Programming
                  </h5>
                  <p className="card-text">Intro to Software Development</p>
                  <button className="btn btn-primary">Go</button>
                </div>
              </Link>
            </div>
          </div>

          <div className="wd-dashboard-course col" style={{ width: "300px" }}>
            <div className="card">
              <Link
                className="wd-dashboard-course-link text-decoration-none text-dark"
                to="/Kanbas/Courses/3456/Home"
              >
                <img
                  src="/images/java.jpg"
                  style={{ width: "100%", height: "150px", objectFit: "cover" }}
                />
                <div className="card-body">
                  <h5
                    className="wd-dashboard-course-title card-title"
                    style={{ height: "48px" }}
                  >
                    CS3456 Java Programming
                  </h5>
                  <p className="card-text">Object-Oriented Programming</p>
                  <button className="btn btn-primary">Go</button>
                </div>
              </Link>
            </div>
          </div>

          <div className="wd-dashboard-course col" style={{ width: "300px" }}>
            <div className="card">
              <Link
                className="wd-dashboard-course-link text-decoration-none text-dark"
                to="/Kanbas/Courses/4567/Home"
              >
                <img
                  src="/images/ml.jpg"
                  style={{ width: "100%", height: "150px", objectFit: "cover" }}
                />
                <div className="card-body">
                  <h5
                    className="wd-dashboard-course-title card-title"
                    style={{ height: "48px" }}
                  >
                    CS4567 Machine Learning
                  </h5>
                  <p className="card-text">Data Science and AI Development</p>
                  <button className="btn btn-primary">Go</button>
                </div>
              </Link>
            </div>
          </div>

          <div className="wd-dashboard-course col" style={{ width: "300px" }}>
            <div className="card">
              <Link
                className="wd-dashboard-course-link text-decoration-none text-dark"
                to="/Kanbas/Courses/5678/Home"
              >
                <img
                  src="/images/cplusplus.jpg"
                  style={{ width: "100%", height: "150px", objectFit: "cover" }}
                />
                <div className="card-body">
                  <h5
                    className="wd-dashboard-course-title card-title"
                    style={{ height: "48px" }}
                  >
                    CS5678 C++ Programming
                  </h5>
                  <p className="card-text">
                    Advanced Algorithms and Data Structures
                  </p>
                  <button className="btn btn-primary">Go</button>
                </div>
              </Link>
            </div>
          </div>

          <div className="wd-dashboard-course col" style={{ width: "300px" }}>
            <div className="card">
              <Link
                className="wd-dashboard-course-link text-decoration-none text-dark"
                to="/Kanbas/Courses/6789/Home"
              >
                <img
                  src="/images/webdev.jpg"
                  style={{ width: "100%", height: "150px", objectFit: "cover" }}
                />
                <div className="card-body">
                  <h5
                    className="wd-dashboard-course-title card-title"
                    style={{ height: "48px" }}
                  >
                    CS6789 Web Development
                  </h5>
                  <p className="card-text">
                    Front-End and Back-End Development
                  </p>
                  <button className="btn btn-primary">Go</button>
                </div>
              </Link>
            </div>
          </div>

          <div className="wd-dashboard-course col" style={{ width: "300px" }}>
            <div className="card">
              <Link
                className="wd-dashboard-course-link text-decoration-none text-dark"
                to="/Kanbas/Courses/7890/Home"
              >
                <img
                  src="/images/databases.jpg"
                  style={{ width: "100%", height: "150px", objectFit: "cover" }}
                />
                <div className="card-body">
                  <h5
                    className="wd-dashboard-course-title card-title"
                    style={{ height: "48px" }}
                  >
                    CS7890 Database Systems
                  </h5>
                  <p className="card-text">SQL and NoSQL Databases</p>
                  <button className="btn btn-primary">Go</button>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
