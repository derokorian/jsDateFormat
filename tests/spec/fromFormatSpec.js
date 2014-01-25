describe('fromFormat', function() {
    var f, tz;
    beforeEach(function() {
        f = Date.prototype.jsDateFormat.getTZ;
        tz = new Date().getTimezoneOffset();
    });
    
    it('exists as a method of date', function() {
        expect(typeof Date.fromFormat).toBe('function');
    });
    
    it('can create date from format', function() {
        var strDate = '2012-04-04 19:05:07';
        var strFormat = 'yy-mm-dd HH:nn:ss';
        
        var d = Date.fromFormat(strDate, strFormat);
        expect(d.toFormat(strFormat)).toEqual(strDate);
    });
});