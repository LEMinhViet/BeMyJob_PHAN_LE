<?php
	include('conf.php');
	// Fichier a pour but de récupérer les compétences de la base	
	$link = mysql_connect($sql_server, $sql_user, $sql_pwd);
	if (!$link) {
	    die('Connexion impossible : ' . mysql_error());
	}	
	mysql_select_db($sql_db, $link) or die('Could not select database.');
	$result_sql = mysql_query('SELECT q.Content AS question, a.content AS response FROM question q, answer a, skill s WHERE q.Domain = s.ID AND q.ID = a.quest_id WHERE s.ID = ');	
	$result = array();
	while($row = mysql_fetch_array($result_sql)) {		
		array_push($result, $row['Skill']);
	}
	echo json_encode($result);
?>