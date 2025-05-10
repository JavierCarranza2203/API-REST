const request = require('supertest');

describe('Obtiene los clientes de la base de datos', ()=>{
    it( "Debería regresar código 200", async ()=>{
    let response = await request('http://localhost:3000').get('/clientes')
        expect(response.statusCode).toBe(200);
    });
});