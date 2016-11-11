$(document).ready(function () {

    function WindowsViewModel() {
        //var self = this;
        this.windows = [
            {
                id: 1,
                url: 'https://scontent-lhr3-1.xx.fbcdn.net/v/t1.0-9/1909934_10153150520517105_7720275046632008327_n.jpg?oh=595b83c657a6ed0e9b6f04eb6bf329dd&oe=58D2D01E'
            },
            {
                id: 2,
                url: 'https://scontent-lhr3-1.xx.fbcdn.net/v/t1.0-9/14523125_10153818792017105_3486422491110618457_n.jpg?oh=12dc9aed1c1ce12e31168c504f08beaf&oe=5895E906'
            },
            {
                id: 3,
                url: 'https://scontent-lhr3-1.xx.fbcdn.net/v/t1.0-9/13920990_10153607908885303_4640550007642409362_n.jpg?oh=b7290fa9b8863438f63fe4e290b7980e&oe=588E9F76'
            },
            {
                id: 4,
                url: 'https://scontent-lhr3-1.xx.fbcdn.net/v/t1.0-9/14433117_10153707513442105_329803376925509983_n.jpg?oh=1648de322962f5a477f16b529a43cd2c&oe=58C89164'
            },
            {
                id: 5,
                url: 'https://scontent-lhr3-1.xx.fbcdn.net/v/t1.0-9/12472472_10153338497275303_6069754433110048508_n.jpg?oh=2321f8a49eda6d3ff6b53d69e93f3c2b&oe=588CED11'
            },
            {
                id: 6,
                url: 'https://scontent-lhr3-1.xx.fbcdn.net/v/t1.0-9/14650741_10153796957610303_3682037351199585503_n.jpg?oh=39d47484a1dbc011dbdec5453b588e8b&oe=588727A0'
            },
            {
                id: 7,
                url: 'https://scontent-lhr3-1.xx.fbcdn.net/v/t1.0-9/14680729_10153796752675303_3751494604359728131_n.jpg?oh=5d9d5444136ad8610fbb0781e1d2572f&oe=58C95EAF'
            },
            {
                id: 8,
                url: 'https://scontent-lhr3-1.xx.fbcdn.net/v/t1.0-9/10952123_10152586022447105_1025918826505707226_n.jpg?oh=575489e2a67145f5e46c9c20be81d1e3&oe=58962B40'
            },
            {
                id: 9,
                url: 'https://scontent-lhr3-1.xx.fbcdn.net/v/t1.0-9/14470537_10153743875395303_2753648594172511370_n.jpg?oh=7165b6618d6ff24348f352e7a0245854&oe=58C86081'
            },
            {
                id: 10,
                url: 'https://scontent-lhr3-1.xx.fbcdn.net/v/t1.0-9/14519924_10153743875330303_4971513066101637792_n.jpg?oh=5a0a2634cd5a237f7079bea35e18860b&oe=588AC251'
            },
            {
                id: 11,
                url: 'https://scontent-lhr3-1.xx.fbcdn.net/v/t1.0-9/14333203_10153699987905303_5997649135490091015_n.jpg?oh=299440d6db2acbbc1c91860b07ba2fb7&oe=58C2D5AA'
            },
            {
                id: 12,
                url: 'https://scontent-lhr3-1.xx.fbcdn.net/v/t1.0-9/14222323_10153672224975303_2856983273350035368_n.jpg?oh=113b471350ed3262e1c3afc753873726&oe=58CE96CD'
            },
            {
                id: 13,
                url: 'https://scontent-lhr3-1.xx.fbcdn.net/v/t1.0-9/14100350_10153642690415303_1518184476410929954_n.jpg?oh=3744b2fa1c254e5566e65659aa11dec5&oe=58D54705'
            },
            {
                id: 14,
                url: 'https://scontent-lhr3-1.xx.fbcdn.net/v/t1.0-9/13962671_10153640006915303_5073336400432818745_n.jpg?oh=d1b9fd5bc438fa66a1c96718f40ceddf&oe=58C33D76'
            },
            {
                id: 15,
                url: 'https://scontent-lhr3-1.xx.fbcdn.net/v/t1.0-9/14034858_10153640006770303_502771901378645985_n.jpg?oh=be98366d59f3474efa0646a9bcd6fec7&oe=5893BB55'
            },
            {
                id: 16,
                url: 'https://scontent-lhr3-1.xx.fbcdn.net/v/t1.0-9/13680698_10153560767370303_1074547845979499295_n.jpg?oh=61e5db7a5b321d0c2a0d0ee9369c4e87&oe=58CE4267'
            },
            {
                id: 17,
                url: 'https://scontent-lhr3-1.xx.fbcdn.net/v/t1.0-9/13310464_10153463850675303_2359812831567832337_n.jpg?oh=f6a6e9fca598a27fc9d6fb9c26ccd864&oe=5895AB33'
            },
            {
                id: 18,
                url: 'https://scontent-lhr3-1.xx.fbcdn.net/v/t1.0-9/12928314_10153338497375303_7233519773473609851_n.jpg?oh=03ffac0280967489afeef13e0c285afc&oe=58C9B282'
            },
            {
                id: 19,
                url: 'https://scontent-lhr3-1.xx.fbcdn.net/v/t1.0-9/12804786_10153279223840303_3756054469283268983_n.jpg?oh=9435a439ec7e5663212b3395473cbbe6&oe=588BF8E6'
            },
            {
                id: 20,
                url: 'https://scontent-lhr3-1.xx.fbcdn.net/v/t1.0-9/12644799_10153207872730303_5601908276513821475_n.jpg?oh=97c5d6c1b848804e0c5d394417eda854&oe=588DECFB'
            },
            {
                id: 21,
                url: 'https://scontent-lhr3-1.xx.fbcdn.net/v/t1.0-9/5802_10153160153665303_7759409237880033875_n.jpg?oh=3a896de78c23c1717ca949bb099a42b2&oe=58D1451C'
            },
            {
                id: 22,
                url: 'https://scontent-lhr3-1.xx.fbcdn.net/v/t1.0-9/7786_10153149895620303_1598460986081281511_n.jpg?oh=71f5a2bc6d9f4fb149cbd91df16b8df3&oe=58C56BED'
            },
            {
                id: 23,
                url: 'https://scontent-lhr3-1.xx.fbcdn.net/v/t1.0-9/10457780_10153144920505303_7019166592378217242_n.jpg?oh=80814ef93f1ad32c936a02976bfcffbb&oe=5894C426'
            },
            {
                id: 24,
                url: 'https://scontent-lhr3-1.xx.fbcdn.net/t31.0-8/14691341_10153788788077105_1020378609311285391_o.jpg'
            }
        ]
    };
    ko.applyBindings(new WindowsViewModel);

    $('.window').each(function () {
        updateWindows();
    });

    $('.reset').click(function () {
        $.jStorage.set('advent', { openWindows: {} });
    });

    setInterval(function () {
        updateWindows();
    }, 5 * 60 * 1000);

    function updateWindows() {
        $('.window').each(function () {
            var thumbnail = $(this).data('thumbnail');
            var date = new Date();
            var day = date.getDate();
            var month = date.getMonth();
            var windowDay = $(this).data('day');
            var advent = $.jStorage.get('advent');
            if (advent == null) advent = { openWindows: {} };
            $.jStorage.set('advent', advent);
            $(this).css('order', (Math.floor(100 * Math.random())).toString());
            if ((day >= windowDay && month == 11) || document.URL.indexOf('debug') > -1) {
                $(this).addClass('openable', 'true');
                if (advent.openWindows['day' + windowDay] == true) {
                    $(this).addClass('opened', 'true');
                    $(this).css('background-image', 'url(' + thumbnail + ')');
                    $(this).featherlight($(this).data('content'), {});
                }
                $(this).click(function () {
                    var ding = document.getElementById('ding');
                    ding.play();
                    ding.volume = 0.1;
                    var advent = $.jStorage.get('advent');
                    $(this).addClass('opened', 'true');
                    advent.openWindows['day' + windowDay] = true;
                    $.jStorage.set('advent', advent);
                    $(this).css('background-image', 'url(' + thumbnail + ')');
                    $(this).featherlight($(this).data('content'), {});
                });
            }
        });

    }
});