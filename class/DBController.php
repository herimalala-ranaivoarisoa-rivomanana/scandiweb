<?php
class DBController
{
    private $host = "sql109.epizy.com";
    private $user = "epiz_31241024";
    private $password = "epiz_31241024!";
    private $database = "epiz_31241024_scandiweb";
    private $conn;

    function __construct()
    {
        $this->conn = $this->connectDB();
    }

    function connectDB()
    {
        mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);
        try {
            $conn = mysqli_connect($this->host, $this->user, $this->password, $this->database);
            $conn->set_charset("utf8mb4");
        } catch (Exception $e) {

            exit($e->getMessage());
        }
        return $conn;
    }

    function runBaseQuery($query)
    {
        mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);
        try {
            $result = $this->conn->query($query);
            if ($result->num_rows > 0) {
                while ($row = $result->fetch_assoc()) {
                    $resultset[] = $row;
                }
                return $resultset;
            }
        } catch (Exception $e) {
            exit($e->getMessage());
        }
    }

    function runQuery($query, $param_type, $param_value_array)
    {
        mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);
        try {
            $sql = $this->conn->prepare($query);
            $this->bindQueryParams($sql, $param_type, $param_value_array);
            $sql->execute();
            $result = $sql->get_result();

            if ($result->num_rows > 0) {
                while ($row = $result->fetch_assoc()) {
                    $resultset[] = $row;
                }
            }

            if (!empty($resultset)) {
                return $resultset;
            }
        } catch (Exception $e) {
            exit($e->getMessage());
        }
    }


    function bindQueryParams($sql, $param_type, $param_value_array)
    {
        $param_value_reference[] = &$param_type;
        for ($i = 0; $i < count($param_value_array); $i++) {
            $param_value_reference[] = &$param_value_array[$i];
        }
        call_user_func_array(array(
            $sql,
            'bind_param'
        ), $param_value_reference);
    }

    function insert($query, $param_type, $param_value_array)
    {
        mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);
        try {
            $sql = $this->conn->prepare($query);
            $this->bindQueryParams($sql, $param_type, $param_value_array);
            if ($sql->execute()) {
                $response = ['status' => 1, 'message' => 'Record created successfully.', 'sql' => $sql];
            } else {
                $response = ['status' => 0, 'message' => 'Failed to create record.', 'sql' => $sql];
            }
        } catch (Exception $e) {
            exit($e->getMessage());
        }
        return $response;
    }


    function update($query, $param_type, $param_value_array)
    {
        mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);
        try {
            $sql = $this->conn->prepare($query);
            $this->bindQueryParams($sql, $param_type, $param_value_array);
            if ($sql->execute()) {
                $response = ['status' => 1, 'message' => 'Record created successfully.', 'sql' => $sql];
            } else {
                $response = ['status' => 0, 'message' => 'Failed to create record.', 'sql' => $sql];
            }
        } catch (Exception $e) {
            exit($e->getMessage());
        }
        return $response;
    }
}
