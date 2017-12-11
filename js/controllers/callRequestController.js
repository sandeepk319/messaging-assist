var app = angular.module('main', ['ngTable', 'ui.bootstrap', 'chartjs', 'ngResource', 'ui.bootstrap.tpls']).
controller('DailyReportCtrl', function($scope, $resource, $modal, $log, ngTableParams, AssociateService, RegionService, DistrictService) {

    var data = AssociateService.data;
    var regions = RegionService.regions;

    $scope.radioBreadcrumb = "region";    
    
    $scope.selectedRegionId = -1;
    $scope.selectedDistrictId = -1;
    $scope.selectedStoreId = -1;
    $scope.selectedRegionName = "";
    $scope.selectedDistrictName = "";
    $scope.selectedStoreName = "";
    
    $scope.accordianDisabled = {
            region: false,
    		district: true,	
    		store: true,
    		associate: true	
        };
    $scope.accordianOpen = {
            region: true,
    		district: false,	
    		store: false,
    		associate: false	
        };
    $scope.accordianHeading = {
            region: "Regions",
    		district: "Districts",	
    		store: "Stores",
    		associate: "Associates"	
        };
    
    
    $scope.regionTableParams = new ngTableParams(
      {
        page: 1,            // show first page
        count: 100,           // count per page
        sorting: {name:'asc'},
        dt1: "20140717",
        dt2: "20140724"        
      },
      {
        total: 0, // length of data
        getData: function($defer, params) {
        	console.log("region params ------------------------------");
        	console.dir(params);
            RegionService.getData($defer, params, $scope.filter).then(function(){              
                $scope.regionTableParams.settings({data:data});
            });
      }    
    });
    
    $scope.districtTableParams = new ngTableParams(
    	      {
    	        page: 1,            // show first page
    	        count: 100,           // count per page
    	        sorting: {name:'asc'},
    	        dt1: "20140717",
    	        dt2: "20140724",        
        	    selectedDistrictId: -2    	        	
    	      },
    	      {
    	        total: 0, // length of data
    	        getData: function($defer, params) {
    	            RegionService.getData($defer,params,$scope.filter).then(function(){
    	                $scope.regionTableParams.settings({data:data});
    	            });
    	      }    
    	    });

    $scope.storeTableParams = new ngTableParams(
    	      {
    	        page: 1,            // show first page
    	        count: 25,           // count per page
    	        sorting: {name:'asc'},
    	        dt1: "2010-05-05",
    	        dt2: "2014-04-04",
    	        selectedDistrictId: -3
    	      },
    	      {
    	        total: 0, // length of data
    	        getData: function($defer, params) {
    	        	if($scope.selectedDistrictId >= 0)
    	        	{
	    	            DistrictService.getData($defer,params,$scope.filter).then(function(){              
	    	                $scope.regionTableParams.settings({data:data});
	    	            });
    	        	}
    	      }    
    	    });
    	    
    
    $scope.associateTableParams = new ngTableParams(
      {
        page: 1,            // show first page
        count: 25,           // count per page
        sorting: {name:'asc'},
        dt1: "2010-08-08",
        dt2: "2014-09-09",
        selectedStoreId: -4
      },
      {
        total: 0, // length of data
        getData: function($defer, params) {
        	if($scope.selectedStoreId >= 0)
        	{
	            AssociateService.getData($defer,params,$scope.filter).then(function(){              
	            $scope.associateTableParams.settings({data:data});
	            });
        	}
      }
    });

    
    
    $scope.$watch("filter.$", function () {
        $scope.associateTableParams.reload();
    });
    
    
    $scope.$watch("filter.$", function () {
        $scope.regionTableParams.reload();
    });
    
    
	 $scope.regionOnly = function (item){
	    //console.log('regionOnly() parent:' + item.parent);
	    //console.dir(item);
	    if (item.parent === 0 || item.parent == '0') {
	            //console.log("regionOnly true!");
	            return true;
	        }
	        return false;
	  };

    
	 $scope.selectedRegion = function (item){
	    parent = 79231; // Northeast	 
	    //console.log('selectedRegion(' + parent + ') name:' + item.name + ' parent:' + item.parent);
	    //console.dir(item);

	    if (item.parent === parent) {
	            //console.log("parent region is " + parent + " " + item.name + " id:" + item.id);
	            return true;
	        }
	        return false;
	  };
	  

	 $scope.selectedDistrict = function (item){
	    console.log('selectedDistrict(' + parent + ') parent:' + item.parent);
	    //console.dir(item);
	    if (item.parent === parent) {
	          console.log("desiredParent:" + parent + " item.parent:" + item.parent);
	          return true;
	        }
	        return false;
	  };

    // Start of Breadcrumbs
      $scope.clickBreadcrumbRegion = function(pFromDate, pToDate) {
    	  console.log("clickBreadcrumbRegion");
          $scope.accordianOpen.region = true;
          $scope.accordianOpen.district = false;
          $scope.accordianOpen.store = false;
          $scope.accordianOpen.associate = false;
    	  
      };
      $scope.clickBreadcrumbDistrict = function(pFromDate, pToDate) {
    	  console.log("clickBreadcrumbDistrict");
          $scope.accordianOpen.region = false;
          $scope.accordianOpen.district = true;
          $scope.accordianOpen.store = false;
          $scope.accordianOpen.associate = false;    	  
      };
      $scope.clickBreadcrumbStore = function(pFromDate, pToDate) {
    	  console.log("clickBreadcrumbStore");
          $scope.accordianOpen.region = false;
          $scope.accordianOpen.district = false;
          $scope.accordianOpen.store = true;
          $scope.accordianOpen.associate = false;    	  
      };
      $scope.clickBreadcrumbAssociate = function(pFromDate, pToDate) {
    	  console.log("clickBreadcrumbAssociate");
          $scope.accordianOpen.region = false;
          $scope.accordianOpen.district = false;
          $scope.accordianOpen.store = false;
          $scope.accordianOpen.associate = true;    	  
      };
	  
    // End of Breadcrumbs
    
    
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

      
    // Start of 'Apply Button
      $scope.clickApply = function(pFromDate, pToDate) {
        console.log("clickApply()");
        console.log("fromDate:" + $scope.formatDate($scope.fromDate));
        console.log("toDate:" + $scope.formatDate($scope.toDate));
        //console.log("selectedDistrictName: " + $scope.selectedDistrictName);
        //console.log("selectedDistrictId: " + $scope.selectedDistrictId);
        $scope.regionTableParams.$params.dt1 = $scope.formatDate($scope.fromDate);      
        $scope.regionTableParams.$params.dt2 = $scope.formatDate($scope.toDate);        
        $scope.regionTableParams.reload();
        
        $scope.districtTableParams.$params.dt1 = $scope.formatDate($scope.fromDate);     
        $scope.districtTableParams.$params.dt2 = $scope.formatDate($scope.toDate);        
        $scope.districtTableParams.reload();
        
        if($scope.selectedDistrictId > 0)
        {
            $scope.storeTableParams.$params.dt1 = $scope.formatDate($scope.fromDate);        
            $scope.storeTableParams.$params.dt2 = $scope.formatDate($scope.toDate);
            $scope.storeTableParams.reload();
            //console.log("reloading store");
        }
        
        };
    // End of 'Apply Button
     
    // Start of  Table functions
        $scope.clickRegion = function(pId, pName) {
            //console.log("clickRegion() selectedRegion:" + pId  + " " + " currentRegionId:" + $scope.selectedRegionId);        	
        	if(pId == $scope.selectedRegionId)
        	{
        		return;
        	}
            $scope.selectedRegionId = pId;        	
            $scope.selectedRegionName = pName;
            $scope.selectedDistrictName = "";            
            $scope.selectedStoreName = "";            
            $scope.districtTableParams.reload();
            
            $scope.accordianOpen.region = false;
            $scope.accordianOpen.district = true;
            $scope.accordianOpen.store = false;
            $scope.accordianOpen.associate = false;
            
            $scope.accordianDisabled.region = false;        
            $scope.accordianDisabled.district = false;          
            $scope.accordianDisabled.store = true;            
            $scope.accordianDisabled.associate = true;            
        };

        $scope.clickDistrict = function(pId, pName) {
        	if(pId == $scope.selectedDistrictId)
        	{
        		return;
        	}        	
            $scope.selectedDistrictId = pId;        	
            $scope.selectedDistrictName = pName;
            $scope.selectedStoreName = "";            
            console.log("clickDistrict() selectedDistrict:" + $scope.selectedDistrictId  + " " + $scope.selectedDistrictName);            
            $scope.districtTableParams.$params.selectedDistrictId = $scope.selectedDistrictId;
            $scope.storeTableParams.$params.selectedDistrictId = $scope.selectedDistrictId;
            console.dir($scope.storeTableParams);
            $scope.storeTableParams.reload();
            
            $scope.accordianOpen.region = false;
            $scope.accordianOpen.district = false;
            $scope.accordianOpen.store = true;
            $scope.accordianOpen.associate = false;
            
            
            $scope.accordianDisabled.store = false;
            $scope.accordianDisabled.associate = true;
            
        };

        $scope.clickStore = function(pId, pName) {
        	if(pId == $scope.selectedStoreId)
        	{
        		return;
        	}        	        	
            $scope.selectedStoreId = pId;        	
            $scope.selectedStoreName = pName;        	
           // alert("clickStore() selectedStore:" + $scope.selectedStoreId + " " + $scope.selectedStoreName);
            $scope.associateTableParams.$params.selectedStoreId = $scope.selectedStoreId;
            console.dir($scope.associateTableParams);
            $scope.associateTableParams.reload();
            
            
            $scope.accordianOpen.region = false;
            $scope.accordianOpen.district = false;
            $scope.accordianOpen.store = false;
            $scope.accordianOpen.associate = true;
            
            $scope.accordianDisabled.associate = false;            
        };


        $scope.clickChartButtonRegion = function(pId, pName) {
        	alert("clickChartButtonRegion");
        };
        $scope.clickChartButtonDistrict = function(pId, pName) {
        	alert("clickChartButton");
        };
        $scope.clickChartButtonStore = function(pId, pName) {
        	alert("clickChartButtonStore");
        };
        $scope.clickChartButtonAssociate = function(pId, pName) {
        	alert("clickChartButtonAssociate");
        };
        
        
    // End of  Table functions
        
        
     // Start of utility functions
     $scope.formatDate = function(dateObj) {
    	var str = dateObj.getFullYear() + "";
    	if((dateObj.getMonth() + 1) <= 10)
    	  str = str + "0";
    	str = str + (dateObj.getMonth() + 1);
    	if(dateObj.getDate() <= 9)
    	  str = str + "0";
        str = str + dateObj.getDate();
        //console.log("formatDate() " + str)
    	return str;
     };
     // End of utility functions

     // Start of Modal function
     $scope.openModalChart = function (name) {
    	 //console.log('openModalChart() name:' + name);
    	 //console.log("fromDate:" + $scope.fromDate);
    	 //console.log("toDate:" + $scope.toDate);
	    var modalInstance = $modal.open({
	      templateUrl: 'myModalContent.html',
	      controller: ModalInstanceCtrl,
	      size: 'lg',
	      resolve: {
	    	  modalModel: function() {
		  	        return {
		  	        	title: name,
		  	        	fromDate: $scope.fromDate,
		  	        	toDate: $scope.toDate,
		  	        	message: "Test Message"
		  	        }
		  	      }	    	  
	      }
	    });
	
	    modalInstance.result.then(function (selectedItem) {
	      //$scope.selected = selectedItem;
	    }, function () {
	      $log.info('Modal dismissed at: ' + new Date());
	    });
	  };     // End of Modal function
     
    	  
     
});  // End of controller


