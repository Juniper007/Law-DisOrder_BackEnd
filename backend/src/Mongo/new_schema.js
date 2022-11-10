import mongoose from "./mongoose.js";
const { Schema } = mongoose;

// const userSchema = new Schema(
//     {
//       name: { type: String, required: true },
//       password: { type: String, required: true },
//       highScore: {type: Number, required: true },
//       totalScore: {type: Number, required: true },
//     },
//     {
//       statics: {
//         async findByLogin(name, password) {
//           let user; 
//           console.log(
//             `Name is: ${name}, password is ${password}`)
//           user = await this.findOne({ name: name });
//           if (!user) {
//             throw new Error("No Such Username Found");
//           }
//           if (password !== user.password) {
//             throw new Error("Incorrect Password");
//           } 
//           return user;
          
//         },
//         newUser(data) {
//           return User.create(data);
//         },
//     }
//   }
//   );
  
//   const User = mongoose.model("User", userSchema);
  
//   async function newUser(data) {
//     return await User.create(data);
//   }
  
  
//   export { User, newUser };