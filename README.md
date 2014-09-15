## Basic Vagrant VM.

### WIP

1. Install vagrant and virtualbox
1. Install vagrant plugins: 
    - `vagrant plugin install vagrant-librarian-chef`
    - `vagrant plugin install vagrant-omnibus`
1. Clone this repo: `git clone https://github.com/pedrocanterini/vagrant-publishing-client.git`
1. Install librarian: `gem install librarian-chef` (requires ruby > 1.9.3)
1. Install librarian cookbooks: `librarian-chef install`
1. Start vagrant: `vagrant up`