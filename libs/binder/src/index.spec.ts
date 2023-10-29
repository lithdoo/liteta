import test from 'ava';
import { Binder } from './index'

test('Binder', (t) => {
    t.true(new Binder instanceof Binder)
});