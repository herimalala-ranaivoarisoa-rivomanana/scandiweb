<?php 
require_once ("class/DBController.php");
abstract class Attribute
{
    private $db_handle;
    
    function __construct() {
        $this->db_handle = new DBController();
    }
    
    function addAttribute($sku,$size,$weight,$height,$width,$length) {
        $query = "INSERT INTO attributes(sku,size,weight,height,width,length) VALUES (?, ?, ?, ?,?,?)";
        $paramType = "s1iii";
        $paramValue = array(
            $sku,
            $size,
            $weight,
            $$height,
            $width,
            $length
        );
        $insertId = $this->db_handle->insert($query, $paramType, $paramValue);
        return $insertId;
    }
    
    function editAttribute($name, $price, $typeId, $sku) {
        $query = "UPDATE attributes SET sku = ?,name = ?,price = ?,typeId = ? WHERE sku = ?";
        $paramType = "ssii";
        $paramValue = array(
            $sku,
            $name,
            $price,
            $typeId,
        );
        $this->db_handle->update($query, $paramType, $paramValue);
    }
    
    function deleteAttribute($sku) {
        $query = "DELETE FROM attributes WHERE sku = ?";
        $paramType = "s";
        $paramValue = array(
            $sku
        );
        $this->db_handle->update($query, $paramType, $paramValue);
    }

    function deleteSelected($all) {
        foreach ($all as $id):
            $query = "DELETE FROM attributes WHERE sku = ?";
            $paramType = "s";
            $paramValue = array(
                $id
            );
            $this->db_handle->update($query, $paramType, $paramValue);
        endforeach;
           return;
    }
    
    function getAttributeById($sku) {
        $query = "SELECT * FROM attributes WHERE sku = ?";
        $paramType = "s";
        $paramValue = array(
        $sku
        );
        
        $result = $this->db_handle->runQuery($query, $paramType, $paramValue);
        return $result;
    }
    
    function getAllAttribute() {
        mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);
        $sql = "SELECT * FROM attributes ORDER BY sku";
        $result = $this->db_handle->runBaseQuery($sql);
        return $result;
    }

    abstract public function setAttributes($sku,$attributes);
}

class Dvd extends Attribute{
    public function setAttributes($sku,$size){
        $query = "INSERT INTO attributes (sku,size) VALUES (?,?)";
        $paramType = "si";
        $paramValue = array(
            $sku,
            $size
        );
        $insertId = $this->db_handle->insert($query, $paramType, $paramValue);
        return $insertId;
    }
}

class Common extends Attribute{
    
    public function setAttributes($sku,$attributes){

    }
}

?>