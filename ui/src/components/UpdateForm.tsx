import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../Api";

function UpdateForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [request, setRequest] = useState({
    name: "",
    description: "",
    price: 0,
  });
  const [errors, setErrors] = useState<any>({});
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: 0,
  });

  // Requests data from the record to be changed
  const fetchRequest = async () => {
    const response = await api.get(`/api/items/${id}`);
    setRequest(response.data);
  };

  useEffect(() => {
    fetchRequest();
  }, []);

  // Handles changes to the input fields
  const handleInputChange = (event: { target: { name: any; value: any } }) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  // Validation
  const handleDataUpdate = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    setErrors(validateValues(formData));
    setSubmitting(true);
  };

  const validateValues = (formValue: {
    name: any;
    description: any;
    price: any;
  }) => {
    let errors: any = {};
    if (formValue.name.length < 1) {
      formData.name = request.name;
    }
    if (formValue.description.length < 1) {
      formData.description = request.description;
    }
    if (!formValue.price) {
      formData.price = request.price;
    }
    if (formValue.price < 0) {
      errors.price = "The item must be a positive non-zero value.";
    }
    return errors;
  };

  useEffect(() => {
    if (Object.keys(errors).length === 0 && submitting) {
      handleApiPut();
    }
  }, [errors]);

  // Send updated data to database
  const handleApiPut = async () => {
    await api.put(`/api/items/${id}`, formData);
    alert(`Record for ${formData.name} was updated!`);
    fetchRequest();
    setFormData({
      name: "",
      description: "",
      price: 0,
    });
    navigate("/");
  };

  return (
    <>
      <main
        className="px-4 py-5 my-2 container align-items-center"
        style={{ maxWidth: "500px" }}
      >
        <div className="card mb-4 box-shadow">
          <div className="card-header px-4 pt-4">
            <h2>Updating record for {request.name}</h2>
            <p>Fill up the required information</p>
          </div>

          <div className="card-body p-4">
            <form onSubmit={handleDataUpdate}>
              <div className="form-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  name="name"
                  placeholder={request.name}
                  onChange={handleInputChange}
                  value={formData.name}
                />
              </div>

              <div className="form-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  name="description"
                  placeholder={request.description}
                  onChange={handleInputChange}
                  value={formData.description}
                />
              </div>

              <div className="form-group mb-3">
                <div className="input-group mb-2">
                  <span className="input-group-text">$</span>
                  <input
                    type="text"
                    inputMode="numeric"
                    className="form-control"
                    id="price"
                    name="price"
                    min={0}
                    placeholder={request.price.toString()}
                    onChange={handleInputChange}
                    value={formData.price}
                  />
                </div>
                {errors.price ? (
                  <div
                    className="form-group"
                    style={{ fontSize: "14px", color: "red" }}
                  >
                    The item must be a positive non-zero value.
                  </div>
                ) : null}
              </div>

              <hr />

              <button className="w-100 btn btn-lg btn-primary" type="submit">
                Submit
              </button>
            </form>
          </div>
        </div>
      </main>
    </>
  );
}

export default UpdateForm;
