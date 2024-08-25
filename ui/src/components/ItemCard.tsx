import { Link } from "react-router-dom";

function ItemCard({ item }: any) {
  if (!item) {
    return null;
  }
  return (
    <>
      <div className="col mb-5" key={item.id}>
        <div className="card shadow-sm" style={{ height: "100%" }}>
          <img
            className="card-img-top"
            src="https://dummyimage.com/450x300/dee2e6/6c757d.jpg"
          />
          <div className="card-body p-4">
            <h2 className="card-title">{item.name}</h2>
            <p className="card-text text-truncate">{item.description}</p>

            <div className="d-flex justify-content-between align-items-center">
              <div className="btn-group">
                <Link to={`/item/${item.id}`}>
                  <button type="button" className="btn btn-sm btn-primary">
                    View
                  </button>
                </Link>
              </div>

              <small className="text-muted">${item.price}</small>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ItemCard;
