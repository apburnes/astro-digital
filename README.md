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

#### astro.sceneId(scene, [callback])

If callback is not given, `astro.sceneId(query)` will return a promise.

__Params__
- `scene`: Scene ID String or Array of Scene ID Strings
- `callback`: function(error, response, result)

```js
var scene = 'LC80110442014358LGN00';
// or
var scene = ['LC80110442014358LGN00', 'LC82281122014358LGN00'];

// With a callback
astro.sceneId(scene, function(err, response, result) {
  if (err) {
    // handle error
  }

  // handle results
});

// With a promise
astro.sceneId(scene)
  .spread(function(response, result) {
    // handle response
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

#### astro.cloudCover(range)

This method can be prepended in a chain before the search is called to query scenes within the cloud cover range.

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

## Test

`$ npm test`


## Contact

Andy B
