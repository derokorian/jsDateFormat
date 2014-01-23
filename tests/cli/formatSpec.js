describe("Format", function() {
    var oDate;
    beforeEach(function() {
        var tz = new Date().getTimezoneOffset() - 60;
        var strDate = '2012-04-04T19:05:07.117' + DateTZtoOffset(tz);
        oDate = new Date(strDate);
        
        if( typeof oDate.format == 'undefined' ) {
            fs = require('fs');
            // ToDo: figure out why relative paths did not work, relying on a specific location may not be safe
            myCode = fs.readFileSync('/home/travis/build/derokorian/jsDateFormat/jsDateFormat.js','utf-8');
            eval(myCode);
        }
    });
    
    it('verifies format as a method of date', function() {
        expect(typeof oDate.format).toBe('function');
    })
    
    it('checks the year options', function(){
        expect(oDate.format('yy')).toEqual('2012');
        expect(oDate.format('y')).toEqual('12');
    });
    
    it('checks the month (numeric) options', function() {
        expect(oDate.format('mm')).toEqual('04');
        expect(oDate.format('m')).toEqual('4');
    });
    
    it('checks the month (text - english) options', function() {
        expect(oDate.format('MM')).toEqual('April');
        expect(oDate.format('M')).toEqual('Apr');
    });
    
    it('checks the day (numeric) options', function () {
        expect(oDate.format('dd')).toEqual('04');
        expect(oDate.format('d')).toEqual('4');
    });
    
    it('checks the day (text - english) options', function () {
        expect(oDate.format('DD')).toEqual('Wednesday');
        expect(oDate.format('D')).toEqual('W');
    });
    
    it('checks the hour (24H) options', function () {
        expect(oDate.format('HH')).toEqual('19');
        expect(oDate.format('H')).toEqual('19');
    });
    
    it('checks the hour (12H) options', function () {
        expect(oDate.format('hh')).toEqual('07');
        expect(oDate.format('h')).toEqual('7');
    });
    
    it('checks the minute options', function() {
        expect(oDate.format('nn')).toEqual('05');
        expect(oDate.format('n')).toEqual('5');
    });
    
    it('checks the second options', function() {
        expect(oDate.format('ss')).toEqual('07');
        expect(oDate.format('s')).toEqual('7');
    });
    
    it('checks the am/pm options', function() {
        expect(oDate.format('j')).toEqual('pm');
        expect(oDate.format('J')).toEqual('PM');
    });
    
    
    it('checks the timezone option', function() {
        expect(oDate.format('z')).toEqual(DateTZtoOffset(oDate.getTimezoneOffset()));
    });
    
    function DateTZtoOffset(dtz) {
        var iTZMin = dtz;
        var bBehindUTC = true;
        if ( iTZMin < 0 ) {
            bBehindUTC = false;
            iTZMin = Math.abs(iTZMin);
        }
        var iTZHr = Math.floor(iTZMin / 60);
        iTZMin = iTZMin % 60;
        iTZHr = (iTZHr < 10 ? '0' : '') + iTZHr;
        iTZMin = (iTZMin < 10 ? '0' : '') + iTZMin;
        return (bBehindUTC ? '-' : '') + iTZHr + iTZMin;
    }
});
