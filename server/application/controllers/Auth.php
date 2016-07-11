<?php

defined('BASEPATH') OR exit('No direct script access allowed');

require APPPATH . '/libraries/REST_Controller.php';

header('Access-Control-Allow-Origin: *');  

header('Access-Control-Allow-Headers: accept, authorization,x-requested-with'); 

class auth extends REST_Controller {

    public function __construct()
    {
        parent::__construct();
        $this->load->database();
        $this->load->model('Auth_model');
    }

    public function index_post()
    {

        $email = $this->post('email');
        $password = $this->post('password');

        if(!$email || !$password){
            $this->response('Invalid_Credentials',401);
        }

        $user = $this->Auth_model->authenticate($email,$password);

        if(!$user){
            $this->response('Login_Failed', 200);
        }

        $token = array();
        $token['userid'] = $user->userid;
        $token['firstname'] = $user->firstname;
        $token['lastname'] = $user->lastname;
        $token['email'] = $user->email;
        $token['balance'] = $user->balance;

        $jwt = JWT::encode($token, $this->config->item('jwt_key'));

        $this->response($jwt, 200);


    }

}