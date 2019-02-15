<html>
<body>
<style>
table, th, td {
  border: 1px solid black;
  border-collapse: collapse;
}
</style>
<?php
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
	# Config information for the DB
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

	# The query itself.
	if (isset($_REQUEST["limit"])) {
	    $limit = $_REQUEST["limit"];
	    $sql = "SELECT * FROM users LIMIT $limit;";
	}
	else {
	    $sql = "SELECT * FROM users;";
	}
	$result = mysqli_query($conn, $sql);

	# Write the output to a table.
	echo "<table style='width:50%'>";
	while ($row=mysqli_fetch_row($result))
	    {
	    echo "<tr>";
	    # Write out each row value to the table
	    foreach ($row as $rowval) {
		echo "<th>";
		echo "$rowval";
		echo "</th>";
	    }
	    echo "</tr>";
	    }
	  // Free result set
	  mysqli_free_result($result);

	echo "</table>";
}
?>

</body>
</html>
