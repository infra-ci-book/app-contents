# app-contents
CMS application and contents

---

## 環境
* 動作OS: CentOS 7.4.1708 (もちろん、これ以前の CentOS でも動作すると思われるが、未確認)
* スペック:
  * CPU: 1vcpu
  * Mem: 512MB
  * Net: 1gbps
  * ディスク: 1GB (ketchup に投入するデータ量に比例する)
* app-contents レポをどこに配置するか？ : /home/vagrant/
* 何を起動するか？:
  * 起動に関しては下記の手順を参照
  * ketchup を起動すると config.json の port で指定したポートで LISTEN します。(指定ないときは 127.0.0.1:8000)

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

