define( [ 'quintus' ], function ( Quintus ) {
	'use strict';


	// Return a x and y location from a row and column
	var tilePos = function ( col, row ) {
		return { x: col*32 + 16, y: row*32 + 16 };
	};


	var TankTown = function ( options ) {
		options = options || {};

		this.canvas = options.canvas;
		return this;
	};


	TankTown.prototype.begin = function () {
		var setupOptions = {
			maximize: true
		}
		var Q = Quintus( {
			development: true
		} )
		.include( 'Sprites, Scenes, Input, 2D, Anim' )
		.setup( this.canvas, setupOptions );


		Q.input.keyboardControls();


		var defaultGravity = 0;
		Q.gravityY = 0;
		Q.gravityX = 0;


		var SPRITE_MAP_TILE = 10;
		var SPRITE_PLAYER = 20;
		var SPRITE_ENEMY = 30;
		var SPRITE_FRIENDLY_SHOT = 40;
		var SPRITE_FRIENDLY_SHOT = 50;


		Q.TileLayer.extend( 'TankTownMap', {
			init: function() {
				this._super({
					type: SPRITE_MAP_TILE,
					dataAsset: 'level.json',
					sheet: 'tiles',
				});
			},

			setup: function() {
			}
		} );
		Q.scene( 'level1', function( stage ) {
			var map = stage.collisionLayer( new Q.TankTownMap() );
			map.setup();
		} );

		Q.load( 'level.json, blocks.png', function() {
			Q.sheet( 'tiles', 'blocks.png', { tileW: 32, tileH: 32 } );

			Q.stageScene( 'level1' );
		} );
	}


	return TankTown;


} );
