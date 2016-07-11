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

    public function sendMoney($amount,$from,$to){

        // Get senders balance 
        $this->db->select('balance');
        $this->db->from('users');
        $this->db->where('userid',$from);
        $query = $this->db->get();
        $sendersBalance = $query->row()->balance;

        // Subtract senders balance by amount
        $sendersBalance = $sendersBalance - $amount;

        $this->db->reset_query();

        // Save senders new balance 
        $this->db->where('userid', $from);
        $this->db->update('users', array('balance' => $sendersBalance ));

        $this->db->reset_query();

        // Get receivers balance 
        $this->db->select('balance');
        $this->db->from('users');
        $this->db->where('userid', $to);
        $query = $this->db->get();
        $receiversBalance = $query->row()->balance;

        $this->db->reset_query();

        // Add receivers new balance 
        $receiversBalance = $receiversBalance + $amount;

        // Save receivers new balance
        $this->db->where('userid', $to);
        $this->db->update('users', array('balance'=>$receiversBalance));

        $this->db->reset_query();

        // Update transaction log
        $data = array(
            'sender' => $from,
            'recipient' => $to,
            'amount' => $amount
        );

        $this->db->insert('transactions', $data);

        
    }

}