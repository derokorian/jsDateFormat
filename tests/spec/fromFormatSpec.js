describe('fromFormat', function() {
    var f, tz, d;
    beforeEach(function() {
        f = Date.prototype.jsDateFormat.getTZ;
        tz = new Date().getTimezoneOffset();
    });
    
    it('exists as a method of date', function() {
        expect(typeof Date.fromFormat).toBe('function');
    });
    
    it('can set the year', function() {
        d = Date.fromFormat('2013', 'yy');
        expect(d.toFormat('yy')).toEqual('2013');
        
        d = Date.fromFormat('13', 'y');
        expect(d.toFormat('y')).toEqual('13');
    });
    
    it('can set the month (numeric)', function() {
        d = Date.fromFormat('03', 'mm');
        expect(d.toFormat('mm')).toEqual('03');
        
        d = Date.fromFormat('4', 'm');
        expect(d.toFormat('m')).toEqual('4');
    });
    
    it('can set the month (english)', function() {
        d = Date.fromFormat('March', 'MM');
        expect(d.toFormat('MM')).toEqual('March');
        
        d = Date.fromFormat('May', 'M');
        expect(d.toFormat('M')).toEqual('May');
    });
    
    it('can set the date', function() {
        d = Date.fromFormat('07', 'dd');
        expect(d.toFormat('dd')).toEqual('07');
        
        d = Date.fromFormat('21', 'd');
        expect(d.toFormat('d')).toEqual('21');
    });
    
    it('can set the hours', function() {
        d = Date.fromFormat('07', 'hh');
        expect(d.toFormat('hh')).toEqual('07');
        
        d = Date.fromFormat('11', 'h');
        expect(d.toFormat('h')).toEqual('11');
        
        d = Date.fromFormat('05', 'HH');
        expect(d.toFormat('HH')).toEqual('05');
        
        d = Date.fromFormat('22', 'H');
        expect(d.toFormat('H')).toEqual('22');
    });
    
    it('can set the minutes', function() {
        d = Date.fromFormat('07', 'nn');
        expect(d.toFormat('nn')).toEqual('07');
        
        d = Date.fromFormat('25', 'n');
        expect(d.toFormat('n')).toEqual('25');
    });
    
    it('can set the seconds', function() {
        d = Date.fromFormat('07', 'ss');
        expect(d.toFormat('ss')).toEqual('07');
        
        d = Date.fromFormat('25', 's');
        expect(d.toFormat('s')).toEqual('25');
    });
    
    it('can set am/pm', function() {
        d = Date.fromFormat('pm', 'j');
        expect(d.toFormat('j')).toEqual('pm');
        
        d = Date.fromFormat('am', 'j');
        expect(d.toFormat('j')).toEqual('am');
        
        for( var i = 1; i < 13; i++ ) {
            d = Date.fromFormat(i+'pm', 'hj');
            expect(d.toFormat('hj')).toEqual(i+'pm');
            
            d = Date.fromFormat(i+'am', 'hj');
            expect(d.toFormat('hj')).toEqual(i+'am');
        }
        
        d = Date.fromFormat('AM', 'J');
        expect(d.toFormat('J')).toEqual('AM');
        
        d = Date.fromFormat('PM', 'J');
        expect(d.toFormat('J')).toEqual('PM');
        
        for( var i = 1; i < 13; i++ ) {
            d = Date.fromFormat(i+'PM', 'hJ');
            expect(d.toFormat('hJ')).toEqual(i+'PM');
            
            d = Date.fromFormat(i+'AM', 'hJ');
            expect(d.toFormat('hJ')).toEqual(i+'AM');
        }
    });
    
    it('can create a full date from format', function() {
        var strDate = '2012-04-04 19:05:07';
        var strFormat = 'yy-mm-dd HH:nn:ss';
        
        d = Date.fromFormat(strDate, strFormat);
        expect(d.toFormat(strFormat)).toEqual(strDate);
    });
});