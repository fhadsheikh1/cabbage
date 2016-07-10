<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class User_model extends CI_Model {

    public function __construct()
    {
        parent::__construct();
        $this->load->database();
    }

    public function createUser($firstname, $lastname, $email, $password, $balance)
    {
        
        $user = array(
            'firstname' => $firstname,
            'lastname' => $lastname,
            'email' => $email,
            'password' => $password,
            'balance' => $balance
        );

        $this->db->insert('users', $user);

    }

    public function getUser($userid)
    {
        $this->db->select('*');
        $this->db->from('users');
        $this->db->where('userid', $userid);
        $query = $this->db->get();

        return $query->row();
    }



}