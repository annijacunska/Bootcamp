<?php 

include(__DIR__ . '/config.php');
include(__DIR__ . '/DbManager.php');
header('Content-Type: application/json');
$db = new DbManager('project_management', 'todo_list');

if (hasGetKey('api-name')) {
  switch ($_GET['api-name']) {
    case 'insert':
      if (!hasPostKey('task')) exit;

      $entry->task = $_POST['task'];
      $entry->status = 0;
      $db->add($entry)->output();

      /* Best for more than one parameter passed in api link */
      // if (isset($_REQUEST['entry']) && is_array($_REQUEST['entry'])) {
      //   $accepted_keys = ['task' => null, 'status' => null];
      //   $entry = array_intersect_key($_REQUEST['entry'], $accepted_keys);
      //   foreach ($entry as $value) {
      //     if (!is_string($value)) {
      //       echo "some of values are not strings";
      //       exit;
      //     }
      //   }
      //   $db->add($entry);

      // }
      // else {
      //   echo 'something went wrong';
      // }
      break;
    case 'update':
      $json = file_get_contents('php://input');
      $info = json_decode($json);
      $id = $info->id;
      if(!$id) exit;
      if($info->status && !$info->task) {
        $status = $info->status ? 1 : 0;
        $db->updateStatus($id, $status)->output();
      }

      if(!$info->status && is_string($info->task)) {
        $db->updateTask($id, $info->task)->output();
      }
      break;
    case 'delete':
      $json = file_get_contents('php://input');
      $id = json_decode($json);
      if(!$id) exit;

      $db->delete($id)->output();
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