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
            $dvd = new Dvd();
            $insertId = $dvd->addProduct($sku, $name, $price, $typeId);
            if (empty($insertId)) {
                $response = array(
                    "message" => "Problem in Adding New Record",
                    "type" => "error"
                );
                echo json_encode($response);
            } else {
                $insertId = $dvd->setAttributes($sku,$attributes);
                if (empty($insertId)) {
                    $response = array(
                        "message" => "Problem in Adding New Record",
                        "type" => "error"
                    );
                    echo json_encode($response);
                } else {
                    echo json_encode($insertId);
                }
            }
            break;

        case "product-delete":
            $product_id = $data["sku"];
            $product = new Common();
            $product->deleteProduct($product_id);
            $result = $product->getAllProduct();
            echo json_encode($result);
            break;
        case "product-delete-selection":
            $all = $data['skuList'];
            $product = new Common();
            $product->deleteSelected($all);
            $result = $product->getAllProduct();
            echo json_encode($result);
            break;
        default:
            break;
    }
}
$product = new Common();
$result = $product->getAllProduct();
echo json_encode($result);
