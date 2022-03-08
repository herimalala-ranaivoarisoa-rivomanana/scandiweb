<?php 
require_once ("class/DBController.php");
class Weight
{
    private $db_handle;
    
    function __construct() {
        $this->db_handle = new DBController();
    }
    
    function addWeight($sku,$weight) {
        $query = "INSERT INTO weight (sku,weight) VALUES (?, ?)";
        $paramType = "si";
        $paramValue = array(
            $sku,
            $weight
        );
        $insertId = $this->db_handle->insert($query, $paramType, $paramValue);
        return $insertId;
    }
    
    function deleteWeight($sku) {
        $query = "DELETE FROM weights WHERE sku = ?";
        $paramType = "s";
        $paramValue = array(
            $sku
        );
        $this->db_handle->update($query, $paramType, $paramValue);
    }

    function deleteSelected($all) {
        foreach ($all as $id):
            $query = "DELETE FROM weights WHERE sku = ?";
            $paramType = "s";
            $paramValue = array(
                $id
            );
            $this->db_handle->update($query, $paramType, $paramValue);
        endforeach;
           return;
    }
    
    function getWeightById($sku) {
        $query = "SELECT * FROM weights WHERE sku = ?";
        $paramType = "s";
        $paramValue = array(
        $sku
        );
        
        $result = $this->db_handle->runQuery($query, $paramType, $paramValue);
        return $result;
    }
    
    function getAllWeight() {
        mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);
        $sql = "SELECT * FROM weights ORDER BY sku";
        $result = $this->db_handle->runBaseQuery($sql);
        return $result;
    }
}
?>