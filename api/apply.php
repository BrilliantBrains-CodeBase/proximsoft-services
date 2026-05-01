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

$firstName   = trim($_POST['firstName']       ?? '');
$lastName    = trim($_POST['lastName']        ?? '');
$email       = trim($_POST['email']           ?? '');
$phone       = trim($_POST['phone']           ?? '');
$position    = trim($_POST['desiredPosition'] ?? '');
$linkedin    = trim($_POST['linkedin']        ?? '');
$github      = trim($_POST['github']          ?? '');
$portfolio   = trim($_POST['portfolio']       ?? '');
$coverLetter = trim($_POST['coverLetter']     ?? '');

if (!$firstName || !$lastName || !$email || !$phone || !$position) {
    echo json_encode(['success' => false, 'message' => 'Required fields missing.']);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode(['success' => false, 'message' => 'Invalid email address.']);
    exit;
}

$to      = "admin@brilliantbrains.digital";
$subject = "New Job Application: $position — $firstName $lastName";

$body = "Applicant: $firstName $lastName\n"
      . "Email: $email\n"
      . "Phone: $phone\n"
      . "Position: $position\n"
      . ($linkedin    ? "LinkedIn: $linkedin\n"    : '')
      . ($github      ? "GitHub: $github\n"        : '')
      . ($portfolio   ? "Portfolio: $portfolio\n"  : '')
      . ($coverLetter ? "\nCover Letter:\n$coverLetter" : '');

$boundary = md5(uniqid(time()));

if (!empty($_FILES['resume']['tmp_name']) && $_FILES['resume']['error'] === UPLOAD_ERR_OK) {
    $resumeData    = file_get_contents($_FILES['resume']['tmp_name']);
    $resumeEncoded = chunk_split(base64_encode($resumeData));
    $resumeName    = basename($_FILES['resume']['name']);

    $headers = "From: noreply@brilliantbrains.digital\r\n"
             . "Reply-To: $email\r\n"
             . "MIME-Version: 1.0\r\n"
             . "Content-Type: multipart/mixed; boundary=\"$boundary\"\r\n";

    $message = "--$boundary\r\n"
             . "Content-Type: text/plain; charset=UTF-8\r\n\r\n"
             . $body . "\r\n\r\n"
             . "--$boundary\r\n"
             . "Content-Type: application/pdf; name=\"$resumeName\"\r\n"
             . "Content-Transfer-Encoding: base64\r\n"
             . "Content-Disposition: attachment; filename=\"$resumeName\"\r\n\r\n"
             . $resumeEncoded . "\r\n"
             . "--$boundary--";
} else {
    $headers = "From: noreply@brilliantbrains.digital\r\n"
             . "Reply-To: $email\r\n"
             . "Content-Type: text/plain; charset=UTF-8\r\n";
    $message = $body;
}

$sent = mail($to, $subject, $message, $headers);

echo json_encode($sent
    ? ['success' => true,  'message' => 'Application submitted.']
    : ['success' => false, 'message' => 'Submission failed.']
);
