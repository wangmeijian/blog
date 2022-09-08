# iTerm2中，Macbook触控栏在Git环境下的妙用

<img src="https://user-images.githubusercontent.com/9384140/189100127-2770bf2f-fbd5-4062-824d-dc014fc2acaa.jpeg" width="800" />

你可以直接在touch bar中使用```git status```, ```git add .```, ```git commit -m ""```, ```git pull```, ```git push```, ```git switch main```,```git switch master```和```git switch develop```，只需要点击一下就行，非常方便

配置非常简单，但在第一次尝试时可能需要一些时间才能弄清楚

打开iTerm2，选择菜单```iTerm2``` -> ```Preferences``` -> ```Keys```

<img width="785" alt="preferences" src="https://user-images.githubusercontent.com/9384140/189100414-3169a303-af7c-4b65-bc10-b8fc46a30051.png" width="600">

然后选择```Add Touch Bar Item```，输入```git status```，选择```Send text with vim special chars```，然后在底部字段中写入```git status\n```，点击```OK```完成添加

<img width="442" alt="add_touch_bar_item" src="https://user-images.githubusercontent.com/9384140/189100516-16fbd3a9-63b1-4956-b877-fc4d7cf33851.png" width="400">

对您想要的所有其他 git 命令重复此操作。在底部字段中输入```git commit -m ""\u0002```，这会将文本```git commit -m ""```发送到控制台，然后发送一个左箭头，使光标位于引号内，然后您可以编写提交消息并按下回车提交

然后选择```View``` -> ```Customize Touch Bar...```并将新命令拖到触摸栏

就这些！希望对你有帮助

原文链接：https://refruity.xyz/macbook-touch-bar-in-iterm2/