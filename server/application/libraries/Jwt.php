<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class Jwt {
    
    public function getJwtFromHeader($headers)
    {
        foreach($headers as $key => $header){
            if($key == 'Authorization'){
                return $header;
            }
        }
    }
    
    /**
     * Parse JWT
     * @param string jwt (Base encoded / 3 part (concatenated by dots) of Header, Payload and Signature)
     * @return array
     */
    public function parseJwt($jwt)
    {
        $jwtSplit = explode('.', $jwt);
        
        if(count($jwtSplit) != 3){
            return false;
        }
        
        $header = base64_decode($jwtSplit[0]);
        $payload = base64_decode($jwtSplit[1]);
        
        return array(
            'header' => json_decode($header,true),
            'payload' => json_decode($payload,true),
            'hash' => base64_decode($jwtSplit[2])
        );
    }
    
    public function validateJwt($jwt)
    {
        $secret = 'fhadsheikh';       
//        echo $jwt['header']."<br>";
        $header = base64_encode(json_encode($jwt['header']));
        $payload = base64_encode(json_encode($jwt['payload']));  
        
        $hash = base64_encode($jwt['hash']);
        $newHash = base64_encode(hash_hmac('sha256',$header.".".$payload,$secret,true));
        
        return $hash == $newHash;
        
    }
    
}