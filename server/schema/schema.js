const {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLList,
  GraphQLID,
} = require("graphql");

// Mongoose models
const ClientModel = require("../models/Client");
const ProjectModel = require("../models/Project");

// Types
const ClientType = require("../Types/ClientType");
const ProjectType = require("../Types/ProjectType");

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: () => ({
    clients: {
      type: new GraphQLList(ClientType),
      resolve(parent, args) {
        return ClientModel.find();
      },
    },
    client: {
      type: ClientType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return ClientModel.findById(args.id);
      },
    },
    projects: {
      type: new GraphQLList(ProjectType),
      resolve(parent, args) {
        return ProjectModel.find();
      },
    },
    project: {
      type: ProjectType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return ProjectModel.findById(args.id);
      },
    },
  }),
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
