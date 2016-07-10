<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class Welcome extends CI_Controller {
    public function __construct(){
        parent::__construct();
    }
    public function index()
    {
        echo "<h1>Welcome to API</h1>";
    }

    public function test(){
        echo 'test method on welcome controller';
    }
}