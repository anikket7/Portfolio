import { useState, useEffect } from 'react';
import ScrollReveal from './ScrollReveal';
import { FiGithub, FiStar, FiGitBranch, FiCode } from 'react-icons/fi';
import { SiLeetcode } from 'react-icons/si';
import './Achievements.css';

const FALLBACK_LC = {
  solvedProblem: 187,
  easySolved: 87,
  mediumSolved: 92,
  hardSolved: 8,
  totalEasy: 835,
  totalMedium: 1754,
  totalHard: 746,
  ranking: 812531,
  reputation: 0,
  acceptanceRate: 87.89, // Calculated: (428 AC submissions / 487 Total submissions) * 100
  maxStreak: 57 // Used instead of contribution points
};

const FALLBACK_GH = {
  public_repos: 35,
  followers: 12,
  following: 15,
  public_gists: 2,
  totalCommits: 520, // Manual fallback, GitHub API doesn't list exact total commits
};
const FALLBACK_REPOS = [
  { stargazers_count: 5 }, { stargazers_count: 3 }, { stargazers_count: 2 }
];

function useLeetCodeStats(username) {
  const [data, setData] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch(`https://alfa-leetcode-api.onrender.com/${username}/solved`).then(r => r.json()),
      fetch(`https://alfa-leetcode-api.onrender.com/${username}`).then(r => r.json())
    ])
      .then(([solvedData, profileData]) => {
        if (solvedData.errors || profileData.errors) throw new Error('API limits');
        setData(solvedData);
        setProfile(profileData);
        setLoading(false);
      })
      .catch(() => {
        // Fallback on failure
        setData(FALLBACK_LC);
        setProfile({ ranking: FALLBACK_LC.ranking, reputation: FALLBACK_LC.reputation });
        setLoading(false);
      });
  }, [username]);

  return { data, profile, loading };
}

