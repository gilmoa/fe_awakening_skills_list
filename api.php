<?php
	ini_set('display_errors', 1);
	ini_set('display_startup_errors', 1);
	error_reporting(E_ALL);

	$result = array('error' => "Undefined Error.");

	if(isset($_GET['skill']))
	{
		$content = file_get_contents('src/skills.json');

		$skills = json_decode($content);

		$result = $skills;
	}
	elseif(isset($_GET['class']))
	{
		$content = file_get_contents('src/classes.json');

		$classes = json_decode($content, true);

		$class = $_GET['class'];

		if(array_key_exists($class, $classes))
		{
			$result = $classes[$class];
		}
		else {
			$result = $classes;
		}
	}


	header('Content-Type: application/json');

	print json_encode($result);
?>
