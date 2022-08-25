import { useMutation } from "@apollo/client";
import { FaTrash, FaPen } from "react-icons/fa";
import { Link } from "react-router-dom";
import { DELETE_PROJECT } from "../mutations/projectMutations";
import { GET_PROJECTS } from "../queries/projectQueries";

const ProjectRow = ({ project }) => {
  const [deleteProject] = useMutation(DELETE_PROJECT, {
    variables: { id: project.id },
    update(cache, { data: { deleteProject } }) {
      const { projects } = cache.readQuery({
        query: GET_PROJECTS,
      });
      cache.writeQuery({
        query: GET_PROJECTS,
        data: {
          projects: projects.filter(
            (project) => project.id !== deleteProject.id
          ),
        },
      });
    },
  });

  return (
    <tr>
      <td>
        <Link to={`/projects/${project.id}`}>{project.name}</Link>
      </td>
      <td>{project.status}</td>
      <td>
        <Link to={`/clients/${project.client.id}`}>{project.client.name}</Link>
      </td>
      <td>
        <div className="btn-group" role="group">
          <button className="btn btn-outline-info btn-sm">
            <FaPen />
          </button>
          <button
            onClick={deleteProject}
            className="btn btn-outline-danger btn-sm"
          >
            <FaTrash />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default ProjectRow;
