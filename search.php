<?
    include_once('bd.php');
    $text=$_POST['text'];
    $result = mysqli_query($mysqli, "SELECT * FROM `projects` WHERE title_1 LIKE '%$text%' ORDER BY id DESC");
    if($text=='' or $text==' '){
        while($row = mysqli_fetch_array($result)) {
        $id=$row['id'];
        $img=$row['image'];
        $t1=$row['title_1'];
        $t2=$row['title_2'];
        $desc=$row['description'];
        $link=$row['link'];
        $git=$row['git'];
        $imgur=$row['imgur'];
        $category=$row['category'];
            echo'
                     <div class="projects_mobile_card" cardid="'.$id.'">
                        <div class="projects_mobile_card_img"><img src="'.$img.'"></div>
                        <div class="projects_mobile_card_title">'.$t1.'</div>
                        <div class="projects_mobile_card_title2">'.$t2.'</div>
                     </div>
            ';
        }
    }
    if(mysqli_num_rows($result)==0){echo'404 not found';}
    else{
        while($row = mysqli_fetch_array($result)) {
            $id=$row['id'];
            $img=$row['image'];
            $t1=$row['title_1'];
            $t2=$row['title_2'];
            $desc=$row['description'];
            $link=$row['link'];
            $git=$row['git'];
            $imgur=$row['imgur'];
            $category=$row['category'];
            echo'
                <div class="projects_mobile_card" cardid="'.$id.'">
                    <div class="projects_mobile_card_img"><img src="'.$img.'"></div>
                    <div class="projects_mobile_card_title">'.$t1.'</div>
                    <div class="projects_mobile_card_title2">'.$t2.'</div>
                </div>
            ';
        }
    }
?>