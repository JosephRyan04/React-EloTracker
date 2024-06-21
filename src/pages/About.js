import Body from "../components/Body";
import { GithubLogo, Envelope } from "@phosphor-icons/react";

export default function ExplorePage() {
  return (
    <Body sidebar>
      <div className="leaderboard">
        <h1>About</h1>
        <h6>What is this project?</h6>
        <p className="about">
          Slippi is a online service for the fighting game, Super Smash Bros.
          Melee. Users of slippi have their rating tracked in a similar fashion
          to ELO in chess. However, ratings are not tracked over time. This
          project was created to solve this problem, by keeping a record of a
          user's stats.
        </p>
        <h6>Creator</h6>
        <p className="about">
          I am a recent Computer Science & Engineering graduate and Melee
          player. My gamer-tag is Wens, and I'm currently ranked third in
          Kentucky melee. Please feel to reach out with any business or project
          related inquiries!
        </p>
        <div className="d-flex gap-2">
          <a href="mailto:JosephRyan.CS@outlook.com">
            <h6>
              <Envelope size={18} /> JosephRyan.CS@outlook.com
            </h6>
          </a>
          <a href="https://github.com/JosephRyan04">
            <h6>
              <GithubLogo size={18} weight="fill" /> JosephRyan04
            </h6>
          </a>
        </div>
      </div>
    </Body>
  );
}
