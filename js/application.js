'use strict';

var aiwfModule = angular.module('AiwfModule', [ 'ngRoute', 'firebase',
		'googlePlus' ]);

aiwfModule.value('fbURL', 'https://aiwf.firebaseIO.com/gifts/');

aiwfModule.factory('Gifts', function($firebase, fbURL) {
	return $firebase(new Firebase(fbURL));
});

aiwfModule.config([ '$routeProvider', function($routeProvider) {
	$routeProvider.when('/', {
		controller : 'GiftsController',
		templateUrl : 'views/index.html'
	}).when('/my', {
		controller : 'GiftsController',
		templateUrl : 'views/my-list.html'
	}).when('/others', {
		controller : 'GiftsController',
		templateUrl : 'views/others-list.html'
	}).when('/edit/:giftId', {
		controller : 'EditGiftController',
		templateUrl : 'views/detail.html'
	}).when('/new', {
		controller : 'NewGiftController',
		templateUrl : 'views/detail.html'
	}).when('/amazon', {
		templateUrl : 'views/amazon.html'
	}).when('/logout', {
		controller : 'LoginController',
		templateUrl : 'views/logout.html'
	}).when('/help', {
		templateUrl : 'views/help.html'
	}).otherwise({
		redirectTo : '/'
	});
} ]);

aiwfModule.config([ '$httpProvider', function($httpProvider) {
	console.log('Removing cors bits');
	$httpProvider.defaults.useXDomain = true;
	delete $httpProvider.defaults.headers.common['X-Requested-With'];
} ]);

aiwfModule.controller('LoginController', function($scope, $location,
		$rootScope, $http) {
	$scope.logout = function() {
		console.log('Logging out...');
		alert('This does work a bit strangely. Give it a try, but can\'t guarantee the results. Will keep trying.');
		gapi.auth.signOut();
		$rootScope.loggedIn = false;
		$rootScope.displayName = resp.displayName;
		$rootScope.userId = resp.id;
		$location.path('/');
		// $http.get('http://schrodersws.moneymate.com/prices/australia.json')
		// .success(function(data) {
		// }).error(function() {
		// console.log('Error with request');
		// });
	};
});

aiwfModule.controller('GiftsController', function($rootScope, $scope,
		$location, $routeParams, $firebase, fbURL, Gifts) {

	$scope.$on("event:google-plus-signin-success", function(authResult) {
		console.log('SUCCESS');
		$rootScope.loggedIn = true;
		gapi.client.load('plus', 'v1', function() {
			var request = gapi.client.plus.people.get({
				'userId' : 'me'
			});

			request.execute(function(resp) {
				console.log("My details");
				console.log('ID: ' + resp.id);
				console.log('Display Name: ' + resp.displayName);
				console.log('Image URL: ' + resp.image.url);
				console.log('Profile URL: ' + resp.url);
				$rootScope.displayName = resp.displayName;
				$rootScope.userId = resp.id;
			});
		});
	});
	$scope.$on("event:google-plus-signin-failure", function(authResult) {
		console.log('FAILURE');
		$rootScope.loggedIn = false;
		$rootScope.displayName = null;
		$rootScope.userId = null;
	});
	$scope.greeting = {
		text : 'Welcome to All I Want For'
	};
	$scope.test = function() {
		alert("");
	};
	$scope.gifts = Gifts;
	$scope.boughtByMe = function(gift) {
		if (gift.boughtBy === $rootScope.displayName) {
			return true;
		}
		return false;
	};
	$scope.enteredByMe = function(gift) {
		if (gift.enteredBy === $rootScope.displayName) {
			return true;
		}
		return false;
	};
	$scope.notEnteredByMe = function(gift) {
		if (gift.enteredBy != $rootScope.displayName) {
			return true;
		}
		return false;
	};
	$scope.available = function(gift) {
		if (gift.boughtBy == null || gift.boughtBy === $rootScope.displayName) {
			return true;
		}
		return false;
	};
	$scope.buy = function(gift) {
		console.log('I\'ve bought a gift');
		console.log(gift);
		var giftUrl = fbURL + gift.$id;
		var giftRef = $firebase(new Firebase(giftUrl));
		giftRef.name = gift.name;
		giftRef.url = gift.url;
		giftRef.notes = gift.notes;
		giftRef.enteredBy = gift.enteredBy;
		giftRef.boughtBy = $rootScope.displayName;
		console.log(giftRef);
		giftRef.$save();
	};
	$scope.replace = function(gift) {
		console.log('I\'ve returned a gift');
		console.log(gift);
		var giftUrl = fbURL + gift.$id;
		var giftRef = $firebase(new Firebase(giftUrl));
		giftRef.name = gift.name;
		giftRef.url = gift.url;
		giftRef.notes = gift.notes;
		giftRef.enteredBy = gift.enteredBy;
		console.log(giftRef);
		giftRef.$save();
	};
});

aiwfModule.controller('NewGiftController', function($rootScope, $scope,
		$location, $timeout, $routeParams, $firebase, fbURL, Gifts) {

	$scope.create = function(gift) {
		console.log('Creating gift');
		$scope.gift.enteredBy = $rootScope.displayName;
		Gifts.$add($scope.gift, function() {
			$timeout(function() {
				$location.path('/my');
			});
		});
	};

	$scope.isNew = true;
});

aiwfModule.controller('EditGiftController', function($rootScope, $scope,
		$location, $timeout, $routeParams, $firebase, fbURL, Gifts) {
	var giftUrl = fbURL + $routeParams.giftId;
	$scope.gift = $firebase(new Firebase(giftUrl));

	$scope.save = function(gift) {
		$scope.gift.$save();
		$location.path('/my');
	};

	$scope.remove = function(gift) {
		$scope.gift.$remove();
		$location.path('/my');
	};

	$scope.isNew = false;
});
