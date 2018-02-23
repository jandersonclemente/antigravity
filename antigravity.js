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
    options.attenuation = 5;  
    options.duration     = 2000;
    options.parent       = jQuery(this).parent(); 
    if(customOptions){    
        // cut in half
        if(customOptions.cutInHalf){
            options.cutInHalf = customOptions.cutInHalf;
        }
        //attenuation
        if(customOptions.attenuation && customOptions.attenuation!=5){
            if((!isNaN(customOptions.attenuation)) && customOptions.attenuation > 0){
                options.attenuation = customOptions.attenuation;
            }else{
                throw new Error('antiGravity says: attenuation is not a number or is smaller than zero');
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
            if(options.cutInHalf){  
                if(wTop <= cTop){
                    $(that).css('transform','translateY('+(wTop/options.attenuation)*options.revert+'px)');
                }
            }else{
                $(that).css('transform','translateY('+(wTop/options.attenuation)*options.revert+'px)');
            }
        };
    });    
};