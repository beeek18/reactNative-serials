import styled from 'styled-components/native';

const PostView = styled.View`
flex-direction: row;
margin-top: 25px;
padding: 15px;
border-bottom-width: 1px;
border-bottom-color: rgba(0,0,0,0.1);
border-bottom-style: solid;
`;

const PostImage = styled.Image`
width: 60px;
height: 60px;
border-radius:12px;
margin-rigth: 12px;
`;

const PostTitle = styled.Text`
font-size: 17px;
font-weight: 700;
`;

const PostDetails = styled.View`
flex:1;
flex-direction: column;
justify-content: center;
margin-left: 10px;
`;

const PostDate = styled.Text`
font-size: 12px;
color: rgba(0,0,0,0.4);
margin-top: 2px;
`;

const truncateTitle = (str) => {
  if (str.length >= 50) {
    return str.slice(0, 50) + '...';
  }

  return str
}

export const Post = ({ title, imageUrl, createdAt }) => {
  return (
    <PostView >
      <PostImage source={{ uri: imageUrl }} />
      <PostDetails>
        <PostTitle>{truncateTitle(title)}</PostTitle>
        <PostDate>{new Date(createdAt).toLocaleDateString()}</PostDate>
      </PostDetails>
    </PostView>
  )
}