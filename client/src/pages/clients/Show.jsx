import { useQuery } from "@apollo/client";
import React from "react";
import { useParams } from "react-router-dom";
import Spinner from "../../components/Spinner";
import { GET_CLIENT } from "../../queries/clientQueries";

const ClientShow = () => {
  let { id } = useParams();
  const { loading, error, data } = useQuery(GET_CLIENT, {
    variables: { id },
  });
  if (loading) return <Spinner />;
  if (error) return <h1>Something goes wrong!</h1>;
  return (
    <>
      {!loading && !error && data.client && (
        <main>
          <section>
            <h1>{data.client.name}</h1>
          </section>
          {data.client.projects && (
            <aside>
              <h1>{`${data.client.name}'s projects`}</h1>
              <ul>
                {data.client.projects.length > 0 &&
                  data.client.projects.map((project) => (
                    <li key={project.id}>{project.name}</li>
                  ))}
              </ul>
            </aside>
          )}
        </main>
      )}
    </>
  );
};

export default ClientShow;
