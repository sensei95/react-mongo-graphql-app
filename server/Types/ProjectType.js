const { GraphQLObjectType, GraphQLID, GraphQLString } = require("graphql");

// Types
const ClientType = require("./ClientType");

//Models
const ClientModel = require("../models/Client");

const ProjectType = new GraphQLObjectType({
  name: "project",
  fields: {
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    status: { type: GraphQLString },
    client: {
      type: ClientType,
      resolve(parent, args) {
        return ClientModel.findById(parent.clientId);
      },
    },
  },
});

module.exports = ProjectType;
