# Introduction

Ce projet a été produit par Batiste Doublet et Corentin Esteve.

Il a pour but la construire d'un ensemble de jobs permettant de proposer un pipeline de validation de code correspondant au cahier des charge suivant.

La mise en place de la vm et un problème de pare-feu nous a pris beaucoup de temps, cependant nous avons pu finir dans les temps.

Voici ...

Le lien de notre Git ...

Le fichier Git est repris d'un projet précédent, il contient nos tests dans le dossier test.


# Job 1 :

#!/bin/bash
NAME='test'

#création du conteneur
lxc init ubuntu:22.04 $NAME
sleep 2

#attachement du conteneur à la carte réseau
lxc network attach lxdbr0 $NAME
sleep 2

#demarrage du container
lxc start $NAME
sleep 2
#configuration du réseau
lxc exec $NAME -- sed -i 's|#DNS=|DNS=1.1.1.1|g' /etc/systemd/resolved.conf
lxc exec $NAME -- systemctl restart systemd-resolved
lxc exec $NAME -- bash -c 'echo -e "[Match]\nName=*\n\n[Network]\nDHCP=ipv4" > /etc/systemd/network/10-all.network'
lxc exec $NAME -- systemctl restart systemd-networkd
sleep 2

#installation des packages
lxc exec $NAME apt update
lxc exec $NAME -- apt install apache2 -y
lxc exec $NAME -- apt install php -y
lxc exec $NAME -- apt install git -y

#suppresion de index.html
lxc exec $NAME rm /var/www/html/index.html

#recuperation du repertoire git
lxc exec $NAME -- git clone 'https://github.com/CorentinEsteve/ProjetRisk' /var/www/html/
sleep 2

#verification si le dossier test est present
if [ -d /var/www/html/test ]
  then
  #verification si test1 existe
  if [ -e /var/www/html/test/test1 ]
    then
    #verification si test2 existe
    if [ -e /var/www/html/test/test2 ]
    then
      #eteindre le conteneur prod
      lxc stop prod
      sleep 2   
      #Renommer le conteneur "prod" en "rollback"
      lxc rename prod rollback
      sleep 2   
      #Renommer le conteneur "test" en "prod"
      lxc rename $NAME prod
      sleep 2   
      #Supprimer le dossier de tests unitaires du nouveau conteneur
      lxc exec prod -- rm -r /var/www/html/test
      sleep 2   
    else
      #Eteindre le conteneur "test"
      lxc stop $NAME
      sleep 2   
      #Supprimer le conteneur "test"
      lxc delete $NAME
      sleep 2   
      #Faire passer le job en erreur
      exit 1
      sleep 2   
    fi
  else
  	 if [ -e /var/www/html/test/test2 ]
     then
     #Eteindre le conteneur "test"
     lxc stop $NAME
     #Supprimer le conteneur "test"
     lxc delete $NAME
     #Faire passer le job en erreur
     exit 1
    fi
  fi
fi


# Job 2 :

#!/bin/bash

#Eteindre le conteneur "prod"
lxc stop prod
sleep 2

#Supprimer le conteneur "prod"
lxc delete prod
sleep 2

#Renommer le conteneur "rollback" en "prod"
lxc rename rollback prod
sleep 2

#Allumer le conteneur "prod"
lxc start prod
sleep 2


# Job 3 :

#!/bin/bash
NAME='pre-prod'

#création du conteneur
lxc init ubuntu:22.04 $NAME
sleep 2

#attachement du conteneur à la carte réseau
lxc network attach lxdbr0 $NAME
sleep 2

#demarrage du container
lxc start $NAME
sleep 2

#configuration du réseau
lxc exec $NAME -- sed -i 's|#DNS=|DNS=1.1.1.1|g' /etc/systemd/resolved.conf
lxc exec $NAME -- systemctl restart systemd-resolved
lxc exec $NAME -- bash -c 'echo -e "[Match]\nName=*\n\n[Network]\nDHCP=ipv4" > /etc/systemd/network/10-all.network'
lxc exec $NAME -- systemctl restart systemd-networkd
sleep 2

#installation des packages
lxc exec $NAME apt update
lxc exec $NAME -- apt install apache2 -y
lxc exec $NAME -- apt install php -y
lxc exec $NAME -- apt install git -y

#demarrage du container
lxc start $NAME
sleep 2

#suppresion de index.html
lxc exec $NAME rm /var/www/html/index.html

#clonage du repertoire git dans le conteneur (/var/www/html)
lxc exec $NAME -- git clone 'https://github.com/CorentinEsteve/ProjetRisk' /var/www/html/
sleep 2

#Supprimer le dossier de tests unitaires du nouveau conteneur
lxc exec $NAME -- rm -r /var/www/html/test
sleep 2   

#Eteindre le conteneur "prod"
lxc stop prod
sleep 2  

#Supprimer le conteneur "prod"
lxc delete prod
sleep 2   

#Renommer le conteneur "pre-prod" en "prod"
lxc rename $NAME prod
