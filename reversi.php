<?php
$seed=">B0ofMnbI=z5=VRt";
include 'top.php';
?>
        <script src="./script/reversi.js"></script>
          <h1 style="font-weight: bold;">リバーシ</h1>
            <div style="text-align: center;">
              <div id="turn">
                Turn: 黒
              </div>
              <button id="skip">
                skip
              </button>
              <canvas id="canvas" width="800" height="800" style="background-color: green;"></canvas>
              <a href="https://github.com/clockvoid/Reversi" target="_blank">Source</a>
            </div>
<?php
include 'bottom.php';
?>
