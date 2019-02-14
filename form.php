<html>
<head>
    <script type="text/javascript">
        function changeMethod() {
            var meth = document.getElementById("water");
            document.getElementById("main").method = meth.options[meth.selectedIndex].value;
        }
    </script>
</head>
<body>

    <form id="main" action="/echo.php" method="get">
        first name: <input type="text" name="fname"><br>
        last name: <input type="text" name="lname"><br>
        fave color: <select name="color">
            <option value="">select</option>
            <option value="blue">blue</option>
            <option value="yellow">yellow</option>
            <option value="white">white</option>
        </select>
        method: <select id="water" name="method">
            <option value="">select</option>
            <option value="get">GET</option>
            <option value="post">POST</option>
        </select>
        <input type="submit" value="submit" onclick="changeMethod()">
    </form>

</body>
</html>