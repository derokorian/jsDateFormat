var loadOptions = function() {
    var opts = [
        {
            opt: 'yy',
            to: true,
            from: true,
            desc: '4 digit representation of the year'
        },
        {
            opt: 'y',
            to: true,
            from: true,
            desc: '2 digit representation of the year'
        },
        {
            opt: 'mm',
            to: true,
            from: true,
            desc: 'digit representation of the month (with leading zeros)'
        },
        {
            opt: 'm',
            to: true,
            from: true,
            desc: 'digit representation of the month (without leading zeros)'
        },
        {
            opt: 'MM',
            to: true,
            from: true,
            desc: 'full text name of the month'
        },
        {
            opt: 'M',
            to: true,
            from: true,
            desc: 'short text name of the month'
        },
        {
            opt: 'DD',
            to: true,
            from: false,
            desc: 'full text name of the day'
        },
        {
            opt: 'D',
            to: true,
            from: false,
            desc: 'short text name of the day'
        },
        {
            opt: 'dd',
            to: true,
            from: true,
            desc: 'digit representation of the month (with leading zeros)'
        },
        {
            opt: 'd',
            to: true,
            from: true,
            desc: 'digit representation of the month (without leading zeros)'
        },
        {
            opt: 'HH',
            to: true,
            from: true,
            desc: 'Hours in 24 hour format (with leading zeros)'
        },
        {
            opt: 'H',
            to: true,
            from: true,
            desc: 'Hours in 24 hour format (without leading zeros)'
        },
        {
            opt: 'hh',
            to: true,
            from: true,
            desc: 'Hours in 12 hour format (with leading zeros)'
        },
        {
            opt: 'h',
            to: true,
            from: true,
            desc: 'Hours in 12 hour format (without leading zeros)'
        },
        {
            opt: 'nn',
            to: true,
            from: true,
            desc: 'Minutes (with leading zeros)'
        },
        {
            opt: 'n',
            to: true,
            from: true,
            desc: 'Minutes (without leading zeros)'
        },
        {
            opt: 'ss',
            to: true,
            from: true,
            desc: 'Seconds (with leading zeros)'
        },
        {
            opt: 's',
            to: true,
            from: true,
            desc: 'Seconds (without leading zeros)'
        },
        {
            opt: 'j',
            to: true,
            from: true,
            desc: '12 hour section lowercase (am/pm)'
        },
        {
            opt: 'J',
            to: true,
            from: true,
            desc: '12 hour seciton uppercase (AM/PM)'
        },
        {
            opt: 'z',
            to: true,
            from: false,
            desc: 'Timezone as offset from UTC'
        }
    ];
    var t = document.getElementById('options-table'),
        tr = function(tds) {
            var t = document.createElement('tr');
            for( var i = 0; i < tds.length; i++ ) {
                t.appendChild(tds[i]);
            }
            return t;
        },
        td = function(con) {
            var t = document.createElement('td');
            t.appendChild(con);
            return t;
        },
        checkOn = function() {
            var i = document.createElement('img');
            i.src = 'images/check_on.png';
            return i;
        },
        checkOff = function() {
            var i = document.createElement('img');
            i.src = 'images/check_off.png';
            return i;
        },
        tds;
    if ( t === null )
        return;
    for( var i = 0; i < opts.length; i++ ) {
        tds = [
            td(document.createTextNode(opts[i].opt)),
            td(opts[i].to ? checkOn() : checkOff()),
            td(opts[i].from ? checkOn() : checkOff()),
            td(document.createTextNode(opts[i].desc))
        ];
        t.appendChild(tr(tds));
    }
};

if(window.attachEvent) {
    window.attachEvent('onload', loadOptions);
} else {
    if(window.onload) {
        var curronload = window.onload;
        var newonload = function() {
            curronload();
            loadOptions();
        };
        window.onload = newonload;
    } else {
        window.onload = loadOptions;
    }
}