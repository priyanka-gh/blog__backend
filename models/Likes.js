var mongoose=require("mongoose"); 
var Schema = mongoose.Schema, 
ObjectId = Schema.ObjectId;

const likeSchema = new Schema({
    user : {
        type : ObjectId,
        required : true,
        ref : "User"
    },
    blog : {
        ref : "Blog",
        type : ObjectId,
        required : true
    },
},
)

module.exports = mongoose.model("Like", likeSchema)
