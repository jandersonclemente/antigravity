// jQuery antiGravity Plugin v1.0
// jandersonclemente@outlook.com
$.fn.isOnTheScreen = function() {
    var elementTop     = $(this).offset().top;
    var elementBottom  = elementTop + $(this).outerHeight();
    var viewportTop    = $(window).scrollTop();
    var viewportBottom = viewportTop + $(window).height();
    return elementBottom > viewportTop && elementTop < viewportBottom;
};
$.fn.antiGravity = function(customOptions){
    //default options
    var options = {};
    options.cutInHalf    = false;
    options.revert       = -1;
    options.acceleration = 5;  
    options.duration     = 2000;
    options.parent       = jQuery(this).parent();
    if(customOptions){    
        // cut in half
        if(customOptions.cutInHalf){
            options.cutInHalf = customOptions.cutInHalf;
        }
        //accelaration
        if(customOptions.acceleration && customOptions.acceleration!=5){
            if((!isNaN(customOptions.acceleration)) && customOptions.acceleration > 0){
                options.acceleration = customOptions.acceleration;
            }else{
                throw new Error('antiGravity says: Acceleration is not a number or is smaller than zero');
            }
        }
        //revert
        if(customOptions.revert==false){
            options.revert = 1;
        }
        //duration
        if(customOptions.duration && customOptions.duration > 0){
            options.duration = customOptions.duration;
        }
        //parent
        if(customOptions.parent){
            if($(customOptions.parent).length > 0){
                options.parent = $(customOptions.parent);
            }
        }
    }
    jQuery(this).css('transition','all 2000ms');
    var that = this;
    $(window).on('scroll',function(){                
        if($(that).isOnTheScreen()){
            var wTop = $(window).scrollTop();
            var cTop = options.parent.position().top;
            console.log(cTop);
            if(options.cutInHalf){  
                if(wTop <= cTop){
                    $(that).css('transform','translateY('+(wTop/options.acceleration)*options.revert+'px)');
                }
            }else{
                $(that).css('transform','translateY('+(wTop/options.acceleration)*options.revert+'px)');
            }
        };
    });    
};