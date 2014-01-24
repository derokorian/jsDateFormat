describe('fromFormat', function() {
    beforeEach(function() {
        if( typeof Date.prototype.jsDateFormat == 'undefined' ) {
            fs = require('fs');
            // ToDo: figure out why relative paths did not work, relying on a specific location may not be safe
            myCode = fs.readFileSync('/home/travis/build/derokorian/jsDateFormat/jsDateFormat.js','utf-8');
            eval(myCode);
        }
    });
    
    it('exists as a method of date', function() {
        expect(typeof Date.fromFormat).toBe('function');
    })
});