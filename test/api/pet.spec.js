// Bibliotecas e Framework
const supertest = require('supertest')

const petId = 173312201

// Em JavaScript, Classe é opcional, mas pode agrupar em uma Describe
describe('API PetStore Swagger - Pet', () =>{

    // Atributos do grupo/describe
    const request = supertest('https://petstore.swagger.io/v2') // BaseURL
    const massa1 = require('../../vendors/json/massaPet')

    // Funções ou Métodos: Its
    it('POST Pet', async () => { 
    // Atributos, Campos, Características, Configurações
        const pet = await require('../../vendors/json/pet.json')

    // Funções de Teste em si
        return await request
            .post('/pet')
            .send(pet)
            .then((res) => {  // res = response abreviado
                expect(res.statusCode).toBe(200)
                expect(res.body.id).toBe(petId)
                expect(res.body.name).toBe('Zeze')
                expect(res.body.category.name).toBe('dog')
                expect(res.body.tags[0].name).toBe('vaccinated') // o [0] representa que verá a primeira tag listada (a contagem começa em zero)
            }) 
    }) // Final do método POST

    it.each(massa1.array.map(elemento => [
        elemento.name,
        elemento.idPet,
        elemento.categoryId,
        elemento.categoryName
    ]))
    ('POST Pet Data Driven Simples: %s', async (name, idPet, categoryId, categoryName) => { // %s para trazer o primeiro campo da massa de dados
        const pet = require('../../vendors/json/pet.json')
        // Substituimos os campos que queremos personalizar através da massa
        pet.id = idPet
        pet.name = name
        pet.category.id = categoryId
        pet.category.name = categoryName

          return request
            .post('/pet')
            .send(pet)
            .then((res) => {  // res = response abreviado
                expect(res.statusCode).toBe(200)
                expect(res.body.id).toBe(idPet)
                expect(res.body.name).toBe(name)
                expect(res.body.category.name).toBe(categoryName)
                expect(res.body.tags[0].name).toBe('vaccinated') // o [0] representa que verá a primeira tag listada (a contagem começa em zero)
            })
    })

    it('GET Pet', async () => {
        return await request
        // .get('/pet/' + petId) // tradicional
            .get(`/pet/${petId}`) // moderno: template literals
            .then((res) => {
                expect(res.statusCode).toBe(200)
                expect(res.body.id).toBe(petId)
                expect(res.body.status).toBe('available')
        })
    })

    it('PUT Pet', () => {
        const pet = require('../../vendors/json/petput.json')
        return request
            .put('/pet')
            .send(pet)
            .then((res) => {
                expect(res.statusCode).toEqual(200)
                expect(res.body.status).toBe('sold')
            })
    })

    it('DELETE Pet', () => {
        return request
            .delete(`/pet/${petId}`)
            .then((res) => {
                expect(res.statusCode).toEqual(200)
                expect(res.body.code).toEqual(200)
                expect(res.body.message).toBe(petId.toString())
            })
    })

}) // Termina o Describe