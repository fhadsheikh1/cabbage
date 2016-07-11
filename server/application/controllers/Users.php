<?php

defined('BASEPATH') OR exit('No direct script access allowed');

require APPPATH . '/libraries/REST_Controller.php';

header('Access-Control-Allow-Origin: *');  

header('Access-Control-Allow-Headers: accept, authorization,x-requested-with'); 

class users extends REST_Controller {

    public function __construct()
    {
        parent::__construct();
        $this->load->database();
        $this->load->model('Users_model');
    }

    public function index_options()
    {
        $this->response(200);
    }

    public function index_get()
    {
        $header = $this->input->get_request_header('Authorization', TRUE);

        $token = JWT::decode($header, $this->config->item('jwt_key'));

        if(!$token){
            $this->response(403);
        }

        $users = $this->Users_model->getUsers();

        $this->response($users, 200);
    }

}