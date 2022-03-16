
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>

<body>
  <style>
    :root {
      --minh: 98vh;
      --color1: wheat;
      --color2: midnightblue;
    }

    body {
      margin: 0;
    }

    .header,
    .footer {
      text-align: center;
      height: 100vh;
    }

    .header p,
    .footer p {
      font-size: 30px;
    }

    .header h1,
    .footer h1 {
      font-size: 200px;
      line-height: 60vh;
    }

    .curtain {
      background-image: linear-gradient(to bottom, var(--color2) 50%, var(--color1) 50%);
    }

    .curtain::after {
      content: "";
      display: block;
      min-height: var(--minh);
    }

    .invert {
      position: sticky;
      top: 20px;
      mix-blend-mode: difference;
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: var(--minh);
    }

    h2 {
      color: var(--color1);
      font-size: 200px;
    }
  </style>
  <div class="header">
    <p>往下滚动</p>
    <h1>有惊喜</h1>
  </div>
  <div class="curtain">
    <div class="invert">
      <h2>拉窗帘效果</h2>
    </div>
  </div>
  <div class="footer">
    <p>往上滚动</p>
    <h1>有惊喜</h1>
  </div>
</body>

</html>
