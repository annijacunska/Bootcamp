<?php

header('Content-Type: application/json');

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

define('DATA_FILE_NAME', 'data.json');

$data = [[
    'next_id' => 0
]];
if (file_exists(DATA_FILE_NAME)) {
    $content = file_get_contents(DATA_FILE_NAME);
    $data = json_decode($content, true);
    if (!is_array($data)) {
        $data = [];
    }
}
$id = 0;
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

        $id = $data[array_key_first($data)]['next_id'];
        $task[$id] = [
            'id'=> $id,
            'task' => $_POST['task'],
            'done' => false
        ];
        $data[] = $task;
        $data[array_key_first($data)]['next_id']++;

        $content = json_encode($data);
        file_put_contents(DATA_FILE_NAME, $content);
        $output = [
            'status' => true,
            'message' => 'new task has been stored',
            'id' => $id
        ];
        break;
    case 'all-tasks':
        $output['status'] = true;
        $output['tasks'] = array_slice($data, 1);
        break;
    case 'delete-task':
        $json = file_get_contents('php://input');
        $id = json_decode($json);

        if(!$id) {
            exit;
        }
        $output = [
            'status' => true,
            'message' => 'task has been deleted',
            'id' => $id
        ];
        // $output['debug'] = array_search($id, $data, false);

    
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