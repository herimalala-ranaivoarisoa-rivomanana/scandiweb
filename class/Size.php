<?php 
require_once ("class/DBController.php");
class Size
{
    private $db_handle;
    
    function __construct() {
        $this->db_handle = new DBController();
    }
    
    function addSize($sku,$size) {
        $query = "INSERT INTO size (sku,size) VALUES (?, ?)";
        $paramType = "si";
        $paramValue = array(
            $sku,
            $size
        );
        $insertId = $this->db_handle->insert($query, $paramType, $paramValue);
        return $insertId;
    }
    
    function deleteSize($sku) {
        $query = "DELETE FROM sizes WHERE sku = ?";
        $paramType = "s";
        $paramValue = array(
            $sku
        );
        $this->db_handle->update($query, $paramType, $paramValue);
    }

    function deleteSelected($all) {
        foreach ($all as $id):
            $query = "DELETE FROM sizes WHERE sku = ?";
            $paramType = "s";
            $paramValue = array(
                $id
            );
            $this->db_handle->update($query, $paramType, $paramValue);
        endforeach;
           return;
    }
    
    function getSizeById($sku) {
        $query = "SELECT * FROM sizes WHERE sku = ?";
        $paramType = "s";
        $paramValue = array(
        $sku
        );
        
        $result = $this->db_handle->runQuery($query, $paramType, $paramValue);
        return $result;
    }
    
    function getAllSize() {
        mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);
        $sql = "SELECT * FROM sizes ORDER BY sku";
        $result = $this->db_handle->runBaseQuery($sql);
        return $result;
    }
}
?>