function useGitHubStats(username) {
  const [data, setData] = useState(null);
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch(`https://api.github.com/users/${username}`).then(r => r.json()),
      fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=updated`).then(r => r.json()),
    ])
      .then(([user, repoList]) => {
        if (user.message) throw new Error('API limits');
        setData(user);
        setRepos(Array.isArray(repoList) ? repoList : []);
        setLoading(false);
      })
      .catch(() => {
        // Fallback on failure
        setData(FALLBACK_GH);
        setRepos(FALLBACK_REPOS);
        setLoading(false);
      });
  }, [username]);

  const totalStars = repos.reduce((acc, r) => acc + (r.stargazers_count || 0), 0);
  const totalForks = repos.reduce((acc, r) => acc + (r.forks_count || 0), 0);

  return { data, repos, totalStars, totalForks, loading };
}

function StatBox({ icon, value, label, accent }) {
  return (
    <div className={`stat-box ${accent ? 'stat-box--accent' : ''}`}>
      <span className="stat-box__icon">{icon}</span>
      <span className="stat-box__value">{value ?? '—'}</span>
      <span className="stat-box__label">{label}</span>
    </div>
  );
}

function CircleProgress({ solved, total, label, color }) {
  const pct = total ? (solved / total) * 100 : 0;
  const radius = 30;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (pct / 100) * circumference;

  return (
    <div className="circle-progress">
      <svg width="72" height="72" viewBox="0 0 72 72">
        <circle cx="36" cy="36" r={radius} fill="none" stroke="var(--border-subtle)" strokeWidth="5" />
        <circle
          cx="36" cy="36" r={radius} fill="none"
          stroke={color} strokeWidth="5"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          transform="rotate(-90 36 36)"
          style={{ transition: 'stroke-dashoffset 1s ease-out' }}
        />
      </svg>
      <div className="circle-progress__text">
        <span className="circle-progress__num">{solved}</span>
        <span className="circle-progress__total">/{total}</span>
      </div>
      <span className="circle-progress__label" style={{ color }}>{label}</span>
    </div>
  );
}

export default function Achievements() {
  const { data: lcData, profile: lcProfile, loading: lcLoading } = useLeetCodeStats('anikket7');
  const { data: ghData, repos, totalStars, totalForks, loading: ghLoading } = useGitHubStats('anikket7');

  return (
    <section className="section" id="achievements">
      <div className="container">
        <ScrollReveal>
          <span className="section-label">Achievements</span>
          <h2 className="section-title">
            Live <span>Stats</span>
          </h2>
        </ScrollReveal>

        <div className="achievements__grid">
          {/* LeetCode Card */}
          <ScrollReveal delay={0.1}>
            <div className="achieve-card glass-card">
              <div className="achieve-card__header">
                <SiLeetcode className="achieve-card__logo achieve-card__logo--lc" />
                <div>
                  <h3 className="achieve-card__title">LeetCode</h3>
                  <p className="achieve-card__sub">@anikket7</p>
                </div>
                <a
                  href="https://leetcode.com/anikket7"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="achieve-card__link"
                >
                  View Profile →
                </a>
              </div>

              {lcLoading ? (
                <div className="achieve-card__loading">
                  <div className="loader" />
                  <span>Fetching live stats...</span>
                </div>
              ) : lcData ? (
                <>
                  <div className="achieve-card__stat-row">
                    <StatBox
                      icon={<FiCode />}
                      value={lcData.solvedProblem}
                      label="Total Solved"
                      accent
                    />
                    <StatBox
                      icon={<FiStar />}
                      value={lcProfile?.ranking ? `#${lcProfile.ranking.toLocaleString()}` : "—"}
                      label="Ranking"
                    />
                    <StatBox
                      icon={<FiUsers />}
                      value={lcProfile?.reputation || 0}
                      label="Reputation"
                    />
                  </div>

                  <div className="achieve-card__stat-row achieve-card__stat-row--secondary">
                    <StatBox
                      icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0011 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 11-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 002.5 2.5z"></path></svg>}
                      value={lcProfile?.streak || lcData.maxStreak || FALLBACK_LC.maxStreak || "—"}
                      label="Max Streak"
                    />
                    <StatBox
                      icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M12 6v6l4 2"></path></svg>}
                      value={lcProfile?.acceptanceRate ? `${lcProfile.acceptanceRate}%` : (lcData.acceptanceRate ? `${lcData.acceptanceRate}%` : `${FALLBACK_LC.acceptanceRate}%`)}
                      label="Acceptance"
                    />
                  </div>

                  <div className="achieve-card__circles">
                    <CircleProgress
                      solved={lcData.easySolved || 0}
                      total={lcData.totalEasy || 1}
                      label="Easy"
                      color="#00b8a3"
                    />
                    <CircleProgress
                      solved={lcData.mediumSolved || 0}
                      total={lcData.totalMedium || 1}
                      label="Medium"
                      color="#ffc01e"
                    />
                    <CircleProgress
                      solved={lcData.hardSolved || 0}
                      total={lcData.totalHard || 1}
                      label="Hard"
                      color="#ef4743"
                    />
                  </div>
                </>
              ) : (
                <p className="achieve-card__error">Unable to load LeetCode stats</p>
              )}
            </div>
          </ScrollReveal>

          {/* GitHub Card */}
          <ScrollReveal delay={0.2}>
            <div className="achieve-card glass-card">
              <div className="achieve-card__header">
                <FiGithub className="achieve-card__logo achieve-card__logo--gh" />
                <div>
                  <h3 className="achieve-card__title">GitHub</h3>
                  <p className="achieve-card__sub">@anikket7</p>
                </div>
                <a
                  href="https://github.com/anikket7"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="achieve-card__link"
                >
                  View Profile →
                </a>
              </div>

              {ghLoading ? (
                <div className="achieve-card__loading">
                  <div className="loader" />
                  <span>Fetching live stats...</span>
                </div>
              ) : ghData && !ghData.message ? (
                <>
                  <div className="achieve-card__stat-row">
                    <StatBox
                      icon={<FiGitBranch />}
                      value={ghData.public_repos}
                      label="Repositories"
                      accent
                    />
                    <StatBox
                      icon={<FiStar />}
                      value={totalStars}
                      label="Total Stars"
                    />
                    <StatBox
                      icon={<FiUsers />}
                      value={ghData.followers}
                      label="Followers"
                    />
                  </div>

                  <div className="achieve-card__stat-row achieve-card__stat-row--secondary">
                    <StatBox
                      icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><polyline points="16 11 18 13 22 9"></polyline></svg>}
                      value={ghData.following || 0}
                      label="Following"
                    />
                    <StatBox
                      icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"></circle><line x1="3" y1="12" x2="9" y2="12"></line><line x1="15" y1="12" x2="21" y2="12"></line></svg>}
                      value={ghData.totalCommits || FALLBACK_GH.totalCommits}
                      label="Total Commits"
                    />
                  </div>

                  {/* GitHub Contribution Chart */}
                  <div className="achieve-card__chart">
                    <img
                      src={`https://ghchart.rshah.org/00d4aa/anikket7`}
                      alt="GitHub Contributions"
                      className="gh-chart"
                    />
                  </div>
                </>
              ) : (
                <p className="achieve-card__error">Unable to load GitHub stats</p>
              )}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

function FiUsers() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}
