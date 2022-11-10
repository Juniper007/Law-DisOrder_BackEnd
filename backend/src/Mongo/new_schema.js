import mongoose from "./mongoose.js";
const { Schema } = mongoose;

const sourceTable = new Schema(
    {
      sourceName: { type: String, required: true },
      dateLastUpdated: { type: String, required: true },
      html: {type: String, required: true },
    },
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
  );
  
  const sourceDataInformation = mongoose.model("sourceTable", sourceTable);
  
//   async function newUser(data) {
//     return await User.create(data);
//   }
  
  
  export { sourceDataInformation };