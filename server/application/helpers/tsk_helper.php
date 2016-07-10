<?php

defined('BASEPATH') OR exit('No direct script access allowed');

function lookupPriority($priority)
{
    if($priority == 0)
    {
        return 'Normal';
    } elseif ($priority == 1)
    {
        return 'High';
    } elseif ($priority == 2)
    {
        return 'Critical';
    } else 
    {
        return 'Low';
    }
}
