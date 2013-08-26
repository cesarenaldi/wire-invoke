# wire-invoke [![Build Status](https://secure.travis-ci.org/cesarenaldi/wire-invoke.png?branch=master)](http://travis-ci.org/cesarenaldi/wire-invoke)

This wire.js plugin add a new facet to the default DSL set that is useful to invoke a function inside your wire spec. Compared with the buil-in `create` facet, `invoke` also accepts function passed as reference (i.e. `$ref`).

## Getting Started
Install the module with: `npm install git://github.com/cesarenaldi/wire-invoke.git`

## Usage

### Package.json of the shared task

```javascript
define({
	myFun: {
		literal: function (/* args */) {
			console.log(arguments)
		}
	},

	result: {
		invoke: {
			$ref: 'myFun',
			args; ['foo']
		}
	}
}
})
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_

## License
Copyright (c) 2013 Cesare Naldi  
Licensed under the MIT license.
