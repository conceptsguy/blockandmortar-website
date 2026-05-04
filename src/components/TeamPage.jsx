import { useQuery, useLiveMode } from '../lib/loader';
import { liveClient } from '../lib/sanity';
import { TEAM_QUERY } from '../lib/queries';
import { Nav, Footer } from './Sections';
import DemoModal from './DemoModal';

function LiveMode() {
  useLiveMode({ client: liveClient });
  return null;
}

function TeamHero() {
  return (
    <section className="team-hero">
      <div className="container">
        <div className="eyebrow" style={{ position: 'relative' }}>
          <span className="dot" /> The team
        </div>
        <h1 className="team-h1">
          Built-world leaders meet <em>digital product experience.</em>
        </h1>
        <p className="team-lede">
          Our founding team comes from across the construction and technology industry. Owners, builders, designers, and engineers who've lived the problems we now build against.
        </p>
      </div>
    </section>
  );
}

function TeamGrid({ members }) {
  return (
    <section className="team-grid-wrap">
      <div className="container">
        <div className="team-grid">
          {members.map(m => (
            <article className="team-card" key={m._id ?? m.name}>
              <div
                className={`team-avatar${m.photo ? ' has-photo' : ''}`}
                style={{
                  borderColor: `${m.tint}55`,
                  boxShadow: `inset 0 -80px 80px -40px rgba(11,13,16,0.55), 0 0 0 1px ${m.tint}22`,
                }}
              >
                {m.photo && (
                  <img
                    src={m.photo}
                    alt={`Portrait of ${m.name}`}
                    className="team-avatar-photo"
                    loading="lazy"
                  />
                )}
                <div
                  className="team-avatar-tint"
                  style={{
                    background: `linear-gradient(180deg, rgba(11,13,16,0) 55%, rgba(11,13,16,0.45) 100%), linear-gradient(135deg, ${m.tint}18 0%, transparent 55%)`,
                  }}
                />
              </div>
              <div className="team-card-body">
                <div className="team-name">{m.name}</div>
                <div className="team-role">{m.role}</div>
                <p className="team-bio">{m.bio}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function TeamStory() {
  return (
    <section className="team-story">
      <div className="container team-story-grid">
        <div className="team-story-col">
          <div className="team-story-kicker">Our story</div>
          <h2 className="team-story-h">
            We started Block and Mortar because development deserves a better operating system.
          </h2>
          <p>
            Block and Mortar was started by industry practitioners who saw the need for a better way of doing real estate development — one that was more collaborative, with technology that was actually good.
          </p>
          <p>
            It also needed to make an immediate impact. We're a team of experienced founders and operators spanning
            technology, design, development, and construction who have built businesses and delivered projects at scale —
            united by a shared belief that the future of development belongs to those who integrate disciplines rather
            than operate in silos.
          </p>
        </div>
        <div className="team-story-col">
          <div className="team-story-kicker">The vision</div>
          <h2 className="team-story-h">
            Real estate development is on the verge of transformation. Technology is the catalyst.
          </h2>
          <p>
            Block and Mortar unifies the entire development lifecycle — seamlessly connecting information, partners, and execution into a single intelligent platform.
          </p>
          <p>
            From first concept to final delivery, we empower teams to move faster, make smarter decisions, and bring
            projects to life with unprecedented precision. What was once manual and disjointed becomes coordinated and
            data-driven — turning development into a system, not a series of disconnected steps.
          </p>
        </div>
      </div>
    </section>
  );
}

function TeamApply() {
  return (
    <section className="team-apply">
      <div className="container">
        <div className="team-apply-card">
          <div>
            <div className="eyebrow" style={{ position: 'relative' }}>
              <span className="dot" /> Apply today
            </div>
            <h2 className="team-apply-h">
              We're building the future of the built environment — and we want people who'll shape it, not just work in it.
            </h2>
            <p>
              If you're driven to rethink how projects get designed, delivered, and scaled — and you thrive at the intersection of technology, infrastructure, and real-world impact — we'd love to hear from you.
            </p>
          </div>
          <div className="team-apply-actions">
            <a href="mailto:info@blockandmortar.ai?subject=Candidate%20Interest" className="btn btn-primary">
              Apply <span className="arrow">→</span>
            </a>
            <a href="mailto:info@blockandmortar.ai" className="btn btn-ghost">
              Talk to the team
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function TeamPage({ teamInitial, isDraftMode = false }) {
  const { data: members } = useQuery(TEAM_QUERY, {}, { initial: teamInitial });

  return (
    <>
      {isDraftMode && liveClient && <LiveMode />}
      <Nav />
      <TeamHero />
      <TeamGrid members={members ?? []} />
      <TeamStory />
      <TeamApply />
      <Footer />
      <DemoModal />
    </>
  );
}
