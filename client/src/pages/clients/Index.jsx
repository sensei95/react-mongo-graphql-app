import React from "react";
import Clients from "../../components/Clients";
import AddClientModal from "../../components/AddClientModal";

const ClientIndex = () => {
  return (
    <>
      <AddClientModal />
      <h1>Clients</h1>
      <Clients />
    </>
  );
};

export default ClientIndex;
