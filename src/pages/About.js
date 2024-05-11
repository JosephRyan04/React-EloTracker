import Body from '../components/Body';

export default function ExplorePage() {

  return (
    <Body sidebar>
      <div className='leaderboard'>
      <h1>About</h1>
      <h6>What is this project?</h6>
      <p className='about'>
        Slippi is a online service for the fighting game, Super Smash Bros. Melee. Users of slippi have their rating tracked
        in a similar fashion to ELO in chess. However, ratings are not tracked over time.
        This project was created to solve this problem, by keeping a record of a user's stats.</p>
        <h6>Creator</h6>
        <p className='about'>
          I am a recent Computer Science & Engineering graduate and Melee player. My gamer-tag is Wens.
        </p>
        <h6>Contact Information</h6>
        <ul>
          <li>E-mail: JosephRyan.CS@outlook.com</li>
          <li>Github: jlryan04</li>
        </ul>
      </div>
    </Body>
  );
}