const { get } = require('http');
const { nextTick } = require('process');
const usuarioBanco = require('../../model/repositories/usuarioBD');
const seguranca = require('../../model/components/seguranca');

const express = require('express');

const app = express();

module.exports = function (app) {
    //get da pagina de Login FUNCIONA
    app.get('/Login', function (req, res) {
        if (req.query.fail)
            res.render('usuario/Login', {
                mensagemLogin: 'Usuário e/ou senha incorretos!'
            });
        else res.render('usuario/Login', { mensagemLogin: null });
    });

    //metodo para efetuar login FUNCIONA
    app.post('/login/executar', (req, res) => {
        if (req.body.nome === 'gabriel' && req.body.senha === 'pires')
            res.render('usuario/Sucesso', { mensagem: 'cadastrado' });
        else res.render('/login/?fail=true');
    });

    //get da pagina de cadastro FUNCIONA
    app.get('/usuario/cadastro', function (req, res) {
        if (req.query.fail)
            res.render('usuario/CadastroUsuario', { mensagem: 'Cadastro' });
        else res.render('usuario/CadastroUsuario', { mensagem: null });
    });

    //metodo para salvar o cadastro FUNCIONA
    app.post('/cadastro/usuario/salvar', (req, res) => {
        try {
            let usuario = {
                nome: req.body.nome,
                senha: req.body.senha
            };
            usuarioBanco.insertUsuario(usuario);
            res.render('usuario/Sucesso', { mensagem: 'alterado' });
        } catch (error) {
            /*res.render("usuario/EditUsuario", {
                title: "Edição Cadastro",
                mensagem: "Erro no Cadastro"
            });*/
            console.info(error);
        }
    });

    //pagina para fazer o edit FUNCIONA mas precisa ser alterado
    app.get('/usuario/edit/:id', async (req, res, next) => {
        try {
            let id = req.params.id;
            const usuario = await usuarioBanco.getUsuarioId(id);
            res.render('usuario/EditUsuario', { mensagem: '', usuario });
        } catch (err) {
            next(err);
        }
    });

    //metodo para salvar o edit
    app.post('/usuario/edit/salvar', (req, res) => {
        let usuario = {
            id: req.body.id,
            nome: req.body.nome,
            senha: req.body.senha
        };
        try {
            usuarioBanco.updateUsuario(usuario);
            res.render('usuario/Sucesso', { mensagem: 'alterado' });
        } catch (error) {
            res.render('usuario/EditUsuario', {
                title: 'Edição Cadastro',
                mensagem: 'Erro no cadastrado'
            });
        }
    });

    //pagina para listar o usuario
    app.get('/usuario/Lista', async (req, res, next) => {
        try {
            const docs = await usuarioBD.selectUsuario();
            res.render('usuario/Lista', {
                mensagem: 'Lista de Usuários',
                docs
            });
        } catch (err) {
            nextTick(err);
        }
    });

    //metodo para deletar o usuario FUNCIONA
    app.get('/usuario/delete/:id', async (req, res, next) => {
        try {
            let id = req.params.id;
            await usuarioBanco.deleteUsuario(id);
            const docs = await usuarioBanco.selectUsuario();
            res.render('/usuario/Lista', {
                mensagem: 'Usuário excluído com sucesso',
                docs
            });
        } catch (err) {
            next(err);
        }
    });
};
