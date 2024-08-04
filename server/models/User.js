import mongoose from "mongoose"
import bcrypt from 'bcryptjs';

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
   email: {
        type: String,
        required: true,
        unique: true
  },
  username: {
      type: String,
       default: '@', 
  },
  password: {
       type: String,
       required: true
  },
  profileImage: {
         type: String,
  },
  bio: {
         type: String
  },
  phone: {
        type: String
  },
  country: {
        type: String
  }
}, { timestamps: true})


userSchema.pre("save", async function (next) {
    if(!this.isModified('password')){
          next();
    }
    const salt = await bcrypt.genSalt(10);

    this.password = await bcrypt.hash(this.password, salt);
})

userSchema.pre(["findByIdAndUpdate", "findOneAndUpdate"], async function(next){
    const data = this.getUpdate();
    const salt = await bcrypt.genSalt(10);
    if(data.password){
            data.password = await bcrypt.hash(data.password, salt);
    }
    next();
})

userSchema.methods.matchPasswords = async function(enteredPassword) {
   return await bcrypt.compare(enteredPassword, this.password);
}

const User = mongoose.model("User", userSchema);

export default User;