import mongoose from "mongoose"
import bcrypt from "bcryptjs"

const customerSchema = mongoose.Schema({
      name: {
            type: String,
            required: true
      },
      email: {
            type: String,
            required: true,
            unique: true
      },
      password: {
            type: String,
      },
      profileImage: {
            type: String,
      },
      phone: {
            type: String
      },
      address: {
             country: { type: String},
             city: { type: String },
             town: { type: String },
             street: { type: String}
      },
}, { timestamps: true})

customerSchema.pre("save", async function (next) {
       if(!this.isModified("password")){
              next();
       }

       const salt = await bcrypt.genSalt(10);

       this.password = await bcrypt.hash(this.password, salt);
})

customerSchema.pre(["findByIdAndUpdate", "findOneAndUpdate"], async function(next) {
       const data = this.getUpdate();
       const salt = await bcrypt.genSalt(10);
       if(data.password){
              data.password = await bcrypt.hash(data.password, salt);
       }
       next();
})

customerSchema.methods.matchPasswords = async function(enteredPassword){
     return await bcrypt.compare(enteredPassword, this.password);
}

const Customer = mongoose.model("Customer", customerSchema);

export default Customer;