/**
 * Created by osman on 6/13/2017.
 */

angular.module('servicesModule', [])
    .factory('dataMng', function ($http) {
        return {
            getCarriers: function () {
                return $http({method: 'GET', url: 'http://localhost:8090/carriers'});
            },
            getCarrierDetails: function (carrierName) {
                return $http({
                    url: 'http://localhost:8090/' + carrierName,
                    method: 'GET'
                });
            },
            getCarrierFlights: function (carrierName) {
                return $http({
                    url: 'http://localhost:8090/' + carrierName + '/flightInfo',
                    method: 'GET'
                });
            },
            getCarrierFlight: function (carrierName, flightName) {
                return $http({
                    url: 'http://localhost:8090/' + carrierName + '/' + flightName,
                    method: 'GET'
                });
            }
        }
    });