<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class Auth_model extends CI_Model {

    public function __construct()
    {
        parent::__construct();
        $this->load->database();
    }

    public function authenticate($email, $password)
    {

        $where = array(
            'email' => $email
        );

        $query = $this->db->get_where('users', $where);
        $user = $query->row();

        if(!password_verify($password, $user->password)){
            return false;
        } else {
            return $user;
        }

    }

}