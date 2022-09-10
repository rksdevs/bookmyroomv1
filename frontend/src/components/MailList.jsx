import styled from "styled-components";

const MLContainer = styled.div`
  width: 100%;
  margin-top: 50px;
  background-color: #16213e;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding: 50px;
`;
const MLHeading = styled.h1`
  font-size: 18px;
`;
const MLSpan = styled.span``;
const MLInputContainer = styled.div``;
const MLInput = styled.input`
  width: 300px;
  height: 50px;
  padding: 10px;
  border: none;
  margin-right: 10px;
  outline: none;
  border-radius: 5px;
`;
const MLInputButton = styled.button`
  color: #f50057;
  padding: 10px;
  border: 1px solid #f50057;
  border-radius: 10px;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    background-color: #f50057;
    color: #16213e;
  }
`;

const MailList = () => {
  return (
    <MLContainer>
      <MLHeading>Save time, save money!</MLHeading>
      <MLSpan>Sign up and we'll send you discounts and offers!</MLSpan>
      <MLInputContainer>
        <MLInput type="text" placeholder="Your Email" />
        <MLInputButton>Subscribe</MLInputButton>
      </MLInputContainer>
    </MLContainer>
  );
};
export default MailList;
