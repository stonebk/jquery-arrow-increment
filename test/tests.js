var compute = $.arrowIncrement.compute,
    decimals = $.arrowIncrement.decimals,
    parse = $.arrowIncrement.parse;

module('compute');

test('basic increment', function () {
    strictEqual(compute(1), 2);
    strictEqual(compute(1.5), 2.5);
    strictEqual(compute(-1.09), -0.09); // typically has floating point error
});

test('basic decrement', function () {
    strictEqual(compute(1, true), 0);
    strictEqual(compute(2.3, true), 1.3);
    strictEqual(compute(-0.5, true), -1.5);
});

test('delta option', function () {
    strictEqual(compute(1, false, { delta: 2 }), 3);
    strictEqual(compute(0, false, { delta: 1.23 }), 1.23);
    strictEqual(compute(-1.32, true, { delta: 2.1 }), -3.42);
    strictEqual(compute(-500, true, { delta: -600 }), 100);
});

test('min/max options', function () {
    strictEqual(compute(1, false, { max: 1 }), 1);
    strictEqual(compute(1.3, false, { max: 1 }), 1.3);
    strictEqual(compute(0.1, false, { max: 1 }), 1);
    strictEqual(compute(-4, true, { min: 1 }), -4);
    strictEqual(compute(-700, true, { min: -701 }), -701);
});

test('zero value options', function () {
    strictEqual(compute(1, false, { delta: 0 }), 1);
    strictEqual(compute(0.5, true, { min: 0 }), 0);
    strictEqual(compute(50, false, { max: 0 }), 50);
});

test('advanced options', function () {
    strictEqual(compute(1000, true, { max: 42, delta: 50 }), 42);
    strictEqual(compute(0, false, { min: 100, max: -100, delta: 1000 }), 0);
    strictEqual(compute(1.875, true, { min: 1.777, max: 1.776, delta: 0.1 }), 1.776);
    strictEqual(compute(162.295, false, { delta: 100, max: 262.2945 }), 262.2945); // typically has floating point error
});

module('decimals');

test('test', function () {
    strictEqual(decimals(1.234), 3);
    strictEqual(decimals(0.0), 0);
    strictEqual(decimals(1.0001), 4);
    strictEqual(decimals(-2), 0);
});

module('parse');

test('basic strings', function () {
    strictEqual(parse('1'), 1);
    strictEqual(parse('-1'), -1);
    strictEqual(parse('0'), 0);
    strictEqual(parse('.00'), 0);
    strictEqual(parse('0.99'), 0.99);
    strictEqual(parse('.5'), 0.5);
});

test('whitespace', function () {
    strictEqual(parse(' 1 '), 1);
    strictEqual(parse(' 1'), 1);
    strictEqual(parse('1 '), 1);
});

test('formatted strings', function () {
    strictEqual(parse('$1'), 1);
    strictEqual(parse('$0.99'), 0.99);
    strictEqual(parse('-$42.00'), -42);
    strictEqual(parse('100,000'), 100000);
    strictEqual(parse('1.234%'), 1.234);
    strictEqual(parse('-$99,999.99'), -99999.99);
    strictEqual(parse('100 dollars'), 100);
    strictEqual(parse('234kms'), 234);
});

test('ambiguous strings', function () {
    ok(isNaN(parse('11,11'), 'isNaN'));
    ok(isNaN(parse('1.2.3')), 'isNaN');
    ok(isNaN(parse('-9-3')), 'isNaN');
    ok(isNaN(parse('123foo456')), 'isNaN');
    ok(isNaN(parse('1.0.1')), 'isNaN');
    ok(isNaN(parse('-1-1')), 'isNaN');
    ok(isNaN(parse('10,,01')), 'isNaN');
    ok(isNaN(parse('123foo123')), 'isNaN');
    ok(isNaN(parse('123 123')), 'isNaN');
    ok(isNaN(parse('123a234')), 'isNaN');
});

test('odd but unambiguous', function () {
    strictEqual(parse('>123120'), 123120);
    strictEqual(parse('100.00 dollars.'), 100);
    strictEqual(parse('.a .5'), 0.5);
});

test('bad input', function () {
    ok(isNaN(parse('')), 'isNaN');
    ok(isNaN(parse('   ')), 'isNaN');
    ok(isNaN(parse('foo')), 'isNaN');
});
