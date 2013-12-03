/**
 * @description Returns a string representing the Date based on the given format string
 * @memberOf Date.prototype
 * @requires Array.prototype.indexOf
 * @param string strFormat The format of the returned date string, see options below
 * @param string strL18n The localization to use for text options [Supported: en]
 * @returns string The formatted date string
 *
 * @author Ryan Pallas <ryan.pallas (at) gmail.com>
 * @version 0.1.0
 * @license The MIT License (MIT)

 * @Copyright (c)2013 Ryan Pallas <ryan.pallas (at) gmail.com>
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
 *    NOTE: Options are currently not able to be supported without separators
 *    
 * Currently supported options (option are case sensitive):
 *    yyyy - 4 digit representation of the year
 *    yy - 2 digit representation of the year
 *    mm - digit representation of the month (with leading zeros)
 *    m - digit representation of the month (without leading zeros)
 *    MM - full text name of the month (English only)
 *    M - short text name of the month (English only)
 *    DD - full text name of the day (English only)
 *    D - short text name of the day (English only)
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
 *    
 * ToDo: support the following options:
 *    - Add Localizations
 *    - More options
 */
Date.prototype.format = function(strFormat,strL18n) {
    strL18n = typeof strL18n == 'undefined' ? 'en' : strL18n;
    var aMonths = {
            'en' : ['January','February','March','April','May',
                'June','July','August','September','October',
                'November','December']
        },
        aDays = {
            'en' : ['Sunday','Monday','Tuesday','Wednesday',
                'Thursday','Friday','Saturday']
        },
        strRetVal = '',
        chPrev = '',
        iCharCount = 0;
    for( var i = 0; i <= strFormat.length; i++ )
    {
        if( strFormat.charAt(i) == chPrev ) 
        {
            iCharCount++;
        }
        else
        {
            if( chPrev != '' )
            {
                switch(chPrev)
                {
                    case 'y':
                        if (iCharCount == 4)
                        {
                            strRetVal += this.getFullYear();
                        }
                        else if (iCharCount == 2)
                        {
                            strRetVal += this.getFullYear().toString().substring(2,4);
                        }
                        else
                        {
                            strRetVal += Array(iCharCount + 1).join(chPrev);
                        }
                        break;
                    case 'm':
                        if (iCharCount == 2)
                        {
                            var iMonth = this.getMonth() + 1;
                            strRetVal += (iMonth < 10 ? '0' : '') + iMonth;
                        }
                        else if (iCharCount == 1)
                        {
                            strRetVal += this.getMonth();
                        }
                        else
                        {
                            strRetVal += Array(iCharCount + 1).join('m');
                        }
                        break;
                    case 'M':
                        if (iCharCount == 2)
                        {
                            strRetVal += aMonths[strL18n][this.getMonth()];
                        }
                        else if (iCharCount == 1)
                        {
                            strRetVal += aMonths[strL18n][this.getMonth()].substring(0,3);
                        }
                        else
                        {
                            strRetVal += Array(iCharCont + 1).join('M');
                        }
                        break;
                    case 'd': 
                        if (iCharCount == 2)
                        {
                            var iDay = this.getDate();
                            strRetVal += (iDay < 10 ? '0' : '') + iDay;
                        }
                        else if (iCharCount == 1)
                        {
                            strRetVal += this.getDate();
                        }  
                        else
                        {
                            strRetVal += Array(iCharCount + 1).join('d');
                        }
                        break;
                    case 'D':
                        if (iCharCount == 2)
                        {
                            strRetVal += aDays[this.getDay()];
                        }
                        else if (iCharCount == 1)
                        {
                            var iDay = this.getDay();
                            if ( strL18n == 'en' )
                            {
                                if ( [0,2,4,6].indexOf(iDay) > -1 )
                                {
                                    strRetVal += aDays[strL18n][iDay].substring(0,2);
                                }
                                else
                                {
                                    strRetVal += aDays[strL18n][iDay].substring(0,1);
                                }
                            }
                        }
                        else
                        {
                            strRetVal += Array(iCharCount + 1).join('D');
                        }
                        break;
                    case 'H':
                        if (iCharCount == 2)
                        {
                            var iHrs = this.getHours();
                            strRetVal += (iHrs < 10 ? '0' : '') + iHrs;
                        }
                        else if (iCharCount == 1)
                        {
                            strRetVal += this.getHours();
                        }
                        else
                        {
                            strRetVal += Array(iCharCount + 1).join('H');
                        }
                        break;
                    case 'h':
                        if (iCharCount == 2)
                        {
                            var iHrs = ((this.getHours() + 11) % 12 + 1);
                            strRetVal += (iHrs < 10 ? '0' : '') + iHrs;                            
                        }
                        else if (iCharCount == 1)
                        {
                            strRetVal += ((this.getHours() + 11) % 12 + 1);
                        }
                        else
                        {
                            strRetVal += Array(iCharCount + 1).join('h');
                        }
                        break;
                    case 'n':
                        if (iCharCount == 2)
                        {
                            var iMin = this.getMinutes();
                            strRetVal += (iMin < 10 ? '0' : '') + iMin;
                        }
                        else if (iCharCount == 1)
                        {
                            strRetVal += this.getMinutes();
                        }
                        else
                        {
                            strRetVal += Array(iCharCount + 1).join('n');
                        }
                        break;
                    case 's':
                        if (iCharCount == 2)
                        {
                            var iSec = this.getSeconds();
                            strRetVal += (iSec < 10 ? '0' : '') + iSec;
                        }
                        else if (iCharCount == 1)
                        {
                            strRetVal +=  this.getSeconds();
                        }
                        else
                        {
                            strRetVal += Array(iCharCount + 1).join('s');
                        }
                        break;
                    case 'j':
                        if (iCharCount == 1)
                        {
                            strRetVal += this.getHours() > 0 && this.getHours() < 13 ? 'am' : 'pm';
                        }
                        else
                        {
                            strRetVal += Array(iCharCount + 1).join('j');
                        }
                        break;
                    case 'J':
                        if (iCharCount == 1)
                        {
                            strRetVal += this.getHours() > 0 && this.getHours() < 13 ? 'AM' : 'PM';
                        }
                        else
                        {
                            strRetVal += Array(iCharCount + 1).join('J');
                        }
                        break;
                    default:
                        strRetVal += Array(iCharCount + 1).join(chPrev);
                }
            }
            chPrev = strFormat.charAt(i);
            iCharCount = 1;
        }
    }
    
    return strRetVal;
};
