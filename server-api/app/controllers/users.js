import User from '../models/user';

class UserController {
    
    getUsers(req, res, next) {
        User.find({}, (err, users) => {
            if (err) {
                return res.send(err);
            } else {
                res.json(users);
            }
        });
    }

    registerUser(req, res, next) {
        let newUser = new User(req.body);
        newUser.password = newUser.generateHash(newUser.password);    
        newUser.save(err => {
            if (err) {
                return res.send(err);
            }
            res.json({message: 'Usuário incluído com sucesso'});
        });
    }
    
    checkUser(req, res, next) {
        req.assert('login', 'Favor informar um login').notEmpty();

        let errorsValidation = req.validationErrors();

        if (errorsValidation) {
            res.json(errorsValidation[0]);
            return;
        }

        User.findOne({ login: req.body.login }, (err, user) => {
            if (err) {
                return res.send(err);
            }

            if (user) {
                res.json(user);
            } else {
                res.json({msg: 'Usuário não encontrado'});
            }
        });
    }

    updateUser(req, res, next) {
        User.findByIdAndUpdate(req.params.id,{$set:req.body}, (err, result) => {
            if (err){
                return res.send(err);
            }       
            res.json({ message: 'Usuário atualizado com sucesso' });
        });
    }

    removeUser(req, res, next) {
        User.remove({ _id: req.params.id }, (err, user) => {
            if (err) {
                return res.send(err);
            }
            res.json({message: "Usuário removido com sucesso"});
        });
    }

}

const userController = new UserController();
export default userController;