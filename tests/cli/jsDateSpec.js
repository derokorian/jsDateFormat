describe('jsDateFormat', function() {
    beforeEach(function() {
        if( typeof Date.prototype.jsDateFormat == 'undefined' ) {
            fs = require('fs');
            // ToDo: figure out why relative paths did not work, relying on a specific location may not be safe
            myCode = fs.readFileSync('/home/travis/build/derokorian/jsDateFormat/jsDateFormat.js','utf-8');
            eval(myCode);
        }
    });
    
    it('exists', function(){
        expect(Date.prototype.jsDateFormat).toBeDefined();
        expect(typeof Date.prototype.jsDateFormat).toEqual('object');
    });
    
    describe('has properties and methods', function() {
        it('localizations', function() {
            expect(Date.prototype.jsDateFormat.localizations).toBeDefined();
            expect(typeof Date.prototype.jsDateFormat.localizations).toEqual('object');
        });
        
        it('setLocalization', function() {
            expect(Date.prototype.jsDateFormat.setLocalization).toBeDefined();
            expect(typeof Date.prototype.jsDateFormat.setLocalization).toEqual('function');
        });
        
        it('getTZ', function() {
            expect(Date.prototype.jsDateFormat.getTZ).toBeDefined();
            expect(typeof Date.prototype.jsDateFormat.getTZ).toEqual('function');
        });
    });
    
    describe('extends Date', function() {
        it('with format', function() {
            expect(Date.prototype.format).toBeDefined();
            expect(typeof Date.prototype.format).toEqual('function');
        });
        it('with toFormat', function() {
            expect(Date.prototype.toFormat).toBeDefined();
            expect(typeof Date.prototype.toFormat).toEqual('function');
        });
        it('with fromFormat', function() {
            expect(Date.fromFormat).toBeDefined();
            expect(typeof Date.fromFormat).toEqual('function');
        });
    });
    
    it('parses timezones correctly', function() {
        var func = Date.prototype.jsDateFormat.getTZ;
        expect(func(0)).toEqual('+0000');
        expect(func(420)).toEqual('-0700');
        expect(func(-60)).toEqual('+0100');
    });
});