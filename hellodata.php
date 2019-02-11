
<?php
$host  = $_SERVER['HTTP_HOST'];
$uri  = rtrim(dirname($_SERVER['PHP_SELF']), '/\\');
$extra = '404.html';  // change accordingly

if (isset($_GET['response'])) {
        $type = strtolower($_GET['response']);
        $date = date('m/d/Y h:i:s a', time());
        if( $type == 'xml') {
                echo "<?xml version='1.0' encoding='UTF-8'?>Hello Data it's $date";
        }
        elseif( $type  == 'json' ) {
                header('Content-Type: application/json');
                $data->msg = "Hello Data it's $date";
                $JSON = json_encode($data);
                echo $JSON;
        } else {
                header("Location: http://$host$uri/$extra");
                exit();
        }
} else {

echo '<!DOCTYPE HTML><html lang="en"><head>';
echo '<meta http-equiv="content-type" content="text/html; charset=UTF-8">';
echo '<title>Big Droplet Energy</title>';
echo '<link rel="shortcut icon" href="/favicon.ico?" type="image/x-icon"/></head>';
echo '<body><h1>Error: Specify response parameter</h1></body></html>';

exit();
}
?>
