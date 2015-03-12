/**
 * Created by coreybrown on 2/25/15.
 */
ftEDuApp.factory('ftData', function($http){


    /*$scope.selectedVideo = {
        tut: cards.data[0],
        vsrc: cards.data[0]
    };*/

    return {
            getData: function()
                {
                    return $http.get('/js/data/ng_tutCards.JSON').success (function(data){
                        cards = data;
                    });
                }
    };
});
