<?php

defined('BASEPATH') OR exit('No direct script access allowed');

require APPPATH . '/libraries/REST_Controller.php';

header('Access-Control-Allow-Origin: *');  

header('Access-Control-Allow-Headers: accept, authorization,x-requested-with'); 

class user extends REST_Controller {

    public function __construct()
    {
        parent::__construct();
        $this->load->database();
        $this->load->model('User_model');
    }

    public function index_options()
    {
        $this->response(200);
    }

    public function index_get()
    {
        echo password_hash("Hotmail1234", PASSWORD_DEFAULT);
    }

    public function index_post()
    {

        $firstname = $this->post('firstname');
        $lastname = $this->post('lastname');
        $email = $this->post('email');
        $password = password_hash($this->post('password'), PASSWORD_BCRYPT);
        $balance = 100;

        if(!$firstname || !$lastname || !$email || !$password || !$balance){
            $this->response(401);
        }

        $this->User_model->createUser(
            $firstname,
            $lastname,
            $email,
            $password,
            $balance
        );

        $this->response(201);

    }

}