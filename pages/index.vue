<template>
  <transition-group name="fade" mode="out-in">
    <div
      class="flex h-screen items-center justify-center"
      key="loader"
      v-if="view.isLoading"
    >
      <img
        src="@/assets/images/placedesarts-sm.png"
        alt="Place des Arts"
        class="h-full max-h-40 -mt-12 mx-auto md:mx-10"
      />
    </div>
    <div class="bg-grey-lightest lg:block" key="content" v-else>
      <div
        class="flex flex-col w-full xl:max-w-screen-80 mx-auto xl:mx-screen-10 h-full bg-white"
        v-show="!view.isLoading"
      >
        <!-- Header -->
        <transition name="fade" appear mode="out-in">
          <header
            id="header"
            class="bg-grey-light bg-cover overflow-hidden bg-no-repeat bg-image w-full h-screen-60 py-12 flex flex-col-reverse md:flex-row items-center justify-between"
            v-show="!view.isLoading"
          >
            <img
              src="@/assets/images/placedesarts.png"
              alt="Place des Arts"
              class="h-full max-h-75 m-auto md:mx-10"
            />
            <div
              class="relative text-white flex justify-between items-center w-full md:w-auto -mt-12 mb-12 md:mb-0 md:-mt-4"
              v-if="expositions.dates"
            >
              <ul
                class="flex justify-between bg-green-full md:flex-col w-full text-xs md:text-sm text-center z-20 py-2"
              >
                <li
                  class="py-1 md:py-3 px-5 w-1/4 md:w-full"
                  :class="
                    checkExpoDate(date) || checkCanceledExpoDate(date)
                      ? 'opacity-50'
                      : ''
                  "
                  v-for="(date, index) in expositions.dates"
                  :key="index"
                >
                  <span
                    :class="checkCanceledExpoDate(date) ? 'line-through' : ''"
                    v-html="getDateLabel(date)"
                  ></span>
                  <span
                    class="uppercase font-bold"
                    v-if="checkCanceledExpoDate(date)"
                    >annulées</span
                  >
                </li>
              </ul>
              <div
                class="bg-yellow-full h-full w-48 absolute -rotate-10 mt-4 -mr-20 z-10 right-0 hidden md:block"
              ></div>
            </div>
          </header>
        </transition>
        <!-- Nav -->
        <fixed-header :threshold="500">
          <div class="bg-white w-full md:px-4">
            <scrollactive
              active-class="font-bold"
              class="flex flex-wrap justify-around leading-loose w-full text-sm sm:text-md sm:px-4"
              :duration="800"
              highlightFirstItem
              :offset="76"
            >
              <a href="#" class="logo hidden mt-1 cursor-pointer">
                <img
                  src="@/assets/images/placedesarts-sm.png"
                  alt="Place des Arts"
                  class="h-16"
                />
              </a>
              <a
                class="py-6 whitespace-no-wrap no-underline tracking-wider uppercase hover:text-green scrollactive-item"
                v-for="(item, index) in menu"
                :key="index"
                :class="item.style"
                :href="item.target"
                v-html="
                  item.yearly && view.year === subscription.year
                    ? item.label + ' ' + view.year
                    : item.label
                "
              ></a>
            </scrollactive>
          </div>
        </fixed-header>
        <div id="content" class="relative">
          <div id="inscription" class="flex flex-wrap w-full">
            <!-- Subscription -->
            <div class="bg-yellow w-full lg:w-1/2 px-6 py-8 lg:p-12">
              <h2>
                S'inscrire
                <span class="hidden md:inline">à la Place des Arts</span>
              </h2>
              <div class="flex flex-col" v-if="subscription.isOpen">
                <p class="font-bold text-xl leading-tight">
                  Le dossier de candidature pour exposer à la Place des Arts en
                  {{ subscription.year }} est en ligne !
                </p>
                <p>
                  Une fois votre dossier rempli et signé,
                  <span class="font-bold"
                    >merci de ne pas l'envoyer en recommandé</span
                  >. Un envoi en lettre simple est suffisant.
                </p>
                <button class="btn mt-4 mb-12 self-center">
                  Télécharger le dossier d'inscription
                  <font-awesome-icon icon="download" class="opacity-75 ml-2" />
                </button>
              </div>
              <div v-else>
                <p class="font-bold text-xl text-red leading-tight">
                  Les inscriptions pour participer aux expositions de la Place
                  des Arts sont désormais closes.
                </p>
                <p class="font-bold">
                  Compte-tenu de la situation sanitaire exceptionnelle, les
                  dossiers d'inscriptions {{ subscription.year + 1 }} seront
                  téléchargeables à partir du {{ subscription.date }}
                  {{ subscription.year }}.
                </p>
                <p>
                  Les souhaits de dates d'exposition
                  {{ subscription.year + 1 }} émis par l'association à la ville
                  de Strasbourg ne seront connus qu'aux alentours du mois
                  d'octobre {{ subscription.year }} et seront ensuite soumis à
                  la validation des services de la ville (l'attente de
                  validation peut prendre plusieurs semaines).
                </p>
                <p>
                  Les dates une fois validées par la ville de Strasbourg seront
                  publiées sur notre site.
                </p>
              </div>
              <p>
                En attendant, n'hésitez pas à nous suivre sur les réseaux
                sociaux pour être tenu au courant de notre actualité !
              </p>
              <SocialBox class="pt-4 text-6xl" :socials="site.socials" />
            </div>
            <!-- Expose -->
            <div
              class="bg-blue flex flex-col w-full lg:w-1/2 px-6 py-8 lg:p-12"
            >
              <h2>
                Exposer
                <span class="hidden md:inline">à la Place des Arts</span>
              </h2>
              <p class="font-bold text-xl leading-tight">
                Vous souhaitez exposer ponctuellement ?
              </p>
              <p>
                Tout artiste désirant exposer le jour même de l'exposition doit
                se présenter au stand des organisateurs à 8h (allée centrale).
              </p>
              <div class="bg-white-25 p-6 mt-4 mb-8">
                <p class="font-bold">
                  Un emplacement lui sera alors attribué à conditions :
                </p>
                <ul class="list-disc pl-5 pr-2">
                  <li>
                    que les œuvres présentées ne soient pas de l'artisanat
                    d'art, ni des reproductions, ni des bijoux
                  </li>
                  <li>
                    que le règlement soit accepté et signé (voir ci-dessous)
                  </li>
                  <li>
                    de s’acquitter d'une cotisation de 30€ par jour d'exposition
                    (ou 50€ pour le week-end)
                  </li>
                </ul>
              </div>
              <a
                :href="
                  '@/docs/reglement-' +
                  subscription.year +
                  '-place-des-arts.pdf'
                "
                class="btn self-end"
                v-if="reglementDownload"
              >
                Télécharger le règlement
                <font-awesome-icon icon="download" class="opacity-75 ml-2"
              /></a>
              <a
                href="#inscription"
                class="block text-right"
                v-else
                @click.prevent="
                  showModal(
                    'reglement',
                    'Règlement général ' + view.year + ' de la ' + site.name
                  )
                "
                >Lire le règlement général</a
              >
            </div>
          </div>
          <!-- Expos dates -->
          <div id="expositions" class="bg-white">
            <div v-if="expositions.dates">
              <div class="px-6 lg:px-12 py-8">
                <h2 class="mb-0">Expositions {{ subscription.year }}</h2>
                <span class="italic opacity-50" v-if="!expositions.validated"
                  >Sous réserve de validation par la ville de Strasbourg.</span
                >
                <span v-else>Notez bien ces dates dans votre agenda !</span>
              </div>
              <ul class="flex justify-between pb-20 text-sm sm:text-md">
                <li
                  class="border-b-5 border-grey-light p-4 pb-8 text-center relative"
                  :class="
                    'w-1/' +
                    expositions.dates.length +
                    (checkExpoDate(date) || checkCanceledExpoDate(date)
                      ? ' text-grey-light'
                      : '')
                  "
                  v-for="(date, index) in expositions.dates"
                  :key="index"
                >
                  <span
                    :class="checkCanceledExpoDate(date) ? 'line-through' : ''"
                    v-html="getDateLabel(date)"
                  ></span>
                  <span
                    class="bullet"
                    :class="
                      checkExpoDate(date) || checkCanceledExpoDate(date)
                        ? 'bg-grey-light'
                        : 'bg-red-dark'
                    "
                  ></span>
                  <span
                    class="uppercase font-bold"
                    v-if="checkCanceledExpoDate(date)"
                    >annulées</span
                  >
                </li>
              </ul>
            </div>
            <div v-else>
              <div class="px-6 lg:px-12 py-8">
                <h2>Expositions {{ subscription.year }}</h2>
                <p class="mb-8 opacity-50">
                  Les dates des expositions {{ subscription.year }} vous seront
                  communiquées prochainement.
                </p>
              </div>
            </div>
          </div>
          <div id="annonce" class="flex flex-wrap w-full">
            <div class="bg-white w-full px-6 py-8 lg:p-12">
              <h2></h2>
              <Alert />
            </div>
          </div>
          <!-- Map -->
          <div id="infos-pratiques" class="bg-grey-lighter w-full">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d5278.499255397817!2d7.750447!3d48.585919000000004!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4796c85198a64bdb%3A0xa38908b339f9dca1!2sPlace%20Broglie%2C%2067000%20Strasbourg!5e0!3m2!1sfr!2sfr!4v1581199630897!5m2!1sfr!2sfr"
              frameborder="0"
              class="w-full h-screen-60 border-0"
              allowfullscreen
            ></iframe>
          </div>
          <!-- About -->
          <div
            id="association-contact"
            class="flex flex-wrap w-full bg-green items-start"
          >
            <div
              class="flex flex-wrap flex-shrink-0 px-6 py-8 lg:p-12 w-full lg:w-1/3"
            >
             <h2 class="w-full">
                Contact
              </h2>
              <div
                class="flex flex-col sm:flex-row lg:flex-col w-full p-6 bg-white-25 mb-4"
              >
                <div class="w-full sm:w-1/3 lg:w-full">
                  <h3 class="text-lg mb-2">
                    <font-awesome-icon icon="pencil-alt" class="mr-1" /> Par
                    voie postale
                  </h3>
                  {{ site.contact.name }}
                  <br />
                  {{ site.contact.address }}
                  <br />
                  {{ site.contact.zipcode }}
                  {{ site.contact.city }}
                </div>
                <div class="w-full sm:w-1/3 lg:w-full py-6 sm:pt-0 lg:pt-6">
                  <h3 class="text-lg mb-2">
                    <font-awesome-icon icon="envelope" class="mr-1" /> Par email
                  </h3>
                  <a :href="'mailto:' + site.contact.email">{{
                    site.contact.email
                  }}</a>
                </div>
                <div class="w-full sm:w-1/3 lg:w-full">
                  <h3 class="text-lg mb-2">
                    <font-awesome-icon icon="phone" class="mr-1" /> Par
                    téléphone
                  </h3>
                  {{ site.contact.phone }}
                </div>
              </div>
            </div>
            <div
              class="bg-white flex flex-col w-full lg:w-2/3 justify-between px-6 py-8 lg:p-12"
            >
              <h2>
                L'association
                <span class="hidden md:inline">Place des Arts</span>
              </h2>
              <p>
                Depuis plus de 20 ans l’association Place des Arts organise des
                expositions artistiques sur la Place Broglie de Strasbourg.
                Venus d'horizons divers, au nom connu ou en devenir,
                professionnels ou amateurs, plus de 100 artistes, peintres,
                sculpteurs, photographes et plasticiens exposent leur travail en
                plein air au regard du public strasbourgeois.
              </p>
              <p>
                Directement issues d'atelier, classiques ou modernes,
                figuratives ou abstraites, ces œuvres sont toutes personnelles
                et originales. Bravant la pluie, le vent ou les coups de soleil,
                les artistes répondent toujours présents comme les visiteurs de
                plus en plus nombreux et fidèles à ces rendez-vous.
              </p>
              <iframe
                class="w-full h-player-sm md:h-player mt-4 mb-8 md:mt-8 md:mb-12"
                src="https://www.youtube.com/embed/nnJHNeEIGhM"
                frameborder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              ></iframe>
              <p>
                L’association a depuis plusieurs années été vigilante à la
                qualité des œuvres exposées. Le public y est sensible et le
                succès grandissant de ces manifestations en est le témoin. Plus
                qu’un lieu d’exposition, ces rendez-vous privilégiés des
                créateurs et des amoureux de l'art permettent l'enrichissement
                des relations où les dialogues et les échanges sont nombreux.
                Les demandes d’artistes désirant exposer sont chaque année plus
                nombreuses et c’est à regret que l’association ne peut toutes
                les satisfaire. Un plan de communication percutant, des sponsors
                dynamiques et une organisation associative structurée
                contribuent au succès et à la notoriété de ces événements.
              </p>
              <p>
                Soucieux de faire évoluer et perdurer son action, l’association
                est continuellement à la recherche de nouveaux soutiens ou
                bénévoles souhaitant s’investir. Plus que jamais motivés, les
                membres de l’association sont récompensés de leur engagement par
                la présence régulière des artistes et la visite de plus de 15000
                visiteurs à chaque exposition. Les manifestations organisées par
                l’association deviennent ainsi incontournables pour la vie
                culturelle et artistique de la capitale européenne.
              </p>
            </div>
          </div>
          <!-- Galerie -->
          <div
            id="galerie"
            class="flex flex-wrap items-center justify-center bg-yellow pl-6 pr-0 py-8 lg:p-12 lg:pr-6"
          >
            <h2 class="w-full">Galerie photos</h2>
            <p class="w-full">Petit aperçu en images de nos expositions.</p>
            <transition-group
              name="fade"
              tag="div"
              class="w-full py-4 md:w-1/3 md:py-2 pr-6"
              v-for="(image, index) in gallery.images"
              :key="index"
            >
              <a
                href="#galerie"
                :key="index + '-link'"
                @click.prevent="
                  gallery.imageActive = index;
                  showModal('gallery', '');
                "
                class="hidden md:block"
              >
                <img
                  :src="getImageSrc(image.name + '-sm.jpg')"
                  :alt="'Place des Arts - 0' + index"
                  class="w-full"
                />
              </a>
              <img
                :src="getImageSrc(image.name + '.jpg')"
                :alt="'Place des Arts - 0' + index"
                class="w-full block md:hidden"
                :key="index"
              />
            </transition-group>
          </div>
          <!-- Artists -->
          <div id="artistes" class="bg-blue w-full px-6 py-8 lg:p-12">
            <h2>
              Les Artistes<span class="hidden md:inline">
                de la Place des Arts</span
              >
            </h2>
            <p class="mb-8">
              Retrouvez ci-dessous la liste complète des artistes inscrits pour
              l'année {{ subscription.year }}.
            </p>
            <ul class="w-full list-inside">
              <li class="flex items-center bg-white-25">
                <div class="w-1/6 p-4 text-center font-bold">
                  N° <span class="hidden md:inline-block">d'emplacement</span>
                </div>
                <div class="flex flex-grow justify-between py-4">
                  <div>
                    <span class="text-center w-24 px-6 hidden md:inline-block"
                      >Email</span
                    >
                    <span class="ml-6 sm:ml-0">Nom</span>
                  </div>
                  <span class="px-4"
                    >Disciplines
                    <span class="hidden md:inline-block"
                      >artistiques</span
                    ></span
                  >
                </div>
              </li>
              <li
                v-for="(item, index) in artists.items"
                :key="index"
                class="bg-white border-b-2 border-blue block"
              >
                <Artist :item="item" :categories="artists.categories" />
              </li>
            </ul>
          </div>
          <!-- Partners -->
          <div id="partenaires" class="w-full">
            <div class="flex flex-wrap items-stretch justify-between">
              <div class="bg-green p-12 w-full lg:w-1/3">
                <h2>
                  Les partenaires<span class="hidden md:inline">
                    de la Place des Arts</span
                  >
                </h2>
                <p>
                  L'association Place des Arts est toujours à la recherche de
                  partenaires désirant soutenir l'organisation de nos
                  expositions d'artistes.
                </p>
                <p>
                  Ainsi nous donnons l'opportunité à nos partenaires de profiter
                  de notre plan de communication pour diffuser leur logo
                  publicitaire.
                </p>
                <p>
                  Merci de contacter pour cela<br />
                  <span class="font-bold">Marie-Claude REICH</span> au
                  <a
                    :href="'tel:' + site.contact.phone"
                    v-html="site.contact.phone"
                  ></a>
                </p>
              </div>
              <!-- Logos -->
              <div
                class="bg-white py-20 px-12 lg:py-12 w-full lg:w-2/3 flex flex-col items-center justify-center"
              >
                <a
                  class="last:mt-16 cursor-pointer opacity-85 hover:opacity-100"
                  :href="item.url"
                  :key="index"
                  target="_blank"
                  v-for="(item, index) in site.partners"
                >
                  <img
                    :alt="item.name"
                    class="w-full max-w-sm"
                    :src="getImageSrc(item.src)"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
        <!-- Footer -->
        <footer
          id="footer"
          class="bg-grey-lightest w-full px-8 py-12 text-sm flex items-start justify-between"
        >
          <div>
            <a :href="site.creation.url" target="_blank"
              >Site réalisé par {{ site.creation.label }}</a
            >
            <p>
              <a
                href="#"
                @click.prevent="showModal('mentions', 'Mentions légales')"
                >Mentions légales</a
              >
            </p>
            {{ view.year }} &copy; {{ site.url }}
          </div>
          <SocialBox class="text-4xl leading-none" :socials="site.socials" />
        </footer>
        <!-- Modal -->
        <Modal
          :title="view.modalTitle"
          :type="view.modal"
          v-if="view.showModal"
          @close="hideModal()"
        >
          <Reglement v-if="view.modal === 'reglement'" />
          <Mentions v-if="view.modal === 'mentions'" />
          <Alert v-if="view.modal === 'alert'" />
          <div
            class="w-full h-screen-80 relative"
            v-if="view.modal === 'gallery'"
            @click.self="hideModal()"
          >
            <button
              class="slidenav left-0"
              @click.prevent="prevImage()"
              :disabled="gallery.imageActive - 1 < 0"
            >
              <font-awesome-icon
                icon="chevron-left"
                class="align-middle -ml-1 mr-1"
              />
            </button>
            <div class="max-w-5xl m-auto relative">
              <div v-for="(image, index) in gallery.images" :key="index">
                <transition name="fade" mode="out-in">
                  <div class="w-full h-screen-80 absolute top-0 left-0">
                    <img
                      :src="getImageSrc(gallery.images[index].name + '.jpg')"
                      v-show="gallery.imageActive === index"
                      class="w-auto h-full m-auto"
                    />
                  </div>
                </transition>
              </div>
            </div>
            <button
              class="slidenav right-0"
              @click.prevent="nextImage()"
              :disabled="gallery.imageActive + 1 === gallery.images.length"
            >
              <font-awesome-icon
                icon="chevron-right"
                class="align-middle ml-1 -mr-1"
              />
            </button>
          </div>
        </Modal>
      </div>
    </div>
  </transition-group>
