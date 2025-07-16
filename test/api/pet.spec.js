// Bibliotecas e Framework
const supertest = require('supertest')

const petId = 173312201

// Em JavaScript, Classe é opcional, mas pode agrupar em uma Describe
describe('API PetStore Swagger - Pet', () =>{

    // Atributos do grupo/describe
    const request = supertest('https://petstore.swagger.io/v2') // BaseURL

    // Funções ou Métodos: Its
    it('POST Pet', () => {
    
    // Atributos, Campos, Características, Configurações

    // Funções de Apoio (opcional)

    // Funções de Teste em si

    }) // Final do método POST

}) // Termina o Describe