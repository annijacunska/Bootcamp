<?php

define('ING_FILE_NAME', 'img/image-1.jpg');
header('Content-Type: image/jpg');

if (!file_exists(IMG_FILE_NAME)) exit;

if (
  !isset($_GET['width']) ||
  !is_string($_GET['width']) ||
  !isset($_GET['height']) ||
  !is_string($_GET['height'])
) exit;

list($width, $height, $type, $attr) = getimagesize(IMG_FILE_NAME);

$new_width = (int) $_GET['width'];
$new_height = (int) $_GET['height'];

$image = imagecreatefromjpeg(IMG_FILE_NAME);
$image = imagescale($image, $new_width, $new_height);
echo imagejpeg($image);
imagedestroy($image);