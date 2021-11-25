app.get('/', (req, res) => {
    res.render('index')
})

app.get('/login', (req, res) => {
    res.render('login')
})

app.post('/cadastrando', (req, res) => {
    let _cadastro = new cadastro()
    _cadastro.nome = req.body.nome
    _cadastro.sobrenome = req.body.sobrenome
    _cadastro.email = req.body.email
    _cadastro.senha = req.body.senha
    _cadastro.acesso = 'aluno'

    _cadastro.save((erro, result) => {
        if(erro) throw erro
        res.redirect('/login')
    })
})

app.post('/acessarlogin', (req, res) => {
    let usuario = req.body.usuario
    let senha = req.body.senha

    _cadastro.findOne({usuario: usuario}, {prototype: {senha: 1, acesso: 1}}, (erro, result) => {
        if(erro) throw erro
        if(result.usuario == usuario && result.senha == senha && result.acesso == 'aluno'){
            res.render('aluno')
        }else if(result.usuario == usuario && result.senha == senha && result.acesso == 'admin'){
            res.render('admin')
        }else{
            res.render('login')
        }
    })
    
})

