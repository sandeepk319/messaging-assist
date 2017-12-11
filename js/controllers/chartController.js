app.controller('chartCtrl', function ($scope, $log) {

	//console.log("scope:");
	//console.dir($scope);
	//console.log("titleName: " + titleName);
	
	$scope.selectedDuration = 1;
	$scope.showTotalLine = true;
	$scope.showAcceptedLine = true;
	$scope.showEscalatedLine = true;
	$scope.buttonTextTotal = "hide";
	$scope.buttonTextAccepted = "hide";
	$scope.buttonTextEscalated = "hide";
	var rawDataDay = [
	                   {"total": 30, "accepted":11, "escalated": 1, "date": "7/1"},
	                   {"total": 52, "accepted":5, "escalated": 1, "date": "7/2"},
	                   {"total": 48, "accepted":9, "escalated": 1, "date": "7/3"},
	                   {"total": 55, "accepted":22, "escalated": 1, "date": "7/4"},
	                   {"total": 36, "accepted":26, "escalated": 1, "date": "7/5"},
	                   {"total": 29, "accepted":9, "escalated": 1, "date": "7/6"},
	                   {"total": 35, "accepted":26, "escalated": 2, "date": "7/7"},
	                   {"total": 30, "accepted":11, "escalated": 2, "date": "7/8"},
	                   {"total": 52, "accepted":5, "escalated": 1, "date": "7/9"},
	                   {"total": 48, "accepted":9, "escalated": 1, "date": "7/10"},
	                   {"total": 55, "accepted":22, "escalated": 1, "date": "7/11"},
	                   {"total": 36, "accepted":26, "escalated": 1, "date": "7/12"},
	                   {"total": 49, "accepted":19, "escalated": 1, "date": "7/13"},
	                   {"total": 35, "accepted":26, "escalated": 2, "date": "7/14"},
	                   {"total": 30, "accepted":11, "escalated": 1, "date": "7/15"},
	                   {"total": 52, "accepted":5, "escalated": 1, "date": "7/16"},
	                   {"total": 48, "accepted":9, "escalated": 1, "date": "7/17"},
	                   {"total": 55, "accepted":22, "escalated": 1, "date": "7/18"},
	                   {"total": 36, "accepted":26, "escalated": 1, "date": "7/19"},
	                   {"total": 19, "accepted":9, "escalated": 1, "date": "7/20"},
	                   {"total": 35, "accepted":26, "escalated": 2, "date": "7/21"},
	                   {"total": 30, "accepted":11, "escalated": 3, "date": "7/22"},
	                   {"total": 52, "accepted":15, "escalated": 1, "date": "7/23"},
	                   {"total": 48, "accepted":9, "escalated": 1, "date": "7/24"},
	                   {"total": 75, "accepted":42, "escalated": 4, "date": "7/25"},
	                   {"total": 36, "accepted":26, "escalated": 1, "date": "7/26"},
	                   {"total": 19, "accepted":9, "escalated": 1, "date": "7/28"},
	                   {"total": 35, "accepted":26, "escalated": 2, "date": "7/28"}
	                   ];

  $scope.callData = {
    labels : [],
    datasets : [
      {
        fillColor : "rgba(220,220,220,0.5)",
        strokeColor : "rgba(220,220,220,1)",
        pointColor : "rgba(220,220,220,1)",
        pointStrokeColor : "#fff",
        data : []
      },
      {
          fillColor : "rgba(151,187,205,0.5)",
          strokeColor : "rgba(151,187,205,1)",
          pointColor : "rgba(151,187,205,1)",
          pointStrokeColor : "#fff",
          data : []
        }
      ,
      {
          fillColor : "rgba(151,100,100,0.5)",
          strokeColor : "rgba(220,100,100,1)",
          pointColor : "rgba(151,50,50,1)",
          pointStrokeColor : "#fff",
          data : []
        }
    ]
  };

 console.log("about to dynamically add data to end of callData");
 for (var i = 0; i < rawDataDay.length; i++) {
	 $scope.callData.labels.push(rawDataDay[i].date);	 
	 $scope.callData.datasets[0].data.push(rawDataDay[i].total * 0.25);  
	 $scope.callData.datasets[1].data.push(rawDataDay[i].accepted * 0.25);  
	 $scope.callData.datasets[2].data.push(rawDataDay[i].escalated * 0.25);  
	} 

 	/* 
	$scope.durations = [{
	    days: 1,
	    name: "day"        
	}, {
	    days: 7,
	    name: "week"        
	}, {
	    days: 30,
	    name: "month"        
	}];
	*/
	
 	$scope.drawGraph = function() {
 		console.log("drawGraph");
 		if($scope.showTotalLine == false) 		
 			$scope.callData.datasets[0].data.length = 0;
 		else
 			$scope.callData.datasets[0].data.length = 5; 			
 		if($scope.showAcceptedLine == false)
 			$scope.callData.datasets[1].data.length = 0;
 		else
 			$scope.callData.datasets[0].data.length = 5;
 		if($scope.showEscalatedLine == false)
 			$scope.callData.datasets[2].data.length = 0;
 		else
 			$scope.callData.datasets[0].data.length = 5;
 		
		for (var i = 0; i < max; i++) {
			$scope.callData.labels.push(rawDataDay[i].date);
			if($scope.showTotalLine)
			{
			 $scope.callData.datasets[0].data.push(rawDataDay[i].total * multiplier);
			}
			if($scope.showAcceptedLine)
			{
			 $scope.callData.datasets[1].data.push(rawDataDay[i].accepted * multiplier);
			}
			if($scope.showEscalatedLine)
			{
			 $scope.callData.datasets[2].data.push(rawDataDay[i].escalated * multiplier);
			}
		} 
 		
 	};
 
    $scope.selectInterval = function(interval) {
		console.log('selectInterval() duration: ' + interval);
		$scope.callData.labels.length = 0;	 
		$scope.callData.datasets[0].data.length = 0;
		$scope.callData.datasets[1].data.length = 0;  
		$scope.callData.datasets[2].data.length = 0;
		
		// For demo only
		var max = 28;
		var multiplier = 1;
		if(interval == 1)
		{
			max = 28;
			multiplier = 0.25;
		}
		else if(interval == 7)
		{
			max = 4;
			multiplier = 1;
		}
		else if(interval == 30)
		{
			max = 2;
			multiplier = 10;
		}
		
		for (var i = 0; i < max; i++) {
			$scope.callData.labels.push(rawDataDay[i].date);
			if($scope.showTotalLine)
			{
			 $scope.callData.datasets[0].data.push(rawDataDay[i].total * multiplier);
			}
			if($scope.showAcceptedLine)
			{
			 $scope.callData.datasets[1].data.push(rawDataDay[i].accepted * multiplier);
			}
			if($scope.showEscalatedLine)
			{
			 $scope.callData.datasets[2].data.push(rawDataDay[i].escalated * multiplier);
			}
		} 
		
    };

    
    // Start of Datepicker
	
    $scope.initDatepickers = function() {
        console.log("initDatepickers()");    	
        $scope.toDate = new Date(); 
        $scope.fromDate = new Date();
        $scope.fromDate.setDate($scope.toDate.getDate()-7);
        
        //$scope.regionTableParams.$params.dt1 = $scope.formatDate($scope.fromDate);      
        //$scope.regionTableParams.$params.dt2 = $scope.formatDate($scope.toDate);        
        //$scope.districtTableParams.$params.dt1 = $scope.formatDate($scope.fromDate);      
        //$scope.districtTableParams.$params.dt2 = $scope.formatDate($scope.toDate);        
		
        
        $scope.minDate = "2000-01-01"
        console.log("fromDate:" + $scope.fromDate);        
        console.log("toDate:" + $scope.toDate);        
      };
      
      
      $scope.initDatepickers();

      $scope.clear = function () {
          $scope.fromDate = null;
          $scope.toDate = null;
      };
      

      // Disable weekend selection
      $scope.disabled = function(date, mode) {
        return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
      };

      $scope.toggleMin = function() {
        $scope.minDate = $scope.minDate ? null : new Date();
      };
      $scope.toggleMin();


      $scope.openFromDate = function($event) {
        $event.preventDefault();
        $event.stopPropagation();

        $scope.fromDateOpened = true;
      };

      $scope.openToDate = function($event) {
        $event.preventDefault();
        $event.stopPropagation();

        $scope.toDateOpened = true;
      };
    

      $scope.fromDateOptions = {
        formatYear: 'yy',
        startingDay: 1
      };

      $scope.initDate = new Date('2016-15-20');
    
            
    // End of Datepicker
    

      // Start of toggle buttons for chart
      
      $scope.toggleTotal = function() {
    	  $scope.showTotalLine = !$scope.showTotalLine;
    	  if($scope.showTotalLine)
    		  $scope.buttonTextTotal = "hide";
    	  else
    		  $scope.buttonTextTotal = "show";
    	  $scope.drawGraph();    	  
      };
      $scope.toggleAccepted = function() {
    	  $scope.showAcceptedLine = !$scope.showAcceptedLine;
    	  if($scope.showAcceptedLine)
    		  $scope.buttonTextAccepted = "hide";
    	  else
    		  $scope.buttonTextAccepted = "show";
    	  $scope.drawGraph();    	  
      };
      $scope.toggleEscalated = function() {
    	  $scope.showEscalatedLine = !$scope.showEscalatedLine;    	  
    	  $scope.showAcceptedLine = !$scope.showAcceptedLine;
    	  if($scope.showEscalatedLine)
    		  $scope.buttonTextEscalated = "hide";
    	  else
    		  $scope.buttonTextEscalated = "show";
    	  $scope.drawGraph();    	  
      };
      
 
}); // End of Controller


