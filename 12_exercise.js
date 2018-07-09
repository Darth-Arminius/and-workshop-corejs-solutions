/**
 *  AVAILABLE FILTERS:
 *  ["AVAILABLE_IMMEDIATELY", "FRESH_GRAD", "JUNIOR", "JAVASCRIPT", "PHP", "AWS", "REACT", "JAVA"]
 *
 *  "AVAILABLE_IMMEDIATELY" and "FRESH_GRAD" will override all the other filters if specified
 *
 *  if "AVAILABLE_IMMEDIATELY" and "FRESH_GRAD" are both specified as filter, "FRESH_GRAD" will be ignored
 *
 *
 *  Exercise: refactor this code
 *  - take care of naming variables
 *  - get rid of the 'for loops'
 *  - move it to modern JS!
 *  - oh, there are missing tests/scenario
 *
 *   happy refactory :)
 */

// was
// function filter(results, filters) {
//   var out = [];
//   var resultsLength = results.length;
//   var filterLength = filters.length;
//   var hasOptions;
//   var availableImmediately = false;
//   var freshGrad = false;

//   if (filterLength !== 0) {
//     if (filters.indexOf("AVAILABLE_IMMEDIATELY") !== -1) {
//       availableImmediately = true;
//     } else if (filters.indexOf("FRESH_GRAD") !== -1) {
//       freshGrad = true;
//     }

//     for (var i = resultsLength; i--; ) {
//       hasOptions = results[i].options && results[i].options.length > 0; //has.options

//       if (results[i].options) {
//         for (var k = filterLength; k--; ) {
//           // loop through filters
//           var hasFilter = false;
//           for (var j = results[i].options.length; j--; ) {
//             if (!availableImmediately && !freshGrad) {
//               if (filters[k] == results[i].options[j].code) {
//                 hasFilter = true;
//               }
//             } else if (
//               availableImmediately &&
//               results[i].options[j].code === "AVAILABLE_IMMEDIATELY"
//             ) {
//               hasFilter = true;
//             } else if (
//               freshGrad &&
//               results[i].options[j].code === "FRESH_GRAD"
//             ) {
//               hasFilter = true;
//             }
//           }
//           hasOptions = hasOptions && hasFilter;
//         }
//       }
//       if (hasOptions) {
//         out.unshift(results[i]);
//       }
//     }
//   } else {
//     out = results;
//   }
//   return out;
// }

// module.exports = filter;

/*
  Cleaner refactored version
*/
module.exports = function filter(candidates, filterBy) {
  const hasAvailableImmediatelyFilter = filterBy.includes(
    "AVAILABLE_IMMEDIATELY"
  );
  const hasFreshGradFilter =
    !hasAvailableImmediatelyFilter && filterBy.includes("FRESH_GRAD");

  function checkFilter(options, filter) {
    return options.some(option => {
      if (
        hasAvailableImmediatelyFilter &&
        option.code === "AVAILABLE_IMMEDIATELY"
      )
        return true;
      if (hasFreshGradFilter && option.code === "FRESH_GRAD") return true;
      if (filter == option.code) return true;
      return false;
    });
  }

  return candidates.filter(candidate =>
    filterBy.every(filter => checkFilter(candidate.options, filter))
  );
};

/*
  6 line solution
*/
module.exports = (candidates, filters) =>
  candidates.filter(candidate =>
    filters.every(filter =>
      candidate.options.some(
        option =>
          filters.includes("AVAILABLE_IMMEDIATELY") &&
          option.code === "AVAILABLE_IMMEDIATELY"
            ? true
            : !filters.includes("AVAILABLE_IMMEDIATELY") &&
              filters.includes("FRESH_GRAD") &&
              option.code === "FRESH_GRAD"
              ? true
              : filter === option.code
                ? true
                : false
      )
    )
  );

/*
  Awesome Ramda solution
*/
const {
  pipe,
  prop,
  map,
  intersection,
  cond,
  contains,
  length,
  always,
  filter,
  equals
} = require("ramda");

module.exports.filter = (candidates, filters) =>
  filter(
    pipe(
      prop("options"),
      map(prop("code")),
      cond([
        [
          contains("AVAILABLE_IMMEDIATELY"),
          always(contains("AVAILABLE_IMMEDIATELY"))
        ],
        [contains("FRESH_GRAD"), always(contains("FRESH_GRAD"))],
        [
          always(true),
          always(
            pipe(
              intersection(filters),
              length,
              equals(filters.length)
            )
          )
        ]
      ])(filters)
    ),
    candidates
  );
