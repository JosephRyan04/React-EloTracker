export default function Posts({newposts}) {
  
  let posts = [
    {
      id: 1,
      text: 'Rank: 3200',
      timestamp: 'a minute ago',
      author: {
        username: 'Zion',
      },
    },
    {
      id: 2,
      text: 'Rank: 2326',
      timestamp: 'an hour ago',
      author: {
        username: 'Wens',
      },
    },
  ];
  
  console.log(newposts);

  return (
    <>
      {posts.length === 0 ?
        <p>There are no blog posts.</p>
      :
        posts.map(post => {
          return (
            <b className='stat-text' key={post.id}>
              <b className='stat-text'>{post.code}</b> &mdash; Best win streak {post.maxstreak}
              <br />
              Rank {post.rank}
            </p>
          );
        })
      }
    </>
  );
}
