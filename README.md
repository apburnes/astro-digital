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

## Publish API

#### astro.publish(email, sceneID, process, [satellite], [callback])

If callback is not given, `astro.publish(email, sceneID, process)` will return a promise.

__Params__
- `email`: String of a valid email address
- `sceneID`: String of a valid scene ID
- `process`: String of valid process - options (`trueColor`, `vegHealth`, `urbanFalse`)
- `satellite`: Optional String of satellite - Default `l8` "Landsat 8"
- `callback`: Optional Function - `function(err, response, result)`

```js
var email = 'email@example.com';
var sceneID = 'LC80351142015001LGN00';
var processType = 'trueColor';
var satellite = 'l8';

// With a callback
astro.publish(email, sceneID, processType, satellite, function(err, response, result) {
  if (err) {
    // handle error
  }

  // result
});

// With a promise
astro.publish(email, sceneID, processType, satellite)
  .spread(function(response, result) {
    // handle result
  })
  .catch(function(err) {
    // handle error
  });
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

#### astro.row(rowNumber)

This method can be prepended in a chain before the search is called to query scenes by row.

__Params__
- `rowNumber`: Number or Number String of the row

```js
var rowNumber = 11;

astro
  .row(rowNumber)
  .search(function(err, response, result) {
    if (err) {
      // handle error
    }

    // handle results
  });
```

#### astro.path(pathNumber)

This method can be prepended in a chain before the search is called to query scenes by path.

__Params__
- `pathNumber`: Number or Number String of the path

```js
var pathNumber = 11;

astro
  .row(pathNumber)
  .search(function(err, response, result) {
    if (err) {
      // handle error
    }

    // handle results
  });
```

#### astro.rowAndPath(row, path)

This method can be prepended in a chain before the search is called to query scenes in row `AND` path.

__Params__
- `row`: Number or Number String of the row
- `path`: Number or Number String of the path

```js
var row = 11;
var path = 2;

astro
  .rowAndPath(row, path)
  .search(function(err, response, result) {
    if (err) {
      // handle error
    }

    // handle results
  });
```

#### astro.rowOrPath(row, path)

This method can be prepended in a chain before the search is called to query scenes in row `OR` path.

__Params__
- `row`: Number or Number String of the row
- `path`: Number or Number String of the path

```js
var row = 11;
var path = 2;

astro
  .rowOrPath(row, path)
  .search(function(err, response, result) {
    if (err) {
      // handle error
    }

    // handle results
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

#### astro.xy(longitude, latitude)

This method can be prepended in a chain before the search is called to query scenes that intersect the XY(longitude, latitude) point.

__Params__
- `longitude`: Number representing the longitude
- `latitude`: Number representing latitude

```js
var long = -112.12;
var lat = 33.32;

astro
  .xy(long, lat)
  .search(function(err, response, result) {
    if (err) {
      // handle error
    }

    results // all scenes that intersect the XY point
  });
```

#### astro.bbox(xMin, yMin, xMax, yMax)

This method can be prepended in a chain before the search is called to query scenes that intersect the bounding box extent.

__Params__
- `xMin`: Number representing the longitude minimum
- `yMin`: Number representing the latitude minimum
- `xMax`: Number representing the longitude maximum
- `yMax`: Number representing the latitude maximum

```js
var xMin = -100;
var yMin = 30;
var xMax = -80;
var yMax = 40;

astro
  .bbox(xMin, yMin, xMax, yMax)
  .search(function(err, response, result) {
    if (err) {
      // handle error
    }

    results // all scenes that intersect the bbox extent
  });
```

#### astro.queryField(field, value)

This method can be prepended in a chain before the search is called to query a field with a value.

__Params__
- `field`: String of field name
- `value`: String or Number of field value;

```js
var field = 'sceneID';
var value = 'LC80110442014358LGN00';

astro
  .queryField(field, value)
  .search(function(err, response, result) {
    if (err) {
      // handle error
    }

    // handle result
  });
```

#### astro.queryRange(field, range)

This method can be prepended in a chain before the search is called to query a field with a value.

__Params__
- `field`: String of field name
- `value`: Array of field value range;

```js
var field = 'cloudCover';
var range = [0, 20];

astro
  .queryField(field, range)
  .search(function(err, response, result) {
    if (err) {
      // handle error
    }

    // handle result
  });
```

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

## Methods API

#### astro.methods([callback])

If callback is not given, `astro.methods()` will return a promise.

__Params__
- `callback`: Function [Optional] - `function(err, response, result)`
  - `err`: Error
  - `response`: Object - Request response information
  - `result`: Object - Scene processing methods available for satellites


## Test

`$ npm test`


## Contact

Andy B
