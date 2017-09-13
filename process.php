<?php

$errors = array();   // array to hold validation errors
$data = array();   // array to pass back data
// validate the variables ======================================================
if (empty($_POST['user_id']))
    $errors['user_id'] = 'User Id Is Required.';
if (empty($_POST['poststable_id']))
    $errors['poststable_id'] = 'Post Table Id Is Required.';
if (empty($_POST['content']))
    $errors['content'] = 'Content Is Required.';
// return a response ===========================================================
// response if there are errors
if (!empty($errors)) {
    // if there are items in our errors array, return those errors
    $data['success'] = false;
    $data['errors'] = $errors;
} else {
    // if there are no errors, return a message
    $data['success'] = true;
    $data['message'] = 'Success!';
}
// return all our data to an AJAX call
echo json_encode($data);
