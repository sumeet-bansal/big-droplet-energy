
<html>

<?php
$date = date('m/d/Y h:i:s a', time());
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if (isset($_GET['color'])) {
        echo '<body style="background-color:'.$_GET['color'].'">';
    } 
    if (isset($_GET['fname']) && isset($_GET['lname'])){
        echo "Hello ".$_GET['fname']." ".$_GET['lname'];
        echo " from a Web app written in PHP on $date";
    }
} 
elseif ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_POST['color'])) {
        echo '<body style="background-color:'.$_POST['color'].'">';
    } 
    if (isset($_POST['fname']) && isset($_POST['lname'])){
        echo "Hello ".$_POST['fname']." ".$_POST['lname'];
        echo " from a Web app written in PHP on $date";
    }
} else {
    
}
?>
</body>
</html>