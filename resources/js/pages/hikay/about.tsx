import StatsSection from '@/components/stats/statscard';
import { Button } from '@/components/ui/button';
import FrontEndLayout from '@/layouts/app/front-end-layout'
import { Link } from '@inertiajs/react';
import { Award, AwardIcon, CreativeCommons, Play } from 'lucide-react';


export default function about() {

  return (
    <FrontEndLayout >
      <div className=" overflow-x-hidden space-y-15">
        {/* header */}
        <div className="relative text-center">
          {/* Background Image */}
          <img
            src="/images/image2.jpg"
            loading="lazy"
            alt="About us"
            className="h-[300px] md:h-[400px] w-full object-cover object-center"
          />

          {/* Overlay (optional dark layer for better text visibility) */}
          <div className="absolute inset-0 bg-black/50"></div>

          {/* Text Content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white px-4">
            <h1 className="text-2xl md:text-4xl font-bold mb-2">About Us</h1>
            <p className="text-sm md:text-lg max-w-2xl">
              Crafting compelling multimedia experiences that captivate audiences and
              tell unforgettable stories
            </p>
          </div>
        </div>
        {/* our story */}
        <div className='m-10'>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">

            {/* Text Content */}
            <div className="space-y-5 px-4 md:px-0">
              <p className="text-sm uppercase tracking-wide text-gray-500">
                About Multimedia
              </p>

              <h2 className="text-2xl md:text-3xl font-bold leading-tight">
                Bringing Stories to Life Through Creative Media
              </h2>

              <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                Hikay Multimedia is a creative media and branding company dedicated to
                telling powerful stories through high-quality visuals and strategic design.
                We specialize in delivering professional media solutions that help brands,
                businesses, churches, and individuals communicate clearly, creatively, and effectively.

                <br /><br />

                Our services include live video coverage, photography, videography, video
                editing, branding, graphic design, and all kinds of professional printing.
                From concept to execution, we focus on excellence, creativity, and results
                that leave a lasting impression.

                <br /><br />

                At Hikay Multimedia, we believe every brand has a story worth telling. Our
                goal is to bring those stories to life with visuals that inspire trust,
                engagement, and growth both locally and internationally.
              </p>
            </div>

            {/* Image */}
            <div className="w-full">
              <img
                src="/images/image3.jpg"
                loading="lazy"
                alt="About Hikay Multimedia"
                className="w-full h-[250px] md:h-[400px] object-cover rounded-2xl shadow-lg"
              />
            </div>
          </div>

          {/* about the founder */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mt-20">

            {/* Image */}
            <div className="w-full">
              <img
                src="/images/hikay.png"
                alt="Abiogbe David Ikechukwu"
                className="w-full h-[300px] md:h-[500px] object-top rounded-2xl shadow-xl"
              />
            </div>

            {/* Content */}
            <div className="space-y-6 px-4 md:px-0">

              <p className="text-sm uppercase tracking-widest text-gray-500">
                About the Founder
              </p>

              <h2 className="text-3xl md:text-4xl font-bold leading-tight">
                Abiogbe David Ikechukwu
              </h2>

              <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                Abiogbe David Ikechukwu is a seasoned media professional and creative entrepreneur
                with over <span className="font-semibold text-black">7+ years of experience</span> in the media and creative industry.
                He is widely recognized for his attention to detail, visually compelling designs,
                and a deep passion for excellence.
              </p>

              <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                He has held key leadership and creative roles, including serving as a manager at
                Chosen Mic Creative Media and as a media coordinator for organizations such as
                Emmanuel Anglican Church, Indianapolis, and The Helpers Network International.
                His work has earned recognition both locally and internationally.
              </p>

              <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                Currently pursuing a Bachelor’s Degree in Business Administration, David blends
                creativity with strong analytical and business expertise. As an entrepreneur,
                he has successfully managed multiple ventures, applying strategic marketing
                and branding principles across various industries.
              </p>

              <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                Driven by <span className="font-semibold text-black">innovation, integrity, and purpose</span>,
                he founded Hikay Multimedia to deliver world-class media solutions that elevate
                brands and create lasting impact.
              </p>

              {/* Optional Quote */}
              <div className="border-l-4 border-black pl-4 italic text-gray-700">
                “Creativity is not just design — it’s storytelling with purpose.”
              </div>

            </div>
          </div>
        </div>
        <div className="mt-20 px-4">
          < StatsSection />
        </div>
        <div className="mt-20 px-4">
          <div className="max-w-4xl mx-auto text-center space-y-6 bg-gray-50 py-12 px-6 md:px-10 rounded-2xl shadow-sm">

            <p className="text-sm uppercase tracking-widest text-gray-500">
              Our Foundation
            </p>

            <h2 className="text-2xl md:text-3xl font-bold leading-tight">
              Faith, Values & Creative Purpose
            </h2>

            <p className="text-gray-600 leading-relaxed text-sm md:text-base">
              Hikay Multimedia is founded on strong Christian values. The company’s
              leadership is guided by faith, integrity, and excellence, with a
              commitment to honoring God through creativity, service, and ethical
              business practices.
            </p>

            <p className="text-gray-600 leading-relaxed text-sm md:text-base">
              As a believer walking in the Spirit, the founder brings purpose,
              discipline, and authenticity into every project.
            </p>

            <p className="text-gray-600 leading-relaxed text-sm md:text-base">
              This foundation influences how we work—with honesty, respect for people,
              and a passion for using creativity as a tool for positive impact.
            </p>

            {/* Highlight Values */}
            <div className="flex flex-wrap justify-center gap-3 pt-4">
              <span className="px-4 py-2 bg-white rounded-full text-sm shadow">
                Faith
              </span>
              <span className="px-4 py-2 bg-white rounded-full text-sm shadow">
                Integrity
              </span>
              <span className="px-4 py-2 bg-white rounded-full text-sm shadow">
                Excellence
              </span>
              <span className="px-4 py-2 bg-white rounded-full text-sm shadow">
                Purpose
              </span>
            </div>



          </div>
        </div>

        {/* our Value */}
        <div className="mt-20 px-4">
          <div className="mx-auto text-center space-y-6 bg-gray-50 py-12 px-6 md:px-10 rounded-2xl shadow-sm space-y-4">

            <p className="text-sm uppercase tracking-widest text-gray-500">
              Our Value
            </p>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-10">

              {/* innovation */}

              <div className="bg-white rounded-2xl p-6 shadow-sm border hover:shadow-xl  hover:-translate-y-1
transition-all duration-300">
                <div className="flex items-center gap-3 mb-3">
                  <Play className="text-blue-600" />
                  <h3 className="font-semibold text-lg">Innovation</h3>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Pushing creative boundaries with cutting-edge multimedia technology
                </p>
              </div>
              {/* Excellence */}

              <div className="bg-white rounded-2xl p-6 shadow-sm border hover:shadow-xl   hover:-translate-y-1
transition-all duration-300">
                <div className="flex items-center gap-3 mb-3">
                  <Play className="text-blue-600" />
                  <h3 className="font-semibold text-lg">Excellence</h3>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Delivering high-quality results with precision, consistency, and attention to detail
                </p>
              </div>
              {/* creativity */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border hover:shadow-xl   hover:-translate-y-1
transition-all duration-300">
                <div className="flex items-center gap-3 mb-3">
                  <CreativeCommons className="text-blue-600" />
                  <h3 className="font-semibold text-lg">Creativity</h3>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Transforming ideas into visually compelling stories that connect and inspire
                </p>
              </div>

              {/* Collaboration */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border hover:shadow-xl   hover:-translate-y-1
transition-all duration-300">
                <div className="flex items-center gap-3 mb-3">
                  <AwardIcon className="text-blue-600" />
                  <h3 className="font-semibold text-lg">Collaboration</h3>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Award-winning content that exceeds industry standards
                </p>
              </div>

            </div>
          </div>
          <div className="max-w-5xl mx-auto px-4 pb-20">
            <div className="rounded-3xl bg-gradient-to-tr from-blue-600 to-teal-500 p-12 text-center text-white shadow-2xl">
              <h2 className="text-3xl font-bold mb-4">Ready to Start Your Project?</h2>
              <p className="text-blue-50 text-lg mb-8 max-w-2xl mx-auto">
                Let's collaborate to create something extraordinary together
              </p>
              <Button size="lg" variant="secondary" className="font-bold" asChild>
                <Link href="/contact">Get in Touch</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </FrontEndLayout>
  )
}
