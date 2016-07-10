<?php

defined('BASEPATH') OR exit('No direct script access allowed');


function mysqlDate($unixDate){
    
    date_default_timezone_set('etc/GMT');
    
    preg_match( "#/Date\((\d{10})\d{3}(.*?)\)/#", $unixDate, $match );
    $date = strtotime(date( "Y-m-d H:i:s", $match[1] ));
    
    $newDate = date( "Y-m-d H:i:s", $date);
    
    return $newDate;
    
}

function mysqlDateTimeFirst($unixDate){
    
    date_default_timezone_set('America/New_York');
    
    preg_match( "#/Date\((\d{10})\d{3}(.*?)\)/#", $unixDate, $match );
    $date = strtotime(date( "Y-m-d H:i:s", $match[1] ));
    
    $newDate = date( "g:i A - M d, Y", $date);
//    $newDate = date( "Y-m-d H:i:s", $date);
    
    return $newDate;
    
}

function unixToPhp($unixDate){
    
    
    date_default_timezone_set('etc/GMT');
    
    preg_match( "#/Date\((\d{10})\d{3}(.*?)\)/#", $unixDate, $match );
    $date = strtotime(date( "Y-m-d H:i:s", $match[1] ));
    
    return $date;
    
}

function daysFromToday($issueDate){
    
    
    
    $today = time();
    $date = strtotime($issueDate);
    
    $datediff = $today - $date;
    return floor($datediff/(60*60*24));
    
}

function workStartDay($start){
    
    //Will take a date and output the previous date 5pm
    date_default_timezone_set('America/New_York');
    
    

    $day = date("Y-m-d", strtotime($start));
    
    $dayOfWeek = strftime("%A", strtotime($day));
    
    if($dayOfWeek == "Monday"){
        $temp = date("Y-m-d", strtotime("-3 day", strtotime($start)));
    } else {
        $temp = date("Y-m-d", strtotime("-1 day", strtotime($start)));
    }
    
    $date = $temp." 17:00:00";
    //$date = date("Y-m-d H:i:s", (strtotime ( '-1 day', $temp)));
    
    return $date;
    
}

function workEndDay($start){
    
    //Will take a date and output the previous date 5pm
    date_default_timezone_set('America/New_York');
    
    $temp = date("Y-m-d", strtotime($start));
    
    $date = $temp." 17:00:00";
    //$date = date("Y-m-d H:i:s", (strtotime ( '-1 day', $temp)));
    
    return $date;
    
}

function plainTime($unixDate){
    date_default_timezone_set('America/New_York');
    
    preg_match( "#/Date\((\d{10})\d{3}(.*?)\)/#", $unixDate, $match );
    $date = strtotime(date( "Y-m-d H:i:s", $match[1] ));
    
    return $date;
}

function fromDate($date){
    
    $newDate = date( "g:i A - M d, Y", strtotime($date));
    return $newDate;
}