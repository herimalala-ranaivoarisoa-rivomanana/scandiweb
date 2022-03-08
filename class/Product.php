<?php 
require_once ("class/DBController.php");
require_once ("class/Size.php");
require_once ("class/Weight.php");
abstract class Product
{
    public $db_handle;
    
    public function __construct() {
        $this->db_handle = new DBController();
    }
    
    function addProduct($sku,$name, $price, $typeId) {
        $query = "INSERT INTO products(sku,name,price,typeId) VALUES (?, ?, ?, ?)";
        $paramType = "ssii";
        $paramValue = array(
            $sku,
            $name,
            $price,
            $typeId,
        );
        $insertId = $this->db_handle->insert($query, $paramType, $paramValue);
        return $insertId;
    }
    
    function editProduct($name, $price, $typeId, $sku) {
        $query = "UPDATE products SET sku = ?,name = ?,price = ?,typeId = ? WHERE sku = ?";
        $paramType = "ssii";
        $paramValue = array(
            $sku,
            $name,
            $price,
            $typeId,
        );
        $this->db_handle->update($query, $paramType, $paramValue);
    }
    
    function deleteProduct($sku) {
        $query = "DELETE FROM products WHERE sku = ?";
        $paramType = "s";
        $paramValue = array(
            $sku
        );
        $this->db_handle->update($query, $paramType, $paramValue);
    }

    function deleteSelected($all) {
        foreach ($all as $id):
            $query = "DELETE FROM products WHERE sku = ?";
            $paramType = "s";
            $paramValue = array(
                $id
            );
            $this->db_handle->update($query, $paramType, $paramValue);
        endforeach;
        foreach ($all as $id):
            $query = "DELETE FROM size WHERE sku = ?";
            $paramType = "s";
            $paramValue = array(
                $id
            );
            $this->db_handle->update($query, $paramType, $paramValue);
        endforeach;
           return;
    }
    
    function getProductById($sku) {
        $query = "SELECT * FROM products WHERE sku = ?";
        $paramType = "s";
        $paramValue = array(
        $sku
        );
        
        $result = $this->db_handle->runQuery($query, $paramType, $paramValue);
        return $result;
    }
    
    abstract public function setAttributes($sku,$attributes);
}

class Dvd extends Product{
    public function setAttributes($sku,$attr){
        $attributes = new Size();
        $insertId = $attributes->addSize($sku,$attr['size']);
        return $insertId;
    }

    function getAllProduct() {
        mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);
        $sql = "SELECT * FROM products LEFT JOIN size ON products.sku=size.sku";
       /*  $sql = "SELECT * FROM products ORDER BY sku"; */
        $result = $this->db_handle->runBaseQuery($sql);
        return $result;
    }
}

class Common extends Product{
    public function setAttributes($sku,$attributes){
     $attributes = new Attribute(); 
    }
    function getAllProduct() {
        $dvd = new Dvd();
        $result = $dvd->getAllProduct();
        return $result;
    }
}

?>