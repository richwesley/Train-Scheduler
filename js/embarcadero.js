// JavaScript Document
"use strict";

 
$('#bartTrains').change(function() {
	var val = $(this).val();
	if (val == "yellow") {
		$('#east').html("Pittsburg");
		$('#west').html("SFO");
	} else if (val == "red") {
		$('#east').html("Richmond");
		$('#west').html("Milbrae");
	} else if (val == "blue") {
		$('#east').html("Dublin");
		$('#west').html("Daily City");
	} else  {
		$('#east').html("Freemont");
		$('#west').html("Balboa Park");
	}
});

$('#muniTrains').change(function() {
	var val = $(this).val();
	if (val == "j") {
		$('#inbound').html("UCSF");
		$('#outbound').html("Balboa Park");
	} else if (val == "k") {
		$('#inbound').html("Folsum");
		$('#outbound').html("City College");
	} else if (val == "l") {
		$('#inbound').html("");
		$('#outbound').html("SF Zoo");
	} else if (val == "m") {
		$('#inbound').html("Cal Train");
		$('#outbound').html("Geneva");
	} else if (val == "n") {
		$('#inbound').html("ATT Park");
		$('#outbound').html("Ocean Beach");		
	} else  {
		$('#inbound').html("Sunnydale");
		$('#outbound').html("West Portal");
	}
});
	

 var config = {
    apiKey: "AIzaSyBYMFihUe17TqCtwMlnfrW92_MzMBnYNI8",
    authDomain: "embarcadero-station.firebaseapp.com",
    databaseURL: "https://embarcadero-station.firebaseio.com",
    projectId: "embarcadero-station",
    storageBucket: "embarcadero-station.appspot.com",
    messagingSenderId: "379550893268"
  };
  firebase.initializeApp(config);

var database = firebase.database();
//var provider = new firebase.auth.GithubAuthProvider();

var destination;
var arrival;
var frequency;
var newTrains;

$('#addBart').on('click', function(e) {
	e.preventDefault();
	newTrains = $('#bartTrains').val().trim();
	destination = $('input[name=dest]:checked').val().trim();
	arrival =  $("#Barrival").val().trim();
	frequency = $('#Bfrequency').val().trim();
	
	var trains = { 
		newTrains: newTrains,
		destination: destination,
		arrival: arrival,
		frequency: frequency,
		
	};
	
	database.ref().push(trains);
	
	console.log(trains);
	
	$("#bartInput")[0].reset();
	// location.reload(); 
	
	return false;
	
});

$('#addMuni').on('click', function(e) {
	e.preventDefault();
	newTrains = $('#muniTrains').val().trim();
	destination = $('input[name=destination]:checked').val().trim();
	arrival =  $("#Marrival").val().trim();
	frequency = $('#Mfrequency').val().trim();
	
	var trains = { 
		newTrains: newTrains,
		destination: destination,
		arrival: arrival,
		frequency: frequency,
	};
	
	database.ref().push(trains);
	
	console.log(trains);
	
	 $("#muniInput")[0].reset();
	//  location.reload();
	
	return false;
	
});

database.ref().on("child_added", function(childSnapshot, prevChildKey){

console.log(childSnapshot.val());

// stores info to the var
	newTrains = childSnapshot.val().newTrains;
	destination = childSnapshot.val().destination;
	arrival = childSnapshot.val().arrival;
	frequency = childSnapshot.val().frequency;

// train info
	console.log(newTrains);
	console.log(destination);
	console.log(arrival);
	console.log(frequency);



     // Pushing back the start time 1 year to ensure it comes before current time
      var firstTimeConverted = moment(arrival, "hh:mm").subtract(1, "years");
      console.log(firstTimeConverted);

     // current time
     var currentTime = moment();
	 console.log ("Current time: " + moment(currentTime).format("hh:mm"));

     // Difference between the times
     var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
     console.log ("Difference in time: " + diffTime);


     // Remainder
     var tRemainder = diffTime % frequency;
	 console.log ("Number of minutes remaining " + tRemainder);

     // minutes till next train
     var tMinutesTillTrain = frequency - tRemainder;
     console.log ("Minutes till next train: " + tMinutesTillTrain);

     // Next train arrival time
     var nextTrain = moment().add(tMinutesTillTrain, "minutes");
     console.log ("Arrival time: " + moment(nextTrain).format("HH:mm"));

     // Time of the next train
     var nextArrival = moment(nextTrain).format("HH:mm");
	
	    

     //Add each train's data onto the table
    
    $("#train-table > tbody").append("<tr><td>" + newTrains + "</td><td>" + destination + "</td><td>" + frequency + "</td><td>" + nextArrival + "</td><td>" + tMinutesTillTrain + "</td></tr>");
 });


//firebase.auth().signInWithPopup(provider).then(function(result) {
//  // This gives you a GitHub Access Token. You can use it to access the GitHub API.
//  var token = result.credential.accessToken;
//  // The signed-in user info.
//  var user = result.user;
//  // ...
//}).catch(function(error) {
//  // Handle Errors here.
//  var errorCode = error.code;
//  var errorMessage = error.message;
//  // The email of the user's account used.
//  var email = error.email;
//  // The firebase.auth.AuthCredential type that was used.
//  var credential = error.credential;
//  // ...
//});
//
//firebase.auth().signOut().then(function() {
//  // Sign-out successful.
//}).catch(function(error) {
//  // An error happened.
//});