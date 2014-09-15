# -*- mode: ruby -*-
# vi: set ft=ruby :

# Vagrantfile API/syntax version. Don"t touch unless you know what you"re doing!
VAGRANTFILE_API_VERSION = "2"

Vagrant.configure(VAGRANTFILE_API_VERSION) do |config|

  config.vm.box = "opscode_centos-6.5"
  config.vm.box_url = "http://opscode-vm-bento.s3.amazonaws.com/vagrant/virtualbox/opscode_centos-6.5_chef-provisionerless.box"

  # Needed to install cheff on this box
  # config.omnibus.chef_version = :latest
  config.omnibus.chef_version = "11.10.4"

  # TEMP: Speed up damn box to install node from source faster
  # Consider removing later or adjust based on machines
  config.vm.provider "virtualbox" do |v|
    v.memory = 4096
    v.cpus = 8
  end

  # In case we decide to use a private IP later, for now uses localhost
  # config.vm.network "private_network", ip: "192.168.1.10"
  
  # Forward web to localhost:8080 and localhost:6000 for node apps
  config.vm.network "forwarded_port", guest: 80, host: 8080
  config.vm.network "forwarded_port", guest: 6000, host: 6000

  # Sharing app folder with vm so we can develop locally
  config.vm.synced_folder "App", "/home/vagrant/App"

  # Chef provisioning recipes and settings
  config.vm.provision :chef_solo do |chef|

    chef.add_recipe 'yum'
    chef.add_recipe "build-essential"
    chef.add_recipe "git"
    chef.add_recipe 'nginx::source'
    chef.add_recipe "nodejs::nodejs_from_source"

    chef.json = {
        :nodejs => {
          :version => "0.10.31",
          :from_source => true
        },
        :nginx => {
          :version => "1.6.1",
          :sendfile => "off",
          :worker_processes => "2",
          :default_site_enabled => false
        }
    }

  end

  # TODO: proper nginx config
  config.vm.provision :shell,
    :inline => "echo -e $1 > /etc/nginx/conf.d/nginx.conf",
    args: [<<-EOS
        server {
            listen       80;

            location / {
                root   /home/vagrant/App;
                index  index.html index.htm;
            }
        }
    EOS
    ]

    config.vm.provision :shell,
    :inline => "echo -e $1 > /etc/nginx/nginx.conf",
    args: [<<-EOS
        user vagrant;
        worker_processes  2;

        error_log  /var/log/nginx/error.log;
        pid        /var/run/nginx.pid;

        events {
          worker_connections  1024;
        }

        http {

          include       /etc/nginx/mime.types;
          default_type  application/octet-stream;

          access_log    /var/log/nginx/access.log;

          sendfile off;
          tcp_nopush on;
          tcp_nodelay on;

          keepalive_timeout  65;

          gzip  on;
          gzip_http_version 1.0;
          gzip_comp_level 2;
          gzip_proxied any;
          gzip_vary off;
          gzip_types text/plain text/css application/x-javascript text/xml application/xml application/rss+xml application/atom+xml text/javascript application/javascript application/json text/mathml;
          gzip_min_length  1000;
          gzip_disable     "MSIE [1-6]\.";

          server_names_hash_bucket_size 64;
          types_hash_max_size 2048;
          types_hash_bucket_size 64;

          include /etc/nginx/conf.d/*.conf;
          include /etc/nginx/sites-enabled/*;
        }
    EOS
    ]

  config.vm.provision :shell, :inline => "sudo service nginx restart"
  config.vm.provision :shell, :inline => "rm install.sh"

  # bower couldn't find node
  config.vm.provision :shell, :inline => "ln -s /usr/local/bin/node /usr/bin/node"
  config.vm.provision :shell, :inline => "/usr/local/bin/npm config set prefix /usr/local"

  # Install extra packages we might need
  config.vm.provision :shell, :inline => "gem install sass"
  config.vm.provision :shell, :inline => "/usr/local/bin/npm -g install gulp"
  config.vm.provision :shell, :inline => "/usr/local/bin/npm -g install bower"
  config.vm.provision :shell, :inline => "cd /home/vagrant/App && /usr/local/bin/npm install"
  config.vm.provision :shell, :inline => "cd /home/vagrant/App && /usr/local/bin/bower --allow-root install"

  # Run script in case we need to bootstrap something else
  # config.vm.provision(:bash, :script => "tidy-up.sh")

end
