node-astro-digital
==================
A node client to the Astor Digital [API](http://docs.astrodigital.com/v1.0/docs)

## Install

`$ npm install @apburnes/astro-digital`

## new AstroDigital([options]);

Contstruct a new `AstroDigital` instace to publish and search scenes and metadata

__Params__
- `options`: Object
  - `limit`: Integer - Default `25`
  - `skip`: Integer - Default `0`
  - `apiVersion`: String - Default `'v1'`

```js
var AstroDigital = require('@apburnes/astro-digital');

var options = {
  limit: '25', // Default string
  skip: '0', // Default string
  apiVersion: 'v1' // Default string and only version http://docs.astrodigital.com/v1.0/docs
};

var astro = new AstroDigital(options);
```

## Search API

#### astro.search([query], [callback])

If query string is not given, `astro.search(callback)` will return the first 25 results of all scenes.

If callback is not given, `astro.search(query)` will return a promise.

__Params__
- `query`: A query string following this [syntax](http://docs.astrodigital.com/v1.0/docs/search#search-syntax)
- `callback`: function(error, response, result)

```js
var query = 'sceneID:LC80110442014358LGN00';

// With a callback
astro.search(query, function(err, response, result) {
  if (err) {
    // handle error
  }

  response =
  var metadata = data[1].meta // will be a meta data object about the query
});

// With a promise
astro.search(query)
  .spread(function(response, result) {
    // handle results
  })
  .catch(function(err) {
    // handle error
  });
```

### Chaining Search Queries

#### astro.limit(count)

This method can be prepended in a chain before the search is called to change the default limit.

__Params__
- `count`: Integer of number of results returned

```js
astro
  .limit(100)
  .search(function(err, response, result) {
    if (err) {
      // handle error
    }

    results.results.length // equals the new limit of 100
  });
```

#### astro.skip(count)

This method can be prepended in a chain before the search is called to change the default skip.

__Params__
- `count`: Integer of number of results skipped

```js
astro
  .skip(100)
  .search(function(err, response, result) {
    if (err) {
      // handle error
    }

    result // will return an object
           // with the 'results' array of 25 results after the firstskipping 100
  });
```

#### astro.sceneId(scene)

This method can be prepended in a chain before the search is called to query scenes by ID or array of IDs.

__Params__
- `scene`: Scene ID String or Array of Scene ID Strings
- `callback`: function(error, response, result)

```js
var scene = 'LC80110442014358LGN00';
// or
var scene = ['LC80110442014358LGN00', 'LC82281122014358LGN00'];

// With a callback
astro
  .sceneId(scene)
  .search(function(err, response, result) {
  if (err) {
    // handle error
  }

  // handle results
});

// With a promise
astro
  .sceneId(scene)
  .search()
  .spread(function(response, result) {
    // handle response
  })
  .catch(function(err) {
    // handle error
  });
```

#### astro.cloudCover(range)

This method can be prepended in a chain before the search is called to query scenes within the cloud cover field range.

__Params__
- `range`: Array of numbers of results returned

```js
var range = [0, 20];

astro
  .cloudCover(range)
  .search(function(err, response, result) {
    if (err) {
      // handle error
    }

    results // returns scenes with 0% to 20% cloud cover
  });
```

#### astro.cloudCoverFull(range)

This method can be prepended in a chain before the search is called to query scenes within the cloud cover field range.

Same as [`astro.cloudCover(range)`](#astrocloudcoverrange)

#### astro.and()

This method can be prepended in a chain to filter scenes by fields using a sql like 'AND' operator.

```js
// Finds scenes with cloud cover from 0% to 10% and between Jan 1, 2012 and Jan 1, 2014
// https://api.astrodigital.com/v1/search?search=cloudCover:[0+TO+50]+AND+acquisitionDate:[2012-01-01+TO+2014-01-01]

astro
  .cloudCover([0, 10])
  .and()
  .acquisitionDate(['2012-01-01', '2014-01-01'])
  .search(function(err, response, result) {
    if (err) {
      // handle error
    }

    // handle result
  });
```

#### astro.or()

This method can be prepended in a chain to filter scenes by fields using a sql like 'OR' operator.

```js
// Finds scenes with cloud cover from 0% to 10% or 90% to 100%
// https://api.astrodigital.com/v1/search?search=cloudCover:[0+TO+10]+OR+cloudCover[90+TO+100]

astro
  .cloudCover([0, 10])
  .or()
  .cloudCover([90, 100])
  .search(function(err, response, result) {
    if (err) {
      // handle error
    }

    // handle result
  });
```

## Test

`$ npm test`


## Contact

Andy B
