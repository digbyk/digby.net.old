var baseUrl = 'https://sophosqa.okta.com';
var oktaSignIn = new OktaSignIn({
	baseUrl: baseUrl,
	features: {
		securityImage: false,
		rememberMe: true,
		smsRecovery: false,
		selfServiceUnlock: false
	},
	helpLinks: {
		help: 'https://www.sophos.com/custom/help/page',
		//forgotPassword: 'http://acme.example.com/custom/forgot/pass/page',
		//unlock: 'http://acme.example.com/custom/unlock/page',
		custom: [
			{ text: 'Customer sign-up', href: 'https://www.sophos.com/register' },
			{ text: 'Partner sign-up', href: 'https://www.sophos.com/partners' }
		]
	},
	labels: {
		'primaryauth.title': 'Sophos ID Login',
		'primaryauth.username': 'Sophos ID',
		'primaryauth.username.tooltip': 'Enter your Sophos ID',
		'primaryauth.password': 'Password',
		'primaryauth.password.tooltip': 'Enter your password'
	},
	logo: 'https://www.sophos.com/en-us/medialibrary/Images/Common/logo-header.png'
});

oktaSignIn.renderEl({ el: '#okta-login-container' },
	function (res) {
        if (res.status === 'SUCCESS') {
			console.log('User %s succesfully authenticated %o', res.user.profile.login, res.user);
			//res.session.setCookieAndRedirect('https://test-secure.test.sophos.com/en-us/mysophos/my-account.aspx');
			res.session.setCookieAndRedirect(getQueryString('ref'));
        }
	}
    );

var getQueryString = function ( field, url ) {
    var href = url ? url : window.location.href;
    var reg = new RegExp( '[?&]' + field + '=([^&#]*)', 'i' );
    var string = reg.exec(href);
    return string ? string[1] : null;
};