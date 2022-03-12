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
            $type = $data['type'];
            $attributes = $data['attributes'];
            $product = new $type();
            $insertId = $product->addProduct($sku, $name, $price,$type, $attributes);
            if ($insertId!=1) {
                $response = array(
                    "message" => "Problem in Adding New RecordA",
                    "type" => "error"
                );
                echo json_encode($response);
            } else {
                    $common = new Common();
                    $insertId = $common->addProduct($sku, $name, $price,$type, $attributes);
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
        case "product-delete-selection":
            $list = $data['list'];
            foreach ($list as $selection):
                $sku = $selection['sku'];
                $type = $selection['type'];
                $product = new $type();
                $product->deleteProduct($sku);
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