</template>

<script>
// Data
import Artists from "@/data/artists.json";
import Categories from "@/data/categories.json";
import Menu from "@/data/menu.json";
import Site from "@/data/site.json";

// Components
import Alert from "@/components/Alert.vue";
import Artist from "@/components/Artist.vue";
import FixedHeader from "vue-fixed-header";
import Mentions from "@/components/Mentions.vue";
import Modal from "@/components/Modal.vue";
import Reglement from "@/components/Reglement.vue";
import SocialBox from "@/components/SocialBox.vue";

import {
  disableBodyScroll,
  enableBodyScroll,
  clearAllBodyScrollLocks
} from "body-scroll-lock";

const Months = [
  "Janvier",
  "Fevrier",
  "Mars",
  "Avril",
  "Mai",
  "Juin",
  "Juillet",
  "Août",
  "Septembre",
  "Octobre",
  "Novembre",
  "Décembre"
];

export default {
  head: {
    title: "Place des Arts - Exposition d'artistes place Broglie à Strasbourg",
    meta: [
      {
        hid: "description",
        name: "description",
        content:
          "L'association Place des Arts organise 4 fois par an sur la place Broglie de Strasbourg des expositions d'artistes photographes, sculpteurs et peintres."
      }
    ]
  },
  name: "home",
  components: {
    Alert,
    Artist,
    FixedHeader,
    Mentions,
    Modal,
    Reglement,
    SocialBox
  },
  data: function() {
    return {
      artists: {
        items: Artists,
        categories: Categories
      },
      expositions: {
        dates: [
          "May 16, 2020",
          "July 04, 2020",
          "September 05, 2020",
          "October 24, 2020"
        ],
        canceled: ["May 16, 2020", "July 04, 2020"],
        validated: true
      },
      gallery: {
        images: [
          { name: "placedesarts-gallery-01" },
          { name: "placedesarts-gallery-02" },
          { name: "placedesarts-gallery-03" }
        ],
        imageActive: null
      },
      menu: Menu,
      site: Site,
      reglementDownload: false,
      subscription: {
        date: "16 novembre",
        isOpen: false,
        year: 2020
      },
      view: {
        isLoading: true,
        modal: null,
        modalTitle: null,
        showModal: false,
        year: new Date().getFullYear()
      }
    };
  },
  methods: {
    showModal(modal, title) {
      this.view.modal = modal;
      this.view.modalTitle = title;
      this.view.showModal = true;

      let targetElement = document.querySelector("#modalContent");
      disableBodyScroll(targetElement);
    },
    hideModal() {
      this.view.showModal = false;

      let targetElement = document.querySelector("#modalContent");
      enableBodyScroll(targetElement);
      clearAllBodyScrollLocks();
    },
    checkExpoDate(date) {
      let today = new Date();
      let dayToCheck = new Date(date);

      dayToCheck.setDate(dayToCheck.getDate() + 1);

      if (dayToCheck < today) {
        return true;
      } else {
        return false;
      }
    },
    checkCanceledExpoDate(date) {
      return this.expositions.canceled.find(expo => expo === date);
    },
    getDateLabel(date) {
      let dateLabel;

      let start = new Date(date);
      let end = new Date(start);

      end.setDate(start.getDate() + 1);

      if (start.getMonth() === end.getMonth())
        dateLabel =
          start.getDate() +
          " & " +
          end.getDate() +
          ' <span class="block">' +
          Months[start.getMonth()] +
          "</span>";
      else
        dateLabel =
          start.getDate() +
          " " +
          Months[start.getMonth()] +
          ' & <span class="block">' +
          end.getDate() +
          " " +
          Months[end.getMonth()] +
          "</span>";

      return dateLabel;
    },
    getImageSrc(src) {
      return require("@/assets/images/" + src);
    },
    nextImage() {
      if (this.gallery.imageActive < this.gallery.images.length - 1)
        this.gallery.imageActive = this.gallery.imageActive + 1;
    },
    prevImage() {
      if (this.gallery.imageActive - 1 >= 0)
        this.gallery.imageActive = this.gallery.imageActive - 1;
    }
  },
  created() {
    if (localStorage.getItem("passLoader")) {
      this.view.isLoading = false;
    }
  },
  mounted() {
    if (!localStorage.getItem("passLoader")) {
      setTimeout(() => {
        this.view.isLoading = false;
        localStorage.setItem("passLoader", true);
      }, 1000);
    }

    // if (!localStorage.getItem("passAlert")) {
    //   setTimeout(() => {
    //     this.showModal("alert", "Message de l'association");
    //     localStorage.setItem("passAlert", true);
    //   }, 2000);
    // }

    clearAllBodyScrollLocks();
  }
};
</script>
<style lang="postcss">
.bg-image {
  background-image: url("../assets/images/placedesarts-header.jpg");
  background-position: center 70%;
}
.vue-fixed-header {
  top: -100px;
  transition: all 0.25s ease-in-out;
}
.vue-fixed-header--isFixed {
  @apply fixed left-0 shadow top-0 w-full z-20;
}
.vue-fixed-header--isFixed .logo {
  @apply block;
}
.vue-fixed-header--isFixed + .relative {
  @apply mt-h-header;
}
</style>
