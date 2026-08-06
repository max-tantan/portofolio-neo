import { useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import { LanguageContext } from './language'
import type { Content, Language } from './language'
import enSite from '../data/en/site.json'
import enHero from '../data/en/hero.json'
import enAbout from '../data/en/about.json'
import enSkills from '../data/en/skills.json'
import enProjects from '../data/en/projects.json'
import enExperience from '../data/en/experience.json'
import enContact from '../data/en/contact.json'
import idSite from '../data/id/site.json'
import idHero from '../data/id/hero.json'
import idAbout from '../data/id/about.json'
import idSkills from '../data/id/skills.json'
import idProjects from '../data/id/projects.json'
import idExperience from '../data/id/experience.json'
import idContact from '../data/id/contact.json'

const CONTENT: Record<Language, Content> = {
  en: {
    site: enSite,
    hero: enHero,
    about: enAbout,
    skills: enSkills,
    projects: enProjects,
    experience: enExperience,
    contact: enContact,
  },
  id: {
    site: idSite,
    hero: idHero,
    about: idAbout,
    skills: idSkills,
    projects: idProjects,
    experience: idExperience,
    contact: idContact,
  },
}

const STORAGE_KEY = 'portfolio-language'

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Language>(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored === 'en' || stored === 'id' ? stored : 'en'
  })

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, lang)
  }, [lang])

  const value = useMemo(
    () => ({
      lang,
      setLang,
      toggle: () => setLang((l) => (l === 'en' ? 'id' : 'en')),
      content: CONTENT[lang],
    }),
    [lang],
  )

  return (
    <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
  )
}
