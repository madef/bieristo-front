<?php

define('DOMAIN', getenv('DOMAIN'));
define('DOMAIN_PREFIX', getenv('DOMAIN_PREFIX'));
define('API_DOMAIN', getenv('API_DOMAIN'));
define('API_PREFIX', getenv('API_PREFIX'));
define('DEV_MOD', (bool) getenv('DEV_MOD'));

if (isset($_SERVER['HTTP_ORIGIN'])) {
    $httpOrigin = $_SERVER['HTTP_ORIGIN'];
    if ($httpOrigin === getenv('DOMAIN_PREFIX') . getenv('DOMAIN')) {
        header('Access-Control-Allow-Origin: ' . getenv('DOMAIN_PREFIX') . getenv('DOMAIN'));
    } else if ($httpOrigin === getenv('ADMIN_PREFIX') . getenv('ADMIN_DOMAIN')) {
        header('Access-Control-Allow-Origin: ' . getenv('ADMIN_PREFIX') . getenv('ADMIN_DOMAIN'));
    }
}
