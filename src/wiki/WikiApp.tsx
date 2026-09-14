import { useEffect, useMemo, useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import WikiLayout from './components/WikiLayout'
import WikiHomePage, { WikiCategoryPage } from './pages/WikiHomePage'
import WikiEntityPage from './pages/WikiEntityPage'
import WikiMechanicPage from './pages/WikiMechanicPage'
import WikiSearchPage from './pages/WikiSearchPage'
import { listMechanics, loadIndex, typesWithPublicContent } from './data'
import type { WikiIndex } from './types'

/**
 * Wiki route tree mounted at /sandsofarrakiswiki/*
 * Reserved path segments: category, mechanics, search
 */
export default function WikiApp() {
  const [index, setIndex] = useState<WikiIndex | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    loadIndex()
      .then(setIndex)
      .catch((err: Error) => setError(err.message))
  }, [])

  const categories = useMemo(() => (index ? typesWithPublicContent(index) : []), [index])
  const mechanicLinks = useMemo(() => (index ? listMechanics(index) : []), [index])

  if (error) {
    return (
      <div className="soa-wiki" style={{ padding: '6rem 1.5rem' }}>
        <p className="soa-wiki-error">Failed to load wiki index: {error}</p>
      </div>
    )
  }

  if (!index) {
    return (
      <div className="soa-wiki" style={{ padding: '6rem 1.5rem' }}>
        <p className="soa-wiki-loading">Loading Sands of Arrakis wiki…</p>
      </div>
    )
  }

  return (
    <Routes>
      <Route element={<WikiLayout categories={categories} mechanicLinks={mechanicLinks} />}>
        <Route index element={<WikiHomePage />} />
        <Route path="search" element={<WikiSearchPage />} />
        <Route path="category/:type" element={<WikiCategoryPage />} />
        <Route path="mechanics/:slug" element={<WikiMechanicPage />} />
        <Route path=":slug" element={<WikiEntityPage />} />
        <Route path="*" element={<Navigate to="/sandsofarrakiswiki" replace />} />
      </Route>
    </Routes>
  )
}
