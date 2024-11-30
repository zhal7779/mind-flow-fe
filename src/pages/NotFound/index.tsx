import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  text-align: center;
  background-color: #f8f9fa;
`;

const Title = styled.h1`
  font-size: 4rem;
  color: #343a40;
`;

const Message = styled.p`
  font-size: 1.2rem;
  color: #868e96;
  margin: 1rem 0;
`;

const BackLink = styled(Link)`
  font-size: 1rem;
  color: #007bff;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const NotFoundPage = () => {
  return (
    <Wrapper>
      <Title>404</Title>
      <Message>Page not found</Message>
      <BackLink to="/">Go back to the homepage</BackLink>
    </Wrapper>
  );
};

export default NotFoundPage;
