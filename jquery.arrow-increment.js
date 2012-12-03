(function ($) {

    /**
     * @param {node} element The HTML element.
     * @param {number} [opts.delta] Increment/decrement by the value of delta.
     * @param {number} [opts.min] The minimum value allowed.
     * @param {number} [otps.max] The maxiumum value allowed.
     * @param {function} [opts.parseFn] A custom parse function.
     * @param {function} [opts.formatFn] A custom format function.
     */
    $.arrowIncrement = function (element, opts) {
        var $this = $(element);
        $this.keydown(function (e) {
            if (e.keyCode === 38) { // up
                console.log('up');
            } else if (e.keyCode === 40) { // down
                console.log('down');
            }
        });
    };

    /**
     * @static
     * @param {number} value The value to increment.
     * @param {number} delta The amount to increment by.
     * @param {boolean} decrement Decrement the value instead.
     * @return {number} The incremented value.
     */
    $.arrowIncrement.increment = function (value, delta, decrement) {
        if (decrement) {
            return value - delta;
        } else {
            return value + delta;
        }
    };

    /**
     * @static
     * @param {string} value The input value.
     * @return {number} The input value as a number.
     */
    $.arrowIncrement.parse = function (value) {
        var parsed = value.match(/^(\D*?)(\d*(,\d{3})*(\.\d+)?)\D*$/);
        if (parsed && parsed[2]) {
            if (parsed[1] && parsed[1].indexOf('-') >= 0) {
                return -parsed[2].replace(',', '');
            } else {
                return +parsed[2].replace(',', '');
            }
        }
        return NaN;
    };

    // Add to jQuery
    $.fn.arrowIncrement = function (opts) {
        return this.each(function () {
            (new $.arrowIncrement(this, opts));
        });
    };

}(jQuery));