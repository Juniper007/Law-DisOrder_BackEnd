import mongoose from "./mongoose.js";
const { Schema } = mongoose;

const sourceTableSchema = new Schema(
  {
    sourceName: { type: String, required: true },
    dateLastUpdated: { type: String, required: true },
    url: { type: String, required: true },
  },
  {collection: 'Law_and_Disorder'},
  {
    statics: {
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
      async checkForUpdates(data, date) {
        let dataset = await this.findOne({sourceName: data.sourceName})
        if (!dataset) {
          throw new Error("No Such Dataset Found");
        } else if (dataset.dateLastUpdated !== date) {
          dataset.dateLastUpdated = data;
          return await user.save;
        } else {
          console.log('same date')
        }
      },
      async addNewDatasets(data) {
        let dataset = await this.findOne({sourceName: data.sourceName})
        if (dataset) {
          throw new Error("Dataset already exists!");
        } else {
          return await SourceTable.create(data);
        }
      }
    },
  }
);

const SourceTable = mongoose.model("source-data-information", sourceTableSchema);

//   async function newUser(data) {
//     return await User.create(data);
//   }

export { SourceTable };
