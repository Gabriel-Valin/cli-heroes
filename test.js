const { deepEqual, ok } = require('assert');
const database = require('./database')

const DEFAULT_MOCK_HEROI = {
    nome: 'flash',
    poder: 'speed',
    id: 1
}

const HEROI_ATUALIZADO = {
    id: 2,
    nome: 'Batman',
    poder: 'dinheiro',
}

describe('Suite de manipulacao de herois', () => {
    before(async() => {
        await database.cadastrarHeroi(DEFAULT_MOCK_HEROI)
        await database.cadastrarHeroi(HEROI_ATUALIZADO)
    })

    it('deve pesquisar um heroi atraves do id, usando arquivos', async () => {
        const expected = DEFAULT_MOCK_HEROI
        const [resultado] = await database.listar(expected.id)
        deepEqual(resultado, expected)
    })

    it('deve pesquisar todos os herois, usando arquivos', async () => {
        const expected = DEFAULT_MOCK_HEROI
        const [resultado] = await database.listar()
        deepEqual(resultado, expected)
    })

    it('deve cadastrar um heroi, usando arquivos', async () => {
        const expected = DEFAULT_MOCK_HEROI
        const [atual] = await database.listar(DEFAULT_MOCK_HEROI.id)
        deepEqual(atual, expected)
    })

    it('deve atualizar um heroi, usando arquivos', async () => {
        const heroiParaAtualizar = {
            nome: 'Lanterna Verde',
            poder: 'monstruoso!'
        }
        const expected = {
            ...HEROI_ATUALIZADO,
            nome: 'Lanterna Verde',
            poder: 'monstruoso!'
        }
        await database.atualizarHeroi(HEROI_ATUALIZADO.id, heroiParaAtualizar)
        const [resultado] = await database.listar(HEROI_ATUALIZADO.id)
        deepEqual(resultado, expected)
    })

    it('deve remover um heroi, usando arquivos', async () => {
        const expected = true
        const resultado = await database.remover(DEFAULT_MOCK_HEROI.id)
        deepEqual(resultado, expected)
    })
})
