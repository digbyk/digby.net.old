$(document).ready(function () {

    function WindowsViewModel() {
        //var self = this;
        this.windows = [
            {
                id: 1,
                url: "https://lh3.googleusercontent.com/-2aI0oUWktjM/VlrtujF5LAI/AAAAAAAAUfs/G6pS60ehB9I/s1024-Ic42/IMAG0415.jpg"
            },
            {
                id: 2,
                url: "https://scontent-lhr3-1.xx.fbcdn.net/hphotos-xft1/t31.0-8/12291240_10153091966570303_8914216623113000082_o.jpg"
            },
            {
                id: 3,
                url: "https://scontent-lhr3-1.xx.fbcdn.net/hphotos-xpa1/v/t1.0-9/12227697_10153084786485303_7842298098934043258_n.jpg?oh=7c790069e6e5bc8dfdb36b9001dc7a9b&oe=56D861E9"
            },
            {
                id: 4,
                url: "https://scontent-lhr3-1.xx.fbcdn.net/hphotos-xpf1/v/t1.0-9/74040_458888935302_7326877_n.jpg?oh=88c6a45eda2797bee2d2726abd923db7&oe=56DEA1CF"
            },
            {
                id: 5,
                url: "https://scontent-lhr3-1.xx.fbcdn.net/hphotos-xta1/v/t1.0-9/11223487_10152963386170303_3244072003834948523_n.jpg?oh=335cca62d7f2e62a3886c5570d158cdd&oe=56F2CAEB"
            },
            {
                id: 6,
                url: "https://scontent-lhr3-1.xx.fbcdn.net/hphotos-xfa1/v/t1.0-9/10174910_964353173582_3163681278325573464_n.jpg?oh=6da02b1c1de3a4961a0542b3adfe953b&oe=56E5AE75"
            },
            {
                id: 7,
                url: "https://scontent-lhr3-1.xx.fbcdn.net/hphotos-xaf1/v/t1.0-9/10406550_10152703764020303_687024180026650706_n.jpg?oh=6616cf0714cd877256c9285ec19dd09a&oe=56F016DD"
            },
            {
                id: 8,
                url: "https://scontent-lhr3-1.xx.fbcdn.net/hphotos-xfa1/v/t1.0-9/10169314_10151981344151373_4703763617593741382_n.jpg?oh=91caf72433ca5d6bb05819cd9f266ba0&oe=56F7F12B"
            },
            {
                id: 9,
                url: "https://scontent-lhr3-1.xx.fbcdn.net/hphotos-prn2/t31.0-8/1921137_10151880872477105_445731357_o.jpg"
            },
            {
                id: 10,
                url: "https://scontent-lhr3-1.xx.fbcdn.net/hphotos-xaf1/v/t1.0-9/602976_808247780042_1470757111_n.jpg?oh=a1a3eeeeea1bcd87a287b248806dcb69&oe=56FA3B9A"
            },
            {
                id: 11,
                url: "https://scontent-lhr3-1.xx.fbcdn.net/hphotos-xfp1/v/t1.0-9/386122_10150381466880303_1223271224_n.jpg?oh=727c7d57d813d25ecb2227217430c4ce&oe=56EBBF8B"
            },
            {
                id: 12,
                url: "https://scontent-lhr3-1.xx.fbcdn.net/hphotos-ash2/v/t1.0-9/943270_10151464972772105_1610934705_n.jpg?oh=6820cb92649544e2cb8ffe8070fe48ab&oe=56E2C773"
            },
            {
                id: 13,
                url: "https://scontent-lhr3-1.xx.fbcdn.net/hphotos-xpa1/v/t1.0-9/577700_10151018608066558_661654415_n.jpg?oh=4575c7e2410e4ad6d35b619fe798fd9e&oe=56F7EAAE"
            },
            {
                id: 14,
                url: "https://scontent-lhr3-1.xx.fbcdn.net/hphotos-xaf1/t31.0-8/s960x960/328185_10151007884305303_459458230_o.jpg"
            },
            {
                id: 15,
                url: "https://scontent-lhr3-1.xx.fbcdn.net/hphotos-xfa1/v/t1.0-9/11902485_10152963385760303_1057592919052719064_n.jpg?oh=0af5c0ccc399d09c7babb79dec8a229f&oe=56E6849D"
            },
            {
                id: 16,
                url: "https://scontent-lhr3-1.xx.fbcdn.net/hphotos-xfa1/v/t1.0-9/11800079_10152900074625303_9117974804956416280_n.jpg?oh=3c8276f9d88d2fa97b50620fa41fd1fb&oe=56EBA3F4"
            },
            {
                id: 17,
                url: "https://scontent-lhr3-1.xx.fbcdn.net/hphotos-xtp1/v/t1.0-9/11390159_10152787210440303_500717380551583677_n.jpg?oh=fa32968afa4db474db9b896bbe051046&oe=56E36091"
            },
            {
                id: 18,
                url: "https://scontent-lhr3-1.xx.fbcdn.net/hphotos-xpa1/v/t1.0-9/10437437_10152128495100303_2060949527398144035_n.jpg?oh=eae1d8714d63cdfc3f90a30ab0b6c1b3&oe=56FA3402"
            },
            {
                id: 19,
                url: "https://scontent-lhr3-1.xx.fbcdn.net/hphotos-frc3/t31.0-8/1048770_10151464969627105_287231828_o.jpg"
            },
            {
                id: 20,
                url: "https://scontent-lhr3-1.xx.fbcdn.net/hphotos-xpf1/v/t1.0-0/p206x206/968792_10151464976762105_350108743_n.jpg?oh=50b33744a16b6833f206c16651b9dd8b&oe=56D71A6F"
            },
            {
                id: 21,
                url: "https://scontent-lhr3-1.xx.fbcdn.net/hphotos-frc3/v/t1.0-9/10710546_958461171202_5975254869642640944_n.jpg?oh=6dddb90d8b069cec188e4d2ecbd864ee&oe=56F9105E"
            },
            {
                id: 22,
                url: "https://scontent-lhr3-1.xx.fbcdn.net/hphotos-xfp1/v/t1.0-9/532942_10152472353620303_1462947632884721570_n.jpg?oh=ae59e5d0f162ac4e9624b77cba843cc3&oe=56DC80CA"
            },
            {
                id: 23,
                url: "https://scontent-lhr3-1.xx.fbcdn.net/hphotos-xpt1/v/t1.0-9/12196125_10153062269350303_3170830031699105814_n.jpg?oh=28f5d7d9c73296ac068433c13581d86d&oe=56E7B7E6"
            },
            {
                id: 24,
                url: "https://scontent-lhr3-1.xx.fbcdn.net/hphotos-xfp1/t31.0-8/11953590_1659351911018619_7156952904029532760_o.jpg"
            }
        ]
    };
    ko.applyBindings(new WindowsViewModel);

    $('.window').each(function () {
        var thumbnail = $(this).data('thumbnail');
        var date = new Date();
        var day = date.getDate();
        var month = date.getMonth();
        var windowDay = $(this).data('day');
        var advent = $.jStorage.get('advent');
        $(this).css('order', (Math.floor(100 * Math.random())).toString());
        if (advent == null) advent = { openWindows: {} };
        $.jStorage.set('advent', advent);
        if (day >= windowDay) {
            $(this).addClass('openable', 'true');
            if (advent.openWindows['day' + windowDay] == true) {
                $(this).addClass('opened', 'true');
            }
            if ($(this).hasClass('opened')) {
                $(this).css('background-image', 'url(' + thumbnail + ')');
                $(this).featherlight($(this).data('content'), {});
            }
            $(this).click(function () {
                var advent = $.jStorage.get('advent');
                $(this).addClass('opened', 'true');
                advent.openWindows['day' + windowDay] = true;
                $.jStorage.set('advent', advent);
                $(this).css('background-image', 'url(' + thumbnail + ')');
                $(this).featherlight($(this).data('content'), {});
            });
        }
    });

    $('.reset').click(function () {
        $.jStorage.set('advent', { openWindows: {} });
    });

});