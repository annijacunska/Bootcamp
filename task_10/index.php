
<!-- @format -->

<!DOCTYPE html>
<meta http-equiv="Content-Type" content="text/html;charset=UTF-8" />
<link rel="stylesheet" href="style.css" />

<body >
  <form action="api.php?api-name=new-task" method="post" id="add-form">
    <input type="text" name="task" id="task-text"></input>
    <input type="submit" class="add-task" value="Add"></input>
  </form>
 
  <div class="tasks">
    <h2>Tasks</h2>
      <div class="task-element template">
        <input type="checkbox" class="check-done"></input>
        <p class="task-editable" contenteditable="true"></p>
        <div>
          <button type="button" class="delete-task-btn">Delete</button>
        </div>
      </div>    
  </div>
</body>

<script type="module" src="script.js"></script>