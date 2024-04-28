const mongoose = require("mongoose");
const transporter = require("../config/nodeMailer.js")
const fileSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  imageUrl: String,
  tags: String,
  email: String,
});

fileSchema.post('save',async (doc)=>{
    try{
        console.log('Doc:',doc);
        //send mail
        const info = await transporter.sendMail({
            from:'GaurangSaini',
            to:doc?.email,
            subject:`New File Uploaded on Cloudinary`,
            html:"<h1>Successfully File uploaded </h1><br/><p>vjshbdvjhbsdhbv</p>"
        })
        console.log(info)
    }catch(err){
        console.log(err);
    }
})

//isse pehle likhna padega post ya pre middleware ka code
module.exports = mongoose.model("File", fileSchema);
