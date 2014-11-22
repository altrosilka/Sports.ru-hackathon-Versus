<?php

function get_data($url) {
  $ch = curl_init();
  $timeout = 5;
  curl_setopt($ch, CURLOPT_URL, $url);
  curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
  curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, $timeout);
  $data = curl_exec($ch);
  curl_close($ch);
  return $data;
}

$host = 'http://'.$_SERVER['SERVER_NAME'];

$title = 'Инфографика | Sports.ru';
$description = 'Инфографика о ваших любимых игроках во всех турнирах от sports.ru!';
$image = $host.'/infographic/images/soc.png';

if (isset($_GET['info'])){
  $id = intval($_GET['info']);
  $data = get_data('http://hack03.sports.ru/stat/player/get_infographic/?id='.$id);
  if (isset($data) && $data !== ''){
    $json = json_decode($data);
    if ($json !== null){
      $json = json_decode($json->info);
      if ($json !== null){
        if (isset($json->player2_surname) && isset($json->player1_surname)) {
          $title = $json->player1_surname.' или '.$json->player2_surname.'. Кто круче?';
          $description = 'Я сделал и инфографику на sports.ru/infographics. Оцените!';
        } else {
          if (isset($json->player1_surname) && isset($json->player1_name)){
            $title = $json->player1_name.' '.$json->player1_surname.'. Инфографика';
            $description = 'Я сделал и инфографику на sports.ru/infographics. Оцените!';
          }
        }
      }
    }
  }
}

?>
<!DOCTYPE html>
<html data-ng-app="App">

<head>
  <base href="/infographic/" target="_blank" />
  <meta charset="UTF-8"> 
  <title><?=$title?></title>
  <link rel="stylesheet" href="pack/vendors.css?v=1.0.1">
  <link rel="stylesheet" href="pack/styles.css?v=1.0.1">
 
  <meta property="og:site_name" content="<?=$host?>" />
  <meta property="og:image" content="<?=$image?>" />
  <meta property="og:title" content="<?=$title?>" />
  <meta property="og:type" content="website" />
  <meta property="og:description" content="<?=$description?>" />
  <link rel="image_src" type="image/jpeg" href="<?=$image?>" />
  <meta name="twitter:title" content="<?=$title?>" />
  <meta name="twitter:description" content="<?=$description?>" />
  <meta name="twitter:image" content="<?=$image?>" />
  <meta name="description" content="<?=$description?>" />

  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link href='https://fonts.googleapis.com/css?family=Ubuntu:300,700' rel='stylesheet' type='text/css'>
</head>
  
<body ng-controller="C_root as ctr" data-state="{{state}}" ng-class="{'skipIntro':ctr.hidePlayers}">
  <div class="presentation" many-peoples animate="ctr.hidePlayers"></div>
  <header>
    <div class="container relative">
      <a href="http://www.sports.ru" target="_blank" class="logo"></a>
      <span class="info"></span>
      <span class="left pull-right">
        <a href="/infographic/" class="link no-border gray">Создайте свою футбольную инфографику</a>
      </span>
    </div>
  </header>
  <div class="plat" ng-class="{'lowIndex':ctr.lowIndex, 'hideView':ctr.hideView}">
    <section class="view" ui-view=""></section>
  </div>
  <script type="text/javascript" src="pack/vendor.js?v=1.0.1"></script>
  <script type="text/javascript" src="pack/templates.js?v=1.0.1"></script>
  <script type="text/javascript" src="pack/scripts.js?v=1.0.1"></script>
</body>
</html>