var ModalInstanceCtrl = function ($scope, $modalInstance, modalModel) {
	console.log("modal instance title:" + modalModel.title);
	console.log("fromDate:" + modalModel.fromDate);
	console.log("toDate:" + modalModel.toDate);
	
	$scope.title = modalModel.title;
	  $scope.ok = function () {
	    $modalInstance.close();
	  };

	  $scope.cancel = function () {
	    $modalInstance.dismiss('cancel');
	  };
	};



app.service("RegionService", function($http, $filter){
	  var service = {
	    data:[],
	    getData:function($defer, params, filter, tableParams){
	      $("#spinner").show();
	      console.log("Region tableParams -----------------");
	      console.dir(tableParams);
	      console.log("Region params -----------------");	      
	      console.dir(params);
	      fromDate = params.$params.dt1;
	      toDate = params.$params.dt2;
	      url = "https://cassist.searshc.com/MemberAssistAPI/report/callStats?username=reportuser&clientKey=mem_10001&authToken=zzz&fromDate=" + fromDate + "&toDate=" + toDate;
	      console.log("Region url: " + url);
	      return $http.get(url).success(function(resp)
	      {
	    	//console.log("$filter:" + $filter);
	    	//console.dir(filter);
	    	var filteredData = $filter('filter')(resp, filter);
	        angular.copy(filteredData,service.data);	        
	        var orderedData = params.sorting() ?
	                                $filter('orderBy')(filteredData, params.orderBy()) :
	                                filteredData;
	        $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
	        $("#spinner").hide();
	      });
	    }
	  };
	  return service;  
	});


