/**
 * Created by sasha on 20.09.15.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//var autoIncrement = require('mongoose-auto-increment');

function sequenceGenerator(name){
    var SequenceSchema, Sequence;

    SequenceSchema = new mongoose.Schema({
        nextSeqNumber: { type: Number, default: 1 }
    });

    Sequence = mongoose.model(name + 'Seq', SequenceSchema);

    return {
        next: function(callback){
            Sequence.find(function(err, data){
                if(err){ throw(err); }

                if(data.length < 1){
                    // create if doesn't exist create and return first
                    Sequence.create({}, function(err, seq){
                        if(err) { throw(err); }
                        callback(seq.nextSeqNumber);
                    });
                } else {
                    // update sequence and return next
                    Sequence.findByIdAndUpdate(data[0]._id, { $inc: { nextSeqNumber: 1 } }, function(err, seq){
                        if(err) { throw(err); }
                        callback(seq.nextSeqNumber);
                    });
                }
            });
        }
    };
}

// sequence instance
var sequence = sequenceGenerator('todo');

var personSchema = new mongoose.Schema({
    _id:Number,
    name: {
        firstName : String,
        lastName : String,
        middleName: String
    },
    birthDay : {
        day: Number,
        month : Number,
        year : Number
    }

});

personSchema.pre('save', function(next){
    console.log(this);
    //console.log(next.toString());
    var doc= this;
    if(doc._id===undefined || doc._id===null) {
        // get the next sequence
        sequence.next(function (nextSeq) {
            doc._id = nextSeq;
            next();
        });
    }else{
        next();
    }
});


var Person = mongoose.model('Person', personSchema);

module.exports = Person;
