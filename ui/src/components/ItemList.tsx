import { useState, useEffect } from "react";
import api from "../Api";
import ItemCard from "./ItemCard";

function ItemList() {
  const [requests, setRequests] = useState([]);

  const fetchRequests = async () => {
    const response = await api.get("/api/items");
    setRequests(response.data);
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  return (
    <>
      <div className="album py-5 bg-light">
        <div className="container">
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
            {requests.map((request: any) => (
              <div className="col" key={request.id}>
                <ItemCard item={request} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default ItemList;
