<?php

// define('DATA_FILE_NAME', 'data.json');

// if (file_exists(DATA_FILE_NAME)) {
//   $content = file_get_contents(DATA_FILE_NAME);
//   $data = json_decode($content, true);
//   if (!is_array($data)) {
//       $data = [];
//   }
// }
?>

<!-- @format -->

<!DOCTYPE html>
<meta http-equiv="Content-Type" content="text/html;charset=UTF-8" />
<link rel="stylesheet" href="style.css" />

<body >
  <form action="http://web.local/Bootcamp/task_12/api.php?api-name=new-task" method="post" id="add-form">
    <input type="text" name="task" id="task-text"></input>
    <input type="submit" class="add-task" value="Add"></input>
  </form>
 
  <div class="tasks">
    <h2>Tasks</h2>
    <!-- <?php
    //  foreach ($data as $task) {
   //     if(array_key_exists('task', $task)) {
        ?> -->
        <div class="task-element template">
          <input type="checkbox" class="check-done"></input>
          <p class="task-editable" contenteditable="true"></p>
          <div>
            <button type="button" class="delete-task-btn">Delete</button>
          </div>
        </div>
        <!-- <?php
   //     }
  //    }
    ?> -->
    
  </div>
</body>

<script type="module" src="script.js"></script>