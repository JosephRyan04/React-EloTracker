import Body from '../components/Body';

export default function ExplorePage() {

  return (
    <Body sidebar>
      <div className='leaderboard'>
      <h1>About</h1>
      <h6>What is this project?</h6>
      <p className='about'>
        Slippi is a online service for the fighting game, Super Smash Bros. Melee. Users of slippi have their rating tracked
        in a similar fashion to ELO in chess. However, ratings are not tracked over time, providing little feedback on player progress.
        This project was created to solve this problem, by keeping a record of a user's stats.</p>
        <h6>About me</h6>
        <p className='about'>
          I am a recent graduate in 'Computer Science & Engineering'. I started this project to track my own rating on slippi, but got
          carried away as I wanted new features. From start to finish the project took a little over a month, including the
          process of learning Flask, SQLAlchemy, React, and CSS. This was my first experience with front-end, and spent a majority of
          the time trying to get the layout presentable (luckily I didn't go into graphic design).
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