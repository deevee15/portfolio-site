$(document).ready(function() {
	$(function(){
        $('.projects_prj_others_img').click(function(){
            var getimg=$(this).attr('src');
            var getid=$(this).attr('prj_id');
            $('html, body').stop().animate({scrollTop : $('#projects').offset().top - 50}, {duration: 800, easeing: 'swing'});
            $.ajax({
                url: "select_project.php",
                type:"POST",
                data:({ prj_id: getid}),
                dataType: "html",
                success: function (data) {
                    if(data=='error'){return false;}
                    else{
                        $('.projects_prj_leftpanel').html(data);
                        $('.projects_prj_rightpanel_pic img').attr('src',getimg);
                        $('.projects_prj_leftpanel_links_next').attr('current_pid', getid);
                    }
                }
            }); 
        });
        $('.projects_prj_leftpanel_links_next').click(function(){
            var getcurrentid=$(this).attr('current_pid');
            $('html, body').stop().animate({scrollTop : $('#projects').offset().top - 50}, {duration: 800, easeing: 'swing'});
            $.ajax({
                url: "select_project.php",
                type:"POST",
                data:({ prj_id: ++getcurrentid}),
                dataType: "html",
                success: function (data) {
                    if(data=='error'){return false;}
                    else{
                        $('.projects_prj_leftpanel').html(data);
                        $('.projects_prj_leftpanel_links_next').attr('current_pid',getcurrentid++);
                        $('.projects_prj_rightpanel_pic img').attr('src',$('.projects_prj_leftpanel_numbering').attr('image_src'));
                    }
                }
            });
        }); 
        $('.all_p_cards_card').click(function(){
            var getcurrentid=$(this).attr('p_id');
            $('html, body').stop().animate({scrollTop : $('#projects').offset().top - 50}, {duration: 800, easeing: 'swing'});
            $.ajax({
                url: "select_project.php",
                type:"POST",
                data:({ prj_id: getcurrentid}),
                dataType: "html",
                success: function (data) {
                    if(data=='error'){return false;}
                    else{
                        $('.projects_prj_leftpanel').html(data);
                        $('.projects_prj_leftpanel_links_next').attr('current_pid',getcurrentid);
                        $('.projects_prj_rightpanel_pic img').attr('src',$('.projects_prj_leftpanel_numbering').attr('image_src'));
                    }
                }
            });
        }); 
    });
});