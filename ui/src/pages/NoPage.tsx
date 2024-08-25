import Footer from "../components/Footer";
import NavBar from "../components/NavBar";

function NoPage() {
  return (
    <>
      <NavBar />
      <div className="px-4 py-5 text-center container">
        <div className="row py-lg-5">
          <div className="col-lg-6 col-md-8 mx-auto">
            <h1 className="fw-light">Error! 404 Not Found...</h1>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default NoPage;
