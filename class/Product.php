<?php 
require_once ("class/DBController.php");
abstract class Product
{
    public $db_handle;
    
    public function __construct() {
        $this->db_handle = new DBController();
    }
    
    abstract public function addProduct($sku,$name, $price,$type, $attributes) ;
    abstract public function deleteProduct($sku);
}

class Dvd extends Product{
    function addProduct($sku,$name, $price,$type, $attributes) {
        $query = "INSERT INTO dvd(sku,name,price,size) VALUES (?, ?, ?, ?)";
        $paramType = "ssii";
        $paramValue = array(
            $sku,
            $name,
            $price,
            $attributes['size'],
        );
        $insertId = $this->db_handle->insert($query, $paramType, $paramValue);
        return $insertId;
    }

    function deleteProduct($sku) {
        $query = "DELETE FROM dvd WHERE sku = ?";
        $paramType = "s";
        $paramValue = array(
            $sku
        );
        $this->db_handle->update($query, $paramType, $paramValue);
    }  

    function getAllProduct() {
        mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);
        $sql = "SELECT * FROM dvd JOIN product ON product.sku =dvd.sku ORDER BY product.id" ;
        $result = $this->db_handle->runBaseQuery($sql);
        if(!empty($result)) return $result;
        else return [];
    }
}

class Book extends Product{
    function addProduct($sku,$name, $price,$type, $attributes) {
        $query = "INSERT INTO book (sku,name,price,weight) VALUES (?, ?, ?, ?)";
        $paramType = "ssii";
        $paramValue = array(
            $sku,
            $name,
            $price,
            $attributes['weight'],
        );
        $insertId = $this->db_handle->insert($query, $paramType, $paramValue);
        return $insertId;
    }

    function deleteProduct($sku) {
        $query = "DELETE FROM book WHERE sku = ?";
        $paramType = "s";
        $paramValue = array(
            $sku
        );
        $this->db_handle->update($query, $paramType, $paramValue);
    }

    function getAllProduct() {
        mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);
        $sql = "SELECT * FROM book JOIN product ON product.sku =book.sku ORDER BY product.id" ;
        $result = $this->db_handle->runBaseQuery($sql);
        if(!empty($result)) return $result;
        else return [];
    }
}

class Furniture extends Product{
    function addProduct($sku,$name, $price,$type, $attributes) {
        $query = "INSERT INTO furniture (sku,name,price,height,width,length) VALUES (?, ?, ?, ?,?,?)";
        $paramType = "ssiiii";
        $paramValue = array(
            $sku,
            $name,
            $price,
            $attributes['height'],
            $attributes['width'],
            $attributes['length'],
        );
        $insertId = $this->db_handle->insert($query, $paramType, $paramValue);
        return $insertId;
    }
    function deleteProduct($sku) {
        $query = "DELETE FROM furniture WHERE sku = ?";
        $paramType = "s";
        $paramValue = array(
            $sku
        );
        $this->db_handle->update($query, $paramType, $paramValue);
    }

    function getAllProduct() {
        mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);
        $sql = "SELECT * FROM furniture JOIN product ON product.sku =furniture.sku ORDER BY product.id" ;
        $result = $this->db_handle->runBaseQuery($sql);
        if(!empty($result)) return $result;
        else return [];
    }
}

class Common extends Product{
        function addProduct($sku,$name, $price,$type, $attributes) {
            mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);
            $query = "INSERT INTO product (sku,type) VALUES (?, ?)";
            $paramType = "ss";
            $paramValue = array(
                $sku,
                $type
            );
            $insertId = $this->db_handle->insert($query, $paramType, $paramValue);
            return $insertId;
        }

        public function deleteProduct($sku){
            $query = "DELETE FROM PRODUCT WHERE sku = ?";
            $paramType = "s";
            $paramValue = array(
                $sku
            );
            $this->db_handle->update($query, $paramType, $paramValue);
        }
        
        function getAllProduct() {
        $dvd = new Dvd();
        $alldvd = $dvd->getAllProduct();
       $book = new Book();
        $allbook = $book->getAllProduct();
        $furniture = new Furniture();
        $allFurniture = $furniture->getAllProduct();
        $result = array_merge($alldvd,$allbook,$allFurniture); 
        return $result;
    }
}

?>