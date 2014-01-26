/**
 * @name jsDateFormat
 * @memberOf Date.prototype
 * @description provides functionality to control formatting with a Date object
 *
 * @author Ryan Pallas <ryan.pallas (at) gmail.com>
 * @version 2.0.1
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
 *   [x]       [x]     yy - 4 digit representation of the year
 *   [x]       [x]     y - 2 digit representation of the year
 *   [x]       [x]     mm - digit representation of the month (with leading zeros)
 *   [x]       [x]     m - digit representation of the month (without leading zeros)
 *   [x]       [x]     MM - full text name of the month
 *   [x]       [x]     M - short text name of the month
 *   [x]       [ ]     DD - full text name of the day
 *   [x]       [ ]     D - short text name of the day
 *   [x]       [x]     dd - digit representation of the month (with leading zeros)
 *   [x]       [x]     d - digit representation of the month (without leading zeros)
 *   [x]       [x]     HH - Hours in 24 hour format (with leading zeros)
 *   [x]       [x]     H - Hours in 24 hour format (without leading zeros)
 *   [x]       [x]     hh - Hours in 12 hour format (with leading zeros)
 *   [x]       [x]     h - hours in 12 hour format (without leading zeros)
 *   [x]       [x]     nn - Minutes (with leading zeros)
 *   [x]       [x]     n - Minutes (without leading zeros)
 *   [x]       [x]     ss - Seconds (with leading zeros)
 *   [x]       [x]     s - Seconds (without leading zeros)
 *   [x]       [x]     j - 12 hour section lowercase (am/pm)
 *   [x]       [x]     J - 12 hour seciton uppercase (AM/PM)
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
            'es' : ['lunes','martes','mi�rcoles','jueves',
                'viernes','s�bado','domingo']
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
    getFunc: function(str, type) {
        var strRetVal = type == 'read' ? 'get' :
                        type == 'write' ? 'set' : '';
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
                if (type == 'read') {
                    strRetVal += 'Day';
                } else {
                    strRetVal = '';
                }
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
        f;
    for ( i = 0; i <= strFormat.length; i++) {
        if (strFormat.charAt(i) == chPrev) {
            iCharCount++;
        }
        else {
            if( chPrev != '' ) {
                f = jsd.getFunc(chPrev, 'read');
                if ( typeof this[f] == 'function') {
                    mVal = this[f]();
                }
                if ( chPrev == 'h' ) {
                    mVal = (mVal + 11) % 12 + 1;
                }
                if (
                    (iCharCount == 2 && chPrev == 'y') ||
                    (iCharCount == 1 && 'dHnsh'.indexOf(chPrev) > -1)
                ) {
                    strRetVal += mVal;
                } else if ( iCharCount == 2 && 'mdHnsh'.indexOf(chPrev) > -1 ) {
                    mVal += chPrev == 'm' ? 1 : 0;
                    strRetVal += (mVal < 10 ? '0' : '') + mVal;
                } else {
                    switch(chPrev) {
                        case 'y':
                            if (iCharCount == 1) {
                                strRetVal += mVal.toString().substring(2,4);
                                break;
                            }
                        case 'm':
                            if (iCharCount == 1) {
                                mVal++;
                                strRetVal += mVal;
                                break;
                            }
                        case 'M':
                            if (iCharCount == 2) {
                                strRetVal += this.jsDateFormat.localizations.
                                    Months[strLoc][mVal];
                                break;
                            }
                            else if (iCharCount == 1) {
                                strRetVal += this.jsDateFormat.localizations.
                                    MonthAbbr[strLoc][mVal];
                                break;
                            }
                        case 'D':
                            if (iCharCount == 2) {
                                strRetVal += this.jsDateFormat.localizations.
                                    Days[strLoc][mVal];
                                break;
                            }
                            else if (iCharCount == 1) {
                                strRetVal += this.jsDateFormat.localizations.
                                    DayAbbr[strLoc][mVal];
                                break;
                            }
                        case 'j':
                            if (iCharCount == 1) {
                                strRetVal += mVal > 0 && mVal < 13 ? 'am' : 'pm';
                                break;
                            }
                        case 'J':
                            if (iCharCount == 1) {
                                strRetVal += mVal > 0 && mVal < 13 ? 'AM' : 'PM';
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
    var oDate = new Date(),
        jsd = oDate.jsDateFormat,
        strLoc = jsd.localization || jsd.localizations['default'],
        chPrev = '',
        iCharCount = 0,
        i,
        mVal,
        f;
    for ( i = 0; i <= strFormat.length; i++) {
        if (strFormat.charAt(i) == chPrev) {
            iCharCount++;
        }
        else {
            f = jsd.getFunc(chPrev, 'write');
            if( chPrev != '' && typeof oDate[f] == 'function' ) {
                if ( (iCharCount == 1 && chPrev == 'y') ||
                     (iCharCount == 2 && 'mdhHns'.indexOf(chPrev) > -1)
                ) {
                    mVal = parseInt(strValue.substr(0,2), 10) - (chPrev == 'm' ? 1 : 0);
                    strValue = strValue.substr(2);
                    if ( chPrev == 'y' ) {
                        if( mVal < 30 )
                            mVal = '20' + mVal;
                        else
                            mVal = '19' + mVal;
                    }
                    oDate[f](mVal);
                } else if ( iCharCount == 1 && 'mdhHns'.indexOf(chPrev) > -1 ) {
                    mVal = null;
                    if ( 'mh'.indexOf(chPrev) > -1 ) {
                        mVal = strValue.match(/^1[0-2]|[1-9]/);
                    } else if ( chPrev == 'd' ) {
                        mVal = strValue.match(/^3[0-1]|[1-2][0-9]|[0-9]/);
                    } else if ( chPrev == 'H' ) {
                        mVal = strValue.match(/^2[0-3]|1[0-9]|[0-9]/);
                    } else {
                        mVal = strValue.match(/^[1-5][0-9]|[0-9]/);
                    }
                    strValue = strValue.substr(mVal.length);
                    if ( chPrev == 'm' ) {
                        mVal--;
                    }
                    oDate[f](mVal);
                } else {
                    switch (chPrev) {
                        case 'y':
                            if( iCharCount == 2 ) {
                                mVal = parseInt(strValue.substr(0,4), 10);
                                strValue = strValue.substr(4);
                                oDate[f](mVal);
                                break;
                            }
                        case 'M':
                            if ( iCharCount == 2 || iCharCount == 1 ) {
                                var re, mo;
                                mVal = '';
                                for( var i = 0; i < 12; i++ ) {
                                    if ( iCharCount == 2 ) {
                                        mo = jsd.localizations.Months[strLoc][i];
                                    } else {
                                        mo = jsd.localizations.MonthAbbr[strLoc][i];
                                    }
                                    re = new RegExp("^" + mo);
                                    if ( strValue.match(re)) {
                                        mVal = i;
                                        strValue = strValue.substr(mo.length);
                                        break;
                                    }
                                }
                                if ( mVal != '' ) {
                                    oDate[f](mVal);
                                    break;
                                }
                            }
                        case 'J':
                        case 'j':
                            if ( iCharCount == 1 ) {
                                mVal = strValue.substr(0,2).toLowerCase();
                                strValue = strValue.substr(2);
                                if ( mVal == 'pm' && oDate.getHours() < 12 ) {
                                    oDate.setHours(oDate.getHours() + 12);
                                    break;
                                } else if ( mVal == 'pm' && oDate.getHours() == 12 ) {
                                    oDate.setHours(0);
                                    break;
                                } else if ( mVal == 'am' && oDate.getHours() > 12 ) {
                                    oDate.setHours(oDate.getHours() - 12);
                                    break;
                                } else if ( mVal == 'am' && oDate.getHours() == 0 ) {
                                    oDate.setHours(12);
                                    break;
                                }
                            }
                        default:
                            strValue = strValue.substr(iCharCount);
                    }
                }
            } else {
                strValue = strValue.substr(iCharCount);
            }
            chPrev = strFormat.charAt(i);
            iCharCount = 1;
        }
    }
    return oDate;
};








