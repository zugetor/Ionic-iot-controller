// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'ion-datetime-picker'])

.run(function($ionicPlatform,$rootScope) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs).
    // The reason we default this to hidden is that native apps don't usually show an accessory bar, at
    // least on iOS. It's a dead giveaway that an app is using a Web View. However, it's sometimes
    // useful especially with forms, though we would prefer giving the user a little more room
    // to interact with the app.
    if (window.cordova && window.Keyboard) {
      window.Keyboard.hideKeyboardAccessoryBar(true);
    }

    if (window.StatusBar) {
      // Set the statusbar to use the default style, tweak this to
      // remove the status bar on iOS or change it to use white instead of dark colors.
      StatusBar.styleDefault();
    }
	$rootScope.timeValue = new Date();
  });
})

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  .state('app.plant', {
    url: '/plant',
    views: {
      'menuContent': {
        templateUrl: 'templates/plant.html',
		controller: 'plantCtrl'
      }
    }
  })

  .state('app.home', {
    url: '/home',
    views: {
      'menuContent': {
        templateUrl: 'templates/home.html',
		controller: 'HomeCtrl'
      }
    }
  })

  .state('app.light', {
    url: '/light',
    views: {
      'menuContent': {
        templateUrl: 'templates/light.html',
		controller: 'LightCtrl'
      }
    }
  })

  .state('app.air', {
    url: '/air',
    views: {
      'menuContent': {
        templateUrl: 'templates/air.html',
		controller: 'AirCtrl'
      }
    }
  })

  .state('app.vaccum', {
    url: '/vaccum',
    views: {
      'menuContent': {
        templateUrl: 'templates/vaccum.html',
		controller: 'VaccumCtrl'
      }
    }
  })

  .state('app.cam', {
    url: '/cam',
    views: {
      'menuContent': {
        templateUrl: 'templates/cam.html',
		controller: 'CamCtrl'
      }
    }
  })

  .state('app.garage', {
    url: '/garage',
    views: {
      'menuContent': {
        templateUrl: 'templates/garage.html',
		controller: 'GarageCtrl'
      }
    }
  })

  .state('app.lock', {
    url: '/lock',
    views: {
      'menuContent': {
        templateUrl: 'templates/lock.html',
		controller: 'LockCtrl'
      }
    }
  })

  .state('app.music', {
    url: '/music',
    views: {
      'menuContent': {
        templateUrl: 'templates/music.html',
		controller: 'MusicCtrl'
      }
    }
  })

  .state('app.temp', {
    url: '/temp',
    views: {
      'menuContent': {
        templateUrl: 'templates/temp.html',
		controller: 'TempCtrl'
      }
    }
  })
  
  .state('app.viewcam', {
    url: '/viewcam/:Id',
    views: {
      'menuContent': {
        templateUrl: 'templates/viewcam.html',
		controller: 'viewcamCtrl'
      }
    }
  })

  .state('app.addPlant', {
      url: '/addPlant/:Id',
      views: {
        'menuContent': {
          templateUrl: 'templates/addPlant.html',
		  controller: 'plantCtrl2'
        }
      }
    })

    .state('app.addLight', {
      url: '/addLight/:Id',
      views: {
        'menuContent': {
          templateUrl: 'templates/addLight.html',
		  controller: 'LightCtrl2'
        }
      }
    })

    .state('app.selectsong', {
      url: '/selectsong',
      views: {
        'menuContent': {
          templateUrl: 'templates/selectsong.html',
      controller: 'SelectsongCtrl'
        }
      }
    })

	$ionicConfigProvider.backButton.text("");
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/home');
});
