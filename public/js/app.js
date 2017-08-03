/**
 * Created by osman on 6/13/2017.
 */
const app = angular.module("routingModule", ['controllersModule', 'ngRoute']);

app.config(function ($routeProvider) {
    $routeProvider
        .when('/viewCarriers', {
            templateUrl: 'templates/listCarriers.html',
            controller: 'carriersCtrl'
        })
        .when('/viewCarriers/:specificCarrier', {
            templateUrl: 'templates/listCarriersDetails.html',
            controller: 'carriersDetailsCtrl'
        })
        .when('/viewCarriers/:specificCarrier/allFlights', {
            templateUrl: 'templates/flightTable.html',
            controller: 'allFlightTableCtrl'
        })
        .when('/viewCarriers/:specificCarrier/:specificFlight', {
            templateUrl: 'templates/flightTable.html',
            controller: 'oneFlightTableCtrl'
        })
        .otherwise({
            redirectTo: '/viewCarriers'
        });
});
