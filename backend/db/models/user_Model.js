import mongoose from "../mongoose.js";
const { Schema } = mongoose;




const userSchema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    emailAddress: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    location: { type: String, required: true },
  },
  {
    statics: {
      async logIn(user) {
        console.log('User info is: '+ user.username+ " "+ user.password);
        const validUser = await this.findOne({username: user.username})
        // console.log(validUser)
        if (!validUser) {
          throw new Error("No Such Username Found");
        }
        if (validUser.password !== user.password) {
          throw new Error("Incorrect Password");
        } 
        return user;
      }
    }
  }
);

const User = mongoose.model(
  "User",
  userSchema
);

const addNewUser = async (user) => {
  const newUser= await User.create(user);
  return console.log('User created successfully\n'+ newUser)
}
let test = {
  username: "Admin",
  password: "test"
}

const theTest = async (data) => {
  try {
    await User.logIn(data);
    console.log("success")
  } catch (error) {
    console.log("Oops!" + error)
  }
}

theTest(test)

// const findUser = async (user) => {
//   const newUser= await User.create(user);
//   return console.log('User created successfully\n'+ newUser)
// }

export { User, addNewUser };
