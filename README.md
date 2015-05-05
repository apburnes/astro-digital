node-astro-digital
==================
A node client to the Astor Digital [API](http://docs.astrodigital.com/v1.0/docs)

## Install

`$ npm install @apburnes/astro-digital`

## API

#### new AstroDigital([options]);
```js
var AstroDigital = require('@apburnes/astro-digital');

var options = {
  limit: '25', // Default string
  skip: '0', // Default string
  apiVersion: 'v1' // Default string and only version http://docs.astrodigital.com/v1.0/docs
};

var astro = new AstroDigital(options);
```

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

#### astro.limit(count)

This method can be prepended in a chain before the search is called to change the default limit;

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

### astro.skip(count)

This method can be prepended in a chain before the search is called to change the default skip;

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

## Test

`$ npm test`


## Contact

Andy B
