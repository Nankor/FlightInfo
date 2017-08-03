/**
 * Created by osman on 6/13/2017.
 */

let controllersModule = angular.module('controllersModule', ['servicesModule'])
    .controller('carriersCtrl', function ($scope, dataMng) {
        let getDataPromise = dataMng.getCarriers();

        getDataPromise.success(function (data) {
            $scope.carriers = data;
        });

        getDataPromise.error(function (data, status) {
            $scope.errorMessage = status;
        });
    })
    .controller('carriersDetailsCtrl', function ($scope, dataMng, $routeParams) {
        let getDataPromise = dataMng.getCarrierDetails($routeParams.specificCarrier);

        getDataPromise.success(function (data) {
            $scope.carriersDetails = data;
            $scope.carrier = $routeParams.specificCarrier;
        });

        getDataPromise.error(function (data, status) {
            $scope.errorMessage = status;
        });
    });

// shared function for table sorting by table header
function onTableHeaderClick(scope, tableHeader){
    if(scope.sortType === tableHeader){
        scope.sortReverse = !scope.sortReverse
    } else {
        scope.sortType = tableHeader;
        scope.sortReverse = false;
    }
}

controllersModule
    .controller('allFlightTableCtrl', function ($scope, dataMng, $routeParams) {
        let getDataPromise = dataMng.getCarrierFlights($routeParams.specificCarrier);

        getDataPromise.success(function (data) {
            $scope.panelTitle = $routeParams.specificCarrier + ' All Flights';
            $scope.tableHeaders = Object.keys(data[Object.keys(data)[0]]);
            $scope.flightDetails = Object.keys(data).map(function(key) {
                return data[key];
            });
        });

        getDataPromise.error(function (data, status) {
            $scope.errorMessage = status;
        });

        $scope.onTableHeaderClick = onTableHeaderClick;
    })
    .controller('oneFlightTableCtrl', function ($scope, dataMng, $routeParams) {
        let getDataPromise = dataMng.getCarrierFlight($routeParams.specificCarrier, $routeParams.specificFlight);

        getDataPromise.success(function (data) {
            $scope.panelTitle = $routeParams.specificCarrier + ' ' + $routeParams.specificFlight.slice(0,-5) + " Flights";
            $scope.tableHeaders = Object.keys(data[Object.keys(data)[0]]);
            $scope.flightDetails = Object.keys(data).map(function(key) {
                return data[key];
            });
        });

        getDataPromise.error(function (data, status) {
            $scope.errorMessage = status;
        });

        $scope.onTableHeaderClick = onTableHeaderClick;
    });