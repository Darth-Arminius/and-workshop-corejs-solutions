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
  candidates.filter(candidate => filters.every(filter =>
  candidate.options.some(option =>
    filters.includes("AVAILABLE_IMMEDIATELY") && option.code === "AVAILABLE_IMMEDIATELY" ? true : !filters.includes("AVAILABLE_IMMEDIATELY") && filters.includes("FRESH_GRAD") && option.code === "FRESH_GRAD" ? true : filter === option.code ? true : false
  )
));

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
