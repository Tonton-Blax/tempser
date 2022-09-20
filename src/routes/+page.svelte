<script>

    import Saos from "saos";
    import { onMount, tick } from 'svelte';
    import { slide } from 'svelte/transition';
    import "../app.css";
  
    const images = [
      { src: '/pres/refs/plx-users-01.jpg', width: 600, height: 400 },
      { src: '/pres/refs/plx-users-02.jpg', width: 400, height: 600 },
      { src: '/pres/refs/plx-users-03.jpg', width: 800, height: 1200 },
    ];  
  
    let badges = {
      rh : `<span class="bg-mex-red-300 text-other-white-100 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded mr-2"> <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5"><path d="M10 9a3 3 0 100-6 3 3 0 000 6zM6 8a2 2 0 11-4 0 2 2 0 014 0zM1.49 15.326a.78.78 0 01-.358-.442 3 3 0 014.308-3.516 6.484 6.484 0 00-1.905 3.959c-.023.222-.014.442.025.654a4.97 4.97 0 01-2.07-.655zM16.44 15.98a4.97 4.97 0 002.07-.654.78.78 0 00.357-.442 3 3 0 00-4.308-3.517 6.484 6.484 0 011.907 3.96 2.32 2.32 0 01-.026.654zM18 8a2 2 0 11-4 0 2 2 0 014 0zM5.304 16.19a.844.844 0 01-.277-.71 5 5 0 019.947 0 .843.843 0 01-.277.71A6.975 6.975 0 0110 18a6.974 6.974 0 01-4.696-1.81z" /></svg>RH</span>`,
      dsi : `<span class="bg-gray-300 text-gray-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded mr-2"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5"> <path d="M14 6H6v8h8V6z" /> <path fill-rule="evenodd" d="M9.25 3V1.75a.75.75 0 011.5 0V3h1.5V1.75a.75.75 0 011.5 0V3h.5A2.75 2.75 0 0117 5.75v.5h1.25a.75.75 0 010 1.5H17v1.5h1.25a.75.75 0 010 1.5H17v1.5h1.25a.75.75 0 010 1.5H17v.5A2.75 2.75 0 0114.25 17h-.5v1.25a.75.75 0 01-1.5 0V17h-1.5v1.25a.75.75 0 01-1.5 0V17h-1.5v1.25a.75.75 0 01-1.5 0V17h-.5A2.75 2.75 0 013 14.25v-.5H1.75a.75.75 0 010-1.5H3v-1.5H1.75a.75.75 0 010-1.5H3v-1.5H1.75a.75.75 0 010-1.5H3v-.5A2.75 2.75 0 015.75 3h.5V1.75a.75.75 0 011.5 0V3h1.5zM4.5 5.75c0-.69.56-1.25 1.25-1.25h8.5c.69 0 1.25.56 1.25 1.25v8.5c0 .69-.56 1.25-1.25 1.25h-8.5c-.69 0-1.25-.56-1.25-1.25v-8.5z" clip-rule="evenodd" /> </svg>DSI</span>`,
      design : `<span class="bg-gray-700 text-other-white-100 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded mr-2"> <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5"> <path d="M2.695 14.763l-1.262 3.154a.5.5 0 00.65.65l3.155-1.262a4 4 0 001.343-.885L17.5 5.5a2.121 2.121 0 00-3-3L3.58 13.42a4 4 0 00-.885 1.343z" /> </svg>DESIGN</span>`,
      comm : `<span class="bg-great-blue-500 text-other-white-100 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded mr-2"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5"><path fill-rule="evenodd" d="M2 3.5A1.5 1.5 0 013.5 2h9A1.5 1.5 0 0114 3.5v11.75A2.75 2.75 0 0016.75 18h-12A2.75 2.75 0 012 15.25V3.5zm3.75 7a.75.75 0 000 1.5h4.5a.75.75 0 000-1.5h-4.5zm0 3a.75.75 0 000 1.5h4.5a.75.75 0 000-1.5h-4.5zM5 5.75A.75.75 0 015.75 5h4.5a.75.75 0 01.75.75v2.5a.75.75 0 01-.75.75h-4.5A.75.75 0 015 8.25v-2.5z" clip-rule="evenodd" /><path d="M16.5 6.5h-1v8.75a1.25 1.25 0 102.5 0V8a1.5 1.5 0 00-1.5-1.5z" /></svg>COMM'</span>`,
      // rh : `<span class="bg-gray-100 text-gray-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded mr-2 dark:bg-gray-700 dark:text-gray-300"> <svg aria-hidden="true" class="mr-1 w-3 h-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd"></path></svg> 3 days ago </span> <span class="bg-blue-100 text-blue-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800"> <svg aria-hidden="true" class="mr-1 w-3 h-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd"></path></svg> 2 minutes ago </span>`,
    }
    
    let steps = [
      {
        title : `Workshops arborescence et stucture des contenus`,
        badges : [badges.comm],
        body : [
          `Choix des types de contenus (articles, agendas, cartes etc.)`, 
          `Modélisation des données (champs éditoriaux pour chaque type de contenu)`,
        ],
        date : 's1',
        round : { bg : 'bg-great-blue-500', text : 'text-other-white-100'}
      },
      {
        title : `Workshops profilage des utilisateurs`,
        badges : [badges.comm, badges.rh, badges.dsi],
        body : [
          `Distribution géographique, droits et permissions (filiales, statuts cadre etc.)`,
          `Authentification par matricule : rapatriement des sources de données de ces matricules (logiciel de paie, RH etc.)`,
          `Authentification par matricule : audit sur l'automatisation de l'ajout / suppressions des matricules collaborateurs`,
          `Réflexion RGPD`,
        ],
        date : 's2',
        round : { bg : 'bg-great-blue-500', text : 'text-other-white-100'}
      },
      {
        title : `Workshop Design`,
        badges : [badges.comm],
        body : [
          `Présentation de 2 maquettes pour 3 à 4 types de contenus différents`,
          `Réfléxion autour des déclinaisons responsive et light/dark en rapport aux profils utilisateurs`,
          `Discussion autour de modèles de blocs génériques de contenus personnalisés et réutilisables`,
        ],
        date : 's4',
        round : { bg : 'bg-great-blue-500', text : 'text-other-white-100'}
      },
      {
        title : `Développement back-office`,
        body : [
          `Implémentation de l'arborescence`,
          `Modélisation des structures de données dans le back-office (champs des articles et pages-statiques, champs personnalisés etc.`,
          `Création des profils et programmation des droits et permissions utilisateurs`,
        ],
        date : 's6',
        round : { bg : 'bg-gray-800', text : 'text-other-white-100'}
      },
      {
        title : `Création graphique`,
        body : [
          `Création graphiques des modèles pour articles`,
          `Création graphiques des pages statiques (contenu "historique" et nouveau)`,
          `Création graphiques des blocs autonomes réutilisables`,
          `Création des déclinaisons responsives et light/dark`,
          `Déclinaisons des graphismes à états (menus déroulants, formulaires, boutons)`,
        ],
        date : 's6',
        round : { bg : 'bg-mex-red-500', text : 'text-other-white-100'}
      },
      {
        title : `Workshops infrastructure`,
        badges : [badges.dsi],
        body : [
          `Mise en place d'Azure (avec compte Servair) comme stockage cloud back-office partagé`,
          `Tests de vitesse sur sites internationaux`,
        ],
        date : 's8',
        round : { bg : 'bg-great-blue-500', text : 'text-other-white-100'}
      },
      {
        title : `Développement front-office`,
        body : [
          `Implémentation des modèles de contenu`,
          `Implémentation des styles visuels de l'interface utilisateur`,
          `Implémentation de l'UX (interactivité)`,
        ],
        date : 's10',
        round : { bg : 'bg-gray-800', text : 'text-other-white-100'}
      },
      {
        title : `Déploiement de l'infrastructure`,
        body : [
          `Déploiement Back-end : serveur de backup et serveur de production`,
          `Mise en place du front-end sur Vercel serverless et des branches (test et production)`,
          `Implémentation du stockage Azure en collaboration optionnelle avec collaborateur Servair`,
          `Mise en place des workflows github pour déploiement SaaS automatisé`,
          `Mise en place de l'authentification globale`,
        ],
        date : 's12',
        round : { bg : 'bg-gray-900', text : 'text-other-white-100'}
      },
      {
        title : `Premier round de formation aux contenus éditoriaux`,
        badges : [badges.comm],
        body : [
          `Formation des équipes à l'intégration de contenus`,
          `Intégration par vos soins d'un nombre de contenus suffisant au lancement`,
          `Retours sur l'usage éditorial côté back-office et le rendu côté front-office`,
        ],
        date : 's14',
        round : { bg : 'bg-great-blue-300', text : 'text-other-white-100'}
      },
      {
        title : `Documentation`,
        body : [
          `Documentation utilisateur back-office`,
          `Documentation développeur du code pour le front-office`,
          `Documentation développeur pour l'infrastructure`,
        ],
        date : 's16',
        round : { bg : 'bg-gray-800', text : 'text-other-white-100'}
      },
      {
        title : `Workshops information auprès des salariés`,
        badges : [badges.comm, badges.rh],
        body : [
          `Réfléxion autour des éléments de langage en vue de promouvoir la plateforme`,
          `Mise en place de sessions sur site de promotion et de démonstration`,
        ],
        date : 's18',
        round : { bg : 'bg-great-blue-500', text : 'text-other-white-100'}
      },
      {
        title : `Deuxième round de formation à l'édition des contenus`,
        badges : [badges.comm, badges.rh],
        body : [
          `Edition des pages et articles`,
          `Rôles et permissions`,
          `Gestion des médias`,
          `Formation avancée pour les utilisateurs administrateurs`,
        ],
        date : 's20',
        round : { bg : 'bg-great-blue-300', text : 'text-other-white-100'}
      },
      {
        title : `Derniers ajustements`,
        body : [
          `Fine-tuning du design`,
          `Dernières corrections de bugs potentiels front/back/infra`,
        ],
        date : 's22',
        round : { bg : 'bg-mex-red-500', text : 'text-other-white-100'}
      },
    ]
  
    let visible = false;
    let modalContent = 'cdn';
    let link=[false,false,false,false,false,false];
    let Carousel, carousel;
    let opened = false;
  
  
    onMount(async () => {
      const module = await import('svelte-carousel');
      Carousel = module.default;
    });
  
  
    function closeModal (evt) {
      if (visible && evt && (evt.key === "Escape" || evt.key === "Esc")) {
        visible = false;
      } else visible=true;
    }
  
    function closeModalClick (evt) {
      let notOk;
      for (let i = 0; i<evt.path.length; i++) {
        if (evt.path?.[i]?.classList && evt.path[i].classList.contains('inner')) {
          notOk = true;
          break;
        }
      }
      if(!notOk) {
        if (opened) {
          visible = false
          opened = false;
        }
        else opened = true;
      }
    }
  
    async function switchVisible(content){
      modalContent = content;
      visible = !visible;
      await tick();
      const linewrapper=document.querySelector('.linewrapper');
      if (visible) {
        modalContent === 'plx' && linewrapper.classList.add('big-modal');
        window.addEventListener('keydown', closeModal)
        window.addEventListener('click', closeModalClick)
      } else {
        window.removeEventListener('keydown', closeModal)
        window.removeEventListener('click', closeModalClick)
        modalContent !== 'plx' && linewrapper.classList.remove('big-modal');
      }
    }
  
    function handleObserver(x) {
        console.log(x.detail.observing);
    }
  
    let tlOpened = Array(steps.length).fill(false)
    tlOpened[0] = true;
  
    let modals = {
        cdn : {
            src : "/pres/cdn.png",
            title : "Qu'est ce qu'un CDN ?",
            body : "Le CDN (Content Delivery Network) est constitué d’un ensemble de localisations dans le monde qui redistribuent localement les contenus, permettant un usage fluide des pages web et applications dans chaque zone de l’ensemble de vos sites internationaux."
        },
        directus : {
            src : "/pres/directus.svg",
            title : "Qu'est ce que Directus ?",
            body : "Directus est à la fois un CMS simple d'utilisation pour les éditeurs et très puissant pour les développeurs. Il permet d'entrée de jeu des fonctions qui nécessiteraient pour une autre plateforme type wordpress, des dizaines de plugins d'origines diverses (SSO, champs personnalisés, formulaires, emailing, optimisation des médias etc).<br>De plus, il permet d'intégrer plus facilement des contenus issus de bases de données déjà existantes comme celles de votre ancien intranet"
        },
        s3 : {
            src : "/pres/s3.png",
            title : "Qu'est ce que le cloud Azure ?",
            body : `Azure Blob Storage est un service de stockage une grande disponibilité des données, une sécurité et des performances de pointe, que ce soit pour des sites Web, des applications mobiles, des sauvegardes et restaurations, des archives, des applications métier ou des analyses de Big Data.<br> Ce stockage en ligne peut être <strong>partagé entre plusieurs applications</strong> (le back-end et la future "Digital Workspace", Notion ou autre).`
        },
        droits :  {
            src : "/pres/droits.jpg",
            title : "Droits granulaires vs Droits basiques",
            body : `Une gestion des droits granulaires vous permet d'assigner des permissions personnalisées pour chaque
            profil utilisateur, afin de matérialiser la compléxité des relations entre acteurs au sein d'un groupe de dimension
            internationale (exemple : les contenus visibles ou modifiables par un responsable commercial d'une filiale à Barcelone ne seront probablement pas les mêmes qu'un logisticien à Passerelle CDG).
            <br><br>
            En revanche, un système de droit "basiques" se limite généralement à une différenciation entre Administrateur, Rédacteur, utilisateur et invité.
            <br>nb : Vous pouvez vous <a class="linked" href="/login">authentifier</a> pour voir des articles filtrés par type d'utilisateur
            `
        },
        pwa : {
            src : "/pres/pwa.png",
            title : "Qu'est ce qu'une PWA ?",
            body : `Les applications web progressives (ou "progressive web applications" en anglais, abrégées en PWAs) sont des applications web qui utilisent différentes fonctionnalités de la plateforme web, avec l'amélioration progressive pour fournir aux utilisatrices et utilisateurs une expérience équivalente à celle des applications natives
            Les applications web progressives ont plusieurs avantages : elles peuvent être installées, améliorées progressivement, conçues de façon adaptative, maintenir l'engagement, être indiquées avec un lien, découvrables, indépendantes de l'état du réseau, et sécurisées. Elles permettent en outre de consulter les contenus même en étant hors-ligne`
        },
        cicd : {
            src : "/pres/cd.png",
            title : "Qu'est ce que le déploiement continu ?",
            body : `L'intégration, la livraison et le déploiement continus font ensemble partie de ce que l'on appelle le développement logiciel continu, et sont souvent associés aux méthodologies Agile.<br>
                <br><br>
                Dans le contexte de cette application web, nous proposons une logique de déploiement simplifiée :<br>
                Chaque modification du code est automatiquement testée sur un serveur intermédiaire, puis déployée sur le serveur de production en cas de réussite du test.
                `
        },
        plx : {
          images : [ 'pres/refs/plx-users-01.jpg','pres/refs/plx-users-02.jpg', 'pres/refs/plx-users-03.jpg'],
          vh : 95,
          vw : 95
        }
    }
  
  </script>
  
  {#await import('svelte-draggable-draw') then c} 
  <svelte:component this={c.default} bind:visible maxVH={modals[modalContent].vw || 70} minVH={modals[modalContent].vh || 85}>
  
  <span slot="left" class="flex items-center justify-center scrubber">
    <button on:click|self={()=>visible=false} 
      class="bouton-modal inline-flex items-center py-2 px-3 text-sm font-medium text-center text-other-white bg-great-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
        Fermer
    </button>
  </span>
  {#if modals[modalContent].title}
    <img class="rounded-t-lg" src={modals[modalContent].src} alt="" />
    <div class="p-5">
    <a href="#">
      <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900">
          {modals[modalContent].title}
      </h5>
    </a>
    <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
      {@html modals[modalContent].body}
    </p>
    </div>
  {:else}
    <svelte:component
      this={Carousel}
      bind:this={carousel}
    >
    {#each modals[modalContent].images as img}
      <img src={img} >
    {/each}
  </svelte:component>
  
  {/if}
  </svelte:component>
  {/await}
  
  <!-- Start block -->
  <section class="bg-white dark:bg-gray-800 mt-32">
    <div class="grid max-w-screen-xl px-4 pt-20 pb-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12 lg:pt-28">
        <div class="mr-auto place-self-center lg:col-span-7">
            <h1 class="text-gray-900 max-w-2xl mb-4 text-4xl font-extrabold leading-none tracking-tight md:text-5xl xl:text-6xl dark:text-white">
                La gestion de contenus adaptée aux besoins<br>de Servair    
            </h1>
            <p class="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
                Une solution pour un extranet sécurisé, souple, simple, rapide et moderne.<br>
                Derrière ce lexique accrocheur, il n'y a pourtant qu'un ensemble de caractéristiques techniques et fonctionnelles tout à fait concret, que nous vous présentons ici</p>
            <div class="space-y-4 sm:flex sm:space-y-0 sm:space-x-4">
                <a href="cahier-des-charges.pdf" target="_blank" class="inline-flex items-center justify-center w-full px-5 py-3 mb-2 mr-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:w-auto focus:outline-none hover:bg-great-blue-100 hover:text-great-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clip-rule="evenodd" /></svg>
                  &nbsp;Votre cahier des charges
                </a> 
                <a href="#" target="_blank" class="inline-flex items-center justify-center w-full px-5 py-3 mb-2 mr-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:w-auto focus:outline-none hover:bg-great-blue-100 hover:text-great-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.736 6.979C9.208 6.193 9.696 6 10 6c.304 0 .792.193 1.264.979a1 1 0 001.715-1.029C12.279 4.784 11.232 4 10 1s-2.279.784-2.979 1.95c-.285.475-.507 1-.67 1.55H6a1 1 0 000 2h.013a9.358 9.358 0 000 1H6a1 1 0 100 2h.351c.163.55.385 1.075.67 1.55C7.721 15.216 8.768 16 10 16s2.279-.784 2.979-1.95a1 1 0 10-1.715-1.029c-.472.786-.96.979-1.264.979-.304 0-.792-.193-1.264-.979a4.265 4.265 0 01-.264-.521H10a1 1 0 100-2H8.017a7.36 7.36 0 010-1H10a1 1 0 100-2H8.472c.08-.185.167-.36.264-.521z" clip-rule="evenodd" /></svg>
                  &nbsp; Proposition financière
                </a>
            </div>
        </div>
        <div class="hidden lg:mt-0 lg:col-span-5 lg:flex lg:flex-row-reverse">
            <img src="sigle-servair.png" alt="hero image">
        </div>                
    </div>
  </section>
  
  <!-- End block -->
  <!-- Start block -->
  
  <section class="bg-white dark:bg-gray-800">
      <div class="max-w-screen-xl px-4 pb-8 mx-auto lg:pb-16">
          <div class="grid grid-cols-2 text-gray-500 gap-y-6 sm:grid-cols-3 lg:grid-cols-6 dark:text-gray-400">
  
              <Saos animation={"slide-top 0.25s cubic-bezier(0.250, 0.460, 0.450, 0.940) both"}>
                  <a on:mouseenter={()=>link[0]=true} on:mouseleave={()=>link[0]=false} href="#enjeu" class="flex items-center lg:justify-start hover:text-great-blue-400">
                      <svg class:gblue={link[0]} xmlns="http://www.w3.org/2000/svg" class="w-8 dark:fill-gray-400" viewBox="0 0 576 512"><path d="M208 0c-29.87 0-54.74 20.55-61.8 48.22-.75-.02-1.45-.22-2.2-.22-35.34 0-64 28.65-64 64 0 4.84.64 9.51 1.66 14.04C52.54 138 32 166.57 32 200c0 12.58 3.16 24.32 8.34 34.91C16.34 248.72 0 274.33 0 304c0 33.34 20.42 61.88 49.42 73.89-.9 4.57-1.42 9.28-1.42 14.11 0 39.76 32.23 72 72 72 4.12 0 8.1-.55 12.03-1.21C141.61 491.31 168.25 512 200 512c39.77 0 72-32.24 72-72V205.45c-10.91 8.98-23.98 15.45-38.36 18.39-4.97 1.02-9.64-2.82-9.64-7.89v-16.18c0-3.57 2.35-6.78 5.8-7.66 24.2-6.16 42.2-27.95 42.2-54.04V64c0-35.35-28.66-64-64-64zm368 304c0-29.67-16.34-55.28-40.34-69.09 5.17-10.59 8.34-22.33 8.34-34.91 0-33.43-20.54-62-49.66-73.96 1.02-4.53 1.66-9.2 1.66-14.04 0-35.35-28.66-64-64-64-.75 0-1.45.2-2.2.22C422.74 20.55 397.87 0 368 0c-35.34 0-64 28.65-64 64v74.07c0 26.09 17.99 47.88 42.2 54.04 3.46.88 5.8 4.09 5.8 7.66v16.18c0 5.07-4.68 8.91-9.64 7.89-14.38-2.94-27.44-9.41-38.36-18.39V440c0 39.76 32.23 72 72 72 31.75 0 58.39-20.69 67.97-49.21 3.93.67 7.91 1.21 12.03 1.21 39.77 0 72-32.24 72-72 0-4.83-.52-9.54-1.42-14.11 29-12.01 49.42-40.55 49.42-73.89z"/></svg>
                      &nbsp;&nbsp;L'enjeu
                  </a>
              </Saos>
  
              <Saos animation={"slide-top 0.25s cubic-bezier(0.250, 0.460, 0.450, 0.940) 0.25s both"}>
                  <a on:mouseenter={()=>link[1]=true} on:mouseleave={()=>link[1]=false} href="#contraintes" class="flex items-center lg:justify-start hover:text-great-blue-400">
                      <svg class:gblue={link[1]} class="w-8 dark:fill-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M550.5 241l-50.089-86.786c1.071-2.142 1.875-4.553 1.875-7.232 0-8.036-6.696-14.733-14.732-15.001l-55.447-95.893c.536-1.607 1.071-3.214 1.071-4.821 0-8.571-6.964-15.268-15.268-15.268-4.821 0-8.839 2.143-11.786 5.625H299.518C296.839 18.143 292.821 16 288 16s-8.839 2.143-11.518 5.625H170.411C167.464 18.143 163.447 16 158.625 16c-8.303 0-15.268 6.696-15.268 15.268 0 1.607.536 3.482 1.072 4.821l-55.983 97.233c-5.356 2.41-9.107 7.5-9.107 13.661 0 .535.268 1.071.268 1.607l-53.304 92.143c-7.232 1.339-12.59 7.5-12.59 15 0 7.232 5.089 13.393 12.054 15l55.179 95.358c-.536 1.607-.804 2.946-.804 4.821 0 7.232 5.089 13.393 12.054 14.732l51.697 89.732c-.536 1.607-1.071 3.482-1.071 5.357 0 8.571 6.964 15.268 15.268 15.268 4.821 0 8.839-2.143 11.518-5.357h106.875C279.161 493.857 283.447 496 288 496s8.839-2.143 11.518-5.357h107.143c2.678 2.946 6.696 4.821 10.982 4.821 8.571 0 15.268-6.964 15.268-15.268 0-1.607-.267-2.946-.803-4.285l51.697-90.268c6.964-1.339 12.054-7.5 12.054-14.732 0-1.607-.268-3.214-.804-4.821l54.911-95.358c6.964-1.339 12.322-7.5 12.322-15-.002-7.232-5.092-13.393-11.788-14.732zM153.535 450.732l-43.66-75.803h43.66v75.803zm0-83.839h-43.66c-.268-1.071-.804-2.142-1.339-3.214l44.999-47.41v50.624zm0-62.411l-50.357 53.304c-1.339-.536-2.679-1.34-4.018-1.607L43.447 259.75c.535-1.339.535-2.679.535-4.018s0-2.41-.268-3.482l51.965-90c2.679-.268 5.357-1.072 7.768-2.679l50.089 51.965v92.946zm0-102.322l-45.803-47.41c1.339-2.143 2.143-4.821 2.143-7.767 0-.268-.268-.804-.268-1.072l43.928-15.804v72.053zm0-80.625l-43.66 15.804 43.66-75.536v59.732zm326.519 39.108l.804 1.339L445.5 329.125l-63.75-67.232 98.036-101.518.268.268zM291.75 355.107l11.518 11.786H280.5l11.25-11.786zm-.268-11.25l-83.303-85.446 79.553-84.375 83.036 87.589-79.286 82.232zm5.357 5.893l79.286-82.232 67.5 71.25-5.892 28.125H313.714l-16.875-17.143zM410.411 44.393c1.071.536 2.142 1.072 3.482 1.34l57.857 100.714v.536c0 2.946.803 5.624 2.143 7.767L376.393 256l-83.035-87.589L410.411 44.393zm-9.107-2.143L287.732 162.518l-57.054-60.268 166.339-60h4.287zm-123.483 0c2.678 2.678 6.16 4.285 10.179 4.285s7.5-1.607 10.179-4.285h75L224.786 95.821 173.893 42.25h103.928zm-116.249 5.625l1.071-2.142a33.834 33.834 0 0 0 2.679-.804l51.161 53.84-54.911 19.821V47.875zm0 79.286l60.803-21.964 59.732 63.214-79.553 84.107-40.982-42.053v-83.304zm0 92.678L198 257.607l-36.428 38.304v-76.072zm0 87.858l42.053-44.464 82.768 85.982-17.143 17.678H161.572v-59.196zm6.964 162.053c-1.607-1.607-3.482-2.678-5.893-3.482l-1.071-1.607v-89.732h99.91l-91.607 94.821h-1.339zm129.911 0c-2.679-2.41-6.428-4.285-10.447-4.285s-7.767 1.875-10.447 4.285h-96.429l91.607-94.821h38.304l91.607 94.821H298.447zm120-11.786l-4.286 7.5c-1.339.268-2.41.803-3.482 1.339l-89.196-91.875h114.376l-17.412 83.036zm12.856-22.232l12.858-60.803h21.964l-34.822 60.803zm34.822-68.839h-20.357l4.553-21.16 17.143 18.214c-.535.803-1.071 1.874-1.339 2.946zm66.161-107.411l-55.447 96.697c-1.339.535-2.679 1.071-4.018 1.874l-20.625-21.964 34.554-163.928 45.803 79.286c-.267 1.339-.803 2.678-.803 4.285 0 1.339.268 2.411.536 3.75z"/></svg>
                      &nbsp;&nbsp;Contraintes
                  </a>
              </Saos>
  
              <Saos animation={"slide-top 0.25s cubic-bezier(0.250, 0.460, 0.450, 0.940) 0.45s both"}>
                  <a on:mouseenter={()=>link[2]=true} on:mouseleave={()=>link[2]=false} href="#techno" class="flex items-center lg:justify-start hover:text-great-blue-400">
                      <svg class:gblue={link[2]} class="w-8 dark:fill-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M160 352h192V160H160V352zM448 176h48C504.8 176 512 168.8 512 160s-7.162-16-16-16H448V128c0-35.35-28.65-64-64-64h-16V16C368 7.164 360.8 0 352 0c-8.836 0-16 7.164-16 16V64h-64V16C272 7.164 264.8 0 256 0C247.2 0 240 7.164 240 16V64h-64V16C176 7.164 168.8 0 160 0C151.2 0 144 7.164 144 16V64H128C92.65 64 64 92.65 64 128v16H16C7.164 144 0 151.2 0 160s7.164 16 16 16H64v64H16C7.164 240 0 247.2 0 256s7.164 16 16 16H64v64H16C7.164 336 0 343.2 0 352s7.164 16 16 16H64V384c0 35.35 28.65 64 64 64h16v48C144 504.8 151.2 512 160 512c8.838 0 16-7.164 16-16V448h64v48c0 8.836 7.164 16 16 16c8.838 0 16-7.164 16-16V448h64v48c0 8.836 7.164 16 16 16c8.838 0 16-7.164 16-16V448H384c35.35 0 64-28.65 64-64v-16h48c8.838 0 16-7.164 16-16s-7.162-16-16-16H448v-64h48C504.8 272 512 264.8 512 256s-7.162-16-16-16H448V176zM384 368c0 8.836-7.162 16-16 16h-224C135.2 384 128 376.8 128 368v-224C128 135.2 135.2 128 144 128h224C376.8 128 384 135.2 384 144V368z"/></svg>
                      &nbsp;&nbsp;Technologie
                  </a>
              </Saos>
  
              <Saos animation={"slide-top 0.25s cubic-bezier(0.250, 0.460, 0.450, 0.940) 0.65s both"}>
                  <a on:mouseenter={()=>link[4]=true} on:mouseleave={()=>link[4]=false} href="#comparatif" class="flex items-center lg:justify-start hover:text-great-blue-400">
                      <!-- <svg  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path stroke-linecap="round" stroke-linejoin="round" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" /></svg> -->
                      <svg class:gblue={link[4]} class="w-8 dark:fill-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><!--! Font Awesome Pro 6.1.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M32 64C49.67 64 64 78.33 64 96V416C64 433.7 49.67 448 32 448C14.33 448 0 433.7 0 416V96C0 78.33 14.33 64 32 64zM246.6 137.4C259.1 149.9 259.1 170.1 246.6 182.6L205.3 224H434.7L393.4 182.6C380.9 170.1 380.9 149.9 393.4 137.4C405.9 124.9 426.1 124.9 438.6 137.4L534.6 233.4C547.1 245.9 547.1 266.1 534.6 278.6L438.6 374.6C426.1 387.1 405.9 387.1 393.4 374.6C380.9 362.1 380.9 341.9 393.4 329.4L434.7 288H205.3L246.6 329.4C259.1 341.9 259.1 362.1 246.6 374.6C234.1 387.1 213.9 387.1 201.4 374.6L105.4 278.6C92.88 266.1 92.88 245.9 105.4 233.4L201.4 137.4C213.9 124.9 234.1 124.9 246.6 137.4V137.4zM640 416C640 433.7 625.7 448 608 448C590.3 448 576 433.7 576 416V96C576 78.33 590.3 64 608 64C625.7 64 640 78.33 640 96V416z"/></svg>
                      &nbsp;&nbsp;Comparatif
                  </a>
              </Saos>
              <Saos animation={"slide-top 0.25s cubic-bezier(0.250, 0.460, 0.450, 0.940) 0.65s both"}>
                  <a on:mouseenter={()=>link[5]=true} on:mouseleave={()=>link[5]=false} href="#timeline" class="flex items-center lg:justify-start hover:text-great-blue-400">
                      <!-- <svg  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path stroke-linecap="round" stroke-linejoin="round" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" /></svg> -->
                      <svg class:gblue={link[5]} class="w-8 dark:fill-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><!--! Font Awesome Pro 6.1.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M160 224H480V169.3C451.7 156.1 432 128.8 432 96C432 51.82 467.8 16 512 16C556.2 16 592 51.82 592 96C592 128.8 572.3 156.1 544 169.3V224H608C625.7 224 640 238.3 640 256C640 273.7 625.7 288 608 288H352V342.7C380.3 355 400 383.2 400 416C400 460.2 364.2 496 320 496C275.8 496 240 460.2 240 416C240 383.2 259.7 355 288 342.7V288H32C14.33 288 0 273.7 0 256C0 238.3 14.33 224 32 224H96V169.3C67.75 156.1 48 128.8 48 96C48 51.82 83.82 16 128 16C172.2 16 208 51.82 208 96C208 128.8 188.3 156.1 160 169.3V224zM128 120C141.3 120 152 109.3 152 96C152 82.75 141.3 72 128 72C114.7 72 104 82.75 104 96C104 109.3 114.7 120 128 120zM512 72C498.7 72 488 82.75 488 96C488 109.3 498.7 120 512 120C525.3 120 536 109.3 536 96C536 82.75 525.3 72 512 72zM320 440C333.3 440 344 429.3 344 416C344 402.7 333.3 392 320 392C306.7 392 296 402.7 296 416C296 429.3 306.7 440 320 440z"/></svg>
                      &nbsp;&nbsp;Timeline
                  </a>
              </Saos>
  
              <Saos animation={"slide-top 0.25s cubic-bezier(0.250, 0.460, 0.450, 0.940) 0.85s both"}>
  
                  <a on:mouseenter={()=>link[6]=true} on:mouseleave={()=>link[6]=false} href="#faq" class="flex items-center lg:justify-start hover:text-great-blue-400">
                      <!-- <svg  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path stroke-linecap="round" stroke-linejoin="round" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" /></svg> -->
                      <svg class:gblue={link[6]} class="w-8 dark:fill-gray-400"  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Pro 6.1.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M256 0C114.6 0 0 114.6 0 256s114.6 256 256 256s256-114.6 256-256S397.4 0 256 0zM256 400c-18 0-32-14-32-32s13.1-32 32-32c17.1 0 32 14 32 32S273.1 400 256 400zM325.1 258L280 286V288c0 13-11 24-24 24S232 301 232 288V272c0-8 4-16 12-21l57-34C308 213 312 206 312 198C312 186 301.1 176 289.1 176h-51.1C225.1 176 216 186 216 198c0 13-11 24-24 24s-24-11-24-24C168 159 199 128 237.1 128h51.1C329 128 360 159 360 198C360 222 347 245 325.1 258z"/></svg>
                      &nbsp;&nbsp;Questions / Réponses
                  </a>
  
              </Saos>
          </div>
      </div>
  </section>
  
  <!-- End block -->
  <!-- NOTE REPONSE BIEN ADAPTEE -->
  <!-- Start block -->
  
  <section id="enjeu" class="bg-gray-100 dark:bg-gray-900 mt-24">
  <div class="items-center max-w-screen-xl px-4 py-8 mx-auto lg:grid lg:grid-cols-4 lg:gap-16 xl:gap-24 lg:py-24 lg:px-6">
      <div class="col-span-2 mb-8">
          <p class="text-lg font-medium text-great-blue-600 dark:text-great-blue-500">
              Une réponse bien adaptée à un problème bien défini
          </p>
          <h2 class="mt-3 mb-4 text-4xl font-extrabold tracking-tight text-gray-900 md:text-4xl dark:text-white">
              L'enjeu pour Servair
          </h2>
          <p class="font-light text-gray-500 sm:text-xl dark:text-gray-400">
            Une majorité de salariés est inaccesible à la communication interne numérique du groupe.<br>
            Dans un secteur et un contexte économique en grande tension, c'est un problème <strong>urgent</strong> qui demande une réponse <strong>spécifique</strong>.
            <br>
          </p>
          <div class="pt-6 mt-6 space-y-4 border-t border-gray-200 dark:border-gray-700">
              <div>
                <a href="/login" class="inline-flex items-center text-base font-medium text-great-blue-600 hover:text-great-blue-800 dark:text-great-blue-500 dark:hover:text-great-blue-700">
                  Authentifiez-vous pour voir des articles filtrés par type d'utilisateur
                  <svg class="w-5 h-5 ml-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                </a>
              </div>
              <div>
                <a href="https://serdir.redval.fr" class="inline-flex items-center text-base font-medium text-great-blue-600 hover:text-great-blue-800 dark:text-great-blue-500 dark:hover:text-great-blue-700">
                    Voir le back-office
                    <svg class="w-5 h-5 ml-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                </a>
              </div> 
              <ul class="list-disc text-gray-900 dark:text-gray-100 font-thin text-sm pb-8">
                Vous pouvez vous connecter au back ou au front avec ces identifiants :<br><br>
                <li>
                  <strong>Marie Dupuis</strong><br>(personnel non-cadre, filiale "Passerelle")<br>
                  <em>login</em> : marie.dupuis@test.fr
                  <br>
                  <em>mot de passe</em> : J3@nB3n01t
                </li>
                <br>
                <li>
                  <strong>Franck Martin</strong><br>(personnel cadre, filiale "OAT")<br>
                  <em>login</em> : franck.martin@test.fr
                  <br>
                  <em>mot de passe</em> : t3st@t3st.fr
                </li>
              </ul>
          </div>
      </div>
      <div class="col-span-2 space-y-8 md:grid md:grid-cols-2 md:gap-12 md:space-y-0">
          <Saos animation={"slide-top 0.5s cubic-bezier(0.35, 0.5, 0.65, 0.95) both"}>
              <div>
                  <!-- <svg class="w-10 h-10 mb-2 text-great-blue-600 md:w-12 md:h-12 dark:text-great-blue-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"></path></svg> -->
                  <svg class="w-10 h-10 mb-2 text-great-blue-600 md:w-12 md:h-12 dark:text-great-blue-500" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M150.7 92.77C195 58.27 251.8 32 320 32C400.8 32 465.5 68.84 512.6 112.6C559.4 156 590.7 207.1 605.5 243.7C608.8 251.6 608.8 260.4 605.5 268.3C592.1 300.6 565.2 346.1 525.6 386.7L630.8 469.1C641.2 477.3 643.1 492.4 634.9 502.8C626.7 513.2 611.6 515.1 601.2 506.9L9.196 42.89C-1.236 34.71-3.065 19.63 5.112 9.196C13.29-1.236 28.37-3.065 38.81 5.112L150.7 92.77zM223.1 149.5L313.4 220.3C317.6 211.8 320 202.2 320 191.1C320 180.5 316.1 169.7 311.6 160.4C314.4 160.1 317.2 159.1 320 159.1C373 159.1 416 202.1 416 255.1C416 269.7 413.1 282.7 407.1 294.5L446.6 324.7C457.7 304.3 464 280.9 464 255.1C464 176.5 399.5 111.1 320 111.1C282.7 111.1 248.6 126.2 223.1 149.5zM320 480C239.2 480 174.5 443.2 127.4 399.4C80.62 355.1 49.34 304 34.46 268.3C31.18 260.4 31.18 251.6 34.46 243.7C44 220.8 60.29 191.2 83.09 161.5L177.4 235.8C176.5 242.4 176 249.1 176 255.1C176 335.5 240.5 400 320 400C338.7 400 356.6 396.4 373 389.9L446.2 447.5C409.9 467.1 367.8 480 320 480H320z"/></svg>
                  <h3 class="mb-2 text-gray-900 text-2xl font-bold dark:text-white">85% des salariés isolés</h3>
                  <p class="font-light text-gray-500 dark:text-gray-400">
                      C'est un challenge à plusieurs niveaux techniques et fonctionnels, de la sécurité à l'expérience utilisateur en passant par les performances
                  </p>
              </div>
          </Saos>
          <Saos animation={"slide-top 0.5s cubic-bezier(0.35, 0.5, 0.65, 0.95) both"}>
          <div>
              <svg class="w-10 h-10 mb-2 text-great-blue-600 md:w-12 md:h-12 dark:text-great-blue-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.012 6.012 0 011.912-2.706C6.512 5.73 6.974 6 7.5 6A1.5 1.5 0 019 7.5V8a2 2 0 004 0 2 2 0 011.523-1.943A5.977 5.977 0 0116 10c0 .34-.028.675-.083 1H15a2 2 0 00-2 2v2.197A5.973 5.973 0 0110 16v-2a2 2 0 00-2-2 2 2 0 01-2-2 2 2 0 00-1.668-1.973z" clip-rule="evenodd"></path></svg>
              <h3 class="mb-2 text-gray-900 text-2xl font-bold dark:text-white">19 pays</h3>
              <p class="font-light text-gray-500 dark:text-gray-400">
                  La présence à l'international de Servair suppose de prévoir à la fois l'internationalisation de la plateforme et une optimisation pour s'adapter à des vitesses de connexion très variables</p>
          </div>
          </Saos>
          <Saos animation={"slide-bottom 0.5s cubic-bezier(0.35, 0.5, 0.65, 0.95) both"}>
          <div>
            <svg class="w-10 h-10 mb-2 text-great-blue-600 md:w-12 md:h-12 dark:text-great-blue-500" fill="currentColor"  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M184 88C184 118.9 158.9 144 128 144C97.07 144 72 118.9 72 88C72 57.07 97.07 32 128 32C158.9 32 184 57.07 184 88zM208.4 196.3C178.7 222.7 160 261.2 160 304C160 338.3 171.1 369.8 192 394.5V416C192 433.7 177.7 448 160 448H96C78.33 448 64 433.7 64 416V389.2C26.16 371.2 0 332.7 0 288C0 226.1 50.14 176 112 176H144C167.1 176 190.2 183.5 208.4 196.3V196.3zM64 245.7C54.04 256.9 48 271.8 48 288C48 304.2 54.04 319.1 64 330.3V245.7zM448 416V394.5C468 369.8 480 338.3 480 304C480 261.2 461.3 222.7 431.6 196.3C449.8 183.5 472 176 496 176H528C589.9 176 640 226.1 640 288C640 332.7 613.8 371.2 576 389.2V416C576 433.7 561.7 448 544 448H480C462.3 448 448 433.7 448 416zM576 330.3C585.1 319.1 592 304.2 592 288C592 271.8 585.1 256.9 576 245.7V330.3zM568 88C568 118.9 542.9 144 512 144C481.1 144 456 118.9 456 88C456 57.07 481.1 32 512 32C542.9 32 568 57.07 568 88zM256 96C256 60.65 284.7 32 320 32C355.3 32 384 60.65 384 96C384 131.3 355.3 160 320 160C284.7 160 256 131.3 256 96zM448 304C448 348.7 421.8 387.2 384 405.2V448C384 465.7 369.7 480 352 480H288C270.3 480 256 465.7 256 448V405.2C218.2 387.2 192 348.7 192 304C192 242.1 242.1 192 304 192H336C397.9 192 448 242.1 448 304zM256 346.3V261.7C246 272.9 240 287.8 240 304C240 320.2 246 335.1 256 346.3zM384 261.7V346.3C393.1 335 400 320.2 400 304C400 287.8 393.1 272.9 384 261.7z"/></svg>
            <h3 class="mb-2 text-gray-900 text-2xl font-bold dark:text-white">Des profils variés</h3>
            <p class="font-light text-gray-500 dark:text-gray-400">
              L'expérience utilisateur, côté front-end comme back-end doit être pensée pour une population variée et potentiellement non-initiée aux usages modernes des applications web</p>
          </div>
          </Saos>
          <Saos animation={"slide-bottom 0.5s cubic-bezier(0.35, 0.5, 0.65, 0.95) both"}>
              <div>
              <!-- <svg class="w-10 h-10 mb-2 text-great-blue-600 md:w-12 md:h-12 dark:text-great-blue-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M2 5a2 2 0 012-2h12a2 2 0 012 2v2a2 2 0 01-2 2H4a2 2 0 01-2-2V5zm14 1a1 1 0 11-2 0 1 1 0 012 0zM2 13a2 2 0 012-2h12a2 2 0 012 2v2a2 2 0 01-2 2H4a2 2 0 01-2-2v-2zm14 1a1 1 0 11-2 0 1 1 0 012 0z" clip-rule="evenodd"></path></svg> -->
              <svg class="w-10 h-10 mb-2 text-great-blue-600 md:w-12 md:h-12 dark:text-great-blue-500" fill="currentColor"xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M282.3 343.7L248.1 376.1C244.5 381.5 238.4 384 232 384H192V424C192 437.3 181.3 448 168 448H128V488C128 501.3 117.3 512 104 512H24C10.75 512 0 501.3 0 488V408C0 401.6 2.529 395.5 7.029 391L168.3 229.7C162.9 212.8 160 194.7 160 176C160 78.8 238.8 0 336 0C433.2 0 512 78.8 512 176C512 273.2 433.2 352 336 352C317.3 352 299.2 349.1 282.3 343.7zM376 176C398.1 176 416 158.1 416 136C416 113.9 398.1 96 376 96C353.9 96 336 113.9 336 136C336 158.1 353.9 176 376 176z"/></svg>
              <h3 class="mb-2 text-gray-900 text-2xl font-bold dark:text-white">
                  Une auhentification spécifique
              </h3>
              <p class="font-light text-gray-500 dark:text-gray-400">
                  Sans adresse email pro et sans possibilité d'utiliser des informations personnelles, une autre méthode sécurisée d'authentification doit être envisagée
              </p>
              </div>
          </Saos>
      </div>
  </div>
  </section>
  <!-- End block -->
  
  
  <!-- NOTE ET LA DIGITAL WORKSPACE  -->
  <Saos animation={"puff-in-center 0.7s cubic-bezier(0.470, 0.000, 0.745, 0.715) both"}>
  <div id="dp" class="py-16 lgrad">
    <div class="container m-auto px-6 text-gray-600 md:px-12 xl:px-6">
        <div class="max-w-screen-xl mx-auto space-y-6 md:space-y-0 md:flex md:gap-6 lg:items-center lg:gap-12">
          <div class="md:5/12 lg:w-6/12">
              <img src="pres/digital-workspace.png" class="filtre" alt="image" loading="lazy" width="" height="">
            </div>
          <div class="space-y-6 md:7/12 lg:w-6/12">
              <h2 class="text-white-light max-w-2xl mb-4 text-3xl font-extrabold leading-none tracking-tight md:text-4xl xl:text-4xl">
                  Et la digital workspace dans tout&nbsp;ça&nbsp;?
              </h2>
            <div class="space-y-4">
              <p class="font-light sm:text-xl sm:leading-8 text-white-light">
                Si nous avons bien pris note de la demande de Servair de déployer au sein du groupe une "digital worskpace", nous pensons toutefois qu'un tel outil ne peut répondre à la demande initiale de communiquer avec les 85% de salariés "isolés".
                <br><br>
                Toutefois, pour le personnel "connecté" à l'infrastructure Servair, nous suggérons l'emploi de <a class="font-bold underline" target="_blank" href="https://www.notion.so/fr-fr">Notion</a> dont les équipes proposent un large éventail de services allant de la vente au déploiement, en coopération avec les DSI.
                <br><br>
                Il sera par la suite tout à fait possible de connecter notre solution à Notion (ou apparenté), aussi bien via un point d'entrée unique (SSO) que par le partage des données (stockage des médias décentralisé <a class="font-bold hover:underline" href="#techno">sur un cloud Azure</a> et via des API / microservices pour les contenus).
              </p>
             
            </div>
            <a href="#" class="block w-full py-3 text-center rounded-full transition bg-blue-200 hover:bg-blue-100 active:bg-blue-300 focus:bg-blue-100 sm:w-max">
              <span class="block text-white-light hover:underline font-semibold text-sm">
                  
              </span>
            </a>
          </div>
        </div>
    </div>
  </div>
  </Saos>
             
  
  <!-- NOTE CONTRAINTES -->
  <Saos animation={"puff-in-center 0.7s cubic-bezier(0.470, 0.000, 0.745, 0.715) both"}>
  <div id="contraintes" class="py-16 sgrad">
    <div class="container m-auto px-6 text-gray-600 md:px-12 xl:px-6">
        <div class="max-w-screen-xl mx-auto space-y-6 md:space-y-0 md:flex md:gap-6 lg:items-center lg:gap-12">
          <div class="space-y-6 md:7/12 lg:w-6/12">
              <h2 class="text-white-light max-w-2xl mb-4 text-3xl font-extrabold leading-none tracking-tight md:text-4xl xl:text-4xl">
                  Les contraintes posées
              </h2>
            <div class="space-y-4">
              <p class="font-light sm:text-xl sm:leading-8 text-white-light">
                Pour communiquer aussi bien vers un opérationnel à Bamako qu'un directeur à Roissy,
                il n'existe qu'un nombre <strong>très limité de de solutions</strong> techniques à une telle variété de profils, d'un point de vue à la fois technique, géographique et d'utilisateur.
              </p>
                <ul class="list-disc text-white-light font-thin sm:text-xl sm:leading-8 pt-8">
                  <li>
                      <strong>Variété des profils</strong><br>
                      L'application doit permettre une vitesse de connexion et d'utilisation optimale, afin que des utilisateurs dans des <em>contextes géopgraphiques</em> et technologiques extrêmement variés puissent s'y connecter facilement.
                  </li>
                  <br>
                  <li>
                      <strong>Variété de niveaux utilisateurs</strong><br>
                      La grande diversité de compétences techniques suppose un usage très simple, et de ce fait, la conception d'une ergonomie très <em>intuitive</em>. 
                  </li>
                </ul>
            </div>
            <a href="#" class="block w-full py-3 text-center rounded-full transition bg-blue-200 hover:bg-blue-100 active:bg-blue-300 focus:bg-blue-100 sm:w-max">
              <span class="block text-white-light hover:underline font-semibold text-sm">
                  
              </span>
            </a>
          </div>
          <div class="md:5/12 lg:w-6/12">
            <img src="pres/refs/world.png" alt="image" loading="lazy" width="" height="">
          </div>
        </div>
    </div>
  </div>
  </Saos>
  
  
  
  <!-- NOTE COMMENT CA MARCHE -->
  
  <!-- Start block -->
  <Saos animation={"puff-in-center 0.5s cubic-bezier(0.35, 0.5, 0.65, 0.95) both"}>
  <section id="techno" class="bg-gray-100 dark:bg-gray-800">
    <div class="max-w-screen-xl px-4 py-8 mx-auto space-y-12 lg:space-y-20 lg:py-24 lg:px-6">
        <!-- Row -->
        <div class="items-start gap-8 lg:grid lg:grid-cols-2 xl:gap-16">
            <div class="text-gray-500 sm:text-lg dark:text-gray-400">
                <h2 class="mb-4 text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
                  Comment ça marche ?
                </h2>
                  <p class="mb-8 font-light lg:text-xl">
                      Nous avons retenu une approche modulaire moderne, permettant de s'adapter aux défis d'aujourd'hui et aux choix technologiques de demain :
                      <br><br>
                      Cette solution est composée de trois principaux piliers :
                  </p>
                <!-- List -->
                <ul role="list" class="pt-8 space-y-5 border-t border-gray-200 my-7 dark:border-gray-700">
                    <li class="flex space-x-3">
                        <!-- Icon -->
                      <svg class="flex-shrink-0 w-5 h-5 text-great-blue-500 dark:text-great-blue-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>
                      <span class="text-base font-medium leading-tight text-gray-900 dark:text-white">
                          <u on:click={()=>switchVisible('cdn')}>
                            Le front-office, grâce à un CDN</u>, permettra de consulter l'application presque aussi rapidement à Dakar qu'à Londres.
                      </span>
                    </li>
                    <li class="flex space-x-3">
                        <!-- Icon -->
                        <svg class="flex-shrink-0 w-5 h-5 text-great-blue-500 dark:text-great-blue-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>
                        <span class="text-base font-medium leading-tight text-gray-900 dark:text-white">
                          Un back-office simple et très puissant :  <u on:click={()=>switchVisible('directus')}>Directus</u>
                          C'est ici que vous produirez vos contenus (articles, agendas, pages, news et même emailing et notifications personnalisées)
                        </span>
                    </li>
                    <li class="flex space-x-3">
                        <!-- Icon -->
                        <svg class="flex-shrink-0 w-5 h-5 text-great-blue-500 dark:text-great-blue-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>
                        <span class="text-base font-medium leading-tight text-gray-900 dark:text-white">
                          Les données statiques (images, vidéos...) importées via le back-office seront stockées sur <u on:click={()=>switchVisible('s3')}>Azure</u> et seront reliables à tout autre écosystème / "digital worskpace" Servair, actuel ou à venir.
                        </span>
                    </li>
                    <li class="flex space-x-3">
                      <!-- Icon -->
                      <svg class="flex-shrink-0 w-5 h-5 text-great-blue-500 dark:text-great-blue-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>
                      <span class="text-base font-medium leading-tight text-gray-900 dark:text-white">
                          L'utilisateur peut consulter la plateforme via un navigateur web ou un mobile. Une application mobile de type <u on:click={()=>switchVisible('pwa')}>PWA</u> sera proposée à l'utilisateur et permettra notamment de consulter les contenus en mode offline.
                      </span>
                  </li>
                </ul>
            </div>
  
            <div class="text-gray-500 sm:text-lg dark:text-gray-400">
              <h2 class="mb-4 text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
                  Et en français dans le texte ?
              </h2>
              <p class="mb-8 font-light lg:text-xl">
                  Voici une illustration par l'exemple<br>du fonctionnement du système :
              </p>
            <!-- List -->
            <ul role="list" class="pt-8 space-y-5 border-t border-gray-200 my-7 dark:border-gray-700">
                <li class="flex space-x-3">
                    <!-- Icon -->
                  <svg class="flex-shrink-0 w-5 h-5 text-great-blue-500 dark:text-great-blue-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>
                  <span class="text-base font-medium leading-tight text-gray-900 dark:text-white">
                      Le rédacteur se connecte au back-office / CMS
                  </span>
                </li>
                <li class="flex space-x-3">
                    <!-- Icon -->
                    <svg class="flex-shrink-0 w-5 h-5 text-great-blue-500 dark:text-great-blue-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>
                    <span class="text-base font-medium leading-tight text-gray-900 dark:text-white">
                      Il rédige un article et ajoute quelques photos
                  </span>
                </li>
                <li class="flex space-x-3">
                    <!-- Icon -->
                    <svg class="flex-shrink-0 w-5 h-5 text-great-blue-500 dark:text-great-blue-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>
                    <span class="text-base font-medium leading-tight text-gray-900 dark:text-white">
                      Automatiquement, les photos sont transférées sur le cloud Azure et sont accessiles à l'ensemble des composants de la plateforme (back-office, front-office, future digital workspace comme notion etc.)<br>
                    </span>
                </li>
                <li class="flex space-x-3">
                    <!-- Icon -->
                      <svg class="flex-shrink-0 w-5 h-5 text-great-blue-500 dark:text-great-blue-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>
                      <span class="text-base font-medium leading-tight text-gray-900 dark:text-white">
                      Le front-end est averti de la publication de l'article et produit les nouvelles pages de contenu.
                      </span>
                </li>
                <li class="flex space-x-3">
                    <!-- Icon -->
                    <svg class="flex-shrink-0 w-5 h-5 text-great-blue-500 dark:text-great-blue-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>
                    <span class="text-base font-medium leading-tight text-gray-900 dark:text-white">
                      Les pages, et les images, sont mises en mémoire aux emplacements les plus proche des utilisateurs, à chaque fois qu'elles sont demandées.
                    </span>
                </li>
                <li class="flex space-x-3">
                  <!-- Icon -->
                  <svg class="flex-shrink-0 w-5 h-5 text-great-blue-500 dark:text-great-blue-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>
                  <span class="text-base font-medium leading-tight text-gray-900 dark:text-white">
                    L'utilisateur final (potentiellement averti via une notification) consulte une page déjà construite, proche de lui, donc très rapidement, et ce, de façon reseponsive (designs adaptés aux différents supports).
                  </span>
              </li>
            </ul>
        </div>
        </div>
        <!-- Row -->
        <div class="items-center gap-8">
          <!-- svelte-ignore a11y-img-redundant-alt -->
          <img class="hidden w-full mb-4 rounded-lg lg:mb-0 lg:flex" src="/pres/schema-big.png" alt="dashboard feature image">
           
        </div>
    </div>
  </section>
  </Saos>
  <!-- End block -->
  
  <!-- NOTE ATOUTS -->
  
  <section class="bg-white dark:bg-gray-900">
  <div class="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
      <div class="max-w-screen-md mb-8 lg:mb-16">
          <h2 class="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
            Nos atouts</h2>
          <p class="text-gray-500 sm:text-xl dark:text-gray-400">
            Pour les plus techniques d'entre nos lecteurs, voici une liste non exhaustive des fonctionnalités de notre solution</p>
      </div>
      <div class="space-y-8 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-12 md:space-y-0">
          <div>
              <div class="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-primary-100 lg:h-12 lg:w-12 dark:bg-primary-900">
                <svg class="dark:fill-great-blue-300" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Pro 6.1.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M256-.0078C260.7-.0081 265.2 1.008 269.4 2.913L457.7 82.79C479.7 92.12 496.2 113.8 496 139.1C495.5 239.2 454.7 420.7 282.4 503.2C265.7 511.1 246.3 511.1 229.6 503.2C57.25 420.7 16.49 239.2 15.1 139.1C15.87 113.8 32.32 92.12 54.3 82.79L242.7 2.913C246.8 1.008 251.4-.0081 256-.0078V-.0078zM256 444.8C393.1 378 431.1 230.1 432 141.4L256 66.77L256 444.8z"/></svg>                </div>
              <h3 class="mb-2 text-xl font-bold dark:text-white">sécurité et résilience</h3>
              <div class="text-gray-500 dark:text-gray-400">
                <ul class="list-disc list-inside leading-8">
                  <li>
                    Back-office (serveur OVH) backupé au quotidien dans un autre data-center
                  </li>
                  <li>
                    Front-end déployé sur plusieurs noeuds du CDN mondial Vercel
                  </li>
                  <li>
                    Médias sur cloud Azure
                  </li>
                </ul>
              </div>
          </div>
          <div>
              <div class="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-primary-100 lg:h-12 lg:w-12 dark:bg-primary-900">
                <svg class="dark:fill-great-blue-300" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                  <path d="M249.4 25.37C261.9 12.88 282.1 12.88 294.6 25.37C307.1 37.87 307.1 58.13 294.6 70.63L269.3 95.1H416C469 95.1 512 138.1 512 191.1V223.1C512 241.7 497.7 255.1 480 255.1C462.3 255.1 448 241.7 448 223.1V191.1C448 174.3 433.7 159.1 416 159.1H269.3L294.6 185.4C307.1 197.9 307.1 218.1 294.6 230.6C282.1 243.1 261.9 243.1 249.4 230.6L169.4 150.6C156.9 138.1 156.9 117.9 169.4 105.4L249.4 25.37zM342.6 361.4C355.1 373.9 355.1 394.1 342.6 406.6L262.6 486.6C250.1 499.1 229.9 499.1 217.4 486.6C204.9 474.1 204.9 453.9 217.4 441.4L242.7 416H96C78.33 416 64 430.3 64 448V480C64 497.7 49.67 512 32 512C14.33 512 0 497.7 0 480V448C0 394.1 42.98 352 96 352H242.7L217.4 326.6C204.9 314.1 204.9 293.9 217.4 281.4C229.9 268.9 250.1 268.9 262.6 281.4L342.6 361.4zM512 384C512 419.3 483.3 448 448 448C412.7 448 384 419.3 384 384C384 348.7 412.7 320 448 320C483.3 320 512 348.7 512 384zM128 128C128 163.3 99.35 192 64 192C28.65 192 0 163.3 0 128C0 92.65 28.65 64 64 64C99.35 64 128 92.65 128 128z"/>
                </svg>
                </div>
              <h3 class="mb-2 text-xl font-bold dark:text-white">Agilité</h3>
              <div class="text-gray-500 dark:text-gray-400">
                <ul class="list-disc list-inside leading-8">
                  <li>
                    SSO (LDAP, OpenID et Oauth2) pour back + front
                  </li>
                  <li>
                    Interopérabilité via APIs simples entre le stockage / front / back / futures web-apps
                  </li>
                </ul>
              </div>
          </div>
          <div>
              <div class="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-primary-100 lg:h-12 lg:w-12 dark:bg-primary-900">
                <svg class="dark:fill-great-blue-300" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><!--! Font Awesome Pro 6.1.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M304 0h-224c-35.35 0-64 28.65-64 64v384c0 35.35 28.65 64 64 64h224c35.35 0 64-28.65 64-64V64C368 28.65 339.3 0 304 0zM192 480c-17.75 0-32-14.25-32-32s14.25-32 32-32s32 14.25 32 32S209.8 480 192 480zM304 64v320h-224V64H304z"/></svg>                </div>
              <h3 class="mb-2 text-xl font-bold dark:text-white">Praticabilité</h3>
              <div class="text-gray-500 dark:text-gray-400">
                <ul class="list-disc list-inside leading-8">
                  <li>
                    Responsive Phone/Tablet/Desktop<br>
                  </li>
                  <li>
                    Dark et light mode<br>
                  </li>
                  <li>
                    PWA iOS/Android pour le front.
                  </li>
                  <li>
                    Push notifications
                  </li>
                  <li>
                    Appli native possible si besoin.
                  </li>
                </ul>
              </div>
          </div>
          <div>
              <div class="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-primary-100 lg:h-12 lg:w-12 dark:bg-primary-900">
                <svg class="dark:fill-great-blue-300" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Pro 6.1.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
                  <path d="M448 80V128C448 172.2 347.7 208 224 208C100.3 208 0 172.2 0 128V80C0 35.82 100.3 0 224 0C347.7 0 448 35.82 448 80zM393.2 214.7C413.1 207.3 433.1 197.8 448 186.1V288C448 332.2 347.7 368 224 368C100.3 368 0 332.2 0 288V186.1C14.93 197.8 34.02 207.3 54.85 214.7C99.66 230.7 159.5 240 224 240C288.5 240 348.3 230.7 393.2 214.7V214.7zM54.85 374.7C99.66 390.7 159.5 400 224 400C288.5 400 348.3 390.7 393.2 374.7C413.1 367.3 433.1 357.8 448 346.1V432C448 476.2 347.7 512 224 512C100.3 512 0 476.2 0 432V346.1C14.93 357.8 34.02 367.3 54.85 374.7z"/>
                </svg></div>
                  <h3 class="mb-2 text-xl font-bold dark:text-white">Base de données</h3>
                <div class="text-gray-500 dark:text-gray-400">
                  <ul class="list-disc list-inside leading-8">
                    <li>
                      Type de bdd pour le back-office : SQL (drivers pour MySQL, PostgreSQL, SQLite, Oracle, MSdb...)<br>
                    </li>
                    <li>
                      Imports facilité d'anciennes bdd <br><a class="underline" href="https://directus.io/#databases">(database mirroring)</a><br>
                    </li>
                    <li>
                      Lecture / Ecriture via API REST ou GraphQL ou via SDK JS/TS<br>
                    </li>
                  </ul>
                </div>
          </div>
  
          <div>
              <div class="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-primary-100 lg:h-12 lg:w-12 dark:bg-primary-900">
                <svg class="dark:fill-great-blue-300" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Pro 6.1.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M64 400C64 408.8 71.16 416 80 416H480C497.7 416 512 430.3 512 448C512 465.7 497.7 480 480 480H80C35.82 480 0 444.2 0 400V64C0 46.33 14.33 32 32 32C49.67 32 64 46.33 64 64V400zM342.6 278.6C330.1 291.1 309.9 291.1 297.4 278.6L240 221.3L150.6 310.6C138.1 323.1 117.9 323.1 105.4 310.6C92.88 298.1 92.88 277.9 105.4 265.4L217.4 153.4C229.9 140.9 250.1 140.9 262.6 153.4L320 210.7L425.4 105.4C437.9 92.88 458.1 92.88 470.6 105.4C483.1 117.9 483.1 138.1 470.6 150.6L342.6 278.6z"/></svg>                </div>
              <h3 class="mb-2 text-xl font-bold dark:text-white">Mesurabilité</h3>
              <div class="text-gray-500 dark:text-gray-400">
                <ul class="list-disc list-inside leading-8">
                  <li>
                    Analyses des vues par item et par user / groupe via tableaux de bords simples sur le back-office<br>
                  </li>
                  <li>
                    Insights plus fins via Google Analytics (ou tout autre système d'analyse)
                  </li>
                </ul>
              </div>
          </div>
          <div>
              <div class="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-primary-100 lg:h-12 lg:w-12 dark:bg-primary-900">
                <svg class="dark:fill-great-blue-300" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Pro 6.1.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M480 32H128C110.3 32 96 46.33 96 64v336C96 408.8 88.84 416 80 416S64 408.8 64 400V96H32C14.33 96 0 110.3 0 128v288c0 35.35 28.65 64 64 64h384c35.35 0 64-28.65 64-64V64C512 46.33 497.7 32 480 32zM272 416h-96C167.2 416 160 408.8 160 400C160 391.2 167.2 384 176 384h96c8.836 0 16 7.162 16 16C288 408.8 280.8 416 272 416zM272 320h-96C167.2 320 160 312.8 160 304C160 295.2 167.2 288 176 288h96C280.8 288 288 295.2 288 304C288 312.8 280.8 320 272 320zM432 416h-96c-8.836 0-16-7.164-16-16c0-8.838 7.164-16 16-16h96c8.836 0 16 7.162 16 16C448 408.8 440.8 416 432 416zM432 320h-96C327.2 320 320 312.8 320 304C320 295.2 327.2 288 336 288h96C440.8 288 448 295.2 448 304C448 312.8 440.8 320 432 320zM448 208C448 216.8 440.8 224 432 224h-256C167.2 224 160 216.8 160 208v-96C160 103.2 167.2 96 176 96h256C440.8 96 448 103.2 448 112V208z"/></svg>                </div>
              <h3 class="mb-2 text-xl font-bold dark:text-white">Façonnabilité</h3>
              <div class="text-gray-500 dark:text-gray-400">
                Plusieurs vues proposées d'entrée de jeu
                <ul class="list-disc list-inside leading-8">
                  <li>
                    Articles
                  </li>
                  <li>
                    Agenda
                  </li>
                  <li>
                    Cartes
                  </li>
                  <li>
                    Partages et publications sur les réseaux sociaux
                  </li>
                </ul>
              </div>
          </div>
      </div>
  </div>
  </section>
  
  
  <!-- NOTE COMPARATIF -->
  
  
  <!-- Start block -->
  <Saos animation={"puff-in-center 0.5s cubic-bezier(0.35, 0.5, 0.65, 0.95) both"}>
  <section id="comparatif" class="bg-gray-100 dark:bg-gray-800">
    <div class="max-w-screen-xl px-4 py-8 mx-auto lg:py-24 lg:px-6">
        <div class="max-w-screen-md mx-auto mb-8 text-center lg:mb-12">
              <h2 class="mb-4 text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
                  Comparaison avec une solution monolithique<br>(type wordpress / drupal / joomla)
              </h2>
              <p class="mb-5 font-light text-gray-500 sm:text-xl dark:text-gray-400">
              </p>
        </div>
        <div class="space-y-8 lg:grid lg:grid-cols-2 gap-3 lg:space-y-0">
            <!-- Pricing Card -->
            <Saos once={true} animation={"from-left 0.5s cubic-bezier(0.35, 0.5, 0.65, 0.95) 0.05s both"}>
            <div class="flex flex-col max-w-lg p-6 mx-auto text-center text-gray-900 bg-white border border-gray-100 rounded-lg shadow dark:border-gray-600 xl:p-8 dark:bg-gray-800 dark:text-white">
                <h3 class="mb-4 text-2xl font-semibold">Notre solution</h3>
                  <p class="font-light text-gray-500 sm:text-lg dark:text-gray-400">
                      Nous avons retenu l'application "Directus" pour le back-office, hébergée au sein d'un serveur dédié
                  </p>
                <div class="flex items-baseline justify-center my-8">
                    <span class="mr-2 text-4xl font-extrabold">Solution modulaire</span>
                </div>
                <!-- List -->
                <ul class="list-disc dark:text-white-light text-gray-900 font-thin sm:text-xl sm:leading-8 space-y-2 mb-8">
                    <li class="flex space-x-3 text-left">
                        <!-- Icon -->
                        <svg xmlns="http://www.w3.org/2000/svg" class="max-w-[24px]" fill="#9fb" viewBox="0 0 24 24" stroke="green" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        <span>Interface utilisateur simplifiée</span>
                    </li>
                    <li class="flex space-x-3 text-left">
                        <!-- Icon -->
                        <svg xmlns="http://www.w3.org/2000/svg" class="max-w-[24px]" fill="#9fb" viewBox="0 0 24 24" stroke="green" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        <span><u on:click={()=>switchVisible('droits')}>
                          Droits et permissions granulaires</u></span>
                    </li>
                    <li class="flex space-x-3 text-left">
                        <!-- Icon -->
                        <svg xmlns="http://www.w3.org/2000/svg" class="max-w-[24px]" fill="#9fb" viewBox="0 0 24 24" stroke="green" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        <span><u on:click={()=>switchVisible('cdn')}>CDN mondial</u></span>
                    </li>
                    <li class="flex space-x-3 text-left">
                        <!-- Icon -->
                        <svg xmlns="http://www.w3.org/2000/svg" class="max-w-[24px]" fill="#9fb" viewBox="0 0 24 24" stroke="green" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        <span>Importation semi-automatisée d'anciennes bases de données</span>
                    </li>
                    <li class="flex space-x-3 text-left">
                        <!-- Icon -->
                        <svg xmlns="http://www.w3.org/2000/svg" class="max-w-[24px]" fill="#9fb" viewBox="0 0 24 24" stroke="green" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        <span>Intégration à une workplace facilitée (SSO, données en cloud etc)</span>
                    </li>
                    <li class="flex space-x-3 text-left">
                      <!-- Icon -->
                      <svg xmlns="http://www.w3.org/2000/svg" class="max-w-[24px]" fill="#9fb" viewBox="0 0 24 24" stroke="green" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                      <span><u on:click={()=>switchVisible('cicd')}>Déploiement et livraison continus</u></span>
                  </li>
                </ul>
            </div>
            </Saos>
            <!-- Pricing Card -->
            <Saos animation={"from-right 0.5s cubic-bezier(0.35, 0.5, 0.65, 0.95) 0.30s both"}>
            <div class="flex flex-col max-w-lg p-6 mx-auto text-center text-gray-900 bg-white border border-gray-100 rounded-lg shadow dark:border-gray-600 xl:p-8 dark:bg-gray-800 dark:text-white">
              <h3 class="mb-4 text-2xl font-semibold">Solution type Wordpress</h3>
                  <p class="font-light text-gray-500 sm:text-lg dark:text-gray-400">
                      Médias, contenus et infrastructure sont centralisées en un point.
                  </p>
                <div class="flex items-baseline justify-center my-8">
                    <span class="mr-2 text-4xl font-extrabold">Solution Monolithique</span>
                </div>
                <!-- List -->
                <ul class="list-disc dark:text-white-light text-gray-900 font-thin sm:text-xl sm:leading-8 space-y-2 mb-8">
                  <li class="flex space-x-3 text-left">
                      <!-- Icon -->
                      <svg xmlns="http://www.w3.org/2000/svg" class="max-w-[24px]" fill="orangered" viewBox="0 0 24 24" stroke="#ecd" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                      <span>Interface utilisateur complexe</span>
                  </li>
                  <li class="flex space-x-3 text-left">
                      <!-- Icon -->
                      <svg xmlns="http://www.w3.org/2000/svg" class="max-w-[24px]" fill="orangered" viewBox="0 0 24 24" stroke="#ecd" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                      <span>Droits et permissions basiques</span>
                  </li>
                  <li class="flex space-x-3 text-left">
                      <!-- Icon -->
                      <svg xmlns="http://www.w3.org/2000/svg" class="max-w-[24px]" viewBox="0 0 20 20" fill="orangered"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" /></svg>
                      <span>Données et média stockées en un seul point</span>
                  </li>
                  <li class="flex space-x-3 text-left">
                      <!-- Icon -->
                      <svg xmlns="http://www.w3.org/2000/svg" class="max-w-[24px]" viewBox="0 0 20 20" fill="orangered"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" /></svg>
                      <span>Importation d'anciennes données manuelle seulement, et avec plugins</span>
                  </li>
                  <li class="flex space-x-3 text-left">
                      <!-- Icon -->
                      <svg xmlns="http://www.w3.org/2000/svg" class="max-w-[24px]" viewBox="0 0 20 20" fill="orangered"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" /></svg>
                      <span>Intégration à une workplace nécessitant de lourds travaux d'adaptation</span>
                  </li>
                  <li class="flex space-x-3 text-left">
                      <!-- Icon -->
                      <svg xmlns="http://www.w3.org/2000/svg" class="max-w-[24px]" viewBox="0 0 20 20" fill="orangered"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" /></svg>
                      <span>Déploiement continu possible mais rarement implémenté car complexe et semi-manuel</span>
                  </li>
              </ul>
            </div>
            </Saos>
        </div>
    </div>
  </section>
  </Saos>
  
  
  <!-- End block -->
  <!-- NOTE TIMELINE -->
  <section id="timeline" class="bg-white dark:bg-gray-900">
  <div class="max-w-screen-lg mx-auto">
  <div class="max-w-screen-md mx-auto pt-16 mb-8 text-center lg:mb-12">
  <h2 class="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white">
      Timeline du projet<br>
  </h2>
  <h4 class="mb-4 text-xl font-light text-gray-900 dark:text-white">
      Légendes : <br>
  </h4>
  <h5 class="font-light text-gray-900 dark:text-white leading-8">
      {@html badges.dsi} collaborateur(s) de la DSI requis<br>
      {@html badges.rh} collaborateur(s) des RH requis<br>
      {@html badges.comm} collaborateur(s) de la communication requis<br>
  </h5>
  <h5 class="font-light text-gray-900 dark:text-white leading-8 mt-4">
      <span class="scale-75 translate-y-1 inline-flex items-center justify-center w-10 h-10 border rounded-full bg-gray-800"><svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-other-white-700 s-xjlok9-Vib8o" fill="currentColor" viewBox="0 0 24 24" stroke="none"><text class="text-other-white-100 s-xjlok9-Vib8o" x="50%" y="50%" dominant-baseline="middle" text-anchor="middle">s2</text></svg></span>&nbsp;&nbsp;Développement
      <span class="scale-75 translate-y-1 inline-flex items-center justify-center w-10 h-10 border rounded-full bg-great-blue-500"><svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-other-white-700 s-xjlok9-Vib8o" fill="currentColor" viewBox="0 0 24 24" stroke="none"><text class="text-other-white-100 s-xjlok9-Vib8o" x="50%" y="50%" dominant-baseline="middle" text-anchor="middle">s2</text></svg></span>&nbsp;&nbsp;Atelier avec équipes Servair
      <span class="scale-75 translate-y-1 inline-flex items-center justify-center w-10 h-10 border rounded-full bg-mex-red-500"><svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-other-white-700 s-xjlok9-Vib8o" fill="currentColor" viewBox="0 0 24 24" stroke="none"><text class="text-other-white-100 s-xjlok9-Vib8o" x="50%" y="50%" dominant-baseline="middle" text-anchor="middle">s2</text></svg></span>&nbsp;&nbsp;Design Graphique
      <span class="scale-75 translate-y-1 inline-flex items-center justify-center w-10 h-10 border rounded-full bg-great-blue-300"><svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-other-white-700 s-xjlok9-Vib8o" fill="currentColor" viewBox="0 0 24 24" stroke="none"><text class="text-other-white-100 s-xjlok9-Vib8o" x="50%" y="50%" dominant-baseline="middle" text-anchor="middle">s2</text></svg></span>&nbsp;&nbsp;Formation
  </h5>
  
  <p class="mb-5 font-light text-gray-500 sm:text-xl dark:text-gray-400">
  </p>
  </div>
    {#each steps as step, index}
    <div class="flex">
      <div class="flex flex-col items-center mr-4">
        <div>
          <div 
            on:click={()=>tlOpened[index]=!tlOpened[index]}
            class="cursor-pointer flex items-center justify-center w-10 h-10 border rounded-full {step.round?.bg || ''}"
          >
            <svg xmlns="http://www.w3.org/2000/svg" 
              class="w-6 h-6 text-other-white-700" fill="currentColor" viewBox="0 0 24 24" stroke="none">
              <text class="{step.round?.text || ''}" x="50%" y="50%" dominant-baseline="middle" text-anchor="middle">
                {step.date}
              </text>    
            </svg>
          </div>
        </div>
        <div class="w-px h-full bg-gray-300"></div>
      </div>
      <div class="pb-8 cursor-pointer">
  
        <p 
          class="mb-2 text-xl font-bold text-gray-900 dark:text-gray-100"
          on:click={()=>tlOpened[index]=!tlOpened[index]}
        >
          {step.title}&nbsp;&nbsp;
          {#if step.badges}
            {@html step.badges.join('')}
          {/if}
        </p>
  
        {#if tlOpened[index]}
          <p 
            transition:slide
            class="text-gray-900 dark:text-gray-100"
          >
            {#if Array.isArray(step.body)}
              <ul class="list-disc list-inside text-gray-800 dark:text-gray-200">
                {#each step.body as b}
                <li class="pb-2">
                  {@html b}
                </li>
                {/each}
              </ul>
            {:else}
            {step.body}
            {/if}
          </p>
        {/if}
      </div>
    </div>
    {/each}
  
  
  <div class="flex justify-center">
    <div class="flex flex-col items-center mr-4">
      <div>
        <div class="flex items-center justify-center w-10 h-10 border rounded-full">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-gray-500" fill="none" viewBox="0 0 24 24"
            stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
          </svg>
        </div>
      </div>
    </div>
    <div class="pt-1">
      <p class="mb-2 text-lg font-bold text-green-600 dark:text-other-white-100">Livrable</p>
    </div>
  </div>
  </div>
  
  </section>
  <!-- NOTE FAQ -->
  <!-- Start block -->
  <section id="faq" class="bg-white dark:bg-gray-900">
    <div class="max-w-screen-xl px-4 py-16 mx-auto lg:pb-24 lg:px-6 ">
          <h2 class="mb-6 text-3xl font-extrabold tracking-tight text-center text-gray-900 lg:mb-8 lg:text-3xl dark:text-white">
              Questions / Réponses
          </h2>
        <div class="max-w-screen-md mx-auto">
            <div id="accordion-flush" data-accordion="collapse" data-active-classes="bg-white dark:bg-gray-900 text-gray-900 dark:text-white" data-inactive-classes="text-gray-500 dark:text-gray-400">
                <h3 id="accordion-flush-heading-1">
                    <button type="button" class="flex items-center justify-between w-full py-5 font-medium text-left text-gray-900 bg-white border-b border-gray-200 dark:border-gray-700 dark:bg-gray-900 dark:text-white" 
                    data-accordion-target="#accordion-flush-body-1" 
                    aria-expanded="true"
                    aria-controls="accordion-flush-body-1">
                      <span>Peut-on rendre publics certains contenus ?</span>  
                        <svg data-accordion-icon="" class="w-6 h-6 rotate-180 shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                    </button>
                </h3>
                <div id="accordion-flush-body-1" class="" aria-labelledby="accordion-flush-heading-1">
                    <div class="py-5 border-b border-gray-200 dark:border-gray-700">
                        <p class="mb-2 text-gray-500 dark:text-gray-400">
                          Oui c'est possible, le back-office peut octroyer des accès publics à des sections du site, par exemple pour publier un contenu sur les réseaux sociaux ou pour permettre aux utilisateurs de s'inscrire à un événement ou réaliser une campagne d'emailing à partir d'un contenu etc.
                        </p>
                    </div>
                </div>
  
  
                <h3 id="accordion-flush-heading-2">
                    <button type="button" class="flex items-center justify-between w-full py-5 font-medium text-left text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400" data-accordion-target="#accordion-flush-body-2" aria-expanded="false" aria-controls="accordion-flush-body-2">
                      <span>Quid de l'infrastructure</span>
                        <svg data-accordion-icon="" class="w-6 h-6 shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                    </button>
                </h3>
                <div id="accordion-flush-body-2" class="hidden" aria-labelledby="accordion-flush-heading-2">
                      <div class="py-5 border-b border-gray-200 dark:border-gray-700">
                          <p class="mb-2 text-gray-500 dark:text-gray-400">
                            Nous avons envisagé <a href="https://vercel.com">Vercel</a> pour le front.
                            Ses nombreuses fonctionnalités liées à son CDN global en font une solution tout à fait adaptée aux contraintes déjà évoquées.
                            <br>
                            <br>
                            Concernant le back-office, nous envisageons trois serveurs chez OVH dont l'un de test, l'autre de backup et le dernier de production.
                            <br>
                            <br>
                            Enfin, comme il a déjà été évoqué, les médias seront hébergés sur un cloud Azure.
                          </p>
                      </div>
                </div>
  
  
                <h3 id="accordion-flush-heading-3">
                    <button type="button" class="flex items-center justify-between w-full py-5 font-medium text-left text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400" data-accordion-target="#accordion-flush-body-3" aria-expanded="false" aria-controls="accordion-flush-body-3">
                        <span>Pourquoi pas du cloud onPremise ?</span>
                        <svg data-accordion-icon="" class="w-6 h-6 shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                    </button>
                </h3>
                <div id="accordion-flush-body-3" class="hidden" aria-labelledby="accordion-flush-heading-3">
                    <div class="py-5 border-b border-gray-200 dark:border-gray-700">
                          <p class="mb-2 text-gray-500 dark:text-gray-400">
                              Pour les mêmes raisons que nous avons retenu une approche modulaire: nous devons pouvoir atteindre une cible large et globalement déconnectée des sytèmes d'informations du groupe.
                              Il est toutefois possible d'envisager d'héberger le back-office Directus sur un serveur de production interne à l'entreprise.
                          </p>      
                    </div>
                </div>
  
                <h3 id="accordion-flush-heading-4">
                    <button type="button" class="flex items-center justify-between w-full py-5 font-medium text-left text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400" data-accordion-target="#accordion-flush-body-4" aria-expanded="false" aria-controls="accordion-flush-body-4">
                        <span>Quid de l'utilisation de Figma ? </span>
                        <svg data-accordion-icon="" class="w-6 h-6 shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                    </button>
                </h3>
                <div id="accordion-flush-body-4" class="hidden" aria-labelledby="accordion-flush-heading-4">
                    <div class="py-5 border-b border-gray-200 dark:border-gray-700">
                          <p class="mb-2 text-gray-500 dark:text-gray-400">
                            A l'exception de certains composants webs très spécifiques, le design pourra être fourni sous Figma
                          </p>
                    </div>
                </div>
  
                <h3 id="accordion-flush-heading-5">
                    <button type="button" class="flex items-center justify-between w-full py-5 font-medium text-left text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400" data-accordion-target="#accordion-flush-body-5" aria-expanded="false" aria-controls="accordion-flush-body-5">
                        <span>PWA ou application mobile native</span>
                        <svg data-accordion-icon="" class="w-6 h-6 shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                    </button>
                </h3>
                <div id="accordion-flush-body-5" class="hidden" aria-labelledby="accordion-flush-heading-5">
                    <div class="py-5 border-b border-gray-200 dark:border-gray-700">
                          <p class="mb-2 text-gray-500 dark:text-gray-400">
                            Nous pensons qu'une PWA suffit au besoins du groupe.
                            Il sera en revanche possible de monitorer l'utilisation de la PWA et d'en tirer des conclusions sur la pertinence d'un passage à une application native.
                          </p>
                    </div>
                </div>
  
                <h3 id="accordion-flush-heading-6">
                    <button type="button" class="flex items-center justify-between w-full py-5 font-medium text-left text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400" 
                    data-accordion-target="#accordion-flush-body-6" aria-controls="accordion-flush-body-6" aria-expanded="false">
                        <span>Monitoring de la plateforme</span>
                        <svg data-accordion-icon="" class="w-6 h-6 shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                    </button>
                </h3>
                <div id="accordion-flush-body-6" class="hidden" aria-labelledby="accordion-flush-heading-6">
                    <div class="py-5 border-b border-gray-200 dark:border-gray-700">
                          <p class="mb-2 text-gray-500 dark:text-gray-400">
                            Nous suggérons de réaliser un monitoring de la plateforme pour pouvoir identifier aussi bien les usages à travers le monde que les problèmes de performances.
                            Un monitoring "simplifié" sera directement accessible via le back-office Directus et permettra de visualiser le nombre de vues de chaque article ainsi que les utilisateurs qui les visitent.
                            Des mesures plus avancées seront disponibles via google Analytics.
                            Les différents cookies présentés feront l'objet d'une validation conforme RGPD.
                          </p>
                    </div>
                </div>
  
                <h3 id="accordion-flush-heading-7">
                  <button type="button" class="flex items-center justify-between w-full py-5 font-medium text-left text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400" data-accordion-target="#accordion-flush-body-7" aria-expanded="false" aria-controls="accordion-flush-body-7">
                    <span>Pourquoi pas un Wordpress / Drupal / Joomla&nbsp;?</span>
                    <svg data-accordion-icon="" class="w-6 h-6 shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                  </button>
              </h3>
              <div id="accordion-flush-body-7" class="hidden" aria-labelledby="accordion-flush-heading-7">
                  <div class="py-5 border-b border-gray-200 dark:border-gray-700">
                        <p class="mb-2 text-gray-500 dark:text-gray-400">
                          Wordpress est ce que l'on appelle un monolithe, il intègre à la fois les données, le back-office et le front-office, rendant son intégration dans une "digital workspace" sinon impossible, du moins complexe et bancale.
                          <br><br>
                          Pour offrir tous les services dont Servair a besoin, cela exige dans le cas d'un wordpress soit un développement personnalisé, soit l'utilisation de plugins.
                          Et pour des raison pratiques, c'est systématiquement cette dernière piste (les plugins) qui est retenue par les fournisseurs.
                          <br><br>
                          C'est alors ici que tout s'écroule :
                          Chaque plugin a un format de données différent, amené à changer à l'aune des envies de son développeur et de ses mises à jour ! 
                          Cela revient donc pour vous à avoir 20 fournisseurs (le nombre moyen de plugins pour un wordpress) au lieu d'un seul.
                          <br>
                          Bref, c'est un "no-go".
                        </p>
                  </div>
              </div>
  
            </div> 
        </div>               
    </div>
  </section>
  
  <!-- NOTE QUI SOMMES-NOUS -->
  <Saos animation={"puff-in-center 0.7s cubic-bezier(0.470, 0.000, 0.745, 0.715) both"}>
  
  <section id="contraintes" class="bg-gray-100 dark:bg-gray-800">
  <div class="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6 ">
      <div class="mx-auto max-w-screen-lg text-center mb-8 lg:mb-16">
          <h2 class="mb-4 text-4xl font-extrabold text-gray-900 dark:text-white">Une équipe pluridisclipinaire et agile</h2>
          <p class="font-light sm:text-xl sm:leading-8 text-gray-500 lg:mb-8 dark:text-gray-400">
            Nous sommes deux développeurs, dont un chef de projet et un designer.
            <br>Nous avons 25 ans d'expérience dans la communication numérique.
            <br>Nous avons participé à l'élaboration de plateformes de grande envergure comme de plus petites unités,
            <br>cela nous a permis de nous apdater à des besoins métiers très différents.
        </p>
      </div>
      <div class="mx-auto max-w-screen-sm text-center mb-4 lg:mb-8">
        <h3 class="text-xl font-bold tracking-tight text-gray-900 dark:text-white">Quelques références pertinentes :</h3>
    </div>
      <div class="grid gap-8 mb-6 lg:mb-16 md:grid-cols-2">
          <div class="lg:h-48  items-center bg-gray-100 rounded-lg shadow sm:flex dark:bg-gray-900 dark:border-gray-700">
              <a class="flex4" href="https://www.polyexpert.fr/" target="_blank">
                  <img class="w-full rounded-lg sm:rounded-none sm:rounded-l-lg" src="/pres/refs/polyexpert.jpg" alt="Bonnie Avatar">
              </a>
              <div class="p-5 flex3">
                  <h3 class="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                      <a href="https://www.polyexpert.fr/" target="_blank">Site Web de Polyexpert</a>
                  </h3>
                  <span class="text-gray-500 dark:text-gray-400">Site institutionnel</span>
                  <p class="mt-3 mb-4 font-light text-gray-500 dark:text-gray-400">Un wordpress puissant bâti sur des plugins "maison"</p>
              </div>
          </div> 
          <div class="lg:h-48  items-center bg-gray-100 rounded-lg shadow sm:flex dark:bg-gray-900 dark:border-gray-700">
              <a class="flex4" href="https://rededition.com/" target="_blank">
                  <img class="w-full rounded-lg sm:rounded-none sm:rounded-l-lg" src="/pres/refs/red-editions.jpg" alt="Jese Avatar">
              </a>
              <div class="p-5 flex3">
                  <h3 class="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                      <a href="https://rededition.com/" target="_blank">Site web de Red Editions</a>
                  </h3>
                  <span class="text-gray-500 dark:text-gray-400">e-commerce</span>
                  <p class="mt-3 mb-4 font-light text-gray-500 dark:text-gray-400">Une interface élégante et une expérience utilisateur simplfiée</p>
              </div>
          </div> 
          <div class="lg:h-48 items-center bg-gray-100 rounded-lg shadow sm:flex dark:bg-gray-900 dark:border-gray-700">
              <span class="flex4">
                <img on:click={() => switchVisible('plx')} class="w-full cursor-pointer rounded-lg sm:rounded-none sm:rounded-l-lg" src="pres/refs/plx-users-03.jpg" alt="Sofia Avatar">
              </span>
              <div class="p-5 flex3">
                  <h3 class="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                      <span on:click={() => switchVisible('plx')}>Application web interne Polyexpert</span>
                  </h3>
                  <span class="text-gray-500 dark:text-gray-400">Application web interne Polyexpert full CRUD</span>
                  <p class="mt-3 mb-4 font-light text-gray-500 dark:text-gray-400">Générateur de CVs et de retours d'expériences d'expertise</p>
              </div>
          </div> 
          <div class="lg:h-48  items-center bg-gray-100 rounded-lg shadow sm:flex dark:bg-gray-900 dark:border-gray-700">
              <a class="flex4" href="https://oudot.net/voeux2021" target="_blank">
                <img class="w-full rounded-lg sm:rounded-none sm:rounded-l-lg" src="pres/refs/oudot-scroll.jpg" alt="Sofia Avatar">
              </a>
              <div class="p-5 flex3">
                  <h3 class="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                      <a href="https://oudot.net/voeux2021" target="_blank">Voeux Web Oudot</a>
                  </h3>
                  <span class="text-gray-500 dark:text-gray-400">Animation Web interactive</span>
                  <p class="mt-3 mb-4 font-light text-gray-500 dark:text-gray-400">Un exemple, sous la forme d'une simple animation de la performances de nos applications, sur tous devices</p>
              </div>
          </div>  
      </div>  
  </div>
  </section>
  </Saos>
  <!-- End block -->
  
  <footer class="bg-gray-100 dark:bg-gray-800">
    <div class="max-w-screen-xl p-4 py-6 mx-auto lg:py-16 md:p-8 lg:p-10">
        <hr class="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8">
        <div class="text-center">
            <a href="https://propaganda.redval.fr/pagepropaganda" class="flex items-center justify-center mb-5 text-2xl font-semibold text-gray-900 dark:text-white">
                © 2022 REDVAL    
            </a>
        </div>
    </div>
  </footer>
  
  
  <style>
  /* TODO CSS */
  @keyframes -global-from-left {
  0% {
  transform: rotateX(50deg) translateX(-200vw) skewX(-50deg);
  opacity: 1;
  }
  100% {
  transform: rotateX(0deg) translateX(0) skewX(0deg);
  opacity: 1;
  }
  }
  @keyframes -global-from-right {
  0% {
  transform: rotateX(50deg) translateX(200vw) skewX(50deg);
  opacity: 1;
  }
  100% {
  transform: rotateX(0deg) translateX(0) skewX(0deg);
  opacity: 1;
  }
  }
  
  @keyframes -global-slide-bottom {
  0% {
  -webkit-transform: translateY(-100%);
          transform: translateY(-100%);
          opacity: 0;
  }
  100% {
  -webkit-transform: translateY(0px);
          transform: translateY(0px);
          opacity: 1;
  }
  }
  
  @keyframes -global-slide-top {
  0% {
  -webkit-transform: translateY(100%);
          transform: translateY(100%);
          opacity: 0;
  }
  100% {
  -webkit-transform: translateY(0px);
          transform: translateY(0px);
          opacity: 1;
  }
  }
  
  @keyframes -global-puff-in-center {
  0% {
  -webkit-transform: scale(0.75);
          transform: scale(0.75);
  -webkit-filter: blur(4px);
          filter: blur(4px);
  opacity: 0;
  }
  100% {
  -webkit-transform: scale(1);
          transform: scale(1);
  -webkit-filter: blur(0px);
          filter: blur(0px);
  opacity: 1;
  }
  }
  
  .sgrad { 
  background : linear-gradient(to right, #D81E5B, #F0544F);
  }
  .lgrad { 
  background : linear-gradient(to left, #2A669F, #cceef2);
  }
  .gblue {
  fill : #3B94CB;
  }
  strong {
  font-weight : 800;
  }
  em {
  font-style:normal;
  font-weight: 400;
  }
  u {
  text-decoration: underline dotted royalblue;
  text-underline-offset: 2px;
  text-decoration-thickness: 2px;
  }
  
  u:hover {
  cursor : help;
  }
  :global(.linewrapper) {
  background: transparent!important;
  height : 45px;
  }
  :global(.linewrapper > div > img) {
  position: relative;
  left : 1.25rem;
  opacity: 0;
  }
  :global(.linewrapper > div) {
  margin-top : -20px;
  height: 7.14px;
  background: #ececec;
  border-radius: 10px;
  margin: auto;
  width: 100px;
  }
  .filtre {
  filter : saturate(0.6) hue-rotate(-14deg);
  }
  :global(html) {
  overflow-x: hidden;
  scroll-behavior: smooth!important;
  }
  .flex4{
  flex : 4;
  }
  .flex3{
  flex : 3;
  }
  .bouton-modal {
  position: absolute;
  top: 1rem;
  left: 1rem;
  }
  :global(.big-modal) {
  width: 100%!important;
  }
  
  :global(.linked) {
  font-weight: 700;
  }
  :global(.linked:hover) {
  text-decoration: underline;
  }
  </style> 