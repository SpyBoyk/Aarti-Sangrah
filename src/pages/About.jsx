import { Link } from 'react-router-dom';
import { ArrowRight, Heart, MapPin, Users, BookOpen, Flame, Calendar } from 'lucide-react';
import { CATEGORIES, ITEMS } from '../data/aartis';
import SectionHeading from '../components/SectionHeading';
import { SacredDiyaIcon } from '../components/DeityIcon';
import ImageSlideshow from '../components/ImageSlideshow';

export default function About() {
  return (
    <div className="space-y-12 sm:space-y-16 md:space-y-20">

      {/* ── Hero Section ── */}
      <section className="relative overflow-hidden rounded-3xl border border-amber-200/80 bg-white p-2 shadow-sm dark:border-stone-800 dark:bg-stone-900">
        {/* Subtle accent backdrop */}
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-amber-400/10 blur-3xl dark:bg-amber-500/10" />
          <div className="absolute -bottom-16 -left-16 h-72 w-72 rounded-full bg-orange-400/10 blur-3xl dark:bg-amber-600/10" />
        </div>

        <div className="relative grid items-center gap-6 p-5 sm:p-8 md:p-12 lg:grid-cols-[1.2fr_0.8fr] lg:gap-12">
          {/* Text Content */}
          <div className="fade-up">
            <div className="inline-flex items-center gap-1.5 rounded-full border border-amber-300/60 bg-amber-50 px-3 py-1 text-[11px] sm:text-xs font-bold text-amber-800 dark:border-amber-900/50 dark:bg-amber-950/40 dark:text-amber-300">
              <MapPin size={12} className="shrink-0 text-amber-600 dark:text-amber-400" />
              <span>मालघर गाव · वाजेवाडी · चिपळूण</span>
            </div>

            <h1 className="mt-3.5 font-[Yatra_One] text-2xl leading-tight text-stone-900 sm:text-3xl md:text-4xl dark:text-stone-50">
              आमच्याबद्दल
            </h1>
            <p className="mt-1 font-[Yatra_One] text-base text-amber-800 sm:text-lg dark:text-amber-400">
              ॥ स्वयंभू श्री सुकाई देवी प्रसन्न ॥
            </p>

            <p className="mt-3 max-w-xl text-xs sm:text-sm leading-relaxed text-stone-600 dark:text-stone-300">
              मालघर गाव (वाजेवाडी), चिपळूण, रत्नागिरी — कोकणातील एक पवित्र गाव. या आरती संग्रहाचा उद्देश म्हणजे आमच्या गावातील पारंपरिक आरत्या, स्तोत्रे व भजने डिजिटल स्वरूपात जतन करणे आणि सर्वांसाठी सुलभतेने उपलब्ध करणे.
            </p>
            <p className="mt-2 max-w-xl text-xs sm:text-sm leading-relaxed text-stone-600 dark:text-stone-300">
              पिढ्यानपिढ्या चालत आलेल्या या पवित्र रचनांचे संकलन करण्यासाठी वाजेवाडी गावातील सर्व ग्रामस्थांचे मनःपूर्वक आभार.
            </p>

            {/* Quick Stats Grid */}
            <div className="mt-5 grid grid-cols-3 gap-2 sm:gap-3 border-t border-amber-200/60 pt-4 dark:border-stone-800">
              <div className="rounded-xl bg-amber-50/60 p-2.5 sm:p-3 text-center border border-amber-200/50 dark:border-stone-800 dark:bg-stone-800/50">
                <p className="font-[Yatra_One] text-lg font-bold text-amber-800 sm:text-2xl dark:text-amber-400">{ITEMS.length}+</p>
                <p className="mt-0.5 text-[10px] sm:text-[11px] font-bold text-stone-600 dark:text-stone-400">आरत्या व भजने</p>
              </div>
              <div className="rounded-xl bg-amber-50/60 p-2.5 sm:p-3 text-center border border-amber-200/50 dark:border-stone-800 dark:bg-stone-800/50">
                <p className="font-[Yatra_One] text-lg font-bold text-amber-800 sm:text-2xl dark:text-amber-400">{CATEGORIES.length}</p>
                <p className="mt-0.5 text-[10px] sm:text-[11px] font-bold text-stone-600 dark:text-stone-400">पवित्र देवता</p>
              </div>
              <div className="rounded-xl bg-amber-50/60 p-2.5 sm:p-3 text-center border border-amber-200/50 dark:border-stone-800 dark:bg-stone-800/50">
                <p className="font-[Yatra_One] text-lg font-bold text-amber-800 sm:text-2xl dark:text-amber-400">३</p>
                <p className="mt-0.5 text-[10px] sm:text-[11px] font-bold text-stone-600 dark:text-stone-400">भाषा</p>
              </div>
            </div>
          </div>

          {/* Right Image Collage - Compact & centered on mobile */}
          <div className="fade-up fade-up-1 grid grid-cols-2 gap-2 w-full max-w-md mx-auto lg:mx-0">
            <div className="h-24 sm:h-28 overflow-hidden rounded-xl border border-stone-100 shadow-xs dark:border-stone-800">
              <img src="/about-5.webp" alt="मंदिर सजावट" className="h-full w-full object-cover transition-transform duration-500 hover:scale-105" loading="lazy" />
            </div>
            <div className="h-24 sm:h-28 overflow-hidden rounded-xl border border-stone-100 shadow-xs dark:border-stone-800">
              <img src="/about-9.webp" alt="गावकरी उत्सव" className="h-full w-full object-cover transition-transform duration-500 hover:scale-105" loading="lazy" />
            </div>
            <div className="col-span-2 h-24 sm:h-28 overflow-hidden rounded-xl border border-stone-100 shadow-xs dark:border-stone-800">
              <img src="/about-1.webp" alt="वाजेवाडी समुदाय" className="h-full w-full object-cover transition-transform duration-500 hover:scale-105" loading="lazy" />
            </div>
          </div>
        </div>
      </section>

      {/* ── Interactive Slideshow Section ── */}
      <section className="fade-up">
        <SectionHeading
          kicker="उत्सव व परंपरा"
          title="वाजेवाडी गाव — छायाचित्र स्लाईडशो"
          subtitle="गावातील धार्मिक उत्सव, श्री मंदिर व एकत्र जमलेल्या वाजेवाडीकरांचे सुरेख क्षण."
        />
        <ImageSlideshow className="mt-4 sm:mt-6" />
      </section>

      {/* ── Mission & Values ── */}
      <section>
        <SectionHeading
          kicker="आमचे ध्येय"
          title="या संग्रहाची प्रेरणा"
          subtitle="वाजेवाडी गावातील पारंपरिक भक्ती परंपरा डिजिटल स्वरूपात जतन करणे."
        />

        <div className="grid gap-3 sm:gap-4 sm:grid-cols-2 md:grid-cols-3">
          {[
            {
              icon: BookOpen,
              title: 'परंपरा जतन',
              text: 'पिढ्यानपिढ्या चालत आलेल्या पारंपरिक आरत्या, स्तोत्रे व भजने डिजिटल स्वरूपात जतन करणे — जेणेकरून ही संस्कृती पुढच्या पिढ्यांपर्यंत पोहोचेल.',
            },
            {
              icon: Users,
              title: 'सुलभ उपलब्धता',
              text: 'गावापासून दूर असलेल्या सर्व वाजेवाडीकरांना मोबाईल किंवा संगणकावर कुठूनही आरत्या वाचता याव्यात — सुस्पष्ट देवनागरी अक्षरात.',
            },
            {
              icon: Heart,
              title: 'समुदाय भक्ती',
              text: 'गावातील सामूहिक पूजा-अर्चा, उत्सव व सांस्कृतिक कार्यक्रमांचा आनंद सर्वांना अनुभवता यावा — हा या संकेतस्थळाचा उद्देश.',
            },
          ].map(({ icon: Icon, title, text }) => (
            <div
              key={title}
              className="group flex flex-col justify-between rounded-xl border border-amber-200/70 bg-white p-4.5 transition hover:border-amber-400 hover:shadow-md dark:border-stone-800 dark:bg-stone-900"
            >
              <div>
                <span className="grid h-9 w-9 place-items-center rounded-lg bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300">
                  <Icon size={17} />
                </span>
                <h3 className="mt-3 font-[Yatra_One] text-base text-stone-900 dark:text-stone-100">{title}</h3>
                <p className="mt-1 text-xs leading-relaxed text-stone-600 dark:text-stone-300">{text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Photo Gallery Grid — Compact Thumbnails ── */}
      <section>
        <SectionHeading
          kicker="छायाचित्र गॅलरी"
          title="वाजेवाडी — आमचे गाव"
          subtitle="उत्सव, मंदिर, समुदाय — वाजेवाडी गावातील क्षण."
        />

        <div className="grid grid-cols-2 gap-2 sm:gap-2.5 md:grid-cols-4">
          {[
            { src: '/about-5.webp', alt: 'श्री राधा-कृष्ण मंदिर सजावट' },
            { src: '/about-9.webp', alt: 'गावकरी — उत्सव सामूहिक जल्लोष' },
            { src: '/about-3.webp', alt: '॥ आम्ही वाजेवाडीकर ॥' },
            { src: '/about-2.webp', alt: 'वाजेवाडी ग्रामस्थ — उत्सव' },
            { src: '/about-4.webp', alt: '॥ स्वयंभू श्री सुकाई देवी प्रसन्न ॥' },
            { src: '/about-1.webp', alt: 'समुदाय सामूहिक छायाचित्र' },
            { src: '/about-8.webp', alt: 'मंदिर पूजा सजावट' },
            { src: '/about-10.webp', alt: 'गावकरी समूह — उत्सवी क्षण' },
          ].map(({ src, alt }, i) => (
            <div
              key={i}
              className="group overflow-hidden rounded-xl border border-amber-200/60 bg-stone-100 dark:border-stone-800 dark:bg-stone-800"
            >
              <div className="h-24 sm:h-32 w-full overflow-hidden">
                <img
                  src={src}
                  alt={alt}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Village Heritage Section ── */}
      <section className="relative overflow-hidden rounded-2xl border border-amber-200/80 bg-white shadow-sm dark:border-stone-800 dark:bg-stone-900">
        <div className="grid items-center lg:grid-cols-[1.5fr_0.5fr]">
          <div className="p-5 sm:p-7">
            <p className="text-[10px] font-extrabold tracking-widest text-amber-800 uppercase dark:text-amber-400">गाव माहिती</p>
            <h2 className="mt-1 font-[Yatra_One] text-lg text-stone-900 sm:text-xl dark:text-stone-50">
              वाजेवाडी गाव — कोकणचे हृदय
            </h2>
            <div className="mt-2.5 space-y-2 text-xs sm:text-[13px] leading-relaxed text-stone-600 dark:text-stone-300">
              <p>
                वाजेवाडी (मालघर) हे कोकणातील चिपळूण तालुक्यातील एक सुंदर गाव आहे. 
                निसर्गरम्य डोंगररांगा, हिरवीगार शेतं आणि पवित्र मंदिरे यांनी नटलेल्या या गावाला 
                मोठी धार्मिक व सांस्कृतिक परंपरा आहे.
              </p>
              <p>
                स्वयंभू श्री सुकाई देवी हे गावचे ग्रामदैवत. गावातील प्रत्येक सण-उत्सव 
                सामूहिक भक्तिभावाने साजरा केला जातो — गणेशोत्सव, नवरात्र, दत्त जयंती, 
                आणि शिवजयंती ही यातील प्रमुख उत्सव.
              </p>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-2">
              {[
                { icon: MapPin, label: 'चिपळूण, रत्नागिरी', sub: 'कोकण विभाग' },
                { icon: Calendar, label: 'गणेशोत्सव · नवरात्र', sub: 'प्रमुख उत्सव' },
                { icon: Flame, label: 'श्री सुकाई देवी', sub: 'ग्रामदैवत' },
                { icon: Users, label: 'एकजूट समुदाय', sub: 'वाजेवाडीकर' },
              ].map(({ icon: Icon, label, sub }) => (
                <div key={label} className="flex items-start gap-2 rounded-lg border border-amber-200/50 bg-amber-50/40 p-2 dark:border-stone-800 dark:bg-stone-800/40">
                  <Icon size={14} className="mt-0.5 shrink-0 text-amber-700 dark:text-amber-400" />
                  <div>
                    <p className="text-[11px] sm:text-xs font-bold text-stone-800 dark:text-stone-200">{label}</p>
                    <p className="text-[9px] sm:text-[10px] text-stone-500 dark:text-stone-400">{sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right image - Small compact size */}
          <div className="relative h-36 sm:h-48 lg:h-full lg:max-h-[220px] overflow-hidden border-t border-amber-100 lg:border-t-0 lg:border-l dark:border-stone-800">
            <img
              src="/about-8.webp"
              alt="वाजेवाडी मंदिर — पूजा सजावट"
              className="h-full w-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950/60 via-transparent to-transparent lg:bg-gradient-to-l" />
            <div className="absolute bottom-3 left-3 right-3">
              <p className="font-[Yatra_One] text-xs sm:text-sm text-white drop-shadow-sm">॥ आम्ही वाजेवाडीकर ॥</p>
              <p className="text-[9px] sm:text-[10px] text-stone-300">मालघर गाव · कोकण</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className="relative overflow-hidden rounded-3xl border border-amber-400/80 bg-gradient-to-r from-amber-800 via-orange-700 to-amber-800 p-5 text-center text-white sm:p-10 shadow-xl dark:border-stone-800 dark:bg-stone-900">
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <div className="absolute top-1/2 left-1/2 h-[28rem] w-[28rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-400/10 blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-lg">
          <SacredDiyaIcon size={32} className="mx-auto text-amber-200" />
          <h2 className="mt-3 font-[Yatra_One] text-xl text-white sm:text-3xl dark:text-stone-50">
            आरती संग्रह पहा
          </h2>
          <p className="mt-2 text-xs sm:text-sm leading-relaxed text-amber-100/90 dark:text-stone-300">
            वाजेवाडी गावातील सर्व पारंपरिक आरत्या, स्तोत्रे व भजने सुलभतेने वाचा.
          </p>
          <div className="mt-4 flex flex-wrap justify-center gap-2 sm:gap-3">
            <Link
              to="/aartis"
              className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 px-4 py-2 text-xs font-extrabold text-stone-950 shadow-md transition hover:from-amber-300 hover:to-amber-400 active:scale-95 sm:px-6 sm:py-3 sm:text-sm"
            >
              <Flame size={14} /> संपूर्ण संग्रह
            </Link>
            <Link
              to="/categories"
              className="inline-flex items-center gap-1.5 rounded-xl border border-amber-300/40 bg-stone-950/30 px-4 py-2 text-xs font-bold text-amber-200 backdrop-blur-sm transition hover:bg-stone-950/50 active:scale-95 sm:px-6 sm:py-3 sm:text-sm"
            >
              सर्व देवता <ArrowRight size={13} />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
