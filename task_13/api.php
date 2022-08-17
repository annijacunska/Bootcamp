<?php 

include(__DIR__ . '/config.php');
include(__DIR__ . '/DbManager.php');
$db = new DbManager('project_management', 'todo_list');

if (hasGetKey('api-name')) {
  switch ($_GET['api-name']) {
    case 'insert':
      // echo "<h1>Insert</h1>";
      if (isset($_REQUEST['entry']) && is_array($_REQUEST['entry'])) {
        $accepted_keys = ['task' => null, 'status' => null];
        $entry = array_intersect_key($_REQUEST['entry'], $accepted_keys);
        foreach ($entry as $value) {
          if (!is_string($value)) {
            echo "some of values are not strings";
            exit;
          }
        }

        $db->add($entry);
      }
      else {
        echo 'something went wrong';
      }
      break;
    case 'update':
      echo "<h1>Update</h1>";

      if(!hasGetKey('id')) exit;
      $id = $_GET['id'];

      if (!isset($_REQUEST['entry']) || !is_array($_REQUEST['entry'])) echo 'something went wrong';


      $accepted_keys = ['task' => null, 'status' => null];
      $entry = array_intersect_key($_REQUEST['entry'], $accepted_keys);
      foreach ($entry as $value) {
        if (!is_string($value)) {
          echo "some of values are not strings";
          exit;
        }
      }
      $db->update($id, $entry);
      break;
    case 'select-all':
      $db->getAll()->output();
      
  }
}

function hasGetKey($key) {
  return (isset($_GET[$key]) && is_string($_GET[$key]));
}

function hasPostKey($key) {
  return (isset($_POST[$key]) && is_string($_POST[$key]));
}