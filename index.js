const { Command } = require('commander')
const database = require('./database')
const log = require('./logger')
const Heroi = require('./heroi')

async function main() {
    const program = new Command()
    program
        .version('v1')
        .option("-n, --nome [value]", "Nome do Heroi")
        .option("-p, --poder [value]", "Poder do Heroi")
        .option("-i, --id [value]", "Id do Heroi")
        .option("-c, --cadastrar", "Cadastrar um Heroi")
        .option("-l, --listar", "Listar Herois")
        .option("-r, --remover", "Remove um Heroi")
        .option("-a, --atualizar [value]", "Atualiza um Heroi")
    
    program.parse(process.argv)

    const options = program.opts();
    const heroi = new Heroi(options)

    try {
        if (options.cadastrar){
            delete heroi.id
            const resultado = await database.cadastrarHeroi(heroi)
            
            if (!resultado) {
                log.error('Heroi nao cadastrado!')
                return;
            }

            log.info('Heroi cadastrado com sucesso!')
        }

        if (options.listar) {
            const resultado = await database.listar();
            console.log(resultado);
            return;
        }

        if(options.remover){
            const resultado = database.remover(heroi.id)
      
            if (!resultado) {
              log("Não foi possível remover o Heroi");
              return;
            }
            
            log("Heroi removido com sucesso");
        }

        if(options.atualizar){
            const idParaAtualizar = parseInt(options.atualizar);
            delete heroi.id;
            const dado = JSON.stringify(heroi);
            const heroiAtualizar = JSON.parse(dado);
            const resultado = await database.atualizar(idParaAtualizar, heroiAtualizar)
            
            if (!resultado) {
              log("Não foi possível atualizar o Heroi");
              return;
            }
            
            log("Heroi atualizado com sucesso");
        }
    } catch (error) {
        log('ERROR: ', error)
    }
}

main()