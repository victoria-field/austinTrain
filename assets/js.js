var stations = [
  {
    label: "Downtown Station",
    value: "1"
  }, {
    label: "Plaza Saltillo Station",
    value: "2"
  }, {
    label: "M L King Jr Station",
    value: "3"
  }, {
    label: "Highland Station",
    value: "4"
  }, {
    label: "Crestview Station",
    value: "5"
  }, {
    label: "Kramer Station",
    value: "6"
  }, {
    label: "Howard Station",
    value: "7"
  }, {
    label: "Lakeline Station",
    value: "8"
  }, {
    label: "Leander Station",
    value: "9"
  }
];

var trains = [
  {
    name: "All Route",
    number: "100",
    stops: [
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9"
    ]
  }, {
    name: "Middle of Nowhere Route",
    number: "50",
    stops: ["7", "8", "9"]
  }, {
    name: "Fun Route",
    number: "989",
    stops: ["1", "2", "3", "4", "5"]
  }, {
    name: "Short Route",
    number: "5",
    stops: ["1", "2"]
  }, {
    name: "Go Somewhere",
    number: "6",
    stops: ["3", "4", "5", "6"]
  }
]
$(document).ready(function() {
  $("#from, to, #calendar").val("");
  $("#btnSearch").click(function() {
    var fromStation = $("#from").val().split(" - ")[1];
    var toStation = $("#to").val().split(" - ")[1];
    var trainsArr = [];

    $.each(trains, function(index, value) {
      for (key in value) {
        if (key == "stops") {
          if (jQuery.inArray(fromStation, value[key]) != -1 && jQuery.inArray(toStation, value[key]) != -1) {
            trainsArr.push(value["number"]);
            trainsArr.push(value["name"]);
          }
        }
      }
    });
    var content;
    if(trainsArr.length ==0){
      content = "<p><b> Sorry there is not any trains that match your route. </b></p>";
    }else{
      content = "<table><tr><th>Train No:</th><th>TrainName:</th</tr>";
      for(var i = 0; i <trainsArr.length;){
        var k = 1;
        content += "<tr><td>" + trainsArr[i] + "</td><td>" + trainsArr[i+k] + "</td></tr>";
        i = i+2;
      }
      content += "</table>";
    }
    $("#result").html(content);
    $("#table").css("display", "block");
  });
  $("#calendar").datepicker({dateFormat: "dd MM yy (DD)", minDate: new Date(), maxDate: "+2m"});
  $("#btnSearch").button();
  $("#from, #to").autocomplete({
    source: stations,
    select: function(event, ui) {
      $(this).val(ui.item.label + " - " + ui.item.value);
      return false;
    }
  });

});
