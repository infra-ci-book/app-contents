# app-contents
CMS application and contents

---

## 環境
* 動作OS（CentOS7 1710.01）: 記述中
* スペック（1vcpu/1gb mem）: 記述中
  * CPU: 1vcpu
  * Mem: 512MB
  * Net: 1gbps
  * ディスク: 10GB
* app-contents レポをどこに配置するか？ : 記述中
* 何を起動するか？（どのポートで待つとか）: 記述中

---
## 手順

ディレクトリ applications 配下に ketchup のバイナリが、ディレクトリ configurations 配下に設定が、ディレクトリ contents 配下に ketchup のデータがあります。

以下を実行すると起動します。(あ、ちなみに自分の環境では Vagrantfile に  ｀config.vm.network "forwarded_port", guest: 80, host: 8000｀ を設定しています)

```
cd ~
git clone https://github.com/infra-ci-book/app-contents.git
tar -xzf app-contetns/applications/ketchup_Linux_x86_64.tar.gz
cp app-contetns/configurations/config.json ./
cp -r app-contetns/contents/data ./
sudo nohup ./ketchup start &
```

あとはブラウザで http://IP:PORT/admin にアクセスすればケチャップの画面が表示されます。 (私の環境では http://127.0.0.1:8000/admin)
ログイン画面は emal が sample@example.com で password が password でログインできます。

