/**
 * @name jsDateFormat
 * @description Returns a string representing the Date based on the given format string
 *
 * @author Ryan Pallas <ryan.pallas (at) gmail.com>
 * @version 1.3beta.0
 * @license The MIT License (MIT)
 *
 * @memberOf Date.prototype
 * @param string strFormat The format of the returned date string, see options below
 * @param string strL18n The localization to use for text options [Supported: en, es] [Default: en]
 * @returns string The formatted date string
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
 * Currently supported options (option are case sensitive):
 *    yy - 4 digit representation of the year
 *    y - 2 digit representation of the year
 *    mm - digit representation of the month (with leading zeros)
 *    m - digit representation of the month (without leading zeros)
 *    MM - full text name of the month
 *    M - short text name of the month
 *    DD - full text name of the day
 *    D - short text name of the day
 *    dd - digit representation of the month (with leading zeros)
 *    d - digit representation of the month (without leading zeros)
 *    HH - Hours in 24 hour format (with leading zeros)
 *    H - Hours in 24 hour format (without leading zeros)
 *    hh - Hours in 12 hour format (with leading zeros)
 *    h - hours in 12 hour format (without leading zeros)
 *    nn - Minutes (with leading zeros)
 *    n - Minutes (without leading zeros)
 *    ss - Seconds (with leading zeros)
 *    s - Seconds (without leading zeros)
 *    j - 12 hour section lowercase (am/pm)
 *    J - 12 hour seciton uppercase (AM/PM)
 *    z - Timezone as offset from UTC
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
        } else if(that.localizations.supported.indexOf(that.localization) = -1) {
            that.localization = that.localizations.default;
        }
    },
    getTZ: function(iTZMin) {
        var bBehindUTC = true;
        if( iTZMin < 0 ) {
            iTZMin = Math.abs(iTZMin);
            bBehindUTC = false;
        }
        var iTZHr = iTZMin / 60;
        iTZMin = iTZMin % 60;
        return (bBehindUTC ? '-' : '') +
            (iTZHr < 10 ? '0' : '') + iTZHr +
            (iTZMin < 10 ? '0' : '') + iTZMin;
    }
}
Date.prototype.format = function (strFormat) {
    // init jsDateFormat
    var jsd = this.jsDateFormat,
        strLoc = jsd.localization || jsd.localizations['default'];
    var strRetVal = '',
        chPrev = '',
        iCharCount = 0,
        i,
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









