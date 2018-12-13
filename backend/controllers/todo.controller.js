const ToDo = require('../models/todo.model');

exports.allget = (req,res)=>{
    ToDo.find((err, list)=>{
        res.send(list);
    })
}

exports.getid = (req,res)=>{
    ToDo.findById(req.params.id, (err, list)=>{
        res.send(list.title)
    })
}

exports.create = (req,res)=>{
    let list = new ToDo({
        title: req.body.title,
        details: req.body.details
    })
    list.save((err)=>{
        if (err) return next(err);
        res.send('List Created');
    })
}

exports.update = (req,res)=>{
    ToDo.findByIdAndUpdate(req.params.id, {$set: req.body}, (err, list)=>{
        if (err) return next(err);
        res.send('List Updated');
    })
}

exports.delete = (req,res)=>{
    ToDo.findByIdAndRemove(req.params.id, (err)=>{
        if (err) return next(err);
        res.send('Deleted succesfully');
    })
}