/**
 * @name jsDateFormat
 * @memberOf Date.prototype
 * @description provides functionality to control formatting with a Date object
 *
 * @author Ryan Pallas <ryan.pallas (at) gmail.com>
 * @version 2.0.0-alpha.2
 * @license The MIT License (MIT)
 *
 *
 * @Copyright (c)2013-2014 Ryan Pallas <ryan.pallas (at) gmail.com>
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 *
 * Options are provided in a string, to represent the desired output
 *    NOTE: Options are not able to be repeated without separators
 *
 * Current formatting options (option are case sensitive):
 * toFormat fromFormat Option
 *   [x]       [ ]     yy - 4 digit representation of the year
 *   [x]       [ ]     y - 2 digit representation of the year
 *   [x]       [ ]     mm - digit representation of the month (with leading zeros)
 *   [x]       [ ]     m - digit representation of the month (without leading zeros)
 *   [x]       [ ]     MM - full text name of the month
 *   [x]       [ ]     M - short text name of the month
 *   [x]       [ ]     DD - full text name of the day
 *   [x]       [ ]     D - short text name of the day
 *   [x]       [ ]     dd - digit representation of the month (with leading zeros)
 *   [x]       [ ]     d - digit representation of the month (without leading zeros)
 *   [x]       [ ]     HH - Hours in 24 hour format (with leading zeros)
 *   [x]       [ ]     H - Hours in 24 hour format (without leading zeros)
 *   [x]       [ ]     hh - Hours in 12 hour format (with leading zeros)
 *   [x]       [ ]     h - hours in 12 hour format (without leading zeros)
 *   [x]       [ ]     nn - Minutes (with leading zeros)
 *   [x]       [ ]     n - Minutes (without leading zeros)
 *   [x]       [ ]     ss - Seconds (with leading zeros)
 *   [x]       [ ]     s - Seconds (without leading zeros)
 *   [x]       [ ]     j - 12 hour section lowercase (am/pm)
 *   [x]       [ ]     J - 12 hour seciton uppercase (AM/PM)
 *   [x]       [ ]     z - Timezone as offset from UTC
 *
 * ToDo: support the following options:
 *    - More Localizations
 *    - More options
 */
Date.prototype.jsDateFormat = {
    that: this,
    localizations: {
        'default': 'en',
        supported: ['en','es'],
        Months: {
            'en' : ['January', 'February', 'March', 'April', 'May',
                'June', 'July', 'August', 'September', 'October',
                'November', 'December'],
            'es' : ['enero', 'febrero', 'marzo', 'abril', 'mayo',
                'junio', 'julio', 'agosto', 'septiembre',
                'octubre', 'noviembre', 'diciembre']
        },
        MonthAbbr: {
            'en' : ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June',
                'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            'es' : ['enero', 'feb', 'marzo', 'abr', 'mayo',
                'jun', 'jul', 'agosto', 'set', 'oct', 'nov', 'dic']
        },
        Days: {
            'en' : ['Sunday', 'Monday', 'Tuesday', 'Wednesday',
                'Thursday', 'Friday', 'Saturday'],
            'es' : ['lunes','martes','miércoles','jueves',
                'viernes','sábado','domingo']
        },
        DayAbbr: {
            'en' : ['Su', 'M', 'Tu', 'W', 'Th', 'F', 'Sa'],
            'es' : ['l', 'ma', 'mi', 'j', 'v', 's', 'd']
        }
    },
    setLocalization: function(strLocalization) {
        if (that.localizations.supported.indexOf(strLocalization) > -1) {
            that.localization = strLocalization;
        } else if(that.localizations.supported.indexOf(that.localization) == -1) {
            that.localization = that.localizations.default;
        }
    },
    getTZ: function(iTZMin) {
        var bBehindUTC = true;
        if( iTZMin <= 0 ) {
            iTZMin = Math.abs(iTZMin);
            bBehindUTC = false;
        }
        var iTZHr = iTZMin / 60;
        iTZMin = iTZMin % 60;
        return (bBehindUTC ? '-' : '+') +
            (iTZHr < 10 ? '0' : '') + iTZHr +
            (iTZMin < 10 ? '0' : '') + iTZMin;
    },
    getFunc: function(str, read) {
        var strRetVal = read ? 'get' : 'set';
        switch(str) {
            case 'y':
                strRetVal += 'FullYear';
                break;
            case 'm':
            case 'M':
                strRetVal += 'Month';
                break;
            case 'd':
                strRetVal += 'Date';
                break;
            case 'D':
                strRetVal += 'Day';
                break;
            case 'H':
            case 'h':
            case 'j':
            case 'J':
                strRetVal += 'Hours';
                break;
            case 'n':
                strRetVal += 'Minutes';
                break;
            case 's':
                strRetVal += 'Seconds';
                break;
            default:
                strRetVal = '';
        }
        return strRetVal;
    }
};

