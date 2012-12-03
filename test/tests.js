var increment = $.arrowIncrement.increment,
    ambiguous = $.arrowIncrement.isAmbiguous,
    parse = $.arrowIncrement.parse;

module('increment');

test('basic', function () {
    strictEqual(increment(1, 1), 2);
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
