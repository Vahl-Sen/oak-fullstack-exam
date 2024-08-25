import { useState, useEffect } from "react";
import api from "../Api";

function CreateForm() {
  const [requests, setRequests] = useState([]);
  const [errors, setErrors] = useState<any>({});
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: 0,
  });

  const fetchRequests = async () => {
    const response = await api.get("/api/items");
    console.log(requests.length);
    setRequests(response.data);
  };

  const handleInputChange = (event: { target: { name: any; value: any } }) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleFormSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    setErrors(validateValues(formData));
    setSubmitting(true);
  };

  const validateValues = (formValue: {
    name: string;
    description?: string;
    price: any;
  }) => {
    let errors_caught: any = {};
    if (formValue.name.length < 1) {
      errors_caught.name = "The item must have a name.";
    }
    if (!formValue.price || formValue.price <= 0) {
      errors_caught.price = "The item must be a positive non-zero value.";
    }
    return errors_caught;
  };

  const handleApiPost = async () => {
    await api.post(`/api/items`, formData);
    alert(`New record for ${formData.name} was created!`);
    fetchRequests();

    setFormData({
      name: "",
      description: "",
      price: 0,
    });
  };

  useEffect(() => {
    if (Object.keys(errors).length === 0 && submitting) {
      handleApiPost();
    }
  }, [errors]);

  return (
    <>
      <main
        className="px-4 py-5 my-2 container align-items-center"
        style={{ maxWidth: "500px" }}
      >
        <div className="card mb-4 box-shadow">
          <div className="card-header px-4 pt-4">
            <h2>Create new Record</h2>
            <p>Fill up the required information</p>
          </div>

          <div className="card-body p-4">
            <form onSubmit={handleFormSubmit}>
              <div className="form-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  name="name"
                  placeholder="Name"
                  onChange={handleInputChange}
                  value={formData.name}
                />
                {errors.name ? (
                  <div
                    className="form-group mt-1"
                    style={{ fontSize: "14px", color: "red" }}
                  >
                    The item must have a name.
                  </div>
                ) : null}
              </div>

              <div className="form-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  name="description"
                  placeholder="Description"
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
                    placeholder="Price"
                    // required={true}
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

export default CreateForm;
