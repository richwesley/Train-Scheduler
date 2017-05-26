// JavaScript Document
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
var provider = new firebase.auth.GithubAuthProvider();
var bartTrains;
var destination;
var arrival;
var frequency;

$('#addBart').on('click', function() {
	bartTrains = $('#bartTrains').val().trim();
	destination = $('input[name=dest]:checked').val();
	arrival = $('#arrival').val();
	frequency = $('#frequency').val().trim();
	
	var newBartTrain = { 
		bartTrains: bartTrains,
		destination: destination,
		arrival: arrival,
		frequency: frequency,
	};
	
	database.ref().push(newBartTrain);
	
	console.log(newBartTrain);
	
	 $("#bartInput")[0].reset();
	
	return false;
	
});

database.ref().on("child_added", function(childSnapshot, prevChildKey) {

  console.log(childSnapshot.val());

  // Store everything into a variable.

  var train_Name = childSnapshot.val().name;
  var train_Destination = childSnapshot.val().dest;
  var first_Train = childSnapshot.val().first;
  var frequency_Train = childSnapshot.val().freq;
  var timeTillArrival = childSnapshot.val().timeTillArrival;
  var nextArrival = childSnapshot.val().nextArrival;

  
  
 
  	 var trnStartPretty = moment.unix(first_Train).format("HH:mm");
	
	 var firstTimeConverted = moment.unix(first_Train).subtract(1, "years"); 
      console.log(firstTimeConverted);
      // Current Time
      var currentTime = moment();
      console.log("CURRENT TIME: " + moment(currentTime).format("HH:mm"));
      // Difference in times
      var diffTime = moment().diff(firstTimeConverted, "minutes");
    
      console.log("DIFFERENCE IN TIME: " + diffTime);

      // Time apart (remainder)
      var timeRemaining = diffTime % frequency_Train;
      console.log(timeRemaining);

      // Minute Until Train
      timeTillArrival = frequency_Train - timeRemaining;
      console.log("MINUTES TILL TRAIN: " + timeTillArrival);

      // Next Train
      var nextTrain = moment().add(timeTillArrival, "minutes");
      console.log("ARRIVAL TIME: " + moment(nextTrain).format("HH:mm"));

      // Arrival time
      nextArrival = moment(nextTrain).format("HH:mm a");
	
	  console.log(train_Name);
	  console.log(train_Destination);
	  console.log(first_Train);
	  console.log(frequency_Train);


  // update the table with train information
  $("#train-table > tbody").append("<tr><td>" + train_Name + "</td><td>" + train_Destination + "</td><td>" +
  frequency_Train + "</td>   <td>" + nextArrival + "</td><td>" + timeTillArrival + "</td>    </tr>");
});