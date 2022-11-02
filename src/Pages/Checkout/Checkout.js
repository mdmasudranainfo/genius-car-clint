import React, { useContext } from "react";
import { useLoaderData } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthProvider/AuthProvider";

const Checkout = () => {
  const { user } = useContext(AuthContext);

  const data = useLoaderData();
  const { title, price, _id } = data;

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const name = `${form.firstName.value} ${form.lastName.value}`;
    const phone = form.phone.value;
    const email = user ? user.email : form.email.value;
    const massage = form.massage.value;
    const order = {
      service: _id,
      title,
      price,
      customar: name,
      phone: phone,
      email: email,
      massage: massage,
    };
    // send Backend
    fetch("http://localhost:5000/order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(order),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.acknowledged) {
          form.reset();
          alert("order updated successfully");
        }
      })
      .catch((e) => console.log(e));
  };
  return (
    <div>
      <h1>{title}</h1>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 my-4 lg:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Your First Name"
            className="input input-bordered w-full"
            name="firstName"
          />
          <input
            type="text"
            placeholder="Your Last Name"
            className="input input-bordered w-full"
            name="lastName"
          />
          <input
            type="text"
            placeholder="Your Phone Number"
            className="input input-bordered w-full"
            name="phone"
          />
          <input
            type="text"
            placeholder="Your Email"
            className="input input-bordered w-full"
            name="email"
            defaultValue={user?.email}
          />
        </div>
        <textarea
          className="textarea textarea-bordered w-full h-64"
          placeholder="Massage"
          name="massage"
        ></textarea>
        <div className="text-center my-4">
          <button className="btn w-full bg-rose-600" type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Checkout;
