// src/pages/Resources/Resources.tsx
import { Hero } from "../../components/Hero/Hero";
import "./Resources.scss";

export const Resources = () => {
  const issues = [
    {
      id: "flock-safety",
      title: "Flock Safety License Plate Readers (ALPRs)",
      info: "Flock Safety installs automated license plate readers that capture every passing vehicle. These systems enable mass location tracking and share data widely — including with federal agencies — often without meaningful oversight or community consent.",
      talkingPoints: [
        "ALPRs track the movements of innocent people with no suspicion of wrongdoing.",
        "Data is retained for 30+ days and shared with agencies like ICE and CBP.",
        "No solid evidence shows ALPRs reduce serious crime — they mostly generate traffic tickets.",
        "Communities deserve transparency and a vote before mass surveillance is deployed.",
      ],
      facts: [
        "80,000+ Flock cameras installed nationwide (2025)",
        "Billions of license plate scans collected every year",
        "Multiple cities have rejected or removed Flock systems after public backlash",
      ],
      emailTemplate: `Subject: Please Reject or Remove Flock Safety ALPRs in Our City

Dear Councilmember [Name],

I am a resident of [City] and strongly oppose the use of Flock Safety automated license plate readers.

These devices:
• Track every vehicle without a warrant
• Share data with federal agencies
• Have no proven impact on reducing violent crime

I urge you to end any existing contract and reject future proposals.

Thank you,
[Your Name]`,
    },
    {
      id: "facial-recognition",
      title: "Facial Recognition Technology",
      info: "Police use of facial recognition creates a pervasive identification system that disproportionately harms communities of color and chills free expression.",
      talkingPoints: [
        "Known to misidentify people of color, women, and younger people at much higher rates.",
        "Enables real-time tracking and retrospective searches of protestors and activists.",
        "Already banned or heavily restricted in dozens of U.S. cities.",
      ],
      facts: [
        "NIST studies: some algorithms 10–100× more likely to misidentify Black & Asian faces",
        "Only ~46% of Americans support police use (Pew Research)",
        "San Francisco, Boston, Portland + many others have banned it",
      ],
      emailTemplate: `Subject: Oppose Facial Recognition Surveillance in [City]

Councilmember [Name],

Facial recognition technology poses unacceptable risks to privacy and equity.
It is prone to racial bias, enables mass monitoring, and has been rejected by many leading cities.

Please support a full ban on government use of this technology.

Sincerely,
[Your Name]`,
    },
    {
      id: "police-drones",
      title: "Police Drone Surveillance",
      info: "Unregulated police drone programs allow persistent aerial surveillance — including over private property — without warrants or public disclosure.",
      talkingPoints: [
        "High-resolution and thermal cameras can peer into backyards.",
        "Many departments fly without clear policies or public notice.",
        "Over 1,500 law-enforcement agencies now operate drones (2025).",
      ],
      facts: [
        "150% increase in police drone programs since 2018",
        "Some drones can loiter for hours with AI-powered tracking",
        "Very few cities require warrants for non-emergency flights",
      ],
      emailTemplate: `Subject: Demand Strong Rules for Police Drones in [City]

Councilmember [Name],

Police drone use is expanding rapidly with almost no public oversight.

I request:
• Warrants required for targeted surveillance
• Public reporting on all flights
• Ban on facial recognition or persistent tracking

Please protect our privacy from aerial surveillance overreach.

Thank you,
[Your Name]`,
    },
  ];

  return (
    <>
      <Hero
        title="Resources for Action"
        subtitle="Everything you need to speak up against AI surveillance at your city council"
      />

      {/* Sticky Issue Navigation */}
      <nav className="resources-sticky-nav">
        <div className="container">
          <ul>
            {issues.map((issue) => (
              <li key={issue.id}>
                <a href={`#${issue.id}`}>{issue.title}</a>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Main Content */}
      <main className="main-content container py-12">
        {issues.map((issue) => (
          <section key={issue.id} id={issue.id} className="resource-section">
            <h2 className="section-title">{issue.title}</h2>
            <p className="section-text">{issue.info}</p>

            <h3 className="subsection-title">Talking Points</h3>
            <ul className="bullet-list">
              {issue.talkingPoints.map((p, i) => (
                <li key={i}>{p}</li>
              ))}
            </ul>

            <h3 className="subsection-title">Key Facts & Stats</h3>
            <ul className="bullet-list">
              {issue.facts.map((f, i) => (
                <li key={i}>{f}</li>
              ))}
            </ul>

            <h3 className="subsection-title">Email Template</h3>
            <pre className="email-block">{issue.emailTemplate.trim()}</pre>
          </section>
        ))}
      </main>
    </>
  );
};