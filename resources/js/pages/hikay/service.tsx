import React from 'react';
import { Button } from '@/components/ui/button';
import FrontEndLayout from '@/layouts/app/front-end-layout';
import { Link } from '@inertiajs/react';
import {
  Camera, Check, GraduationCap, LucideVideotape,
  Palette, Printer, Video, MessageSquare, Briefcase
} from 'lucide-react';

const services = [
  {
    title: "Video Production",
    image: "/images/image3.jpg", // Suggested unique paths
    description: "Professional video production services from concept to final delivery, ensuring high-impact storytelling.",
    features: [
      "Live streaming event video coverage",
      "Video Editing & Post-Production",
      "Drone Videography & Motion graphics",
      "Promotional & commercial videos"
    ],
    Icon: Video,
  },
  {
    title: "Audio Production",
    image: "/images/audio.jpeg",
    description: "State-of-the-art audio recording, mixing, and mastering services for crystal clear sound.",
    features: [
      "Voice-over recording",
      "Jingles & audio ads",
      "Podcast recording",
      "Audio editing & mixing",
    ],
    Icon: LucideVideotape, // Changed to more relevant icon
  },
  {
    title: "Photography",
    image: "/images/pro.webp",
    description: "Stunning photography services for all your creative needs, capturing moments perfectly.",
    features: [
      "Event & Portrait photography",
      "Product & Real estate photography",
      "Branding & lifestyle shoots"
    ],
    Icon: Camera,
  },
  {
    title: "Graphic Design & Branding",
    image: "/images/graphic.jpg",
    description: "Creative graphic design solutions that elevate your brand and create a lasting identity.",
    features: [
      "Logo & brand identity design",
      "Flyer, poster & banner design",
      "Business cards & stationery",
      "UI/UX design"
    ],
    Icon: Palette,
  },
  {
    title: "Printing Services",
    image: "/images/printing.webp",
    description: "High-quality physical prints for marketing materials, from small scale to large format.",
    features: [
      "Large format & Digital printing",
      "Banners, flex & roll-up stands",
      "Stickers, labels & packaging",
      "Brochures & marketing materials"
    ],
    Icon: Printer,
  },
  {
    title: "Digital Media & Social",
    image: "/images/digital.jpeg",
    description: "Engaging social media management and content creation to grow your digital presence.",
    features: [
      "Social media management",
      "Content creation & Ads",
      "YouTube setup & optimization",
      "Social Media Monetization"
    ],
    Icon: MessageSquare, // Changed to MessageSquare
  },
  {
    title: "Equipment & Studio",
    image: "/images/equipment.jpeg",
    description: "Professional gear rental and studio space setup for your independent productions.",
    features: [
      'Camera, lighting',
      'audio gear rental',
      'Studio setup &',
      ' Media consultation'
    ],
    Icon: Briefcase,
  },
  {
    title: "Vendor Subscriptions",
    image: "/images/product.jpeg",
    description: "Premium digital tools and growth services to help vendors scale faster and maximize revenue.",
    features: [
      "CapCut Pro & Canva Pro",
      "YouTube Premium & ChatGPT Plus",
      "Netflix & Amazon Prime Video",
      "Grammarly & Microsoft 365"
    ],
    Icon: GraduationCap,
  },
  {
    title: "Training & Consultancy",
    image: "/images/training.jpg",
    description: "Expert-led workshops and strategy sessions to sharpen your team's media skills.",
    features: [
      ' Graphics training',
      'Video editing &',
      'Photography training',
      'Branding & media strategy'
    ],
    Icon: GraduationCap,
  },
];

// 1. Define Interface outside
interface ServiceCardProps {
  image: string;
  title: string;
  description: string;
  features: string[];
  Icon: React.ElementType;
}

// 2. Component defined outside for performance
function ServiceCard({ image, title, description, features, Icon }: ServiceCardProps) {
  return (
    <div className="group flex flex-col bg-white dark:bg-slate-800 rounded-3xl shadow-sm border border-transparent hover:border-blue-200 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 overflow-hidden">

      {/* Image Section */}
      <div className="relative aspect-video w-full overflow-hidden">
        <img
          src={image}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        <div className="absolute bottom-4 left-4 flex items-center gap-3 text-white">
          <div className="rounded-lg bg-white/10 p-2 backdrop-blur-md border border-white/20">
            <Icon className="size-5" />
          </div>
          <h3 className="font-semibold text-lg tracking-tight">
            {title}
          </h3>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-grow">
        <p className="text-sm text-slate-600 leading-relaxed mb-6">
          {description}
        </p>

        <div className="space-y-3 mt-auto">
          {features.slice(0, 4).map((feature, index) => (
            <div key={index} className="flex gap-3 items-start">
              <Check className="text-emerald-500 mt-0.5 size-4 shrink-0" />
              <span className="text-sm text-slate-700">
                {feature}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Index() {
  return (
    <FrontEndLayout>
      <div className="bg-slate-50 min-h-screen">
        {/* Header Section */}
        <section className="bg-muted-foreground text-white py-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-extrabold mb-6">Our Services</h1>
            <p className="text-slate-200 text-lg leading-relaxed">
              We transform your vision into reality with comprehensive multimedia production.
              From concept to completion, we empower brands with premium tools
              and strategic exposure to maximize growth and earnings online.
            </p>
          </div>
        </section>

        {/* Services Grid */}
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <ServiceCard key={index} {...service} />
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="max-w-5xl mx-auto px-4 pb-20">
          <div className="rounded-3xl bg-gradient-to-tr from-blue-600 to-teal-500 p-12 text-center text-white shadow-2xl">
            <h2 className="text-3xl font-bold mb-4">Ready to start Your Project?</h2>
            <p className="text-blue-50 text-lg mb-8 max-w-2xl mx-auto">
              Let's collaborate to create something extraordinary.
              Get in touch with our team today and let's discuss how we can bring your vision to life.
            </p>
            <Button size="lg" variant="secondary" className="font-bold" asChild>
              <Link href="/portfolio">View Our Portfolio</Link>
            </Button>
          </div>
        </div>
      </div>
    </FrontEndLayout>
  );
}
