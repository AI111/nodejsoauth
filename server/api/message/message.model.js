/**
 * Created by sasha on 03.12.15.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MassageSchema = new Schema({
   text :{type:String,required: true},
   sender:{type: Schema.ObjectId,ref: 'User'},
   sendTime:{type:Date,default:Date.now},
   room:{type : mongoose.Schema.ObjectId, ref : 'Room'},
});
module.exports = mongoose.model('Message', MassageSchema);