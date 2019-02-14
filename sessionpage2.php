<html>
<head>
	<meta http-equiv="content-type" content="text/html; charset=UTF-8">
	<title>Big Droplet Energy</title>
	<link rel="shortcut icon" href="/favicon.ico?" type="image/x-icon"/>
</head>
<body>

<?php
if (!isset($_COOKIE[username])) {
	echo "Howdy stranger. Please tell me your name on page1!";
} else {
	echo "Hi " . $_COOKIE[username] . " nice to meet you!";
	echo "<button onclick=\"document.cookie = 'username=; expires=Thu, 18 Dec 2013 12:00:00 UTC; path=/';location.reload();\">clear session</button>";
}
?>

</body>
</html>