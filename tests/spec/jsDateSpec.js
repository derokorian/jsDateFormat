describe('jsDateFormat', function() {
    it('exists', function(){
        expect(Date.prototype.jsDateFormat).toBeDefined();
        expect(typeof Date.prototype.jsDateFormat).toEqual('object');
    });
    it('has properties and methods', function() {
        expect(Date.prototype.jsDateFormat.localizations).toBeDefined();
        expect(typeof Date.prototype.jsDateFormat.localizations).toEqual('object');
        
        expect(Date.prototype.jsDateFormat.setLocalization).toBeDefined();
        expect(typeof Date.prototype.jsDateFormat.setLocalization).toEqual('function');
        
        expect(Date.prototype.jsDateFormat.getTZ).toBeDefined();
        expect(typeof Date.prototype.jsDateFormat.getTZ).toEqual('function');
    });
    
    it('extends Date', function() {
        expect(Date.prototype.format).toBeDefined();
        expect(typeof Date.prototype.format).toEqual('function');
        
        expect(Date.parseFormat).toBeDefined();
        expect(typeof Date.parseFormat).toEqual('function');
    });
    
    it('parses timezones correctly', function() {
        var func = Date.prototype.jsDateFormat.getTZ;
        expect(func(0)).toEqual('+0000');
        expect(func(420)).toEqual('-0700');
        expect(func(-60)).toEqual('+0100');
    });
});