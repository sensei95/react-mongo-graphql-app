import { useMutation } from "@apollo/client";
import { useState } from "react";
import { FaUser } from "react-icons/fa";
import { ADD_CLIENT } from "../mutations/clientMutations";
import { GET_CLIENTS } from "../queries/clientQueries";
const AddClientModal = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [addClient] = useMutation(ADD_CLIENT, {
    variables: {
      name,
      email,
      phone,
    },
    update(cache, { data: { addClient } }) {
      const { clients } = cache.readQuery({
        query: GET_CLIENTS,
      });
      cache.writeQuery({
        query: GET_CLIENTS,
        data: {
          clients: [addClient, ...clients],
        },
      });
    },
  });

  const onSubmit = (e) => {
    e.preventDefault();
    if (name === "" || email === "" || phone === "")
      return alert("Please fill all fields");
    addClient();
    setName("");
    setEmail("");
    setPhone("");
  };

  return (
    <>
      <button
        type="button"
        className="btn btn-secondary mb-4 d-flex align-items-center"
        data-bs-toggle="modal"
        data-bs-target="#addClientModal"
      >
        <FaUser className="icon" />
        <span>Add new client</span>
      </button>

      <div
        className="modal fade"
        id="addClientModal"
        tabIndex="-1"
        aria-labelledby="addClientModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="addClientModalLabel">
                Add client
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form onSubmit={onSubmit}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Full name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    placeholder="john doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="email"
                    placeholder="john@doe.test"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="phone" className="form-label">
                    phone
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="phone"
                    placeholder="xxx-xxx-xxxx"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
                <button
                  type="submit"
                  data-bs-dismiss="modal"
                  className="btn btn-primary"
                >
                  Save client
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddClientModal;
