import Book from '../models/book';
import Evaluate from '../models/evaluate';
let ObjectID = require('mongodb').ObjectId;

class BookController {

    getBooks(req, res, next) {
        Book.find({}, (err, books) => {
            if (err) {
                return res.send(err);
            } else {
                return res.json(books);
            }
        });
    }    

     getBooksAdmin(req, res, next) {         
        Book.find({}).lean().exec((err, books) => {
            books.forEach((book, index) => {
                Evaluate.aggregate([
                    { $match: {book: {$eq: book._id}} },
                    { $group: {
                        _id: { book: '$book' },
                        gradeAvg: { $avg: '$grade'},
                        count: { $sum: 1 }
                    }}
                ]).exec((err, result) => {
                    books[index].evaluatesCalc = result[0];

                    if (index === (books.length - 1)) {
                        return res.json(books);
                    }
                });                
            });
        });
    }

//     getBooks(req, res, next) {
//         Book.lean().find({}, (err, books) => {
//             if (err) {
//                 return res.send(err);
//             } else {

// //                 let teste = books.filter((book, index) => {
// //                     Evaluate.count({'book': book._id}, (err, count) => {                        
// //                         books[index].countEvaluate = count;                        
// //                         return books[index];
// //                     })
// //                 });            
// // console.log(teste);
//                 // let teste = books.reduce(function(result, element) {
//                 //     Evaluate.count({'book': element._id}, (err, count) => {                        
//                 //         // books[index].countEvaluate = count;                        
//                 //         // return books[index];
//                 //         element.countEvaluates = count;
//                 //         result.push(element);
//                 //         return result;
//                 //     });                                        
//                 // }, []);
                
//                 //books[0].teste = 1;
//                 return res.json(books);
//             }
//         }).exec();
//     }

    registerBook(req, res, next) {
        router.post('/add', authenticate, (req, res) => {   
            let newBook = new Book(req.body);
            newBook.save(err => {
                if (err) {
                    return res.send(err);
                }
                res.json({message: 'Livro incluído com sucesso'});
            });
        });
    }

    updateBook(req, res, next) {
        Book.findByIdAndUpdate(req.params.id,{$set:req.body}, (err, result) => {
            if (err){
                return res.send(err);
            }       
            res.json({ message: 'Livro atualizado com sucesso' });
        });
    }

    getBook(req, res, next) {
        Book.findOne({_id: req.params.id}, (err, book) => {
            if (err) {
                return res.send(err);
            } else {
                res.json(book);
            }
        });
    }

    removeBook(req, res, next) {
        Book.remove({ _id: req.params.id }, (err, book) => {
            if (err) {
                return res.send(err);
            }
            res.json({message: "Livro removido com sucesso"});
        });
    }

}

const bookController = new BookController();
export default bookController;