/**
 * @name format
 * @memberOf Date.prototype
 * @deprecated since v2.0.0 - use toFormat instead
 * @param string strFormat The format of the returned date string
 * @returns string The formatted date string
 */
Date.prototype.format = function (strFormat) {
    return this.toFormat(strFormat);
};

/**
 * @name toFormat
 * @memberOf Date.prototype
 * @param string strFormat The format of the returned date string
 * @returns string The formatted date string
 */
Date.prototype.toFormat = function(strFormat) {
        // init jsDateFormat
    var jsd = this.jsDateFormat,
        strLoc = jsd.localization || jsd.localizations['default'];
    var strRetVal = '',
        chPrev = '',
        iCharCount = 0,
        i,
        mVal,
        iMonth = this.getMonth() + 1,
        iDate = this.getDate(),
        iDay = this.getDay(),
        iHrs = this.getHours(),
        i12Hrs = (iHrs + 11) % 12 + 1,
        iMin = this.getMinutes(),
        iSec = this.getSeconds();
    for ( i = 0; i <= strFormat.length; i++) {
        if (strFormat.charAt(i) == chPrev) {
            iCharCount++;
        }
        else {
            if( chPrev != '' ) {
                var f = jsd.getFunc(chPrev, true);
                if ( typeof this[f] == 'function') {
                    mVal = this[f]();
                }
                switch(chPrev) {
                    case 'y':
                        if (iCharCount == 2) {
                            strRetVal += this.getFullYear();
                            break;
                        }
                        else if (iCharCount == 1) {
                            strRetVal += this.getFullYear().toString().substring(2,4);
                            break;
                        }
                    case 'm':
                        if (iCharCount == 2) {
                            strRetVal += (iMonth < 10 ? '0' : '') + iMonth;
                            break;
                        }
                        else if (iCharCount == 1) {
                            strRetVal += iMonth;
                            break;
                        }
                    case 'M':
                        if (iCharCount == 2) {
                            strRetVal += this.jsDateFormat.localizations.
                                Months[strLoc][iMonth - 1];
                            break;
                        }
                        else if (iCharCount == 1) {
                            strRetVal += this.jsDateFormat.localizations.
                                MonthAbbr[strLoc][iMonth - 1];
                            break;
                        }
                    case 'd':
                        if (iCharCount == 2) {
                            strRetVal += (iDate < 10 ? '0' : '') + iDate;
                            break;
                        }
                        else if (iCharCount == 1) {
                            strRetVal += iDate;
                            break;
                        }
                    case 'D':
                        if (iCharCount == 2) {
                            strRetVal += this.jsDateFormat.localizations.
                                Days[strLoc][iDay];
                            break;
                        }
                        else if (iCharCount == 1) {
                            strRetVal += this.jsDateFormat.localizations.
                                DayAbbr[strLoc][iDay];
                            break;
                        }
                    case 'H':
                        if (iCharCount == 2) {
                            strRetVal += (iHrs < 10 ? '0' : '') + iHrs;
                            break;
                        }
                        else if (iCharCount == 1) {
                            strRetVal += iHrs;
                            break;
                        }
                    case 'h':
                        if (iCharCount == 2) {
                            strRetVal += (i12Hrs < 10 ? '0' : '') + i12Hrs;
                            break;
                        }
                        else if (iCharCount == 1) {
                            strRetVal += i12Hrs;
                            break;
                        }
                    case 'n':
                        if (iCharCount == 2) {
                            strRetVal += (iMin < 10 ? '0' : '') + iMin;
                            break;
                        }
                        else if (iCharCount == 1) {
                            strRetVal += iMin;
                            break;
                        }
                    case 's':
                        if (iCharCount == 2) {
                            strRetVal += (iSec < 10 ? '0' : '') + iSec;
                            break;
                        }
                        else if (iCharCount == 1) {
                            strRetVal +=  iSec;
                            break;
                        }
                    case 'j':
                        if (iCharCount == 1) {
                            strRetVal += iHrs > 0 && iHrs < 13 ? 'am' : 'pm';
                            break;
                        }
                    case 'J':
                        if (iCharCount == 1) {
                            strRetVal += iHrs > 0 && iHrs < 13 ? 'AM' : 'PM';
                            break;
                        }
                    case 'z':
                        if (iCharCount == 1) {
                            strRetVal += jsd.getTZ(this.getTimezoneOffset());
                            break;
                        }
                    default:
                        strRetVal += new Array(iCharCount + 1).join(chPrev);
                }
            }
            chPrev = strFormat.charAt(i);
            iCharCount = 1;
        }
    }

    return strRetVal;
};

/**
 * @name fromFormat
 * @memberOf Date
 * @param string strValue A string representing a Date and/or time
 * @param string strFormat The format of the date string
 * @returns Date The date object, whose values are set to what was passed in
 */
Date.fromFormat = function(strValue, strFormat) {
    var oDate = new Date();
    // parseFormat here
    return oDate;
};








