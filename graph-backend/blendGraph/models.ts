import { model, Schema } from "mongoose";

const blendGraphSchema = new Schema({
    graphId: [String],
    title: String,
    userId: String
})

const BlendGraph = model("blendGraph", blendGraphSchema)
export default BlendGraph