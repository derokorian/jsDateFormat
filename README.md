## Overview

jsDateFormat provides an extension for the Date prototype, which allows formatting the output based on a template.

[![Build Status](https://travis-ci.org/derokorian/jsDateFormat.png?branch=master)](https://travis-ci.org/derokorian/jsDateFormat)

### Examples
    var oDate = new Date();
    alert(oDate.toFormat('d M, yy'); // produces '2 December, 2013'
    alert(oDate.toFormat('H:nn'); // produces '18:17'
    oDate = Date.fromFormat('18:17', 'H:nn'); // Produces an object set to today's date and 18:17 for time.

***

#### Template strings
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

#### Supported Localizations
en - English   
es - Spanish
