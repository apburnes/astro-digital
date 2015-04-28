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

```js
var query = 'sceneID:LC80110442014358LGN00';

// With a callback
astro.search(query, function(err, data) {
  if (err) {
    // handle error
  }

  // data with be an Array of length 2
  data[0] // will be the request response
  var results = data[1].results // will be an array of scenes
  var metadata = data[1].meta // will be a meta data object about the query
});
```

#### astro.limit(integer)

This method can be prepended in a chain before the search is called to change the default limit;

```js
astro
  .limit(100)
  .search(function(err, data) {
    if (err) {
      // handle error
    }

    var results = data[1].results //
    results.length // equals the new limit of 100
  });
```

### astro.skip(integer)

This method can be prepended in a chain before the search is called to change the default skip;

```js
astro
  .skip(100)
  .search(function(err, data) {
    if (err) {
      // handle error
    }

    // will return the 25 results after skipping 100
  });
```

## Test

`$ npm test`


## Contact

Andy B
