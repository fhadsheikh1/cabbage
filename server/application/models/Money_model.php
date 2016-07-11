<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class Money_model extends CI_Model {

    public function __construct()
    {
        parent::__construct();
        $this->load->database();
    }

    public function checkBalance($userid){

        $user = array(
            'userid' => $userid
        );

        $this->db->select('balance');
        $query = $this->db->get_where('users', $user);

        return $query->row();



    }

}