import { Router } from 'express';
import passport from 'passport';
import bookController from './controllers/books';
import userController from './controllers/users';
import evaluateController from './controllers/evaluates';

import { generateAccessToken, respond, authenticate } from './middleware/authMiddleware';

const router = Router();    

const init = (app) => {

    router.get('/', (req, res) => {
        res.json({ isOk: 'server is running' });
    });

    router.get('/evaluates', evaluateController.getEvaluates);
    router.post('/evaluates/add', evaluateController.registerEvaluate);
    router.get('/evaluates/:user_id/', evaluateController.getEvaluatesByUserIdWithAvg);

    router.get('/books', bookController.getBooks);
    router.get('/booksAdmin', authenticate, bookController.getBooksAdmin);
    router.get('/books/:id', authenticate, bookController.getBook);
    router.post('/books/add', authenticate, bookController.registerBook);    
    router.put('/books/:id', authenticate, bookController.updateBook);
    router.delete('/books/:id', authenticate, bookController.removeBook);  

    router.post('/login', passport.authenticate(
        'local', {
            session: false,
            scope: [],
        }), generateAccessToken, respond);
    
    router.get('/logout', (req, res) => {
        res.logout();
        res.status(200).send('Successfully logged out');
    })
    
    router.get('/users', userController.getUsers);
    router.post('/users/checkuser', userController.checkUser);
    router.put('/users/:id', userController.updateUser);
    router.delete('/users/:id', userController.removeUser);

    app.use('/v1',router);
};

export default { init };