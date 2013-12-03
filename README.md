### Overview

jsDateFormat provides an extension for the Date prototype, which allows formatting the output based on a template.

## Examples
    var oDate = new Date();
    alert(oDate.format('d M, yy'); // produces '2 December, 2013'
    alert(oDate.format('H:nn'); // produces '18:17'

***

## Template strings
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

## Supported Localizations
en - English   
es - Spanish
