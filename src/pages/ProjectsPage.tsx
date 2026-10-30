import { Link } from 'react-router-dom'
import { projects } from '../content/projects'
import Reveal from '../components/Reveal'

export default function ProjectsPage() {
  return (
    <div className="portfolio-work">
      <div className="work-heading">
        <p className="eyebrow">Selected work / Ternary Labs</p>
        <h1>Ideas made real.</h1>
        <p>Mobile products, web experiences, and independent experiments. Explore the thinking, capabilities, and technology behind each project.</p>
        <div className="work-summary"><span>{projects.length} projects</span><span>{projects.filter(p => p.status === 'Live').length} live products</span><span>Web · Mobile · Desktop</span></div>
      </div>
      <div className="work-grid">
        {projects.map((project, i) => (
          <Reveal key={project.slug} delay={Math.min(i * 60, 180)}>
            <Link className="work-card" to={`/projects/${project.slug}`} aria-label={`Explore ${project.displayName}`}>
              <div className={`work-art ${project.galleryDisplay === 'portrait' ? 'work-art-phones' : ''}`}>
                <span className="work-number">{String(i + 1).padStart(2, '0')}</span>
                <span className={`work-status ${project.status === 'Live' ? 'is-live' : ''}`}>{project.status}</span>
                {project.galleryDisplay === 'portrait' && project.galleryImageUrls?.length ? (
                  <div className="work-phones" aria-hidden="true">{project.galleryImageUrls.slice(0, 2).map(url => <img key={url} src={url} alt="" loading="lazy" />)}</div>
                ) : project.mediaIconUrl ? (
                  <img className="work-icon" src={project.mediaIconUrl} alt="" loading="lazy" />
                ) : <span className="work-monogram" aria-hidden="true">{project.displayName.charAt(0)}</span>}
              </div>
              <div className="work-card-body">
                <p className="work-platforms">{project.platforms.join(' / ')}</p>
                <h2>{project.displayName}<span aria-hidden="true">↗</span></h2>
                <p>{project.shortSummary}</p>
                <span className="work-explore">Explore project <span aria-hidden="true">→</span></span>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
      <div className="work-contact"><h2>Have something in mind?</h2><p>Let’s turn a useful idea into a considered product.</p><Link to="/contact">Start a conversation →</Link></div>
    </div>
  )
}
