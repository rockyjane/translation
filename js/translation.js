    $(function(){
        var $block = $('#BANNER'),
            $slides = $block.find('ul.scroll'),
            _width = $block.width(),
            $li = $slides.find('li'),
            $control = $block.find('.abgne-control'),
            _animateSpeed = 600,
            timer, _showSpeed = 3000, _stop = false;
        $slides.css('width', ($li.length + 1) * _width);
        var _str = '';
        for(var i=0, j=$li.length;i<j;i++){
            _str += '<li class="flexslider_control_' + (i+1) + '">' + (i+1) + '</li>';
        }
        var $number = $('<ul class="numbers"></ul>').html(_str).appendTo($control),
            $numberLi = $number.find('li');
        $numberLi.click(function(){
            var $this = $(this);
            $this.addClass('current').siblings('.current').removeClass('current');
            clearTimeout(timer);
            $slides.stop().animate({
                left: _width * $this.index() * -1
            }, _animateSpeed, function(){
                if(!_stop) timer = setTimeout(move, _showSpeed);
            });
            return false;
        }).eq(0).click();
        $control.find('ul.arrows li').click(function(){
            var _index = $numberLi.filter('.current').index();
            $numberLi.eq((this.className.indexOf('next')>-1?_index+1:_index-1+$numberLi.length)%$numberLi.length).click();
            return false;
        });
        $control.find('li').hover(function(){
            $(this).addClass('hover');
        }, function(){
            $(this).removeClass('hover');
        });
        $slides.hover(function(){
            _stop = true;
            clearTimeout(timer);
        }, function(){
            _stop = false;
            timer = setTimeout(move, _showSpeed);
        });
        function move(){
            $control.find('ul.arrows li.next').click();
        }
    });