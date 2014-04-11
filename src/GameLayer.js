var GameLayer = cc.LayerColor.extend({
    init: function() {
        this._super( new cc.Color4B( 127, 127, 127, 255 ) );
        this.setPosition( new cc.Point( 0, 0 ) );

        this.createBlocks();

        this.createJumper();
        
        this.setKeyboardEnabled( true );

        this.scheduleUpdate();
        
        return true;
    },
    createJumper: function() {
        this.jumper = new Jumper( 400, 160 );
        this.jumper.setBlocks( this.blocks );
        this.addChild( this.jumper );
        this.scheduleOnce(function() {
            this.jumper.scheduleUpdate();
        }, 1);
    },

    createBlocks: function() {
        this.blocks = [];

        var blocks = [
            [0, 0, 700, 160],
            [0, 200, 400, 250],
            [600, 400, 800, 450]
        ];

        for(var i=0; i < blocks.length; i++){
            var definition = blocks[i];
            definition.unshift(Block);
            
            var block = Create.apply(null, definition);
            this.blocks.push(block);
        }

        this.addAllblocks();
    },
    addAllblocks: function(){
          this.blocks.forEach( function( b ) {
            this.addChild( b );
        }, this );
    },

    onKeyDown: function( e ) {
        this.jumper.handleKeyDown( e );
    },

    onKeyUp: function( e ) {
        this.jumper.handleKeyUp( e );
    }
});

var StartScene = cc.Scene.extend({
    onEnter: function() {
        this._super();
        var layer = new GameLayer();
        layer.init();
        this.addChild( layer );
    }
});

