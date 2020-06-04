function init() {
    var selector = d3.select("#selDataset");
    d3.json("samples.json").then((data) => {
      console.log(data);
      var sampleNames = data.names;
      sampleNames.forEach((sample) => {
        selector
          .append("option")
          .text(sample)
          .property("value", sample);
      });
  });
}
  
  init();

  function optionChanged(newSample) {
    buildMetadata(newSample);
    buildCharts(newSample);
    buildCharts2(newSample);
    buildCharts3(newSample);
  }

  function pageLoad(item) {
    d3.json("samples.json").then((data) => {
    buildMetadata(940);
    buildCharts(940);
    buildCharts2(940);  
  });
}
window.onload = pageLoad();

  function buildMetadata(sample) {
    d3.json("samples.json").then((data) => {

      var metadata = data.metadata;
      var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
      var result = resultArray[0];
      var PANEL = d3.select("#sample-metadata");
  
      PANEL.html("");
      PANEL.append("h6").text(["ID: " + result.id]);
      PANEL.append("h6").text(["ETHNICITY: " + result.ethnicity]);
      PANEL.append("h6").text(["GENDER: " + result.gender]);
      PANEL.append("h6").text(["AGE: " + result.age]);
      PANEL.append("h6").text(["LOCATION: " + result.location]);
      PANEL.append("h6").text(["BBTYPE: " + result.bbtype]);
      PANEL.append("h6").text(["WFREQ: " + result.wfreq]);
    });
  }


//function for accessing data and making charts
    function buildCharts(sample) {
        d3.json("samples.json").then((data) => {
        console.log("hello");
        var metadata = data.metadata;
        var samples = data.samples;
        var resultsArray = samples.filter(sample_object => sample_object.id == sample);
        var result = resultsArray[0];
        console.log(result);

        var sample_values = result.sample_values;
        var num_bacteria = result.sample_values;
        var bacteria_id = result.otu_ids;   
        var bacteria_names = result.otu_labels;  
        console.log(num_bacteria);
        console.log(bacteria_id);
        
        //build a bar chart
        var y_data = bacteria_id.slice(0,10).map(name => "OTU "+name.toString()).reverse();
        var x_data = num_bacteria.slice(0,10);
        console.log(x_data)
        console.log(y_data)

        var chartData = [
        {x: x_data,
         y: y_data,
         type: "bar",
         orientation: "h"
        }];
    
        var chartLayout = [
            {
            title: "title"
            //axis labels = 
        }];
        
        Plotly.newPlot("bar", chartData, chartLayout);
        
    });
}
    // creating a bubble chart
    function buildCharts2(sample) {
        d3.json("samples.json").then((data) => {
                console.log("hello");
            //var metadata = data.metadata;
            var samples = data.samples;
            var resultsArray = samples.filter(sample_object => sample_object.id == sample);
            var result = resultsArray[0];
            console.log(result);
    
            var sample_values = result.sample_values;
            var num_bacteria2 = result.sample_values;
            var bacteria_id2 = result.otu_ids;   
            var bacteria_names2 = result.otu_labels;  
            console.log(num_bacteria2);
            console.log(bacteria_id2);
            console.log(bacteria_names2);
                
            var trace1 = {
                x: bacteria_id2,
                y: num_bacteria2,
                text: bacteria_names2,
                mode: "markers",
                    marker: {
                        color: bacteria_id2,
                        size: num_bacteria2,
                        colorScale: "Blackbody",
                        type: "heatmap"
                    }};

            var data2 = [trace1];
            
            var layout = {
                title: 'Belly Button Bacteria Counts',
                //showlegend: false
                //height: 600,
                //width: 600
            };

            Plotly.newPlot("bubble", data2, layout);
        });
    };

//weak attempt at a gauge
// Enter a speed between 0 and 180

function buildCharts3(sample) {
    d3.json("samples.json").then((data) => {
            console.log("hello");
        var metadata = data.metadata;
        var samples = data.samples;
        var gaugeValue = metadata[0].wfreq;
        var resultsArray = samples.filter(sample_object => sample_object.id == sample);
        var result = resultsArray[0];
        console.log(metadata);
        console.log(gaugeValue);

    // Enter a speed between 0 and 180
        var g = 180 / gaugeValue
        console.log(g)

    var level = g;

    // Trig to calc meter point
    var degrees = 180 - level,
      radius = .5;
    var radians = degrees * Math.PI / 180;
    var aX = 0.025 * Math.cos((degrees - 90) * Math.PI / 180);
    var aY = 0.025 * Math.sin((degrees - 90) * Math.PI / 180);
    var bX = -0.025 * Math.cos((degrees - 90) * Math.PI / 180);
    var bY = -0.025 * Math.sin((degrees - 90) * Math.PI / 180);
    var cX = radius * Math.cos(radians);
    var cY = radius * Math.sin(radians);

    var mainPath = path1,
     pathX = String(x),
     space = ' ',
     pathY = String(y),
     pathEnd = ' Z';
var path = mainPath.concat(pathX,space,pathY,pathEnd);

    var data = [
      {
        values: [1,1,1,1,4],
        rotation: 90,
        text: ['0-1', '1-2', '2-3', '3-4', '4-5', '5-6', '6-7', '7-8', '8-9'],
        textinfo: 'text',
        textposition: 'inside',
        marker: {
          colors: ['rgba(14, 127, 0, .5)', 'rgba(110, 154, 22, .5)',
            'rgba(249, 168, 37, .5)', 'rgba(183,28,28, .5)',
            'rgba(0, 0, 0, 0.5)'
          ]
        },
        hoverinfo: 'label',
        hole: .5,
        type: 'pie',
        showlegend: false
      }
    ];

    var layout = {
      shapes: [{
        type: 'path',
        path: path,
        fillcolor: '850000',
        line: {
          color: '850000'
        }
      }],
      height: 400,
      width: 400,
      xaxis: {
        zeroline: false,
        showticklabels: false,
        showgrid: false,
				fixedrange: true,
        range: [-1, 1]
      },
      yaxis: {
        zeroline: false,
        showticklabels: false,
        showgrid: false,
				fixedrange: true,
        range: [-1, 1]
      }
    };

    Plotly.newPlot('gauge', data, layout);
//end gauge code
  });
}
