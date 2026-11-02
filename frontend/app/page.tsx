import React from 'react';
import Image from 'next/image';
import HeroSection from '@/app/components/HeroSection';
import DisciplinesCarousel from '@/app/components/DisciplinesCarousel';
import PackagesSection from '@/app/components/PackagesSection';
import StudioScoper from '@/app/components/StudioScoper';
import FaqSection from '@/app/components/FaqSection';
import BookingForm from '@/app/components/BookingForm';
import { getWpProjects } from '@/lib/wordpress';

export default async function Home() {
  const projects = await getWpProjects();
  const gear = projects.find((p) => p.slug.includes('gear')) || projects[0];
  const hali = projects.find((p) => p.slug.includes('hali')) || projects[1];

  return (
    <>
      {/* 1. HERO SECTION (100svh, Dynamic Gradient & Word Cycling, Monumental Wordmark) */}
      <HeroSection />

      {/* 2. STUDIO INTRO SPLIT */}
      <section className="intro split" id="studio">
        <h2>
          Digital presence.
          <br />
          Real-world confidence.
        </h2>
        <div>
          <p>
            We build distinctive brand identities, high-trust websites and effortless booking
            journeys for private practices and ambitious brands.
          </p>
          <p className="small-copy">
            Work directly with the people designing and building your site. From the first
            conversation to the final details, we bring strategy, writing and modern engineering
            together.
          </p>
          <a className="button" href="#disciplines">
            <span>+</span> Explore our disciplines
          </a>
        </div>
      </section>

      {/* 3. DISCIPLINES CAROUSEL */}
      <DisciplinesCarousel />

      {/* 4. SELECTED WORK: GEAR ENDURANCE FUEL */}
      <section className="project-gallery" id="work">
        <div className="section-head">
          <h2>Calm. Clear. Considered.</h2>
          <span className="eyebrow">Selected work · Brand &amp; Digital</span>
        </div>

        <div className="split gear-case">
          <div>
            <div className="eyebrow">01 / GEAR · Endurance Fuel</div>
            <h2>Fuel the long way.</h2>
            <p>A bold digital presence for an endurance brand built around simplicity.</p>
            <p className="small-copy">
              GEAR brings Natural and Love Buzz into a focused pre-launch experience. Distinctive
              typography, clear product comparison and an editorial journal give the brand room to
              explain its approach.
            </p>
            <p className="small-copy">
              Brand storytelling · Product discovery · Interactive recipe exploration
            </p>
            <a
              className="button"
              href="https://fuelwithgear.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>↗</span> Explore GEAR
            </a>
          </div>

          <figure>
            <a href="https://fuelwithgear.com/" target="_blank" rel="noopener noreferrer">
              <Image
                src="/images/gear.jpg"
                alt="GEAR Natural and Love Buzz packaging concepts"
                width={1200}
                height={800}
                className="w-full h-auto object-contain"
              />
            </a>
            <figcaption>GEAR / Pre-launch brand &amp; digital experience</figcaption>
          </figure>
        </div>
      </section>

      {/* 5. FEATURED CASE STUDY: HALI INSTITUTE OF RESTORATIVE MEDICINE */}
      <section className="priority split" id="hali">
        <div>
          <div className="eyebrow">Selected work · Brand &amp; Digital</div>
          <h2>
            Hali Institute of
            <br />
            Restorative Medicine
          </h2>
          <p>A digital experience that reflects the care behind the practice.</p>
          <p className="small-copy">
            For a specialist practice in Canberra, editorial typography, tranquil tones and clear
            clinical hierarchy create a calm introduction to the consulting rooms. Direct patient
            intake and a mobile-first booking journey bring clarity to the next step.
          </p>
          <a className="button" href="#contact">
            <span>+</span> Enquire about clinic flagships
          </a>
        </div>

        <figure>
          <Image
            src="/images/hali_case_study_cover.png"
            alt="Hali Institute website design presentation"
            width={1200}
            height={800}
            priority
            className="w-full h-auto object-contain"
          />
        </figure>
      </section>

      {/* 6. SCREENS GALLERY: MVMNT CLUB */}
      <section className="project-gallery" id="hali-details">
        <div className="section-head">
          <h2>Designed for every screen.</h2>
          <span className="eyebrow">MVMNT Club · Web &amp; Mobile</span>
        </div>

        <div className="gallery-grid club-screens">
          <figure>
            <a href="https://mvmnt.club/" target="_blank" rel="noopener noreferrer">
              <Image
                src="/images/mvmnt-desktop.png"
                alt="MVMNT Club website on desktop"
                width={1000}
                height={600}
                className="w-full h-auto object-contain"
              />
            </a>
            <figcaption>01 / Desktop experience</figcaption>
          </figure>

          <figure>
            <a href="https://mvmnt.club/" target="_blank" rel="noopener noreferrer">
              <Image
                src="/images/mvmnt-mobile.png"
                alt="MVMNT Club website on a mobile screen"
                width={500}
                height={700}
                className="w-full h-auto object-contain"
              />
            </a>
            <figcaption>02 / Mobile experience</figcaption>
          </figure>
        </div>
      </section>

      {/* 7. APPAREL SPLIT: MVMNT CLUB CUSTOM APPAREL ENGINE */}
      <section className="split apparel">
        <h2>
          MVMNT Club
          <br />
          Custom Apparel Engine
        </h2>
        <div>
          <p>
            Bringing custom cycling kit, sizing and club orders into one connected digital
            experience.
          </p>
          <p className="small-copy">
            A headless commerce platform for Australian cycling clubs, combining kit visualisation
            and Shopify fulfilment workflows.
          </p>
          <a
            className="button"
            href="https://mvmnt.club"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>↗</span> Explore MVMNT Club
          </a>
        </div>
      </section>

      {/* 8. STUDIO PACKAGES & RATES */}
      <PackagesSection />

      {/* 9. STUDIO SCOPER */}
      <StudioScoper />

      {/* 10. STUDIO PHILOSOPHY */}
      <section className="split" id="philosophy">
        <h2>
          Direct partnership.
          <br />
          Disciplined craft.
        </h2>
        <div>
          <p>
            A focused studio. A clear process. Direct access to the creative and technical people
            doing the work.
          </p>
          <p className="small-copy">
            We lead with a focused intake conversation, then bring together the structure,
            writing, visual direction and technical build. You review the work at agreed
            milestones and give final sign-off before launch.
          </p>
          <a className="button" href="#contact">
            <span>+</span> Meet your next creative partner
          </a>
        </div>
      </section>

      {/* 11. FAQ ACCORDION */}
      <FaqSection />

      {/* 12. CONTACT & STRATEGY CALL */}
      <section className="contact-section split" id="contact">
        <div>
          <div className="eyebrow">Make your next move</div>
          <h2>
            Let’s build something
            <br />
            that feels like you.
          </h2>
        </div>
        <div>
          <p>Request a 15-minute strategy call with Jimmy.</p>
          <p className="small-copy">
            Tell us about your practice or brand, what you want to change and where you want to go.
            We’ll discuss the fit, scope and next steps.
          </p>
          <BookingForm />
        </div>
      </section>
    </>
  );
}
