var baseUrl = 'https://sophosqa.okta.com';
var oktaSignIn = new OktaSignIn({
	baseUrl: baseUrl,
	features: {
		securityImage: false,
		rememberMe: true,
		smsRecovery: true,
		selfServiceUnlock: true
	},
	helpLinks: {
		help: 'http://www.sophos.com/custom/help/page',
		forgotPassword: 'http://acme.example.com/custom/forgot/pass/page',
		unlock: 'http://acme.example.com/custom/unlock/page',
		custom: [
			{ text: 'Dehydrated Boulders Support', href: 'http://acme.example.com/support/dehydrated-boulders' },
			{ text: 'Rocket Sled Questions', href: 'http://acme.example.com/questions/rocket-sled' }
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
			res.session.setCookieAndRedirect('https://test-secure.test.sophos.com/en-us/mysophos/my-account.aspx');
        }
	}
    );
