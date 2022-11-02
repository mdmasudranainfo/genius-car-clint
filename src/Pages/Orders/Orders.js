import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthProvider/AuthProvider";
import OrderRow from "./OrderRow";

const Orders = () => {
  const { user } = useContext(AuthContext);

  const [orders, setOrder] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/order?email=${user?.email}`)
      .then((res) => res.json())
      .then((data) => setOrder(data));
  }, [user?.email]);

  //
  const handleDelete = (id) => {
    console.log(id);
    const agree = window.confirm("Remove service ?");
    if (agree) {
      fetch(`http://localhost:5000/order/${id}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          const rimining = orders.filter((odr) => odr._id !== id);
          setOrder(rimining);
        });
    }
  };
  //
  const updateHandle = (id) => {
    console.log(id);
    fetch(`http://localhost:5000/order/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status: "Approved" }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.modifiedCount > 0) {
          const rimining = orders.filter((odr) => odr._id !== id);
          const aproving = orders.find((odr) => odr._id === id);
          aproving.status = "Aproved";
          const oldOrders = [...rimining, aproving];
          setOrder(oldOrders);
        }
      });
  };
  return (
    <div>
      <div className="text-2xl">Orders : {orders.length}</div>

      <div className="overflow-x-auto w-full">
        <table className="table w-full">
          <thead>
            <tr>
              <th>
                <label>
                  <input type="checkbox" className="checkbox" />
                </label>
              </th>
              <th>Seivices</th>
              <th> Address</th>
              <th>Price</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <OrderRow
                handleDelete={handleDelete}
                key={order._id}
                updateHandle={updateHandle}
                order={order}
              ></OrderRow>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;
