<?php 
require_once ("class/DBController.php");
class Dimension
{
    private $db_handle;
    
    function __construct() {
        $this->db_handle = new DBController();
    }
    
    function addDimension($sku,$dimension) {
        $query = "INSERT INTO dimension (sku,height,width,length) VALUES (?, ?,?,?)";
        $paramType = "siii";
        $paramValue = array(
            $sku,
            $dimension['height'],
            $dimension['width'],
            $dimension['length'],
        );
        $insertId = $this->db_handle->insert($query, $paramType, $paramValue);
        return $insertId;
    }
    
    function deleteDimension($sku) {
        $query = "DELETE FROM dimensions WHERE sku = ?";
        $paramType = "s";
        $paramValue = array(
            $sku
        );
        $this->db_handle->update($query, $paramType, $paramValue);
    }

    function deleteSelected($all) {
        foreach ($all as $id):
            $query = "DELETE FROM dimensions WHERE sku = ?";
            $paramType = "s";
            $paramValue = array(
                $id
            );
            $this->db_handle->update($query, $paramType, $paramValue);
        endforeach;
           return;
    }
    
    function getDimensionById($sku) {
        $query = "SELECT * FROM dimensions WHERE sku = ?";
        $paramType = "s";
        $paramValue = array(
        $sku
        );
        
        $result = $this->db_handle->runQuery($query, $paramType, $paramValue);
        return $result;
    }
    
    function getAllDimension() {
        mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);
        $sql = "SELECT * FROM dimensions ORDER BY sku";
        $result = $this->db_handle->runBaseQuery($sql);
        return $result;
    }
}
?>