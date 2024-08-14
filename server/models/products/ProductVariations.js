import mongoose from "mongoose";

const variationSchema = mongoose.Schema({
      name: { type: String, required: true, unique: true },
      description: { type: String},
      components: [{ id: String, name: String }]
}, { timestamps: true})

const Variation = mongoose.model("Variation", variationSchema);

export default Variation;