import { NavLink } from "react-router-dom";
function NavBar() {
  return (
    <header>
      <div className="px-3 py-2 bg-dark text-white">
        <div className="container">
          <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
            <NavLink
              to="/"
              className={
                "d-flex align-items-center my-2 my-lg-0 me-lg-auto text-white text-decoration-none"
              }
            >
              <span className="fs-4">Frontend App</span>
            </NavLink>

            <ul className="nav col-12 col-lg-auto my-2 justify-content-center my-md-0 text-small">
              <li>
                <NavLink to="/" className={"nav-link text-white"}>
                  Home
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/create-item"
                  className={"nav-link px-3 text-white"}
                >
                  Create
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
}

export default NavBar;
