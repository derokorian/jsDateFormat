describe("toFormat", function() {
    var oDate, f;
    
    beforeEach(function() {
        if( typeof Date.prototype.jsDateFormat == 'undefined' ) {
            fs = require('fs');
            // ToDo: figure out why relative paths did not work, relying on a specific location may not be safe
            myCode = fs.readFileSync('/home/travis/build/derokorian/jsDateFormat/jsDateFormat.js','utf-8');
            eval(myCode);
        }
        
        f = Date.prototype.jsDateFormat.getTZ;
        var tz = new Date().getTimezoneOffset();
        var strDate = '2012-04-04T19:05:07.117' + f(tz);
        oDate = new Date(strDate);
    });
    
    it('exists as a method of date', function() {
        expect(typeof oDate.toFormat).toBe('function');
    })
    
    it('checks the year options', function(){
        expect(oDate.toFormat('yy')).toEqual('2012');
        expect(oDate.toFormat('y')).toEqual('12');
    });
    
    it('checks the month (numeric) options', function() {
        expect(oDate.toFormat('mm')).toEqual('04');
        expect(oDate.toFormat('m')).toEqual('4');
    });
    
    it('checks the month (text - english) options', function() {
        expect(oDate.toFormat('MM')).toEqual('April');
        expect(oDate.toFormat('M')).toEqual('Apr');
    });
    
    it('checks the day (numeric) options', function () {
        expect(oDate.toFormat('dd')).toEqual('04');
        expect(oDate.toFormat('d')).toEqual('4');
    });
    
    it('checks the day (text - english) options', function () {
        expect(oDate.toFormat('DD')).toEqual('Wednesday');
        expect(oDate.toFormat('D')).toEqual('W');
    });
    
    it('checks the hour (24H) options', function () {
        expect(oDate.toFormat('HH')).toEqual('19');
        expect(oDate.toFormat('H')).toEqual('19');
    });
    
    it('checks the hour (12H) options', function () {
        expect(oDate.toFormat('hh')).toEqual('07');
        expect(oDate.toFormat('h')).toEqual('7');
    });
    
    it('checks the minute options', function() {
        expect(oDate.toFormat('nn')).toEqual('05');
        expect(oDate.toFormat('n')).toEqual('5');
    });
    
    it('checks the second options', function() {
        expect(oDate.toFormat('ss')).toEqual('07');
        expect(oDate.toFormat('s')).toEqual('7');
    });
    
    it('checks the am/pm options', function() {
        expect(oDate.toFormat('j')).toEqual('pm');
        expect(oDate.toFormat('J')).toEqual('PM');
    });
    
    it('checks the timezone option', function() {
        expect(oDate.toFormat('z')).toEqual(f(oDate.getTimezoneOffset()));
    });
});