<?php
/**
 *  SimpleView Listings API via CURL
 *
 *  See the documentation for a detailed treatment of all parameters and calls.
 */

/* for testing script purposes, only. Delete on production. */
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(-1);


$api_url = "http://sedona.simpleviewcrm.com/webapi/listings/xml/listings.cfm";

/**
 * Get query string variables
 */



$str = $_SERVER['QUERY_STRING'];

parse_str($str, $arr);

$idval = $arr['idval'];
$dateval = $arr['d'];

print_r($idval);


/**
 * Get multiple Listings
 */
$post_data = array(
    "action" => "updateHits",
    "username" => "SedonaMaps_API",
    "password" => "cart0gr@phick!",
    "recid" => $idval, // change to however many hits this listing got, hopefully > 0!
    "hittypeid" => 4,  //  list of active ids provided separately
    "hitdate" =>  $dateval  // this date format is preferable; tested with a limited set of possible formats.
);



/* build the post body; use this or your favorite method to string it together */
$post_body = "";
foreach ($post_data as $key=>$value){
    $post_body .= $key.'='.$value.'&';
}
$post_body = rtrim($post_body,'&');


/* Create a curl handle to API URL */
$ch = curl_init();

curl_setopt_array(
    $ch,
    array(
        CURLOPT_URL => $api_url,
        CURLOPT_POST => count($post_data),
        CURLOPT_POSTFIELDS => $post_body,
        /* Tell CURL to return the output of the page */
        CURLOPT_RETURNTRANSFER => 1,
        CURLOPT_HTTPHEADER => array('Connection: close'),
        /*IMPORTANT  these 2 options tell PHP not to validate our ssl and to just use it.
            Our SSL provider is not currently registered in PHP
            and will abort if these 2 options are left out. */
        CURLOPT_SSL_VERIFYPEER => FALSE,
        CURLOPT_SSL_VERIFYHOST => 2,
    )
);

/* Execute the curl statement and assigning the output to a variable */
$res = curl_exec($ch);
print_r($res);
var_dump($res);

/* Close handle clean up curl session */
curl_close($ch);

?>