<?php
    $jsonStr = $_REQUEST["jsonStr"];
    $tableRow = json_decode( $jsonStr );

    require_once("connection-backend.php");
    $error = array();
    $latestData = array();
    switch($tableRow->table_name) {
        case 'manager': {
            // add New Manager
            $query = "INSERT INTO manager(`mng_name`, `mng_psw`) VALUES (:mng_name, :mng_psw)";
            $addManager = $pdo->prepare($query);
            $addManager->bindValue(":mng_name", $tableRow->mng_name);
            $addManager->bindValue(":mng_psw", $tableRow->mng_psw);
            try {
                $addManager->execute();
                $latestData['latestId'] = $pdo->lastInsertId();
            } catch (PDOException $e) {
                $error['message'] = $e->getMessage();
                $error['line']=$e->getLine();
            }
            break;
        }
        case 'robot_keyword': {
            // add New robot_keyword
            $query = "INSERT INTO robot_keyword(`key_cnt`, `res_cnt`) VALUES (:key_cnt, :res_cnt)";
            $addRobotKeyword = $pdo->prepare($query);
            $addRobotKeyword->bindValue(":key_cnt", $tableRow->key_cnt);
            $addRobotKeyword->bindValue(":res_cnt", $tableRow->res_cnt);
            try {
                $addRobotKeyword->execute();
                $latestData['latestId'] = $pdo->lastInsertId();
                $resQuery = "UPDATE robot_keyword SET `res_no` = `key_no` WHERE `key_no` = :key_no";
                $updateResNo = $pdo->prepare($resQuery);
                $updateResNo->bindValue(":key_no", $latestData['latestId']);
                $updateResNo->execute();
            } catch (PDOException $e) {
                $error['message'] = $e->getMessage();
                $error['line']=$e->getLine();
            }

            break;
        }
        default: {
            $error['message'] = 'unknown table name';
            break;
        }
    }
    if( isset($error['message']) ) {
        http_response_code(500);
        die(json_encode($error));
    } else {
        http_response_code(200);
        if( isset($latestData['latestId']) ) {
            echo json_encode($latestData);
        } else {
            echo 1;
        }
    }
    



    
?>