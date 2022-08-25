import { useMutation, useQuery } from "@apollo/client";
import React, { useState } from "react";
import { FaUser } from "react-icons/fa";
import { ADD_PROJECT } from "../mutations/projectMutations";
import { GET_CLIENTS } from "../queries/clientQueries";
import { GET_PROJECTS } from "../queries/projectQueries";

const AddProjectModal = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const [clientId, setClientId] = useState("");

  const { loading, error, data } = useQuery(GET_CLIENTS);

  const [addProject] = useMutation(ADD_PROJECT, {
    variables: {
      name,
      description,
      status,
      clientId,
    },
    update(cache, { data: { addProject } }) {
      const { projects } = cache.readQuery({
        query: GET_PROJECTS,
      });
      cache.writeQuery({
        query: GET_PROJECTS,
        data: {
          projects: [addProject, ...projects],
        },
      });
    },
  });

  const onSubmit = (e) => {
    e.preventDefault();
    if (name === "" || description === "" || status === "" || clientId === "")
      return alert("Please fill all fields");
    addProject();
    setName("");
    setDescription("");
    setStatus("");
    setClientId("");
  };
  return (
    <>
      <button
        type="button"
        className="btn btn-secondary mb-4 d-flex align-items-center"
        data-bs-toggle="modal"
        data-bs-target="#addProjectModal"
      >
        <FaUser className="icon" />
        <span>Add Project</span>
      </button>

      <div
        className="modal fade"
        id="addProjectModal"
        tabIndex="-1"
        aria-labelledby="addProjectModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="addProjectModalLabel">
                Add project
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
                    Project name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    placeholder="site admin panel"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">
                    Description
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="description"
                    placeholder="john@doe.test"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="status" className="form-label">
                    status
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="status"
                    placeholder="new, progress or completed"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="clientId" className="form-label">
                    Client name
                  </label>
                  <select
                    id="clientId"
                    className="form-select"
                    aria-label="clientId"
                    value={clientId}
                    onChange={(e) => setClientId(e.target.value)}
                  >
                    <option value="">Choose client</option>
                    {!loading &&
                      !error &&
                      data.clients &&
                      data.clients.length > 0 &&
                      data.clients.map((client) => (
                        <option key={client.id} value={client.id}>
                          {client.name}
                        </option>
                      ))}
                  </select>
                </div>
                <button
                  type="submit"
                  data-bs-dismiss="modal"
                  className="btn btn-primary"
                >
                  Save project
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddProjectModal;
