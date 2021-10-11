import { Context } from "../../types/graph_types";
import { InputBlendGraphType } from "../../types/blendGraph_types";
import admin from "../../Firebase-admin/admin";
import BlendGraph from "../models";

module.exports = {
  Query: {
    async allBlendGraphs() {
      try {
        const blendGraphs = await BlendGraph.find();
        return blendGraphs;
      } catch (err) {
        console.log(err.message);
      }
    },
    async singleBlendGraph(_: any, { id }: any) {
      try {
        const blendGraph = BlendGraph.findById(id);
        return blendGraph;
      } catch (err) {
        console.log(err.message);
      }
    },
    //FEはまだ未実装
    async myBlendGraphs(_: any, { userId }: any, context: Context) { 
      let blendGraphs;
      await admin
        .auth()
        .verifyIdToken(context.AuthContext)
        .then(async (user) => {
          console.log(user.uid);
          blendGraphs = await BlendGraph.find({ userId: user.uid });
        });
      return await blendGraphs;
    },
    async searchBlendGraphs(_: any, { searchWord }: any) {
      try {
        const blendGraphs = BlendGraph.find({ title: { $regex: searchWord } });
        return blendGraphs;
      } catch (err) {
        console.log(err.message);
      }
    },
  },
  Mutation: {
    async createBlendGraph(
      _: any,
      { inputBlendGraph: { graphId, title } }: InputBlendGraphType,
      context: Context
    ) {
      try {
        await admin
          .auth()
          .verifyIdToken(context.AuthContext)
          .then((user) => {
            const userId = user.uid;

            const newBlendGraph = new BlendGraph({
              graphId,
              title,
              userId,
            });
            const blendGraph = newBlendGraph.save();
            return blendGraph;
          });
      } catch (err) {
        console.log(err.message);
      }
    },
    async deleteBlendGraph(_: any, { inputDeleteBlendGraph: { id } }: any) {
      try {
        const blendGraph = await BlendGraph.findById(id);
        await blendGraph.delete();
        return "blendGraph is deleted";
      } catch (err) {
        console.log(err.message);
      }
    },
  },
};
