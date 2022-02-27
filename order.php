<?php 
	use PHPMailer\PHPMailer\PHPMailer;
	use PHPMailer\PHPMailer\Exception;

	require 'phpmailer/src/Exception.php';
	require 'phpmailer/src/PHPMailer.php';

	$mail = new PHPMailer(true);
	$mail->CharSet = 'UTF-8';
	$mail->setLanguage('ru', 'phpmailer/language/');
	$mail->IsHTML(true);

	//от кого письмо
	$mail->setFrom('info@fls.guru');
	//кому отправить
	$mail->addAddress('usmanovartur639@gmail.com');
	//тема письма
	$mail->Subject = 'Заказ';

	//тело письма
	$body = '<h1>Встречайте супер письмо!</h1>';

	if(trim(!empty($_POST['name']))){
		$body.='<p><strong>Имя:</strong> '.$_POST['name'].'</p>';
	}

	if(trim(!empty($_POST['email']))){
		$body.='<p><strong>E-mail:</strong> '.$_POST['email'].'</p>';
	}

	if(trim(!empty($_POST['services']))){
		$body.='<p><strong>Услуги:</strong> '.$_POST['services'].'</p>';
	}

	if(trim(!empty($_POST['price']))){
		$body.='<p><strong>Цена работы:</strong> '.$_POST['price'].'</p>';
	}

	if(trim(!empty($_POST['message']))){
		$body.='<p><strong>Сообщение:</strong> '.$_POST['message'].'</p>';
	}


	//отправляем
	if (!$mail->send()) {
		$message = 'Ошибка';
	} else {
		$message = 'Данные отправлены!';
	}

	$response = ['message' => $message];

	header('Content-type: application/json');
	echo json_encode($response);
?>