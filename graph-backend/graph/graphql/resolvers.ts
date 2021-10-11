import Graph from "../models";
import admin from "../../Firebase-admin/admin";
import { Context, InputGraphType } from "../../types/graph_types";

module.exports = {
  Query: {
    async allGraphs() {
      try {
        const graphs = await Graph.find();
        return graphs;
      } catch (err: any) {
        console.log(err.message);
      }
    },
    async singleGraph(_: any, { graphId }: any) {
      //console.log(typeof(graphId))
      try {
        const graph = Graph.findById(graphId);
        return graph;
      } catch (err: any) {
        console.log(err.message);
      }
    },
    async myGraphs(_: any, { userId }: any, context: Context) {
      let graphs;
      await admin
        .auth()
        .verifyIdToken(context.AuthContext)
        .then(async (user: any) => {
          graphs = await Graph.find({ userId: user.uid });
        });
      return await graphs;
    },
    async graphCate(_: any, { category }: any, context: any) {
      try {
        const graphs = Graph.find({ category: category });
        return graphs;
      } catch (err: any) {
        console.log(err.message);
      }
    },
    async searchGraphs(_: any, { searchWord }: any, context: any) {
      try {
        const graphs = Graph.find({ title: { $regex: searchWord } });
        return graphs;
      } catch (err: any) {
        console.log(err.message);
      }
    },
  },
  Mutation: {
    async createGraph(
      _: any,
      {
        inputGraph: {
          title,
          category,
          graphKind,
          source,
          label,
          value,
          color,
          description,
        },
      }: InputGraphType,
      context: Context
    ) {
      let data: any = [];

      for (let i = 0; i < label.length; i++) {
        data[i] = { label: label[i], value: value[i] };
      }
      await admin
        .auth()
        .verifyIdToken(context.AuthContext)
        .then((user: any) => {
          const userId = user.uid;

          const newGraph = new Graph({
            title,
            category,
            graphKind,
            source,
            userId,
            data,
            color,
            description,
          });
          const graph = newGraph.save();
          return graph;
        });
    },
    async deleteGraph(
      _: any,
      { inputDeleteGraph: { id } }: any,
      context: Context
    ) {
      //const user = await checkAuth(context.AuthContext);
      try {
        const graph = await Graph.findById(id);
        await graph.delete();
        return "graph is deleted";
      } catch (err: any) {
        console.log(err.message);
      }
    },
  },
  //UserにGraphsを追加する
  User: {
    //userのIDが引数に入る
    graphs(props: any) {
      //console.log(graph)//ユーザIDは特定済み
      //これとGraphのuserIdを一致させたものを抽出したい
      const graph = Graph.find({ userId: props._id });
      //console.log(graph)
      //このgraphが格納されるのは[Graph]
      return graph;
    },
  },
  BlendGraph: {
    graphs(props: any) {
      let graphs = [];
      for (let i = 0; i < props.graphId.length; i++) {
        const graph = Graph.findById(props.graphId[i]);
        graphs.push(graph);
      }
      return graphs;
    },
  },
};
