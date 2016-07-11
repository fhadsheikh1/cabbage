<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class Users_model extends CI_Model {

    public function __construct()
    {
        parent::__construct();
        $this->load->database();
    }

    public function getUsers()
    {
        $this->db->select('*');
        $this->db->from('users');
        $query = $this->db->get();

        return $query->result();
    }

}