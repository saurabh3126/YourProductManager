import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { cn } from '@/lib/utils'

const navLinks = [
  { href: '/', label: 'Home Page' },
  { href: '/courses', label: 'Courses' },
  { href: '/contact', label: 'Contact Us' },
  { href: '/jobs', label: 'Job Boards' },
  { href: '/blog', label: 'Blog' },
  { href: '/resources', label: 'Resources' },
  { href: '/login', label: 'Login' },
]

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isHidden, setIsHidden] = useState(false)
  const location = useLocation()
  
  // Ref for scroll tracking to avoid re-renders just for storing the value
  const lastScrollY = useRef(0)

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      
      // Determine if scrolled (bg style)
      setIsScrolled(currentScrollY > 20)

      // Determine visibility (hide on scroll down, show on scroll up)
      // Only hide if we've scrolled down and are not at the very top
      if (currentScrollY > lastScrollY.current && currentScrollY > 50) {
        setIsHidden(true)
      } else {
        setIsHidden(false)
      }
      
      lastScrollY.current = currentScrollY
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <header 
        className={cn(
          "fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 lg:px-8 pt-4 transition-transform duration-300",
          isHidden ? "-translate-y-full" : "translate-y-0"
        )}
      >
      {/* Pill-shaped navbar container */}
      <nav 
        className={cn(
          'navbar-pill',
          isScrolled && 'navbar-scrolled'
        )}
      >
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 shrink-0">
          <div className="w-8 h-8 rounded-lg bg-accent-gradient flex items-center justify-center">
            <span className="text-background font-bold text-sm">YPM</span>
          </div>
          <span className="hidden sm:block font-semibold text-foreground text-sm">
            YourProductManager
          </span>
        </Link>

        {/* Center Navigation */}
        <div className="flex items-center gap-1 min-w-0 flex-1 justify-center overflow-x-auto">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className={cn(
                'px-4 py-2 text-sm font-medium rounded-full transition-colors duration-200 whitespace-nowrap',
                location.pathname === link.href
                  ? 'text-foreground bg-white/5'
                  : 'text-muted-foreground hover:text-foreground hover:bg-white/5'
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Right side: CTA */}
        <div className="flex items-center gap-3 shrink-0">
          {/* CTA Button - Desktop */}
          <Link 
            to="/coaching" 
            className="hidden md:flex items-center gap-2 pl-5 pr-1.5 py-1.5 bg-foreground text-background rounded-full font-medium text-sm hover:bg-foreground/90 transition-colors group"
          >
            <span>Schedule a meeting</span>
            <span className="w-7 h-7 rounded-full bg-primary flex items-center justify-center group-hover:bg-primary/80 transition-colors">
              <ArrowUpRight size={14} className="text-foreground" />
            </span>
          </Link>
        </div>
        </nav>
      </header>
    </>
  )
}
