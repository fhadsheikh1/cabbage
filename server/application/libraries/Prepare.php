<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class Prepare {
    
    public function __construct()
    {
       $this->CI =& get_instance();
        
        $this->CI->load->helper('tsk');
        $this->CI->load->helper('My_date_helper');
        $this->CI->load->model('Database_model');
    }
    
    public function notificationPreview($latestCommentBody, $latestCommentIssueID)
    {
                
        if($latestCommentBody === 'New ticket submitted (email)')
        {

            $preview = 'submitted a new ticket #'.$latestCommentIssueID;

        } 
        elseif($latestCommentBody === 'New ticket submitted')
        {

            $preview = 'submitted a new ticket #'.$latestCommentIssueID;

        } 
        elseif($latestCommentBody == 'The ticket has been taken')
        {

            $preview = 'took over ticket #'.$latestCommentIssueID;

        } 
        elseif(strpos($latestCommentBody, 'The ticket has been re-opened'))
        {

            $preview = 're-opened ticket #'.$latestCommentIssueID;

        } 
        elseif($latestCommentBody == 'The ticket has been closed')
        {

            $preview = 'closed ticket #'.$latestCommentIssueID;

        } 
        elseif(strpos($latestCommentBody, 'ticket has been assigned to technician:'))
        {

            $subjectSplit = explode(":", $latestCommentBody);
            $preview = 'assigned ticket '.$latestCommentIssueID.' to '.$subjectSplit[1];

        }
        else
        {
            $preview = 'replied to ticket #'.$latestCommentIssueID;
        }
        
        return substr($preview,0,50);
    }
    
    public function notificationName($latestComment)
    {
            if($latestComment->FirstName != NULL && $latestComment->LastName != NULL )
            {
                $name = $latestComment->FirstName." ".$latestComment->LastName;
            }
            else
            {
                $name = $latestComment->Email;
            }
        
        return $name;
    }
    
    public function forFats($tickets)
    {
        foreach($tickets as $key => $ticket)
        {
            
            // Issue ID
            $response[$key]['issueId'] = $ticket->IssueID;
            
            // title
            $response[$key]['subject'] = $ticket->Subject;
            
            // status
            $response[$key]['status'] = $ticket->Status;
            
            // priority
            $response[$key]['priority'] = lookupPriority($ticket->Priority);
            
            // assigned to
            $tech = $this->CI->Database_model->lookupTech($ticket->AssignedToUserID);
            if($tech)
            {
                $response[$key]['assignedTo'] = $tech->name;
            } else {
                $response[$key]['assignedTo'] = 'Unassigned';
            }
            
            // client
            $response[$key]['client'] = $ticket->CompanyName;
            
            // last updated
            $response[$key]['lastUpdated'] = date('F d - h:ia', unixToPhp($ticket->LastUpdated));
            
            $response[$key]['issueDate'] = date('F d - h:ia', unixToPhp($ticket->IssueDate));
            
            if($ticket->UpdatedByUser)
            {
                $response[$key]['respondedBy'] = 'ticket-status-byclient';
            } elseif($ticket->UpdatedByUser == false && $ticket->UpdatedByPerformer == false)
            {
                $response[$key]['respondedBy'] = 'ticket-status-new';
            } elseif ($ticket->UpdatedByPerformer)
            {
                $response[$key]['respondedBy'] = 'ticket-status-bytech';
            } elseif($ticket->UpdatedForTechView)
            {
                $response[$key]['respondedBy'] = 'ticket-status-fortech';
            }
                
            
        }
        
        return $response;
    }
    
}