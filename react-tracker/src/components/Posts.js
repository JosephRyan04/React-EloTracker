export default function Posts() {
  const posts = [
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

  return (
    <>
      {posts.length === 0 ?
        <p>There are no blog posts.</p>
      :
        posts.map(post => {
          return (
            <p key={post.id}>
              <b>{post.author.username}</b> &mdash; {post.timestamp}
              <br />
              {post.text}
            </p>
          );
        })
      }
    </>
  );
}
