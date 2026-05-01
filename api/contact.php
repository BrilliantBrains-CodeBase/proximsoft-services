<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') { exit(0); }

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['success' => false, 'message' => 'Invalid request method.']);
    exit;
}

$data = json_decode(file_get_contents("php://input"), true);

$name    = trim($data['name']    ?? '');
$email   = trim($data['email']   ?? '');
$phone   = trim($data['phone']   ?? '');
$website = trim($data['website'] ?? '');
$message = trim($data['message'] ?? '');
$subject = trim($data['subject'] ?? 'New Contact Form Submission');
$source  = trim($data['source']  ?? '');

if (!$name || !$email || !$message) {
    echo json_encode(['success' => false, 'message' => 'Required fields missing.']);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode(['success' => false, 'message' => 'Invalid email address.']);
    exit;
}

$to = "admin@brilliantbrains.digital";

$body = "Name: $name\n"
      . "Email: $email\n"
      . ($phone   ? "Phone: $phone\n"     : '')
      . ($website ? "Website: $website\n" : '')
      . ($source  ? "Source: $source\n"   : '')
      . "\nMessage:\n$message";

$headers = "From: noreply@brilliantbrains.digital\r\n"
         . "Reply-To: $email\r\n"
         . "Content-Type: text/plain; charset=UTF-8\r\n";

$sent = mail($to, $subject, $body, $headers);

echo json_encode($sent
    ? ['success' => true,  'message' => 'Message sent.']
    : ['success' => false, 'message' => 'Email sending failed.']
);
