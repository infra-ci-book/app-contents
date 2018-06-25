# app-contents
CMS application and contents

---

## Requirements
* CentOS >= 7.4
* Spec:
  * CPU: 1vcpu
  * Mem: 512MB
  * Net: 1gbps
  * Disk: 1GB

## Structure
```
|-- README.md                             (this file)
|-- applications
|   `-- ketchup_Linux_x86_64.tar.gz       ketchup binary
|-- configurations
|   `-- config.json                       configuration for ketchup
`-- contents
    `-- data
        |-- default.db                    contents for ketchup
        |-- internal_themes
        |-- session.key
        |-- themes
        |   `-- none
        |       `-- assets
        |           `-- none-theme.css    ketchup's theme file for this book
        `-- tls
```

## How to manually deployment

usually, you not need do manually deployment.

```
cd ~
git clone https://github.com/infra-ci-book/app-contents.git
tar -xzf app-contents/applications/ketchup_Linux_x86_64.tar.gz
cp app-contents/configurations/config.json ./
cp -r app-contents/contents/data ./
sudo nohup ./ketchup start &
```

## Operation confirmation

### User

you can show ketchup that visit http://IP:PORT/index or http://IP:PORT/ping in your browser.

### Administrator of this ketchup

you can show ketchup login form that visit http://IP:PORT/admin in your browser.
and you should be input 'admin' into email, and 'password' into password.

## How to build from source code

### Requirements

* Go >=1.9
* Node >= 8 with npm adn yarn

### Patch for customise of this book

```
diff --git a/server/content/context/site.go b/server/content/context/site.go
index ae2767f..ca7df06 100644
--- a/server/content/context/site.go
+++ b/server/content/context/site.go
@@ -1,6 +1,9 @@
 package context
 
 import (
+	"net"
+	"strings"
+
 	"github.com/ketchuphq/ketchup/proto/ketchup/api"
 	"github.com/ketchuphq/ketchup/server/content/content"
 )
@@ -10,6 +13,20 @@ type SiteContext struct {
 	*EngineContext
 }
 
+// Ip is IPv4 Addresses of site
+func (s *SiteContext) Ip() string {
+	addresses := []string{}
+	addrs, _ := net.InterfaceAddrs()
+	for _, a := range addrs {
+		if ipnet, ok := a.(*net.IPNet); ok && !ipnet.IP.IsLoopback() {
+			if ipnet.IP.To4() != nil {
+				addresses = append(addresses, ipnet.IP.String())
+			}
+		}
+	}
+	return strings.Join(addresses, ", ")
+}
+
 // Title is shorthand for accessing site title
 func (s *SiteContext) Title() interface{} {
 	return s.Data("title")
diff --git a/server/content/templates/defaultstore/defaultstore.go b/server/content/templates/defaultstore/defaultstore.go
index 4ae96f0..18e000f 100644
--- a/server/content/templates/defaultstore/defaultstore.go
+++ b/server/content/templates/defaultstore/defaultstore.go
@@ -12,8 +12,14 @@ import (
 )
 
 var noneTemplate = `<html>
-	<style>#c{max-width:600px;margin:0 auto;font-family:helvetica, sans-serif;}</style>
-	<div id='c'>{{.Page.Content}}</div>
+	<head>
+        	<style>#c{max-width:600px;margin:0 auto;font-family:helvetica, sans-serif;}</style>
+		<link rel="stylesheet" href="/none-theme.css">
+	</head>
+	<body>
+		<div id='ip'>{{ .Page.Title }} on {{ .Site.Ip }}</div>
+		<div id='c'>{{.Page.Content}}</div>
+	</body>
 </html>`
 
 var noneTheme = &models.Theme{
```

### build

1. go get github.com/ketchuphq/ketchup
2. to apply above patch
3. `make prepare` and `make`
