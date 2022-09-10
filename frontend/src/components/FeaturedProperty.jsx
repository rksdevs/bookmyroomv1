import styled from "styled-components";
import useFetch from "./hooks/useFetch";

const FPropertyContainer = styled.div`
  width: 100%;
  max-width: 1024px;
  display: flex;
  justify-content: space-between;
  gap: 20px;
  background-color: #eeeeee;
  padding: 10px;
`;

const FPItem = styled.div`
  flex: 1;
  gap: 10px;
  display: flex;
  flex-direction: column;
  color: #f50057;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  padding: 5px;
  border-radius: 10px;
`;

const FPropertyImg = styled.img`
  flex: 1;
  width: 100%;
  height: 150px;
  object-fit: cover;
  border-radius: 10px;
  z-index: 1;
`;

const FPSpanName = styled.span`
  font-weight: bold;
`;
const FPSpanCity = styled.span`
  font-weight: 300;
`;
const FPSpanPrice = styled.span`
  font-weight: 500;
`;

const FPRating = styled.div``;
const FPButton = styled.button`
  background-color: #16213e;
  color: white;
  padding: 5px;
  margin-right: 10px;
  font-weight: bold;
  outline: none;
  border: none;
`;
const FPSpanReview = styled.span`
  font-size: 14px;
`;

const FeaturedProperty = () => {
  const { data, loading, error } = useFetch("/hotels?featured=true&limit=4");
  // console.log(data);
  return (
    <FPropertyContainer>
      {loading ? (
        "Loading please wait"
      ) : (
        <>
          {data.map((item) => (
            <FPItem key={item?._id}>
              <FPropertyImg
                src={
                  item?.photos[0] ||
                  "https://t-cf.bstatic.com/xdata/images/hotel/square200/223496641.webp?k=a2395bdb7f1ce5c33815dee6d9d0f825e8cf88d1aac4d7ad2ec288fcbd8bba78&o=&s=1"
                }
              />
              <FPSpanName>{item?.name}</FPSpanName>
              <FPSpanCity>{item?.city}</FPSpanCity>
              <FPSpanPrice>Starting from ${item?.cheapestPrice}</FPSpanPrice>
              {item?.rating && (
                <FPRating>
                  <FPButton>{item?.rating}</FPButton>
                  <FPSpanReview>Excellent</FPSpanReview>
                </FPRating>
              )}
            </FPItem>
          ))}
        </>
      )}
    </FPropertyContainer>
  );
};
export default FeaturedProperty;

{
  /* <FPItem>
        <FPropertyImg
          src="https://t-cf.bstatic.com/xdata/images/hotel/square200/223496641.webp?k=a2395bdb7f1ce5c33815dee6d9d0f825e8cf88d1aac4d7ad2ec288fcbd8bba78&o=&s=1"
          alt="Hotel Image"
        />
        <FPSpanName>Cosmos Lounge</FPSpanName>
        <FPSpanCity>Hyderabad</FPSpanCity>
        <FPSpanPrice>Starting from $120</FPSpanPrice>
        <FPRating>
          <FPButton>8.9</FPButton>
          <FPSpanReview>Excellent</FPSpanReview>
        </FPRating>
      </FPItem>
      <FPItem>
        <FPropertyImg
          src="https://t-cf.bstatic.com/xdata/images/hotel/square200/223496641.webp?k=a2395bdb7f1ce5c33815dee6d9d0f825e8cf88d1aac4d7ad2ec288fcbd8bba78&o=&s=1"
          alt="Hotel Image"
        />
        <FPSpanName>Cosmos Lounge</FPSpanName>
        <FPSpanCity>Hyderabad</FPSpanCity>
        <FPSpanPrice>Starting from $120</FPSpanPrice>
        <FPRating>
          <FPButton>8.9</FPButton>
          <FPSpanReview>Excellent</FPSpanReview>
        </FPRating>
      </FPItem>
      <FPItem>
        <FPropertyImg
          src="https://t-cf.bstatic.com/xdata/images/hotel/square200/223496641.webp?k=a2395bdb7f1ce5c33815dee6d9d0f825e8cf88d1aac4d7ad2ec288fcbd8bba78&o=&s=1"
          alt="Hotel Image"
        />
        <FPSpanName>Cosmos Lounge</FPSpanName>
        <FPSpanCity>Hyderabad</FPSpanCity>
        <FPSpanPrice>Starting from $120</FPSpanPrice>
        <FPRating>
          <FPButton>8.9</FPButton>
          <FPSpanReview>Excellent</FPSpanReview>
        </FPRating>
      </FPItem> */
}
