var settings = {};
var data = {}
var charts = {}

function localeSortStrings(strings) {
    return strings.sort(function(a,b) { return a.localeCompare(b); });
}

function createCharts() {
    charts.status = new Chart(document.getElementById('status-chart'), {
        data: {
            datasets: [{
                backgroundColor: 'brown',
                label: 'Stängd, ej löst'
            }, {
                backgroundColor: 'green',
                label: 'Stängd, löst'
            }, {
                backgroundColor: 'burlywood',
                label: 'Öppen'
            }]
        },
        options: {
            scales: {
                xAxes: [{
                    ticks: {
                        autoSkip: false
                    }
                }],
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        },
        type: 'bar'
    });

    charts.repliesAverage = new Chart(document.getElementById('replies-average-chart'), {
        data: {
            datasets: [{
                backgroundColor: 'brown',
                label: 'Dagar, i genomsnitt'
            }]
        },
        options: {
            scales: {
                xAxes: [{
                    ticks: {
                        autoSkip: false
                    }
                }],
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        },
        type: 'bar'
    });

    charts.noReplies = new Chart(document.getElementById('no-replies-chart'), {
        data: {
            datasets: [{
                backgroundColor: 'brown',
                label: 'Antal rapporter'
            }]
        },
        options: {
            scales: {
                xAxes: [{
                    ticks: {
                        autoSkip: false
                    }
                }],
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        },
        type: 'bar'
    });

    charts.averageCloseTime = new Chart(document.getElementById('average-close-time-chart'), {
        data: {
            datasets: [{
                backgroundColor: 'brown',
                label: 'Dagar, i genomsnitt'
            }]
        },
        options: {
            scales: {
                xAxes: [{
                    ticks: {
                        autoSkip: false
                    }
                }],
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        },
        type: 'bar'
    });

    charts.bodyCount = new Chart(document.getElementById('body-count-chart'), {
        data: {
            datasets: [{
                backgroundColor: [ 'green' ],
                label: 'Antal rapporter'
            }]
        },
        options: {
            scales: {
                xAxes: [{
                    ticks: {
                        autoSkip: false
                    }
                }],
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        },
        type: 'bar'
    });

    charts.openCount = new Chart(document.getElementById('open-count-chart'), {
        data: {
            datasets: [{
                backgroundColor: 'brown',
                label: 'Öppna rapporter'
            }]
        },
        options: {
            scales: {
                xAxes: [{
                    ticks: {
                        autoSkip: false
                    }
                }],
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        },
        type: 'bar'
    });

    charts.averageOpenTime = new Chart(document.getElementById('average-open-time-chart'), {
        data: {
            datasets: [{
                backgroundColor: 'brown',
                label: 'Dagar, i genomsnitt'
            }]
        },
        options: {
            scales: {
                xAxes: [{
                    ticks: {
                        autoSkip: false
                    }
                }],
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        },
        type: 'bar'
    });

    charts.reportsCreated = new Chart(document.getElementById('reports-created-chart'), {
        data: {
            datasets: [{
                backgroundColor: 'brown',
                label: 'Antal rapporter'
            }]
        },
        options: {
            scales: {
		xAxes: [{
                    type: 'time',
		    distribution: 'linear',
                    time: {
			unit: 'month'
                    }
		}],
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        },
        type: 'line'
    });

    charts.reportsCreatedQuarterly = new Chart(document.getElementById('reports-created-quarterly-chart'), {
        data: {
            datasets: [{
                backgroundColor: 'brown',
                label: 'Antal rapporter'
            }]
        },
        options: {
            scales: {
		xAxes: [{
                    type: 'time',
		    distribution: 'linear',
		    offset: true,		    
                    time: {
			unit: 'quarter'
                    }
		}],
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        },
        type: 'bar'
    });
    

    charts.reportsCreatedPerApp = new Chart(document.getElementById('reports-created-per-app-chart'), {
        data: {
            datasets: [
		{
                    backgroundColor: 'orange',
                    label: 'Android',
		    fill: false,
		},
		{
                    backgroundColor: 'brown',
                    label: 'iOS',
		    fill: false,
		},
		{
                    backgroundColor: 'blue',
                    label: 'Webb',
		    fill: false,
		},		
	    ]
        },
        options: {
            scales: {
		xAxes: [{
                    type: 'time',
		    distribution: 'linear',
                    time: {
			unit: 'month'
                    }
		}],
                yAxes: [{
                    ticks: {
                        beginAtZero: true
		    }
                }]
            }
        },
        type: 'line'
    });

    charts.reportsCreatedQuarterlyPerApp = new Chart(document.getElementById('reports-created-quarterly-per-app-chart'), {
        data: {
            datasets: [
		{
                    backgroundColor: 'orange',
                    label: 'Android',
		    fill: false,
		},
		{
                    backgroundColor: 'brown',
                    label: 'iOS',
		    fill: false,
		},
		{
                    backgroundColor: 'blue',
                    label: 'Webb',
		    fill: false,
		},		
	    ]
        },
        options: {
            scales: {
		xAxes: [{
                    type: 'time',
		    distribution: 'linear',
		    offset: true,		    
                    time: {
			unit: 'quarter'
                    }
		}],
                yAxes: [{
                    ticks: {
                        beginAtZero: true
		    }
                }]
            }
        },
        type: 'bar'
    });
    
    charts.responseTimeTrend = new Chart(document.getElementById('response-time-trend-chart'), {
        data: {
            datasets: [
		{
                    backgroundColor: 'green',
                    label: 'Dagar, i genomsnitt, till kommunsvar',
		},
	    ]
        },
        options: {
            scales: {
		xAxes: [{
                    type: 'time',
		    distribution: 'linear',
                    time: {
			unit: 'month'
                    }
		}],
            }
        },
        type: 'line'
    });

    charts.solveTimeTrend = new Chart(document.getElementById('solve-time-trend-chart'), {
        data: {
            datasets: [
		{
                    backgroundColor: 'green',
                    label: 'Dagar, i genomsnitt, till lösta rapporter stängdes',
		},
	    ]
        },
        options: {
            scales: {
		xAxes: [{
                    type: 'time',
		    distribution: 'linear',
                    time: {
			unit: 'month'
                    }
		}],
            }
        },
        type: 'line'
    });    
}

function updateCharts() {

    // Monthly view
    
    var selectedYear = Number(document.getElementById('year-selection').value);
    var selectedMonth = Number(document.getElementById('month-selection').value);
    var startDate = new Date(selectedYear, selectedMonth, 1);
    var endDate = new Date(selectedYear + (selectedMonth == 11 ? 1 : 0), selectedMonth == 11 ? 0 : selectedMonth + 1, 1);

    data.month = dice(data.all, "confirmed", startDate, endDate);
    data.bodyTotalsMonth = dice(data.bodyTotals, "confirmed", startDate, endDate);

    var monthCategories = localeSortStrings(getLabels(data.month, "category"));

    var statusChartCube = count(data.month, "confirmed", ["category", "status"]);
    charts.status.data.labels = monthCategories;
    charts.status.data.datasets[0].data = getMeasures(slice(statusChartCube, "status", "Stängd, ej löst"), "confirmed", "category", monthCategories);
    charts.status.data.datasets[1].data = getMeasures(slice(statusChartCube, "status", "Stängd, löst"), "confirmed", "category", monthCategories);
    charts.status.data.datasets[2].data = getMeasures(slice(statusChartCube, "status", "Öppen"), "confirmed", "category", monthCategories);

    charts.repliesAverage.data.labels = monthCategories;
    charts.repliesAverage.data.datasets[0].data = getMeasures(average(data.month, "daysUntilFirstBodyResponse", ["category"]), "daysUntilFirstBodyResponse", "category", monthCategories);

    charts.noReplies.data.labels = monthCategories;
    charts.noReplies.data.datasets[0].data = getMeasures(count(slice(slice(data.month, "status", "Öppen"), "daysUntilFirstBodyResponse", isNaN), "confirmed", [ "category" ]), "confirmed", "category", monthCategories);

    charts.averageCloseTime.data.labels = monthCategories;
    charts.averageCloseTime.data.datasets[0].data = getMeasures(average(slice(data.month, "status", function(val) { return val != "Öppen" }), "daysUntilClosedOrNow", ["category"]), "daysUntilClosedOrNow", "category", monthCategories);

    var monthBodies = localeSortStrings(getLabels(data.bodyTotalsMonth, "municipality"));

    var selectedBody = undefined;
    data.bodyTotalsMonth.forEach(function(record) {
	if (record.bodyid == settings.id) {
	    selectedBody = record.municipality;
	}
    });
    charts.bodyCount.data.labels = monthBodies;
    charts.bodyCount.data.datasets[0].data = getMeasures(count(data.bodyTotalsMonth, "confirmed", [ "municipality" ]), "confirmed", "municipality", monthBodies);
    charts.bodyCount.data.datasets[0].backgroundColor =
	monthBodies.map(function(body) {
	    if (body == selectedBody) {
		return 'green';
	    }
	    else {
		return 'grey';
	    }
	});

    // All open view

    var allOpen = slice(data.all, "status", "Öppen")
    var allOpenCategories = localeSortStrings(getLabels(allOpen, "category"));
    charts.openCount.data.labels = allOpenCategories;
    charts.openCount.data.datasets[0].data = getMeasures(count(allOpen, "confirmed", [ "category" ]), "confirmed", "category", allOpenCategories);

    charts.averageOpenTime.data.labels = allOpenCategories;
    charts.averageOpenTime.data.datasets[0].data = getMeasures(average(allOpen, "daysUntilClosedOrNow", [ "category" ]), "daysUntilClosedOrNow", "category", allOpenCategories);

    // Time series view

    var startDateStr = document.getElementById('timeseries-start-date').value;
    var endDateStr = document.getElementById('timeseries-end-date').value;

    if (startDateStr == "") {
	var startDate = getFirstDate(data.all);
    }
    else {
	var startDate = new Date(startDateStr);
    }

    if (endDateStr == "") {
	var endDate = new Date();
    }
    else {
	var endDate = new Date(endDateStr);
	endDate.setTime(endDate.getTime() + 24*60*60*1000);
    }
    
    function toMonth(date) {
	return date.toISOString().substring(0, 7);
    }

    function toQuarter(date) {
	var d = new Date(date.getFullYear(), Math.floor(date.getMonth()/3)*3, 2);
	return toMonth(d);
    }

    data.timeseries = dice(data.all, "confirmed", startDate, endDate);

    charts.reportsCreated.data.datasets[0].data = to2DPoints(count(data.timeseries, "status", [ [ "confirmed", toMonth] ]), "confirmed", "status");

    charts.reportsCreatedQuarterly.data.datasets[0].data = to2DPoints(count(data.timeseries, "status", [ [ "confirmed", toQuarter] ]), "confirmed", "status");

    var createdPerApp = count(data.timeseries, "status", [ "app", [ "confirmed", toMonth] ]);
    var androidTimeSeries = to2DPoints(slice(createdPerApp, "app", "Android"), "confirmed", "status");
    var iOSTimeSeries = to2DPoints(slice(createdPerApp, "app", "iOS"), "confirmed", "status");
    var webbTimeSeries = to2DPoints(slice(createdPerApp, "app", "Webb"), "confirmed", "status");

    charts.reportsCreatedPerApp.data.datasets[0].data = androidTimeSeries;
    charts.reportsCreatedPerApp.data.datasets[1].data = iOSTimeSeries;
    charts.reportsCreatedPerApp.data.datasets[2].data = webbTimeSeries;    

    var createdQuarterlyPerApp = count(data.timeseries, "status", [ "app", [ "confirmed", toQuarter] ]);
    var androidQuarterlyTimeSeries = to2DPoints(slice(createdQuarterlyPerApp, "app", "Android"), "confirmed", "status");
    var iOSQuarterlyTimeSeries = to2DPoints(slice(createdQuarterlyPerApp, "app", "iOS"), "confirmed", "status");
    var webbQuarterlyTimeSeries = to2DPoints(slice(createdQuarterlyPerApp, "app", "Webb"), "confirmed", "status");

    charts.reportsCreatedQuarterlyPerApp.data.datasets[0].data = androidQuarterlyTimeSeries;
    charts.reportsCreatedQuarterlyPerApp.data.datasets[1].data = iOSQuarterlyTimeSeries;
    charts.reportsCreatedQuarterlyPerApp.data.datasets[2].data = webbQuarterlyTimeSeries;    
    
    var averageResponseTimePerMonth = average(data.timeseries, "daysUntilFirstBodyResponse", [ [ "confirmed", toMonth] ]);
    charts.responseTimeTrend.data.datasets[0].data = to2DPoints(averageResponseTimePerMonth, "confirmed", "daysUntilFirstBodyResponse");

    var averageCloseTimePerMonth = average(slice(data.timeseries, "status", function(val) { return val != "Öppen" }), "daysUntilClosedOrNow", [ [ "confirmed", toMonth] ]);
    charts.solveTimeTrend.data.datasets[0].data = to2DPoints(averageCloseTimePerMonth, "confirmed", "daysUntilClosedOrNow");
    
    for (chart in charts) {
	charts[chart].update();
    }
}

function updateSelectedMonthText() {
    monthSelect = document.getElementById('month-selection');
    
    document.getElementById('month-text').innerHTML =
	monthSelect.options[monthSelect.selectedIndex].text + ',' +
	document.getElementById('year-selection').value;
}


function getLastDate(cube) {
    var result = undefined;
    cube.forEach(function(record) {
	if (result == undefined) {
	    result = record.confirmed;
	}
	else if (record.confirmed > result) {
	    result = record.confirmed;
	}
    });
    return result;
}

function getFirstDate(cube) {
    var result = undefined;
    cube.forEach(function(record) {
	if (result == undefined) {
	    result = record.confirmed;
	}
	else if (record.confirmed < result) {
	    result = record.confirmed;
	}
    });
    return result;
}

function setToArray(s) {
    var arr = [];
    s.forEach(function(v) { arr.push(v) });
    return arr;
}

function getYears(cube) {
    var years = new Set();

    cube.forEach(function(record) {
	var year = record.confirmed.getFullYear();
	if (!years.has(year)) {
	    years.add(year);
	}
    });

    return setToArray(years).sort();
}

addEventListener('load', function() {

    settings.bodyName = "Ale"
    settings.id = 148;

    if (URL != undefined) {
	var parsedUrl = new URL(window.location.href);
	if (parsedUrl.searchParams != undefined) {
	    settings.bodyName = parsedUrl.searchParams.get("name");
	    settings.id = parsedUrl.searchParams.get("id");
	}
    }
    
    document.title += " " + settings.bodyName;

    var bodyNameElements = document.querySelectorAll('.body-name');

    Array.prototype.forEach.call(bodyNameElements, function(x) {
        x.textContent = settings.bodyName;
    });

    fetch("all_count.json")
	.then(function(response) { return response.json(); })
	.then(function(result) {
	    result = result.map(function (record) {
		record.confirmed = new Date(moment(record.confirmed));
		return record;
	    });

	    data.bodyTotals = result;
	})
	.then(function() {
	    fetch(settings.id + ".json")
		.then(function(response) { return response.json(); })
		.then(function(result) {
		    result = result.map(function (record) {
			record.confirmed = new Date(moment(record.confirmed));
			record.daysUntilFirstBodyResponse = parseInt(record.daysUntilFirstBodyResponse)
			return record;
		    });
		    
		    data.all = result;
		    
		    var yearSelect = document.getElementById('year-selection');
		    var monthSelect = document.getElementById('month-selection');
		    
		    getYears(data.all).forEach(function(year) {
			var opt = document.createElement('option');
			opt.value = year;
			opt.innerHTML = year;
			yearSelect.appendChild(opt);
		    });
		    
		    var lastDate = getLastDate(data.all);
		    yearSelect.value = lastDate.getFullYear();
		    monthSelect.value = lastDate.getMonth();
		    createCharts();
		    updateSelectedMonthText();
		    updateCharts();
		})
	})
	.catch(function(error) {
	    console.log("Error fetching data file: " + error);
	}).
	then(function() {
	    document.getElementById('spinner').style.display = 'none';
	});
});

function newSelection() {
    updateSelectedMonthText();
    updateCharts();
}
