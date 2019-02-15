
<html>
<body>

<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
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

	# validate
	if (!isset($_POST['login']) || !isset($_POST['fullname'])) {
		http_response_code(400);
		echo "<p>BAD REQUEST: login or fullname not provided</p>";
		echo "</body></html>";
		exit();
	} else {

		# Format our query string
		$sql =  "INSERT INTO users
			(login, fullname, admin)
			values
			('$_POST[login]',
			'$_POST[fullname]',
			'$_POST[admin]'
			);";



		# Print the query string
		echo "<p>$sql</p>";
		$result = mysqli_query($conn, $sql);

		# If we executed correctly then output it, if not give the error.
		if ($result === TRUE) {
			echo "New record created successfully";
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
