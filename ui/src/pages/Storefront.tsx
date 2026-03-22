// @ts-nocheck
import { useEffect, useRef, useState, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { useLocation } from '../contexts/LocationContext'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const heroSlides = [
  {
    heading: ['Discover', 'outfits', 'near', 'you'],
    description: 'Reserve online. Try in store.',
    cta: 'Start Exploring',
    ctaLink: '/discover',
    image: '/images/hero-1.jpg',
  },
  {
    heading: ['Your', 'style,', 'your', 'way'],
    description: 'Browse unique fashion from boutiques in your neighborhood.',
    cta: 'Browse Stores',
    ctaLink: '/discover',
    image: '/images/hero-2.jpg',
  },
  {
    heading: ['Reserve', 'now,', 'try', 'later'],
    description: 'Reserve your favorite outfits online and try them on at the store.',
    cta: 'Find My Match',
    ctaLink: '/find-my-match',
    image: '/images/hero-3.jpg',
  },
]

const stats = [
  {
    value: '200+',
    numericValue: 200,
    suffix: '+',
    label: 'Local Boutiques',
    icon: (
      <svg className="size-10 text-primary-600" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349M3.75 21V9.349m0 0a3.001 3.001 0 0 0 3.75-.615A2.993 2.993 0 0 0 9.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 0 0 2.25 1.016c.896 0 1.7-.393 2.25-1.015a3.001 3.001 0 0 0 3.75.614m-16.5 0a3.004 3.004 0 0 1-.621-4.72l1.189-1.19A1.5 1.5 0 0 1 5.378 3h13.243a1.5 1.5 0 0 1 1.06.44l1.19 1.189a3 3 0 0 1-.621 4.72M6.75 18h3.75a.75.75 0 0 0 .75-.75V13.5a.75.75 0 0 0-.75-.75H6.75a.75.75 0 0 0-.75.75v3.75c0 .414.336.75.75.75Z" /></svg>
    ),
  },
  {
    value: '5K+',
    numericValue: 5,
    suffix: 'K+',
    label: 'Unique Products',
    icon: (
      <svg className="size-10 text-primary-600" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" /></svg>
    ),
  },
  {
    value: '12K+',
    numericValue: 12,
    suffix: 'K+',
    label: 'Happy Shoppers',
    icon: (
      <svg className="size-10 text-primary-600" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" /></svg>
    ),
  },
  {
    value: '98%',
    numericValue: 98,
    suffix: '%',
    label: '5-Star Reviews',
    icon: (
      <svg className="size-10 text-primary-600" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" /></svg>
    ),
  },
]

const eventCategories = [
  {
    name: 'Wedding',
    icon: (
      <svg className="size-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" /></svg>
    ),
  },
  {
    name: 'Party',
    icon: (
      <svg className="size-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 0 0-2.455 2.456Z" /></svg>
    ),
  },
  {
    name: 'Office',
    icon: (
      <svg className="size-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0" /></svg>
    ),
  },
  {
    name: 'Travel',
    icon: (
      <svg className="size-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" /></svg>
    ),
  },
]

const trendingProducts = [
  {
    id: 1,
    name: 'Mint Anarkali Dress',
    store: 'Urban Chic Boutique',
    price: '$189',
    distance: '0.8 km away',
    rating: 4.5,
    image: '/images/styles/style-1.jpg',
  },
  {
    id: 2,
    name: 'Floral Evening Gowns',
    store: 'Elegance Couture',
    price: '$245',
    distance: '1.1 km away',
    rating: 4.8,
    image: '/images/styles/style-2.jpg',
  },
  {
    id: 3,
    name: 'Party Lehenga Set',
    store: "Sana's Exclusive",
    price: '$320',
    distance: '1.0 km away',
    rating: 4.7,
    image: '/images/styles/style-3.jpg',
  },
  {
    id: 4,
    name: 'Pastel Co-Ord Set',
    store: 'Chic Moda',
    price: '$165',
    distance: '1.1 km away',
    rating: 4.6,
    image: '/images/styles/style-4.jpg',
  },
]

const nearbyBoutiques = [
  {
    id: 1,
    name: 'Urban Chic Boutique',
    slug: 'urban-chic-boutique',
    rating: 4.6,
    reviews: 128,
    distance: '0.8 km',
    garments: '500+',
    image: '/images/styles/style-5.jpg',
  },
  {
    id: 2,
    name: 'Elegant Attire',
    slug: 'elegant-attire',
    rating: 4.8,
    reviews: 96,
    distance: '1.2 km',
    garments: '600+',
    image: '/images/styles/style-6.jpg',
  },
  {
    id: 3,
    name: 'Glamour Hive',
    slug: 'glamour-hive',
    rating: 4.5,
    reviews: 74,
    distance: '1.2 km',
    garments: '900+',
    image: '/images/styles/style-7.jpg',
  },
]

const howItWorks = [
  {
    step: 1,
    title: 'Discover Nearby',
    description: 'Explore top-rated boutiques near your area.',
    icon: (
      <svg className="size-6 text-primary-600" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" /><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" /></svg>
    ),
  },
  {
    step: 2,
    title: 'Reserve Outfits',
    description: 'Reserve your favorite outfits online.',
    icon: (
      <svg className="size-6 text-primary-600" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z" /></svg>
    ),
  },
  {
    step: 3,
    title: 'Visit & Try On',
    description: 'Visit the boutique to try them on before you buy.',
    icon: (
      <svg className="size-6 text-primary-600" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349M3.75 21V9.349m0 0a3.001 3.001 0 0 0 3.75-.615A2.993 2.993 0 0 0 9.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 0 0 2.25 1.016c.896 0 1.7-.393 2.25-1.015a3.001 3.001 0 0 0 3.75.614m-16.5 0a3.004 3.004 0 0 1-.621-4.72l1.189-1.19A1.5 1.5 0 0 1 5.378 3h13.243a1.5 1.5 0 0 1 1.06.44l1.19 1.189a3 3 0 0 1-.621 4.72M6.75 18h3.75a.75.75 0 0 0 .75-.75V13.5a.75.75 0 0 0-.75-.75H6.75a.75.75 0 0 0-.75.75v3.75c0 .414.336.75.75.75Z" /></svg>
    ),
  },
]

const reviews = [
  {
    id: 1,
    rating: 5,
    content: "Found the most unique dress for my wedding! The quality exceeded my expectations and I love supporting local boutiques.",
    author: 'Sarah Mitchell',
    role: 'Verified Buyer',
    store: 'Elegant Pink Boutique',
  },
  {
    id: 2,
    rating: 5,
    content: "Being able to discover fashion from stores in my neighborhood is amazing. The reservation feature is a game-changer!",
    author: 'Marcus Chen',
    role: 'Verified Buyer',
    store: 'Urban Chic Store',
  },
  {
    id: 3,
    rating: 5,
    content: "As a boutique owner, this platform has transformed my business. I've reached customers I never could have before.",
    author: 'Emily Rodriguez',
    role: 'Boutique Owner',
    store: 'Bella\'s Corner',
  },
  {
    id: 4,
    rating: 5,
    content: "The reservation system is brilliant. I can try things on before committing and the store always has my items ready when I arrive.",
    author: 'James Walker',
    role: 'Verified Buyer',
    store: 'Metro Style Co.',
  },
  {
    id: 5,
    rating: 5,
    content: "I discovered so many hidden gems in my own city. Boutiques I never knew existed with the most amazing pieces.",
    author: 'Aisha Patel',
    role: 'Verified Buyer',
    store: 'The Style Loft',
  },
  {
    id: 6,
    rating: 5,
    content: "Customer service is top-notch. Had an issue with sizing and they resolved it within hours. Will definitely shop here again.",
    author: 'David Kim',
    role: 'Verified Buyer',
    store: 'Noir Fashion House',
  },
  {
    id: 7,
    rating: 5,
    content: "My sales have increased by 40% since joining the platform. The exposure to new customers has been incredible for my small business.",
    author: 'Olivia Thompson',
    role: 'Boutique Owner',
    store: 'Threads & Co.',
  },
  {
    id: 8,
    rating: 5,
    content: "Love the curated collections feature. It makes finding outfit inspiration so easy. The AI suggestions are surprisingly accurate!",
    author: 'Rachel Adams',
    role: 'Verified Buyer',
    store: 'Luxe Avenue',
  },
  {
    id: 9,
    rating: 5,
    content: "Finally a platform that connects me to local fashion. The reservation feature lets me try before I commit.",
    author: 'Michael Torres',
    role: 'Verified Buyer',
    store: 'Casa de Moda',
  },
  {
    id: 10,
    rating: 5,
    content: "The variety is unmatched. From streetwear to high fashion, everything is available from stores right in my neighborhood.",
    author: 'Sophie Laurent',
    role: 'Verified Buyer',
    store: 'Atelier 22',
  },
  {
    id: 11,
    rating: 5,
    content: "I love that I can see real photos from the stores. No surprises when my order arrives. What you see is truly what you get.",
    author: 'Nathan Brooks',
    role: 'Verified Buyer',
    store: 'The Wardrobe Edit',
  },
  {
    id: 12,
    rating: 5,
    content: "Setting up my store was incredibly easy. The dashboard analytics help me understand my customers better every day.",
    author: 'Lisa Nakamura',
    role: 'Boutique Owner',
    store: 'Sakura Styles',
  },
]

export default function Storefront() {
  const heroRef = useRef<HTMLDivElement>(null)
  const statsRef = useRef<HTMLElement>(null)
  const howItWorksRef = useRef<HTMLElement>(null)
  const trendingRef = useRef<HTMLElement>(null)
  const boutiquesRef = useRef<HTMLElement>(null)
  const reviewsRef = useRef<HTMLElement>(null)
  const vendorCtaRef = useRef<HTMLElement>(null)
  const [currentSlide, setCurrentSlide] = useState(0)
  const slideTimerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const isAnimatingRef = useRef(false)
  const slideDirectionRef = useRef(1)
  const { city, openModal } = useLocation()
  const [activeEvent, setActiveEvent] = useState('Wedding')
  const [activeRadius, setActiveRadius] = useState('5 km')
  const [reviewPage, setReviewPage] = useState(0)
  const reviewsPerPage = 3
  const totalReviewPages = Math.ceil(reviews.length / reviewsPerPage)
  const visibleReviews = reviews.slice(reviewPage * reviewsPerPage, reviewPage * reviewsPerPage + reviewsPerPage)
  const reviewGridRef = useRef<HTMLDivElement>(null)
  const isReviewAnimatingRef = useRef(false)
  const reviewDirectionRef = useRef(0)

  const animateSlideIn = useCallback((index: number, direction?: number) => {
    const hero = heroRef.current
    if (!hero) return

    const slide = hero.querySelectorAll('[data-slide]')[index] as HTMLElement
    if (!slide) return

    const dir = direction ?? slideDirectionRef.current
    const words = slide.querySelectorAll('[data-hero-word]')
    const line = slide.querySelector('[data-hero-line]')
    const desc = slide.querySelector('[data-hero-desc]')
    const cta = slide.querySelector('[data-hero-cta]')
    const img = slide.querySelector('[data-hero-bg]') as HTMLElement

    const tl = gsap.timeline({
      defaults: { ease: 'power4.out' },
      onComplete: () => { isAnimatingRef.current = false },
    })

    tl.set(slide, { visibility: 'visible', zIndex: 2 })
    if (img) tl.fromTo(img, { scale: 1.2, x: dir * 40 }, { scale: 1, x: 0, duration: 3, ease: 'power2.out' }, 0)
    tl.fromTo(slide, { opacity: 0 }, { opacity: 1, duration: 0.8, ease: 'power2.inOut' }, 0)
    tl.fromTo(words, { y: 80, opacity: 0, rotationX: 40, x: dir * 30 }, { y: 0, opacity: 1, rotationX: 0, x: 0, duration: 1, stagger: 0.12 }, 0.3)
    if (line) tl.fromTo(line, { scaleX: 0 }, { scaleX: 1, duration: 0.8, ease: 'power3.inOut' }, '-=0.4')
    if (desc) tl.fromTo(desc, { y: 30, opacity: 0, x: dir * 20 }, { y: 0, opacity: 1, x: 0, duration: 0.8 }, '-=0.3')
    if (cta) tl.fromTo(cta, { y: 20, opacity: 0, scale: 0.9 }, { y: 0, opacity: 1, scale: 1, duration: 0.6, ease: 'back.out(1.7)' }, '-=0.3')
  }, [])

  const goToSlide = useCallback((index: number) => {
    if (isAnimatingRef.current || index === currentSlide) return

    const hero = heroRef.current
    if (!hero) return

    isAnimatingRef.current = true

    const direction = index > currentSlide ? 1 : -1
    slideDirectionRef.current = direction

    const prevSlideEl = hero.querySelectorAll('[data-slide]')[currentSlide] as HTMLElement
    if (prevSlideEl) {
      const prevImg = prevSlideEl.querySelector('[data-hero-bg]') as HTMLElement
      gsap.to(prevSlideEl, {
        opacity: 0,
        scale: 1.05,
        duration: 0.8,
        ease: 'power2.inOut',
        onComplete: () => {
          gsap.set(prevSlideEl, { visibility: 'hidden', zIndex: 0, scale: 1 })
        },
      })
      if (prevImg) {
        gsap.to(prevImg, {
          x: direction * -60,
          duration: 0.8,
          ease: 'power2.inOut',
          onComplete: () => { gsap.set(prevImg, { x: 0 }) },
        })
      }
    }

    setCurrentSlide(index)
    animateSlideIn(index, direction)
  }, [currentSlide, animateSlideIn])

  const nextSlide = useCallback(() => {
    goToSlide((currentSlide + 1) % heroSlides.length)
  }, [currentSlide, goToSlide])

  const prevSlide = useCallback(() => {
    goToSlide((currentSlide - 1 + heroSlides.length) % heroSlides.length)
  }, [currentSlide, goToSlide])

  // Auto-play
  useEffect(() => {
    slideTimerRef.current = setInterval(() => {
      if (!isAnimatingRef.current) {
        const next = (currentSlide + 1) % heroSlides.length
        goToSlide(next)
      }
    }, 6000)
    return () => {
      if (slideTimerRef.current) clearInterval(slideTimerRef.current)
    }
  }, [currentSlide, goToSlide])

  // Animate first slide on mount
  useEffect(() => {
    animateSlideIn(0)
  }, [animateSlideIn])

  const changeReviewPage = useCallback((newPage: number) => {
    if (isReviewAnimatingRef.current || newPage === reviewPage) return
    if (newPage < 0 || newPage >= totalReviewPages) return

    isReviewAnimatingRef.current = true
    const direction = newPage > reviewPage ? 1 : -1
    reviewDirectionRef.current = direction

    const grid = reviewGridRef.current
    if (!grid) { isReviewAnimatingRef.current = false; return }

    const cards = grid.querySelectorAll('[data-review-card]')

    gsap.to(cards, {
      x: direction * -60,
      opacity: 0,
      scale: 0.95,
      duration: 0.35,
      stagger: direction > 0 ? 0.06 : -0.06,
      ease: 'power2.in',
      onComplete: () => {
        setReviewPage(newPage)
      },
    })
  }, [reviewPage, totalReviewPages])

  // Animate new review cards in after page change
  useEffect(() => {
    if (!reviewGridRef.current || reviewDirectionRef.current === 0) return
    const direction = reviewDirectionRef.current
    const cards = reviewGridRef.current.querySelectorAll('[data-review-card]')

    gsap.fromTo(
      cards,
      { x: direction * 60, opacity: 0, scale: 0.95, y: 15 },
      {
        x: 0, opacity: 1, scale: 1, y: 0,
        duration: 0.5,
        stagger: direction > 0 ? 0.1 : -0.1,
        ease: 'power2.out',
        onComplete: () => { isReviewAnimatingRef.current = false },
      },
    )
  }, [reviewPage])

  useEffect(() => {
    const ctx = gsap.context(() => {

      // Stats counter animation
      if (statsRef.current) {
        const statCards = statsRef.current.querySelectorAll('[data-stat]')
        statCards.forEach((card) => {
          const countEl = card.querySelector('[data-count]') as HTMLElement
          const target = parseFloat(countEl?.dataset.count || '0')
          const suffix = countEl?.dataset.suffix || ''
          const obj = { val: 0 }

          gsap.from(card, {
            y: 30,
            opacity: 0,
            duration: 0.6,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: statsRef.current,
              start: 'top 85%',
            },
          })

          gsap.to(obj, {
            val: target,
            duration: 2,
            ease: 'power1.out',
            scrollTrigger: {
              trigger: statsRef.current,
              start: 'top 85%',
            },
            onUpdate: () => {
              if (countEl) {
                countEl.textContent = Math.round(obj.val) + suffix
              }
            },
          })
        })
      }

      // How It Works cards
      if (howItWorksRef.current) {
        gsap.from(howItWorksRef.current.querySelectorAll('[data-animate]'), {
          y: 50,
          opacity: 0,
          duration: 0.7,
          stagger: 0.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: howItWorksRef.current,
            start: 'top 80%',
          },
        })
      }

      // Trending products
      if (trendingRef.current) {
        gsap.from(trendingRef.current.querySelectorAll('[data-animate]'), {
          y: 40,
          opacity: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: trendingRef.current,
            start: 'top 80%',
          },
        })
      }

      // Boutiques
      if (boutiquesRef.current) {
        gsap.from(boutiquesRef.current.querySelectorAll('[data-animate]'), {
          y: 40,
          opacity: 0,
          duration: 0.6,
          stagger: 0.15,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: boutiquesRef.current,
            start: 'top 80%',
          },
        })
      }

      // Review cards
      if (reviewsRef.current) {
        gsap.from(reviewsRef.current.querySelectorAll('[data-animate]'), {
          y: 40,
          opacity: 0,
          duration: 0.6,
          stagger: 0.15,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: reviewsRef.current,
            start: 'top 80%',
          },
        })
      }

      // Vendor CTA
      if (vendorCtaRef.current) {
        gsap.from(vendorCtaRef.current.querySelector('[data-animate]'), {
          scale: 0.95,
          opacity: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: vendorCtaRef.current,
            start: 'top 80%',
          },
        })
      }

    })

    return () => ctx.revert()
  }, [])

  return (
    <main>
      {/* Hero slider */}
      <div ref={heroRef} className="relative bg-gray-50 dark:bg-dark h-[500px] sm:h-[600px] lg:h-[700px] overflow-hidden">
        {heroSlides.map((slide, index) => (
          <div
            key={index}
            data-slide
            className="absolute inset-0"
            style={{ visibility: index === 0 ? 'visible' : 'hidden', zIndex: index === 0 ? 2 : 0 }}
          >
            <div className="absolute inset-0 overflow-hidden">
              <img
                alt=""
                data-hero-bg
                src={slide.image}
                className="size-full object-cover"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/80 to-dark/60" />
            <div className="relative flex h-full items-center justify-center z-10" style={{ perspective: '800px' }}>
              <div className="mx-auto flex max-w-3xl flex-col items-center px-6 text-center">
                <h1 className="text-4xl font-bold tracking-tight text-white lg:text-6xl drop-shadow-lg">
                  {slide.heading.map((word) => (
                    <span key={word} data-hero-word className="inline-block mr-[0.3em] opacity-0">
                      {word}
                    </span>
                  ))}
                </h1>
                <span data-hero-line className="mt-4 block h-0.5 w-24 origin-left bg-primary-600" />
                <p data-hero-desc className="mt-4 text-xl text-white/90 drop-shadow-md">
                  {slide.description}
                </p>
                <Link
                  to={slide.ctaLink}
                  data-hero-cta
                  className="mt-8 inline-block rounded-md border border-transparent bg-primary-600 px-8 py-3 text-base font-medium text-white hover:bg-primary-700"
                >
                  {slide.cta}
                </Link>
              </div>
            </div>
          </div>
        ))}

        {/* Arrow controls */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 z-20 -translate-y-1/2 flex size-10 items-center justify-center rounded-full bg-gray-200 dark:bg-white/10 text-gray-900 dark:text-white backdrop-blur-sm transition hover:bg-gray-300 dark:hover:bg-white/20 sm:size-12"
        >
          <svg className="size-5 sm:size-6" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" /></svg>
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 z-20 -translate-y-1/2 flex size-10 items-center justify-center rounded-full bg-gray-200 dark:bg-white/10 text-gray-900 dark:text-white backdrop-blur-sm transition hover:bg-gray-300 dark:hover:bg-white/20 sm:size-12"
        >
          <svg className="size-5 sm:size-6" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" /></svg>
        </button>

        {/* Dot indicators */}
        <div className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 gap-x-2.5">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentSlide ? 'w-8 bg-primary-600' : 'w-2 bg-black/30 dark:bg-white/40 hover:bg-black/50 dark:hover:bg-white/60'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Stats bar */}
      <section ref={statsRef} className="bg-gray-50 dark:bg-dark">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-4 py-10 sm:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} data-stat className="flex flex-col items-center rounded-lg border border-gray-200 dark:border-gray-700 px-6 py-8">
                {stat.icon}
                <p className="mt-4 text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl" data-count={stat.numericValue} data-suffix={stat.suffix}>0</p>
                <p className="mt-2 text-sm uppercase tracking-wider text-gray-500 dark:text-gray-400">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sections with background image */}
      <div className="relative bg-cover bg-center bg-fixed" style={{ backgroundImage: "url('/images/styles/style-3.jpg')" }}>
        <div className="absolute inset-0 bg-gray-50/90 dark:bg-dark/90" />

      {/* Event Category Pills */}
      <section className="relative py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-3">
            {eventCategories.map((cat) => (
              <button
                key={cat.name}
                type="button"
                onClick={() => setActiveEvent(cat.name)}
                className={`inline-flex items-center gap-x-2 rounded-full px-5 py-2.5 text-sm font-medium transition-colors ${
                  activeEvent === cat.name
                    ? 'bg-primary-600 text-white'
                    : 'border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-white hover:border-primary-600 hover:text-primary-600'
                }`}
              >
                {cat.icon}
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Trending Near You */}
      <section ref={trendingRef} className="relative py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Trending Near You</h2>
            <div className="flex flex-wrap items-center gap-3 text-sm">
              <div className="flex items-center gap-x-1.5 text-gray-500 dark:text-gray-400">
                <svg className="size-4 text-primary-600" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" /><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" /></svg>
                <span>Showing outfits near: <strong className="text-gray-900 dark:text-white">{city}</strong></span>
                <button type="button" onClick={openModal} className="font-medium text-primary-600 hover:text-primary-500">Change</button>
              </div>
              <div className="flex gap-x-1">
                {['2 km', '5 km', '10 km'].map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => setActiveRadius(r)}
                    className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                      activeRadius === r
                        ? 'bg-primary-600 text-white'
                        : 'text-gray-500 dark:text-gray-400 hover:text-primary-600'
                    }`}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-6 sm:gap-x-6 lg:grid-cols-4">
            {trendingProducts.map((product) => (
              <div key={product.id} className="group overflow-hidden rounded-2xl bg-white dark:bg-white/5 border border-gray-200 dark:border-gray-700" data-animate>
                <div className="relative overflow-hidden">
                  <img
                    alt={product.name}
                    src={product.image}
                    className="aspect-[3/4] w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute bottom-2 left-2 rounded-full bg-dark/80 backdrop-blur-sm px-2.5 py-1 text-[11px] font-medium text-white">
                    <svg className="mr-1 inline size-3" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" /><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" /></svg>
                    {product.distance}
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-white">{product.name}</h3>
                  <div className="mt-1 flex items-center gap-x-1">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className={`size-3.5 ${i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'}`} fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401Z" clipRule="evenodd" />
                      </svg>
                    ))}
                    <span className="ml-1 text-xs text-gray-500 dark:text-gray-400">{product.rating}</span>
                  </div>
                  <p className="mt-0.5 text-xs text-gray-500 dark:text-gray-400">{product.store}</p>
                  <p className="mt-0.5 text-xs text-gray-400 dark:text-gray-500">{product.distance}</p>
                  <Link
                    to="/discover"
                    className="mt-3 block w-full rounded-md bg-primary-600 py-2 text-center text-sm font-semibold text-white hover:bg-primary-700"
                  >
                    Reserve
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Meet Your AI Stylist */}
      <section className="relative py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="overflow-hidden rounded-2xl bg-white dark:bg-white/5 border border-gray-200 dark:border-gray-700">
            <div className="flex flex-col items-center gap-6 px-6 py-6 sm:flex-row sm:px-12">
              <img
                src="/images/styles/style-2.jpg"
                alt="AI Stylist"
                className="rounded-full shrink-0 size-32"
              />
              <div className="flex-1 text-center sm:text-left">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Meet Your AI Stylist</h2>
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                  Upload a selfie and discover outfits that match your style, skin tone, and event.
                </p>
              </div>
              <Link
                to="/find-my-match"
                className="inline-flex items-center gap-x-2 rounded-md bg-primary-600 px-6 py-3 text-sm font-semibold text-white hover:bg-primary-700"
              >
                <svg className="size-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z" /><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0Z" /></svg>
                Try AI Stylist
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Top Boutiques Nearby */}
      <section ref={boutiquesRef} className="relative py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Top Boutiques Nearby</h2>
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-3">
            {nearbyBoutiques.map((store) => (
              <div key={store.id} className="relative overflow-hidden rounded-lg" data-animate>
                <img
                  alt={store.name}
                  src={store.image}
                  className="aspect-[4/3] w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/60 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-4">
                  <h3 className="text-base font-semibold text-white">{store.name}</h3>
                  <div className="mt-1 flex items-center gap-x-1">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className={`size-3.5 ${i < Math.floor(store.rating) ? 'text-yellow-400' : 'text-gray-500'}`} fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401Z" clipRule="evenodd" />
                      </svg>
                    ))}
                    <span className="ml-1 text-xs text-white/80">{store.rating}</span>
                  </div>
                  <div className="mt-2 flex items-center justify-between text-xs text-white/70">
                    <span className="flex items-center gap-x-1">
                      <svg className="size-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" /><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" /></svg>
                      {store.distance}
                    </span>
                    <span>{store.garments} Garments</span>
                  </div>
                  <Link
                    to={`/stores/${store.slug}`}
                    className="mt-3 block w-full rounded-md bg-primary-600 py-2 text-center text-sm font-semibold text-white hover:bg-primary-700 transition-colors"
                  >
                    View Store
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How MyChoice Works */}
      <section ref={howItWorksRef} className="relative py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center" data-animate>
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">How MyChoice Works</h2>
          </div>
          <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-3">
            {howItWorks.map((item) => (
              <div key={item.step} className="relative" data-animate>
                <div className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-white/5 px-6 pb-8 pt-10 text-center">
                  <div className="mx-auto flex size-12 items-center justify-center rounded-lg border border-gray-200 dark:border-gray-700">
                    {item.icon}
                  </div>
                  <h3 className="mt-4 text-base font-semibold text-gray-900 dark:text-white">{item.title}</h3>
                  <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vendor CTA */}
      <section ref={vendorCtaRef} className="relative py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div data-animate className="overflow-hidden rounded-2xl bg-primary-600 px-6 py-16 sm:px-12 lg:flex lg:items-center lg:justify-between lg:px-16">
            <div>
              <span className="inline-flex items-center rounded-full bg-dark/20 px-3 py-1 text-xs font-medium text-white">
                For Sellers
              </span>
              <h2 className="mt-4 text-2xl font-bold tracking-tight text-white sm:text-3xl">
                Got a boutique?<br />Start selling today.
              </h2>
              <p className="mt-3 text-sm text-white/80">
                Join 200+ vendors reaching thousands of customers in your city. Setup takes less than 5 minutes.
              </p>
              <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-xs text-white/70">
                <span className="flex items-center gap-x-1">
                  <svg className="size-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" /></svg>
                  Zero Listing Fees
                </span>
                <span className="flex items-center gap-x-1">
                  <svg className="size-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" /></svg>
                  Instant Payouts
                </span>
                <span className="flex items-center gap-x-1">
                  <svg className="size-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" /></svg>
                  Analytics Dashboard
                </span>
                <span className="flex items-center gap-x-1">
                  <svg className="size-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" /></svg>
                  24/7 Support
                </span>
              </div>
            </div>
            <div className="mt-8 lg:mt-0 lg:shrink-0">
              <Link
                to="/vendor/register"
                className="inline-flex items-center gap-x-2 rounded-md border-2 border-white bg-transparent px-6 py-3 text-sm font-semibold text-white hover:bg-white hover:text-primary-600"
              >
                Become a Vendor
                <svg className="size-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" /></svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      </div>{/* End background image wrapper */}

      {/* Reviews */}
      <section ref={reviewsRef} className="bg-gray-100 dark:bg-gray-900/60 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center" data-animate>
            <span className="inline-flex items-center rounded-full border border-primary-600 px-4 py-1.5 text-xs font-medium text-primary-600">
              Reviews
            </span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 dark:text-white">Loved by Shoppers</h2>
            <p className="mt-4 text-base text-gray-500 dark:text-gray-400">
              See what our community has to say about their experience
            </p>
          </div>
          <div className="relative mt-12">
            <div ref={reviewGridRef} className="grid grid-cols-1 gap-8 sm:grid-cols-3">
              {visibleReviews.map((review) => (
                <div key={review.id} className="relative rounded-2xl bg-white dark:bg-white/5 p-8" data-review-card>
                  <svg className="absolute top-6 right-6 size-8 text-primary-600/20" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H14.017zM0 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151C7.546 6.068 5.983 8.789 5.983 11h4v10H0z" />
                  </svg>
                  <div className="flex items-center gap-x-1">
                    {[...Array(review.rating)].map((_, i) => (
                      <svg key={i} className="size-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401Z" clipRule="evenodd" />
                      </svg>
                    ))}
                  </div>
                  <p className="mt-5 text-base leading-relaxed text-gray-600 dark:text-gray-300">"{review.content}"</p>
                  <div className="mt-8 flex items-center gap-x-4 border-t border-gray-200 dark:border-white/10 pt-6">
                    <div className="flex size-11 items-center justify-center rounded-full bg-primary-600 text-sm font-bold text-white">
                      {review.author.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">{review.author}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{review.role} &middot; {review.store}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {/* Review slider controls */}
            <div className="mt-10 flex items-center justify-center gap-x-4">
              <button
                onClick={() => changeReviewPage(reviewPage - 1)}
                disabled={reviewPage === 0 || isReviewAnimatingRef.current}
                className="flex size-10 items-center justify-center rounded-full border border-gray-300 dark:border-gray-700 text-gray-600 dark:text-gray-300 transition hover:bg-gray-200 dark:hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <svg className="size-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" /></svg>
              </button>
              <div className="flex gap-x-2">
                {Array.from({ length: totalReviewPages }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => changeReviewPage(i)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      i === reviewPage ? 'w-8 bg-primary-600' : 'w-2 bg-gray-400/40 dark:bg-white/30 hover:bg-gray-400/60 dark:hover:bg-white/50'
                    }`}
                  />
                ))}
              </div>
              <button
                onClick={() => changeReviewPage(reviewPage + 1)}
                disabled={reviewPage === totalReviewPages - 1 || isReviewAnimatingRef.current}
                className="flex size-10 items-center justify-center rounded-full border border-gray-300 dark:border-gray-700 text-gray-600 dark:text-gray-300 transition hover:bg-gray-200 dark:hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <svg className="size-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" /></svg>
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
