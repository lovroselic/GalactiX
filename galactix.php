<!doctype html>
<?php include_once $_SERVER['DOCUMENT_ROOT'] . '/Include/globals.php';?>
<?php include_once $GL_root . $GL_path . '/Include/session.php';?>
<html lang="<?php echo $_SESSION['lang']; ?>">

<head>
    <?php include_once $GL_root . $GL_path . '/Include/head_includes.php';?>
    <title>GalactiX</title>
    <link rel="canonical" href="https://www.c00lsch00l.eu/Games/galactix.php">
</head>

<body>
    <?php include_once $GL_root . $GL_path . '/Include/header.php';?>

    <div id="gameResolutionAlert" class="hide_extraLarge hide_large">
        <h3>Resolution too low alert!</h3>
        <p>You are trying to run this game on a device which has insufficient resolution to display the game properly.
            Just so you know ...</p>
    </div>
    <div id="preload" class="hidden"></div>

    <div class="container my-5 p-2 cool_page">
        <!-- CONTENT -->
        <div id="setup">
            <div id="load"></div>
            <div id="SC"></div>
            <h1 id="title" style="font-family: 'Arcade'"></h1>
            <p style="font-family: 'Emulogic'; font-size: 13px">Alien invasion is imminent. Protect the Earth!</p>
            <p id="buttons">
                <input type='button' id='toggleHelp' value='Show/Hide Instructions'>
                <input type='button' id='toggleAbout' value='About'>
            </p>
            <div id="help" class="section">
                <fieldset>
                    <legend>
                        Instructions:
                    </legend>
                    <p>Use cursor keys to move the ship and CTRL to fire. </p>
                    <p>As you defeat wave after wave of aliens, your ship will be upgraded with better weapons ...</p>

                </fieldset>
            </div>
            <div id="about" class="section">
                <fieldset>
                    <legend>
                        About:
                    </legend>
                    <img src="https://upload.wikimedia.org/wikipedia/en/2/20/SpaceInvaders-Gameplay.gif"
                        alt="Space Invaders" class="border border-dark p-1 m-2 float-start" title="Space Invaders"
                        width='100'>
                    <p>GalactiX is inspired by legendary arcade games from 70' and 80' such as <a
                            href="https://en.wikipedia.org/wiki/Space_Invaders" target="_blank">Space Invaders</a>
                        and <a href="https://en.wikipedia.org/wiki/Galaxian" target="_blank">Galaxian</a>. Wave 1 uses
                        some original characters from Space Invaders out of respect for this revolutionary game from
                        1978.
                    </p>
                    <p>Source of graphics are various free resource sites. No copyrighted images were intendedly used in
                        the making of the game. Code is written in JavaScript using JQuery framework.</p>
                </fieldset>
            </div>

            <p class="version" id="version"></p>
        </div>
        <!-- END CONTENT  -->
    </div>
    <div class="container">

        <div id="game" class="winTrans"></div>
        <div id="bottom" style="margin-top: 800px"></div>
        <div id="temp" class="hidden"></div>
        <div id="temp2" class="hidden"></div>
    </div>

    <?php include_once $GL_root . $GL_path . '/Include/footer.php';?>
    <script src="galactix.js" type="text/javascript"></script>
</body>

</html>