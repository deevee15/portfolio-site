<?
    require('bd.php');
    $id=$_POST['prj'];
    $result = mysqli_query($mysqli, "SELECT * FROM `projects` WHERE id = '$id' ORDER BY id DESC");
    if(mysqli_num_rows($result)==0){echo'404';}
    else{
        while($row = mysqli_fetch_array($result)) {
            $img=$row['image'];
            $t1=$row['title_1'];
            $t2=$row['title_2'];
            $desc=$row['description'];
            $link=$row['link'];
            $git=$row['git'];
            $imgur=$row['imgur'];
            $category=$row['category'];
            $arr = array(
                "id" => $id,
                "image" => $img,
                "title_1" => $t1,
                "title_2" => $t2,
                "description" => $desc,
                "link" => $link,
                "git" => $git,
                "imgur" => $imgur,
                "category" => $category,
            );
            echo json_encode($arr);
        }
    }
?>