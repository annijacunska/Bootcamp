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
            echo "New record created successfully";
        } else {
            echo "Error: " . $sql . "<br>" . $this->conn->error;
        }
    }

    public function update($id, $entry) {
        $set_str = '';
        foreach($entry as $key => $value) {
            $set_str .= $key . "='" . $this->conn->real_escape_string($value) . "',";
        }

        $set_str = rtrim($set_str, ',');

        $sql = "UPDATE " . $this->table_name . 
        " SET $set_str WHERE id=$id";

        if ($this->conn->query($sql) === TRUE) {
            echo "Record updated successfully";
        } else {
            echo "Error: " . $sql . "<br>" . $this->conn->error;
        }
    }

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