# -*- mode: ruby -*-
# vi: set ft=ruby :

# Vagrantfile API/syntax version. Don"t touch unless you know what you"re doing!
VAGRANTFILE_API_VERSION = "2"

Vagrant.configure(VAGRANTFILE_API_VERSION) do |config|

  config.vm.box = "CentOS-6.4-x86_64"
  config.vm.box_url = "http://developer.nrel.gov/downloads/vagrant-boxes/CentOS-6.4-x86_64-v20131103.box"

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
  config.vm.synced_folder "app", "/home/vagrant/app"

  # Chef provisioning recipes and settings
  config.vm.provision :chef_solo do |chef|

    chef.add_recipe 'yum'
    chef.add_recipe "build-essential"
    chef.add_recipe 'nginx::source'
    chef.add_recipe "nodejs::nodejs_from_source"

    chef.json = {
        :nodejs => {
          :version => "0.10.31",
          :from_source => true
        },
        :nginx => {
          :version => "1.6.1",
          :default_site_enabled => true
        }
    }

  end

  # Reset boxe's preset firewall (was blocling most ports)
  # This is required unless we use another box
  config.vm.provision :shell, :inline => "iptables -F"

  # Run script in case we need to bootstrap something else
  # config.vm.provision(:bash, :script => "tidy-up.sh")

end
