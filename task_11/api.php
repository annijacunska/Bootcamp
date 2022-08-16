<?php
header('Content-Type: application/json');

define('DATA_FILE_NAME', 'moves.json');

$data = [
    'next_id' => 1,
    'O'=> [],
    'X' => []
];
if (file_exists(DATA_FILE_NAME)) {
    $content = file_get_contents(DATA_FILE_NAME);
    $data = json_decode($content, true);
    if (!is_array($data)) {
        $data = [];
    }
}
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
    case 'make-move':
        $json = file_get_contents('php://input');
        $info = json_decode($json);

        if(!$info) exit;

        $player = $info -> player;
        $id = $info -> id;
        $count = $data['next_id'];
        $move = [
            'move_count'=> $count,
            'move_tile_id' => $id,
        ];
        $data[$player][] = $move;
        $data['next_id']++;

        $content = json_encode($data, JSON_PRETTY_PRINT);
        file_put_contents(DATA_FILE_NAME, $content);
        $output = [
            'status' => true,
            'message' => 'new task has been stored',
            'id' => $id
        ];
        break;
    case 'all-moves':
        $output['status'] = true;
        $output['X'] = $data['X'];
        $output['O'] = $data['O'];
        break;
    case 'reset-moves':
        $data = [
            'next_id' => 1,
            'O'=> [],
            'X' => []
        ];
        $content = json_encode($data, JSON_PRETTY_PRINT);
        file_put_contents(DATA_FILE_NAME, $content);

        $output = [
            'status' => true,
            'message' => 'Board has been reset'
        ];
        break;
    default:
        
}

echo json_encode($output, JSON_PRETTY_PRINT);