## big-droplet-energy

Repo for WI19 CSE 135.

To deploy to the DigitalOcean droplet, follow the instructions [here](https://www.digitalocean.com/community/tutorials/how-to-set-up-automatic-deployment-with-git-with-a-vps):
```bash
git remote add prod ssh://user@142.93.85.224/var/repo/.git
git push prod master
```

To push to the GitHub repo and the DigitalOcean droplet simultaneously, follow the instructions [here](https://stackoverflow.com/questions/14290113/git-pushing-code-to-two-remotes):
```bash
git remote add prod https://github.com/sumeet-bansal/big-droplet-energy.git
git remote set-url --add --push prod ssh://user@142.93.85.224/var/repo/.git
git remote set-url --add --push prod https://github.com/sumeet-bansal/big-droplet-energy.git
git push prod master
```

To see web analytics, go [here](http://143.93.85.224:8081/apachereport)(apache) or [here](http://142.93.85.224:8082/nginxreport)(nginx)


## documentation

### 1: Employ password protection

- To employ basic authentication, we used the utility htpasswd to generate 
username and encrypted password files
- Then, the file /etc/apache2/sites-enabled/000-default.conf was modified 
to include the following:
```
<Directory "/var/www/html">
                AuthType Basic
                AuthName "Restricted Content"
                AuthUserFile /etc/apache2/.htpasswd
                Require valid-user
</Directory>
```
- This restricted the site's content until valid user credentials were provided.

### 2: Have a static team page that indicates your name and/or team members, emails, etc.

- This was index.html which was being served on both apache and nginx servers. 
- a simple html file was created with the following source: 
```

<!DOCTYPE HTML>
<html lang="en">
<head>
	<meta http-equiv="content-type" content="text/html; charset=UTF-8">
	<title>Big Droplet Energy</title>
	<link href="/css/index.css" rel="stylesheet" type="text/css">
	<link href="/css/font.css" rel="stylesheet" type="text/css">
	<link rel="shortcut icon" href="/favicon.ico?" type="image/x-icon"/>
</head>
<body>
	<div class="main-content" >
		<span id="center">
			<span id="emoji">&#x1F4A6;</span>
			<span id="title">Big Droplet Energy</span>
			<span id="text">Tim Ferido (tferido@ucsd.edu)<br>Sumeet Bansal (s3bansal@ucsd.edu)</span>
		</span>
	</div>
	<!-- <h1>Big Droplet Energy &#x1F4A6</h1>
	<h3>Tim Ferido (tferido@ucsd.edu)</h2>
	<h3>Sumeet Bansal (s3bansal@ucsd.edu)</h2> -->
</body>
</html>
```

### 3. Use custom error pages

- 404 and 403 pages were very similar and were simple html pages
- the general layout was a centered status code with an emoji and some
descriptive text. 

### 4. Have a favicon

- an emoji favicon was taken from an online source and placed in the root 
directory of the site. Then, this line of code was added to html pages
for additional accessibility:
```
<link rel="shortcut icon" href="/favicon.ico?" type="image/x-icon"/>
```

### 5. Have a robots.txt file

- a text file was created in the root directory with the following source:
```
User-agent: *
Disallow: /
```
- this disables all types of robots from browsing all files in the root dir

### 6. Deploy from Github

- a git repo was setup from the root directory
- a git hook was setup to push to the server 
- the server was setup to receive changes 
- a file /var/repo/.git/hooks/post-receive was created with the following source:
```
#!/bin/sh
git --work-tree=/var/www/html --git-dir=/var/repo/.git checkout -f
```

### 7. Log Properly

- the files /var/log/apache2/access.log and /var/log/nginx/access.log were used to generate the reports [here](http://143.93.85.224:8081/apachereport)(apache) and [here](http://142.93.85.224:8082/nginxreport)(nginx)

### 8. Compress Textual Content

- the module mod_deflate was used to compress files. 
- the file /etc/apache2/apache.conf was modified to include: 
```
LoadModule deflate_module modules/mod_deflate.so

<Directory /var/www/html/>
   <IfModule mod_mime.c>
        AddType application/x-javascript .js
        AddType text/css .css
   </IfModule>
   <IfModule mod_deflate.c>
        AddOutputFilterByType DEFLATE text/css application/x-javascript text/x-component text/html text/plain text/xml application/javascript
        <IfModule mod_setenvif.c>
                BrowserMatch ^Mozilla/4 gzip-only-text/html
                BrowserMatch ^Mozilla/4.0[678] no-gzip
                BrowserMatch bMSIE !no-gzip !gzip-only-text/html
        </IfModule>
    </IfModule>
    Header append Vary User-Agent env=!dont-vary
</Directory>
```
- the following lines in /etc/nginx/nginx.conf were uncommented:
```
  gzip on;
  gzip_disable "msie6";

  gzip_vary on;
  gzip_proxied any;
  gzip_comp_level 6;
  gzip_buffers 16 8k;
  gzip_http_version 1.1;
  gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
```

