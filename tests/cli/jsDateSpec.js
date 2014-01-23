describe('jsDate built-ins', function() {
    var oDate;
    beforeEach(function() {
        if( typeof Date.prototype.jsDateFormat == 'undefined' ) {
            fs = require('fs');
            // ToDo: figure out why relative paths did not work, relying on a specific location may not be safe
            myCode = fs.readFileSync('/home/travis/build/derokorian/jsDateFormat/jsDateFormat.js','utf-8');
            eval(myCode);
        }
    });
    
    it('has properties and methods', function() {
        expect(Date.prototype.jsDateFormat).toBeDefined();
        expect(typeof Date.prototype.jsDateFormat).toEqual('object');
        
        expect(Date.prototype.jsDateFormat.localizations).toBeDefined();
        expect(typeof Date.prototype.jsDateFormat.localizations).toEqual('object');
        
        expect(Date.prototype.jsDateFormat.setLocalization).toBeDefined();
        expect(typeof Date.prototype.jsDateFormat.setLocalization).toEqual('function');
        
        expect(Date.prototype.jsDateFormat.getTZ).toBeDefined();
        expect(typeof Date.prototype.jsDateFormat.getTZ).toEqual('function');
    });
});