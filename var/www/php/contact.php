<?php
$fname = $lname = $email = $subject = $message = "";
$fnameErr = $emailErr = $subjectErr = "";
$cansubmit = true;

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    if(empty($_POST["fname"])){
        $fnameErr = "First name is required.";
        $cansubmit = false;
    } else {
        $fname = test_input($_POST["fname"]);
    }
    if(empty($_POST["lname"])){
        $lname = "";
    } else {
        $lname = test_input($_POST["lname"]);
    }
    if(empty($_POST["email"])){
        $emailErr = "Your email is required.";
        $cansubmit = false;
    } else {
        $email = test_input($_POST["email"]);
        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            $emailErr = "Invalid email format";
            $cansubmit = false;
        }
    }
    if(empty($_POST["subject"])){
        $subjectErr = "Subject is required.";
        $cansubmit = false;
    } else {
        $subject = test_input($_POST["subject"]);
    }
    if(empty($_POST["message"])){
        $message = "";
    } else {
        $message = test_input($_POST["message"]);
    }

    if($cansubmit){
        $to = "contact@yuvalmedina.com";
        $emailsubj = "From: $lname, $fname; Subject: $subject";
        $header = "reply-to:$email";
        
        $retval = mail($to, $subject, $message, $header);

        if($retval == true ) {
            echo "Message sent successfully..";
        } else {
            echo "Error sending message..";
        }
    }
}

header("Location: https://yuvalmedina.com/contact");
exit();

function test_input($data) {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}