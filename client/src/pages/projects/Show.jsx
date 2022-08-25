import { useQuery } from "@apollo/client";
import React from "react";
import { useParams } from "react-router-dom";
import Spinner from "../../components/Spinner";
import { GET_PROJECT } from "../../queries/projectQueries";

const ProjectShow = () => {
  let { id } = useParams();

  const { loading, error, data } = useQuery(GET_PROJECT, {
    variables: { id },
  });

  if (loading) return <Spinner />;
  if (error) return <h1>Something goes wrong!</h1>;

  return (
    <>
      {!loading && !error && data.project && (
        <main className="grid lg:grid-cols-8">
          <section className="lg:col-span-5">
            <h1 class="text-3xl font-bold underline">{data.project.name}</h1>
          </section>
          <aside className="lg:col-span-3">
            <h1>{data.project.client.name}</h1>
          </aside>
        </main>
      )}
    </>
  );
};

export default ProjectShow;