app.service("DistrictService", function($http, $filter){
	  var service = {
	    data:[],
	    getData:function($defer, params, filter, tableParams){
		  fromDate = params.$params.dt1;
		  toDate = params.$params.dt2;
		  districtId = params.$params.selectedDistrictId;
		  console.log("DistrictService params:");
		  console.dir(params);
	      url = "https://cassist.searshc.com/MemberAssistAPI/report/callStats?username=reportuser&clientKey=mem_10001&authToken=zzz&fromDate=" + fromDate +  "&toDate=" + toDate + "&districtNumber=" + districtId;
	      console.log(url);
	      return $http.get(url).success(function(resp)
	      {
	        console.log("districtService fetch");
	    	//console.log("$filter:" + $filter);
	    	//console.dir(filter);
	    	var filteredData = $filter('filter')(resp, filter);
	        angular.copy(filteredData,service.data);	        
	        var orderedData = params.sorting() ?
	                                $filter('orderBy')(filteredData, params.orderBy()) :
	                                filteredData;
	        $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
	      });
	    }
	  };
	  return service;  
	});



	app.service("AssociateService", function($http, $filter){
	  var service = {
	    data:[],
	    getData:function($defer, params, filter, tableParams){
	      $("#spinner").show();	    	
	      fromDate = params.$params.dt1;
	      toDate = params.$params.dt2;
	      storeId = params.$params.selectedStoreId;
	      url = "https://cassist.searshc.com/MemberAssistAPI/report/callStats?username=reportuser&clientKey=mem_10001&authToken=zzz&fromDate=" + fromDate + "&toDate=" + toDate + "&storeNumber=" + storeId;
	      return $http.get(url).success(function(resp)
	      {
	        console.log("associate request.sent");
	        var filteredData = $filter('filter')(resp, filter);
	        angular.copy(filteredData,service.data);
	        var orderedData = params.sorting() ?
	                                $filter('orderBy')(filteredData, params.orderBy()) :
	                                filteredData;
	        $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
	        $("#spinner").hide();	        
	      });
	    }
	  };
	  return service;  
	});

