/*
 * Basic OLAP functionality (slicing and dicing hypercubes),
 * intended to simplify the task of transforming multi-dimensional
 * data to something that can be visualized (so typically by
 * reducing to 2 or 3 dimensions by slicing, dicing and aggregating).
 */

/*
 * For a given cube and field, return all unique values.
 *
 * Can be used to get the labels for e.g. bars in a bar chart.
 */
function getLabels(cube, field) {
    var uniqueMap = {};
    cube.forEach(function(record) {
	if (uniqueMap[record[field]] == undefined) {
	    uniqueMap[record[field]] = {};
	}
    });

    var arr = Object.entries(uniqueMap).map(function(fieldValue) {
	return fieldValue[0]
    });
    return arr;
}

/*
 * Generic function to aggregate along a field, with support for
 * grouping. Similar to SQL's aggregation with GROUP BY.
 *
 * The less generic variants (like count() or average()) are easier to use.
 */
function aggregate(cube, fieldToAggregate, fieldsToGroupBy, aggregationInit, aggregator, finalizeAggregation) {
    var aggregators = {}

    cube.forEach(function(record) {
	var value = record[fieldToAggregate];
	if (value == undefined || (typeof value === 'string' && value == '')) {
	    return;
	}

	var groups = fieldsToGroupBy.map(function(field) {
	    if (field instanceof Array) {
		return field[1](record[field[0]])
	    }
	    return record[field];
	});
	groupsKey = JSON.stringify(groups)
	
	if (aggregators[groupsKey] == undefined) {
	    aggregators[groupsKey] = aggregationInit;
	}
	aggregators[groupsKey] = aggregator(aggregators[groupsKey], value);
    });

    // Convert aggregators to a cube
    return Object.entries(aggregators).map(function(pair) {
	var groups = JSON.parse(pair[0]);
	var obj = {};
	obj[fieldToAggregate] = finalizeAggregation(pair[1]);

	for (var i = 0; i < fieldsToGroupBy.length; i++) {
	    if (fieldsToGroupBy[i] instanceof Array) {
		obj[fieldsToGroupBy[i][0]] = groups[i];
	    }
	    else {
		obj[fieldsToGroupBy[i]] = groups[i];
	    }
	}
	return obj;
    });
}

/*
 * Count values for a field, optionally grouped by other fields.
 */
function count(cube, fieldToAggregate, fieldsToGroupBy) {
    return aggregate(cube, fieldToAggregate, fieldsToGroupBy, 0, function(old, value) { return old+1; }, function(x) { return x; });
}

/*
 * Calculate averages for a field, optionally grouped by other fields.
 */
function average(cube, fieldToAverage, fieldsToGroupBy) {
    return aggregate(cube, fieldToAverage, fieldsToGroupBy,
		     { sum: 0.0, count: 0 },
		     function(old, value) {
			 num = Number(value);
			 if (isNaN(num)) {
			     return old;
			 }
			 return { sum: old.sum + num,
				  count: old.count + 1
				};
		     },
		     function(x) {
			 return x.sum / x.count;
		     });
}

/*
 * Checks if something is a function.
 */
function isFunction(functionToCheck) {
    return functionToCheck && {}.toString.call(functionToCheck) === '[object Function]';
}

/*
 * Slice a cube.
 *
 * In other words, return a smaller cube with only
 * the datapoints where the value of field == predicate.
 *
 * field is not included in the returned cube
 * (so this reduces the dimensionality by one).
 *
 * predicate can also be a function, if so we return
 * all datapoints where predicate(field) returns true.
 */
function slice(cube, field, predicate) {
    var f;

    if (isFunction(predicate)) {
	f = function(record) {
	    return predicate(record[field]);
	};
    }
    else {
	f = function(record) {
	    return record[field] == predicate;
	}
    }
    
    var filtered = cube.filter(f);

    return filtered.map(function(record) {
	copy = Object.assign({}, record);
	delete copy[field];
	return copy;
    });
}

/*
 * Dice a cube to select a time span.
 *
 * The values in the chosen field are assumed to be Date objects.
 */
function dice(cube, field, startDate, endDate) {
    return cube.filter(function(record) {
	return record[field].getTime() >= startDate.getTime() &&
	    record[field].getTime() < endDate.getTime();
    });
}

/*
 * Returns an array of measures from a cube, in an order
 * specified by a given array of labels from another field.
 *
 * Assumes there is only one measure in the cube for a
 * given label, as is the case for instance after an
 * aggregation and group by.
 *
 * For instance if the cube is:
 *
 * status   count
 * open     6
 * closed   3
 * fixed    9
 *
 * calling getMeasures(cube, "count", "status", [ "closed", "open", "hidden" ])
 * would return [ 3, 6, undefined ].
 */
function getMeasures(cube, measureField, labelField, labels) {
    var obj = {}

    cube.forEach(function(record) {
	obj[record[labelField]] = record[measureField];
    });

    return labels.map(function(label) {
	return obj[label];
    });
}

/*
 * Converts a cube to an array of objects with x and y members.
 *
 * Can be helpful when plotting a cube with e.g. Chart.js.
 *
 * @param xField The field to map to x.
 * @param yField The field to map to y.
 */
function to2DPoints(cube, xField, yField) {
    return cube.map(function(record) {
	return { x: record[xField],
		 y: record[yField] };
    });
}
