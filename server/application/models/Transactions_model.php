<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class Transactions_model extends CI_Model {

    public function __construct()
    {
        parent::__construct();
        $this->load->database();
    }

    public function getTransactions($userid)
    {
        $this->db->select('*');
        $this->db->from('transactions');
        $this->db->where('sender = '.$userid.' OR recipient = '.$userid);
        $this->db->limit(5);
        $this->db->order_by('date', 'DESC');
        // $this->db->query('select * from transactions where sender =')
        $query = $this->db->get();
        
        $transactions = $query->result();

        foreach($transactions as $transaction){
            $transaction->sender = $this->lookupUser($transaction->sender);
            $transaction->recipient = $this->lookupUser($transaction->recipient);
        }

        return $transactions;
        
    }

    private function lookupUser($userid)
    {
        $this->db->select('firstname');
        $this->db->from('users');
        $this->db->where('userid', $userid);
        $query = $this->db->get();

        return $query->row()->firstname;
    }


}