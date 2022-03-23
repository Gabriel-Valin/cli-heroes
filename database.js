const { readFile, writeFile } = require('fs')
const { promisify } = require('util')
const readFileAsync = promisify(readFile)
const writeFileAsync = promisify(writeFile)


class Database {
    constructor() {
        this.NOME_ARQUIVO = 'herois.json'
    }

    async obterDadosArquivos(){
        const arquivo = await readFileAsync(this.NOME_ARQUIVO, 'utf8')
        return JSON.parse(arquivo.toString())
    }

    async escreverArquivo(dados){
        await writeFileAsync(this.NOME_ARQUIVO, JSON.stringify(dados))
        return true
    }

    async cadastrarHeroi(heroi){
        const dados = await this.obterDadosArquivos()
        const id = heroi.id <= 2 ? heroi.id : Date.now()
        const novoHeroi = {
            id,
            ...heroi
        }

        const dadosFinal = [...dados, novoHeroi]
        const resultado = this.escreverArquivo(dadosFinal)

        return resultado
    }

    async listar(id){
        const dados = await this.obterDadosArquivos()
        const dadosFiltrados = dados.filter(item => (id ? (item.id === id) : true))
        return dadosFiltrados
    }

    async remover(id) {
        const dados = await this.obterDadosArquivos()
        const itemParaRemover = dados.findIndex(item => item.id === parseInt(id))
        if (itemParaRemover === -1) {
            throw Error('O heroi informado nao existe')
        }

        dados.splice(itemParaRemover, 1)
        return await this.escreverArquivo(dados)
    }

    async atualizarHeroi(id, heroi){
        const dados = await this.obterDadosArquivos()
        const itemParaAtualizar = dados.findIndex(item => item.id === parseInt(id))
        if (itemParaAtualizar === -1) {
            throw Error('O heroi informado nao existe')
        }

        const atual = dados[itemParaAtualizar]
        const novoHeroi = {
            ...atual,
            ...heroi
        }

        dados.splice(itemParaAtualizar, 1)

        return await this.escreverArquivo([...dados, novoHeroi])
    }
}

module.exports = new Database()