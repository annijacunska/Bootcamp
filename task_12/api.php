<?php

header('Content-Type: application/json');

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

define('DATA_FILE_NAME', 'data.json');

$data = [
    'next_id' => 1
];
if (file_exists(DATA_FILE_NAME)) {
    $content = file_get_contents(DATA_FILE_NAME);
    $data = json_decode($content, true);
    if (!is_array($data)) {
        $data = [];
    }
}
$id = 1;
$output = ['status' => false];

if (
    !isset($_GET['api-name']) ||
    !is_string($_GET['api-name'])
) {
    $output['message'] = 'api-name not specified';
    echo json_encode($output, JSON_PRETTY_PRINT);
    exit;
}

switch($_GET['api-name']) {
    case 'new-task':
        if (
            !isset($_POST['task']) ||
            !is_string($_POST['task'])
        ) {
            exit;
        }

        $id = $data['next_id'];
        $task = [
            'id'=> $id,
            'task' => $_POST['task'],
            'done' => false
        ];
        $data["$id"] = $task;
        $data['next_id']++;

        $content = json_encode($data, JSON_PRETTY_PRINT);
        file_put_contents(DATA_FILE_NAME, $content);
        $output = [
            'status' => true,
            'message' => 'new task has been stored',
            'id' => $id
        ];
        break;
    case 'all-tasks':
        $output['status'] = true;
        $output['tasks'] = $data;
        break;
    case 'set-status':
        $json = file_get_contents('php://input');
        $info = json_decode($json);
        $id = $info->id;
        $status = $info->status;
        // $status = $info->status ? 'true' : 'false';

        if(!$id) exit;

        $data[$id]['done'] = $status;
        $content = json_encode($data, JSON_PRETTY_PRINT);
        file_put_contents(DATA_FILE_NAME, $content);

        $output = [
            'status' => true,
            'message' => 'Task status has been changed' ,
            'id' => $id
        ];
        break;
    case 'edit-task':
        $json = file_get_contents('php://input');
        $info = json_decode($json);
        $id = $info->id;
        $task = $info->task;

        if(!$id) exit;

        $data[$id]['task'] = $task;
        $content = json_encode($data, JSON_PRETTY_PRINT);
        file_put_contents(DATA_FILE_NAME, $content);

        $output = [
            'status' => true,
            'message' => 'Task has been changed' ,
            'id' => $id
        ];
        break;
    case 'delete-task':
        $json = file_get_contents('php://input');
        $id = json_decode($json);

        if(!$id) exit;

        unset($data[$id]);
        $content = json_encode($data, JSON_PRETTY_PRINT);
        file_put_contents(DATA_FILE_NAME, $content);

        $output = [
            'status' => true,
            'message' => 'task has been deleted',
            'id' => $id
        ];

    
        // if (
        //     !isset($_POST['id']) ||
        //     !is_string($_POST['id'])
        // ) {
        //     exit;
        // } else {
        //     $output['status'] = true;
        // }
        break;
    default:
        
}

echo json_encode($output, JSON_PRETTY_PRINT);