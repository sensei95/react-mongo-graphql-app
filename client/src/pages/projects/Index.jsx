import React from "react";
import AddProjectModal from "../../components/AddProjectModal";

import Projects from "../../components/Projects";

const ProjectIndex = () => {
  return (
    <>
      <h1>Projects</h1>
      <AddProjectModal />
      <Projects />
    </>
  );
};

export default ProjectIndex;
