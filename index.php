<?php
require_once("class/DBController.php");
require_once("class/Product.php");

$db_handle = new DBController();
$action = "product-add";
$request_method = isset($_SERVER['REQUEST_METHOD']) ? $_SERVER['REQUEST_METHOD'] : '';
$data = json_decode(file_get_contents("php://input"), true);
$rest_json = file_get_contents("php://input");

/* // $action = "";
if (! empty($_GET["action"])) {
    $action = $_GET["action"];
} */
if ($request_method == "POST") {
    //Get action method
    $action = $_REQUEST['action'];
    switch ($action) {
        case "product-add":
            $sku = $data['sku'];
            $name = $data['name'];
            $price = $data['price'];
            $typeId = $data['typeId'];
            $attributes = $data['attributes'];
            switch($typeId){
                case '1':
                    $product = new Dvd();
                    break;
                case '2':
                    $product = new Book();
                    break;
                case '3':
                    $product = new Furniture();
                    break;
                default:
                break;
                }
            $insertId = $product->addProduct($sku, $name, $price,$typeId, $attributes);
            if ($insertId!=1) {
                $response = array(
                    "message" => "Problem in Adding New RecordA",
                    "type" => "error"
                );
                echo json_encode($response);
            } else {
                    $common = new Common();
                    $insertId = $common->addProduct($sku, $name, $price,$typeId, $attributes);
                    if ($insertId!=1) {
                        $product->deleteProduct($sku);
                        $response = array(
                            "message" => "Problem in Adding New RecordB",
                            "type" => "error"
                        );
                        echo json_encode($response);
                    } else {
                            echo json_encode($insertId);
                    }
            } 
            $common = new Common();
            $result = $common->getAllProduct();
            echo json_encode($result);
            break;

        case "product-delete":
            $product_id = $data["sku"];
            $product = new Common();
            $product->deleteProduct($product_id);
            $result = $product->getAllProduct();
            echo json_encode($result);
            break;
        case "product-delete-selection":
            $list = $data['list'];
            foreach ($list as $product):
                $sku = $product['sku'];
                switch($product['typeId']){
                    case '1':
                        $dvd = new Dvd();
                        $dvd->deleteProduct($sku);
                    case '2':
                        $book = new Book();
                        $book->deleteProduct($sku);
                    case '3':
                        $furniture = new Furniture();
                        $furniture->deleteProduct($sku);
                }
                $common = new Common();
                $common->deleteProduct($sku);
            endforeach;
            $common = new Common();
            $result = $common->getAllProduct();
            echo json_encode($result);
            break;
        default:
            break;
    }
}
$product = new Common();
$result = $product->getAllProduct();
echo json_encode($result);
