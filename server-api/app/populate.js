import mongoose from 'mongoose';
import Book from './models/book';
import User from './models/user';

const books = [
    {
        "title": "jQuery: a biblioteca do programador JavaScript",
        "author": "SILVA, Maurício Samy",
        "isbn": "978-85-7522-387-1",
        "publication_year": 2013,
        "edition": 3,        
        "code": "070300",
        "location": "005.133; S581j" 
    },
    {
        title: 'Segredos do ninja JavaScript',
        author: 'RESIG, John; BIBEAULT, Bear',
        isbn: '978-85-7522-328-4',
        publication_year: 2013,             
        code: '070326',
        location: '005.133; R338s' 
    },
    {
        title: 'Aplicações na nuvem: como construir com HTML5, JAVASCRIPT, CSS, PHP e MYSQL',
        author: 'TONSIG, Sérgio Luiz',
        isbn: '978-85-399-0335-1',
        publication_year: 2012,              
        code: '081174',
        location: '004.36; T631a' 
    },
    {
        title: 'Javascript & DHTML cookbook',
        author: 'GOODMAN, Danny',
        isbn: '0-596-00467-2',
        publication_year: 2003,        
        code: '008645',
        location: '005.133; G66j' 
    },
    {
        "title": "Estruturas de dados e algoritmos em Java",
        "author": "GOODRICH, Michael T.; TAMASSIA, Roberto",
        "isbn": "978-85-8260-018-4",
        "publication_year": 2013,
        "edition": 5,        
        "code": "070444",
        "location": "005.73; G661e" 
    },
    {
        "title": "Estrutura de dados: algoritmos, análise da complexidade e implementações em java",
        "author": "ASCENCIO, Ana Fernanda Gomes; ARAUJO, Graziela Santos de",
        "isbn": "978-85-7605-881-6",
        "publication_year": 2010,
        "edition": 1,        
        "code": "060306",
        "location": "005.1; A839e" 
    },
    {
        "title": "Estruturas de dados e seus algoritmos",
        "author": "SZWARCFITER, Jayme Luiz; MARKENZON, Lilian",
        "isbn": "978-85-216-1750-1",
        "publication_year": 2010,
        "edition": 3,        
        "code": "070395",
        "location": "005.131; S998e" 
    },
    {
        "title": "Google android: aprenda a criar aplicações para dispositivos móveis com o Android SDK",
        "author": "LECHETA, Ricardo R.",
        "isbn": "978-85-7522-468-7",
        "publication_year": 2016,
        "edition": 5,        
        "code": "079462",
        "location": "005.26; L494g" 
    },
    {
        "title": "Introdução à programação com Python: algoritmos e lógica de programação para iniciantes",
        "author": "MENEZES, Nilo Ney Coutinho",
        "isbn": "978-85-7522-408-3",
        "publication_year": 2014,
        "edition": 2,        
        "code": "070364",
        "location": "005.133; M512i" 
    }
];

const users = [
    {    
        "name" : "Aluno 01", 
        "email" : "aluno01@faculdade.com", 
        "login" : "aluno01", 
        "password" : "123456",                  
    },
    {        
        "name" : "Administrador", 
        "email" : "admin@faculdade.com", 
        "login" : "admin", 
        "password" : "admin", 
        "isAdmin" : true
    }
]

mongoose.connect('mongodb://localhost/books-evaluate');

books.map(data => {
    let book = new Book(data);
    book.save();
});

users.map(data => {
    let user = new User(data);
    user.save();
});