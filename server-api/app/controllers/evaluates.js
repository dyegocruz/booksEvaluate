import Evaluate from '../models/evaluate';
import Book from '../models/book';
let ObjectID = require('mongodb').ObjectId;

class EvaluateController {
    getEvaluates(req, res, next) {
        Evaluate.find({})
        .populate('user')
        .populate('book')
        .exec((err, user) => {
            return res.json(user);
        });
    }

    registerEvaluate(req, res, next) {
        let newEvaluate = new Evaluate(req.body);
    
        // validate if user already evaluated the book
        Evaluate.findOne({ book: req.body.book, user: req.body.user }, (err, evaluate) => {
            if (err) {
                return res.send(err);
            }
            
            if (evaluate) {
                res.json({errors: {unique: {message: 'Você já avaliou este livro, favor selecionar outro.'}}});            
            } else {
                // save evaluate
                newEvaluate.save(err => {
                    if (err) {
                        return res.send(err);
                    }
                    res.json({message: 'Avaliação incluída com sucesso'});
                });
            }
        });
    }

    getEvaluatesByUserIdWithAvg(req, res, next) {

        let evaluatesAggregate = [];       
        Evaluate.find({user: req.params.user_id})        
        .populate('book')
        .lean()
        .exec((err, evaluates) => {
            
            if (evaluates) {
                evaluates.forEach((evaluate, index) => {                
                    Evaluate.aggregate([
                        { $match: {book: {$eq: evaluate.book._id}} },
                        { $group: {
                            _id: { book: '$book' },
                            gradeAvg: { $avg: '$grade'}
                        }}
                    ]).exec((err, result) => {
                        evaluates[index].gradeAvg = result[0];

                        if (index === (evaluates.length-1)) {
                            return res.json(evaluates);
                        }            
                        
                    });
                });
            } else {
                return res.json(evaluates);
            }
        });
    }
}

const evaluateController = new EvaluateController();
export default evaluateController;