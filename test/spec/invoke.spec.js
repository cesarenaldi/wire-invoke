define([
	'wire'
], function (wire) {

	describe('Wire Invoke plugin', function () {

		var targetFunction = sinon.stub(),
			mainSpec = {

			targetFunction: {
				literal: targetFunction
			},

			plugins: [
				{ module: 'wire/debug', trace: true }
			]
		},
		mainContext;

		before(function (done) {

			wire(mainSpec).then(function (context) {

				mainContext = context;
				done()
			})
		})

		describe('when invoke a function passed as ref', function() {

			var result;

			before(function (done) {

				targetFunction.returns('boh')

				mainContext.wire({
					$exports: { $ref: 'result' },

					result: {
						invoke: {
							$ref: 'targetFunction',
							args: ['test', 'me']
						}
					},

					$plugins: [
						{ module: 'invoke' }
					]

				}).then(function (context) {

					result = context.result;
					done()
				})
			})


			it('should pass the specified args', function () {

				expect(targetFunction)
					.to.be.calledWith(sinon.match.string, sinon.match.string)
			})

			it('should return the expected result', function () {

				expect(result)
					.to.equal('boh')
			})
		})
	})
})