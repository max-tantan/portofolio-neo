import { createContext } from 'react'
import type enSite from '../data/en/site.json'
import type enHero from '../data/en/hero.json'
import type enAbout from '../data/en/about.json'
import type enSkills from '../data/en/skills.json'
import type enProjects from '../data/en/projects.json'
import type enExperience from '../data/en/experience.json'
import type enContact from '../data/en/contact.json'

export type Language = 'en' | 'id'

export type Content = {
  site: typeof enSite
  hero: typeof enHero
  about: typeof enAbout
  skills: typeof enSkills
  projects: typeof enProjects
  experience: typeof enExperience
  contact: typeof enContact
}

export type LanguageContextValue = {
  lang: Language
  setLang: (lang: Language) => void
  toggle: () => void
  content: Content
}

export const LanguageContext = createContext<LanguageContextValue | null>(null)
