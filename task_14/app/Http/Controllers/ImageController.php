<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Http\Request;

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    public function index()
    {
        return response()->json([
            "status" => true
        ], 200);
    }

    public function get()
    {
        return response()->json([], 200);
    }

    public function add()
    {
        $target_dir = __DIR__ . '/uploads';
        $images = $_FILES['images'];
        $image_count = count($images['name']);
        $count = 0;
        for($i = 0; $i<$image_count; $i++) {

            $target_file = $target_dir . basename($images["name"][$i]);
            $image_file_type = strtolower(pathinfo($target_file, PATHINFO_EXTENSION));
            $check = getimagesize($image["tmp_name"][$i]);
            if($size) {
                $count++;
            }
        }
        $output = [
            "status" => true,
            "data" => $_POST,  //atgriež failu nosaukumus
            "files" => $_FILES['images'],  //atgriež failus
            "count" => $count
        ];

        return response()->json($output, 200);
    }
}
