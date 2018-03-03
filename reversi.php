<?php
$seed=">B0ofMnbI=z5=VRt";
include 'top.php';
?>
        <script src="./script/reversi.js"></script>
        <div class="row">
          <h1>リバーシ</h1>
        </div>
        <div class="row">
          <div class="col-sm-12 col-md-12 col-lg-2">
          </div>
          <div class="col-sm-12 col-md-12 col-lg-8">
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
          </div>
          <div class="col-sm-12 col-md-12 col-lg-2">
          </div>
        </div>
<?php
include 'bottom.php';
?>
