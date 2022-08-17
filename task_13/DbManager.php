<?php
class DbManager
{
    private $conn;
    private $table_name;
    private $output_arr = ['status' => false];

    public function __construct($dbname, $table_name) {
        $this->table_name = $table_name;

        $this->conn = new mysqli(DB_SERVER, DB_USERNAME, DB_PASSWORD, DB_NAME);
        // Check connection
        if ($this->conn->connect_error) {
            die("Connection failed: " . $this->conn->connect_error);
        }
    }

    //DONE
    public function add($entry) {
        $columns_str = '';
        $values_str = '';
        foreach($entry as $key => $value) {
            $columns_str .= $key . ',';
            $values_str .= "'" . $this->conn->real_escape_string($value) . "',";
        }

        $columns_str = rtrim($columns_str, ',');
        $values_str = rtrim($values_str, ',');

        $sql = "INSERT INTO " . $this->table_name . " ($columns_str)
        VALUES ($values_str)";

        if ($this->conn->query($sql) === TRUE) {
            $last_id = $this->conn->insert_id;
            $this->output_arr = [
                'status' => true,
                'id' => $last_id,
                'message' => 'New record created successfully'
            ];
            return $this;
        } else {
            echo "Error: " . $sql . "<br>" . $this->conn->error;
        }
    }

    public function updateTask($id, $task) {
        $sql = "UPDATE " . $this->table_name . 
        " SET task=$task WHERE id=$id";

        if ($this->conn->query($sql) === TRUE) {
            $this->output_arr = [
                'status' => true,
                'message' => 'Record updated successfully'
            ];
            return $this;
        } else {
            echo "Error: " . $sql . "<br>" . $this->conn->error;
        }
    }

    public function updateStatus($id, $status) {
        $sql = "UPDATE " . $this->table_name . 
        " SET status=$status WHERE id=$id";

        if ($this->conn->query($sql) === TRUE) {
            $this->output_arr = [
                'status' => true,
                'message' => 'Record updated successfully'
            ];
            return $this;
        } else {
            echo "Error: " . $sql . "<br>" . $this->conn->error;
        }
    }

    //DONE
    public function delete($id) {
        $sql = "DELETE FROM " . $this->table_name . 
        " WHERE id=$id";

        if ($this->conn->query($sql) === TRUE) {
            $this->output_arr = [
                'status' => true,
                'message' => 'Record deleted successfully'
            ];
            return $this;
        } else {
            echo "Error: " . $sql . "<br>" . $this->conn->error;
        }
    }

    //DONE
    public function getAll() {
        $sql = "SELECT * FROM " . $this->table_name;
        $result = $this->conn->query($sql);

        if ($result != false) {
            $all_tasks = $result->fetch_all(MYSQLI_ASSOC);
            $this->output_arr = [
                'status' => true,
                'entries' => $all_tasks,
                'message' => 'all entries where recived'
            ];
            return $this;
        }
        else {
            echo $this->conn->error;
        }
    }

    public function output() {
        echo json_encode($this->output_arr, JSON_PRETTY_PRINT);
    }

    public function __destruct() {
        $this->conn->close();
    }
}