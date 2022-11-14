import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();
//Greg's stuff
async function main () {
    await mongoose.connect('mongodb+srv://@cluster0.fazjowh.mongodb.net/Law_and_Disorder?retryWrites=true&w=majority',
{
    user: '',
    pass: ''
    // :
}
    )

}

main().catch((err) => console.log(err) )

mongoose.connect('mongodb+srv://MAdminChew:SbTm0D9s4zMNyguB@cluster0.fazjowh.mongodb.net/Law_and_Disorder?retryWrites=true&w=majority')
export default mongoose;