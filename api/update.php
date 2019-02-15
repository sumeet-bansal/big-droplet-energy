
<html>
<body>

<?php
if ($_SERVER['REQUEST_METHOD'] === 'PUT') {
    # Get put data
    parse_str(file_get_contents("php://input"), $_PUT);

	foreach ($_PUT as $key => $value)
	{
		unset($_PUT[$key]);

		$_PUT[str_replace('amp;', '', $key)] = $value;
	}

	$_REQUEST = array_merge($_REQUEST, $_PUT);


	# Config information
	$host = "localhost";
	$user = "root";
	$pass = "space bar";
	$db = "test";
	$conn = mysqli_connect($host,$user,$pass,$db);

	# Test the connection
	if($conn)
	{
	    echo "<p>Connection Successful</p>";
	}
	else
	{
	    echo "<p>Could not connect</p>";
	}

	$check = "SELECT * FROM users WHERE login = '$_REQUEST[login]';";
	$nice = mysqli_query($conn, $check);
	if (mysqli_num_rows($nice) == 0) {
		http_response_code(404);
		echo "<p>NOT FOUND: user not found.</p>";
		echo "</body></html>";
		exit();
	}
	mysqli_free_result($nice);

	if (!isset($_REQUEST['login']) || !isset($_REQUEST['fullname'])) {
		http_response_code(400);
		echo "<p>BAD REQUEST: login or fullname not provided.</p>";
		echo "</body></html>";
		exit();
	} else {
		# Format our query string
		$sql =  "UPDATE users SET
				fullname = '$_REQUEST[fullname]',
				admin = '$_REQUEST[admin]'
				WHERE login = '$_REQUEST[login]';";


		# Print the query string
		echo "<p>$sql</p>";
		$result = mysqli_query($conn, $sql);

		# If we executed correctly then output it, if not give the error.
		if ($result === TRUE) {
			echo "Record updated successfully";
		} else {
			echo "Error: " . $sql . "<br>" . $conn->error;
		}

		// Free result set
		mysqli_free_result($result);
	}
}
?>

</body>
</html>
