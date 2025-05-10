//import assert from 'node:assert';
import { expect } from 'chai';
import { test } from 'node:test';
import { Sumar } from '../src/modulo.js'

test('Sumar dos números', () => {
    const resultado = Sumar(2, 3);
    expect(resultado).to.equal(5);
});