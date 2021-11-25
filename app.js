const express = require('express')
const app = express()

const mongoose = require('mongoose')

const port = 3000


mongoose.connect('mongodb+srv://MateusHolandaDev:M1375577506@cluster0.c82br.mongodb.net/biblioteca?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})


// CRIANDO UM MODELO  PARA INCLUSÃO DE LIVROS NO BANCO DE DADOS
const livros = mongoose.model('Cadastro de Livros', {
    titulo: String,
    nomeAutor: String,
    anoPublicacao: Number,
})

// CRIANDO UM MODELO PARA CADASTRAR OS USUARIOS NO BANCO DE DADOS
const cadastro = mongoose.model('cadastro', {
    nome: String,
    sobrenome: String,
    email: String,
    senha: String,
    acesso: String
})

// CRIANDO UM MODELO  PARA INCLUSÃO DE ALUNOS NO BANCO DE DADOS
// const alunos = mongoose.model('Cadastro de Alunos', {
//   nome: String,
//   email: String,
//   senha: String,
// })


app.set('views', __dirname + '/views')
app.set('view engine', 'ejs')

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(express.static(__dirname + '/public'))

// ROTAS


app.get('/', (req, res) => {
    res.render('index')
})

app.get('/login', (req, res) => {
    res.render('login')
})

app.get('/cadastro', (req, res) => {
    res.render('cadastro')
})

app.post('/cadastrando', (req, res) => {
    let _cadastro = new cadastro()
    _cadastro.nome = req.body.nome
    _cadastro.sobrenome = req.body.sobrenome
    _cadastro.email = req.body.email
    _cadastro.senha = req.body.senha
    _cadastro.acesso = 'aluno'

    _cadastro.save((erro, result) => {
        if (erro) throw erro
        res.redirect('/login')
    })
})

app.post('/acessarlogin', (req, res) => {
    let usuario = req.body.usuario
    let senha = req.body.senha

    cadastro.findOne({nome: usuario}, (err, result) => {
        if(err) throw err
        
        if(result == null){
            res.redirect('/login')
        }else if(result.nome == usuario && result.senha == senha && result.acesso == 'aluno'){
            res.send('Você é um aluno nosso !')
        }else if(result.nome == usuario && result.senha == senha && result.acesso == 'admin'){
            res.send('Você é um administrador !')
        }else{
            res.redirect('/login')
        }
        
        console.log(result)
        
    })
    //     if(err) throw err
    //     res.send(result)
    //     console.log(result)

    // console.log(usuario)
    

})

app.listen(port, () => {
    console.log('Biblioteca no ar, na porta: ' + port)
})