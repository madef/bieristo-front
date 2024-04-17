<?php require('../config.php') ?><!doctype html>
<html lang="fr">
    <head>
        <meta charset="utf-8">
        <title>Bieristo : brewing app</title>
        <link rel="stylesheet" href="static/css/main.css">
        <link rel="apple-touch-icon" sizes="150x150" href="static/image/icon.png">
        <link rel="icon" type="image/png" sizes="32x32" href="static/image/icon-32.png">
        <link rel="icon" type="image/png" sizes="16x16" href="static/image/icon-16.png">
        <link rel="manifest" href="manifest.json">

        <?php if (DEV_MOD): ?>
            <link rel="stylesheet" href="static/css/bootstrap-5.2.2/bootstrap.css">
        <?php else: ?>
            <link rel="stylesheet" href="static/css/bootstrap-5.2.2/bootstrap.min.css">
        <?php endif; ?>
        <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/luxon"></script>
        <script src="https://cdn.jsdelivr.net/npm/chartjs-adapter-luxon"></script>
        <link rel="stylesheet" href="static/css/icons-1.4.1/bootstrap-icons.css">
        <meta http-equiv="Content-Security-Policy" content="default-src 'self' <?= API_PREFIX.API_DOMAIN ?>;img-src 'self' data:;script-src 'self' 'unsafe-inline' <?= API_PREFIX.API_DOMAIN ?>;">
        <meta name="viewport" content="width=device-width, initial-scale=1">
    </head>
    <body class="bg-dark text-light">
        <script type="module">
            import App from './js/App';
            App.run(<?= json_encode(DOMAIN_PREFIX.DOMAIN) ?>, <?= json_encode(API_PREFIX.API_DOMAIN) ?>);
        </script>
    </body>
</html>
