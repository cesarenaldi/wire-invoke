var tests = [];
for (var file in window.__karma__.files) {
  if (window.__karma__.files.hasOwnProperty(file)) {
    if (/\.spec\.js$/.test(file) && !/node_modules|components/.test(file)) {
      tests.push(file);
    }
  }
}

requirejs.config({
    // Karma serves files from '/base'
    baseUrl: '/base/lib',

    paths: {

    	'chai': '../test/libs/chai',
    	'sinon': '../test/libs/sinon',
    	'sinon-chai': '../test/libs/sinon-chai',

        'underscore': '../components/underscore-amd/underscore'
    },

    shim: {
        'sinon': {
            exports: 'sinon'
        },
        'underscore': {
            exports: '_'
        }
    },

    packages: [
        {
            name: 'when',
            location: '../components/when',
            main: 'when'
        },
        {
            name: 'meld',
            location: '../components/meld',
            main: 'meld'
        },
        {
            name: 'wire',
            location: '../components/wire',
            main: 'wire'
        }
    ],

    hbs: {
        disableI18n: true
    },

    // ask Require.js to load these files (all our tests)
    deps: ['chai', 'sinon', 'sinon-chai'],

    // start test run, once Require.js is done
    callback: function(chai, sinon, sinonChai) {

		chai.use(sinonChai)
        window.chai = chai
    	window.expect = chai.expect;
    	window.sinon = sinon;

        require(tests, window.__karma__.start)
    }
});