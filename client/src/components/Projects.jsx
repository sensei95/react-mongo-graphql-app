import { useQuery } from "@apollo/client";
import { GET_PROJECTS } from "../queries/projectQueries";
import ProjectRow from "./ProjectRow";
import Spinner from "./Spinner";

const Projects = () => {
  const { loading, error, data } = useQuery(GET_PROJECTS);

  if (loading) return <Spinner />;
  if (error) return <h1>Something goes wrong!</h1>;

  return (
    <>
      {!loading && !error && data.projects && data.projects.length > 0 && (
        <table className="table table-hover mt">
          <thead>
            <tr>
              <th>Name</th>
              <th>Status</th>
              <th>Client</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data.projects.map((project) => (
              <ProjectRow project={project} key={project.id} />
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};

export default Projects;
