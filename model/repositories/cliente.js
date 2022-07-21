const CLienteRepository = require("../entities/cliente");
async function inserirCliente(value) {
    return await CLienteRepository.create(value);
}
async function buscarClienteCpf(value) {
    return await CLienteRepository.findAll();
}
async function buscarTodosClientes(value) {
    return await CLienteRepository.findByPk(value);
}
async function deletarCliente(value) {
    return await CLienteRepository.destroy({ where: { cpf: value } });
}
async function salvarOuAtualizarCliente(value) {
    return await CLienteRepository.upsert(value);
}
module.exports = {
    inserirCliente,
    buscarClienteCpf,
    buscarTodosClientes,
    deletarCliente,
    salvarOuAtualizarCliente
};
