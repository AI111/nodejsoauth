/**
 * Created by sasha on 03.12.15.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var RoomSchema = new Schema({
    name :{type:String,required: true},
    created: {type: Date, default:Date.now},
    users:[{type : mongoose.Schema.ObjectId, ref : 'User'}],
    creator:{type : mongoose.Schema.ObjectId, ref : 'User'}
    //messages:[{type : mongoose.Schema.ObjectId, ref : 'Message'}]
});
module.exports = mongoose.model('Room', RoomSchema);
