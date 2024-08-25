import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import api from "../Api";

function ItemDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [request, setRequest] = useState({
    id: 0,
    name: "",
    description: "",
    price: 0,
  });

  // Requests data from the record
  const fetchRequest = async () => {
    const response = await api.get(`/api/items/${id}`);
    setRequest(response.data);
  };

  // Deletes the record from the database
  const handleRecordDelete = async () => {
    await api.delete(`/api/items/${id}`);
    alert(`Record was deleted!`);
    navigate("/");
  };

  useEffect(() => {
    fetchRequest();
  }, []);

  return (
    <>
      <section className="py-5">
        <div className="container px-4 px-lg-5 my-5">
          <div className="row gx-4 gx-lg-5 align-items-center">
            <div className="col-md-6">
              <img
                className="card-img-top mb-5 mb-md-0"
                src="https://dummyimage.com/600x700/dee2e6/6c757d.jpg"
              ></img>
            </div>
            <div className="col-md-6">
              <div className="small mb-1">Item ID: {request.id}</div>
              <h1 className="display-5 fw-vorder">{request.name}</h1>
              <div className="fs-5 mb-5">
                <span>${request.price}</span>
              </div>
              <p className="lead">{request.description}</p>
              <div className="buttons d-flex flex-row mt-5 gap-3">
                <Link to={`/update-item/${request.id}`}>
                  <button
                    className="btn btn-light text-dark me-2"
                    type="button"
                  >
                    Edit
                  </button>
                </Link>
                <button
                  className="btn btn-light text-dark me-2"
                  type="button"
                  onClick={handleRecordDelete}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default ItemDetails;
