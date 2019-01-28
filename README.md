## big-droplet-energy

Repo for WI19 CSE 135.

To deploy to the DigitalOcean droplet, follow the instructions [here](https://www.digitalocean.com/community/tutorials/how-to-set-up-automatic-deployment-with-git-with-a-vps):
```bash
git remote add prod ssh://user@142.93.85.224/var/repo/.git
git push prod master
```

To push to the GitHub repo and the DigitalOcean droplet simultaneously, follow the instructions [here](https://stackoverflow.com/questions/14290113/git-pushing-code-to-two-remotes):
```bash
git remote add prod ssh://user@142.93.85.224/var/repo/.git
git remote set-url --add --push prod https://github.com/sumeet-bansal/big-droplet-energy.git
git remote set-url --add --push prod ssh://user@142.93.85.224/var/repo/.git
git push prod master
```
