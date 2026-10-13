import Navbar from "../components/Navbar";
import "../styles/Home.css";

function Home() {
  return (
    <>
      <Navbar />

      <main>

        {/* Hero Section */}
        <section className="hero" id="home">

          <div className="hero-content">
            
            <img src="" alt="" className="hero-icon" />

            <h1>
              Host and Attend Exams in One Place
              <span> Simple & Smart</span>
            </h1>

            <p className="hero-description">
              Create, manage and attend examinations from one
              powerful platform designed for teachers and students.
            </p>

            <div className="hero-buttons">
              <button className="primary-btn">
                Get Started →
              </button>

              <button className="secondary-btn">
                Learn More
              </button>
            </div>

          </div>

          <div className="hero-image">

            <div className="exam-card">
              <div className="card-header">
                  <span>Java-Programming-Test-1234</span>
              </div>

              <div className="progress-bar">
                <div className="progress"></div>
              </div>

              <p>Question 6 of 20</p>

              <div className="question">
                6. What is JVM?
              </div>

              <div className="option">
                Java Variable Method
              </div>

              <div className="option active">
                Java Virtual Machine
              </div>

              <div className="option">
                Joint Virtual Memory
              </div>

              <div className="option">
                Java Virtual Memory
              </div>

            </div>

          </div>

        </section>


        {/* Features Section */}

        <section className="features" id="features">

          <div className="section-title">
            <p>WHY EXAMPORTAL?</p>
            <h2>Everything You Need for Online Exams</h2>
          </div>

          <div className="feature-grid">

            <div className="feature-card">
              <div className="feature-icon"></div>
              <h3>For Teachers</h3>
              <p>
                Create exams, manage questions and track
                student performance easily.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon"></div>
              <h3>For Students</h3>
              <p>
                Attend exams, track your results and improve
                your learning progress.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon"></div>
              <h3>Instant Results</h3>
              <p>
                Automatic evaluation and fast
                examination results.
              </p>
            </div>

          </div>

        </section>

      </main>
    </>
  );
}

export default Home;