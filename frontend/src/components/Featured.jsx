import styled from "styled-components";
import useFetch from "./hooks/useFetch";

const FeaturedContainer = styled.div`
  width: 100%;
  max-width: 1024px;
  display: flex;
  justify-content: space-between;
  gap: 20px;
  background-color: #eeeeee;
  padding: 10px;
`;
const FeaturedItem = styled.div`
  position: relative;
  color: #f50057;
  border-radius: 10px;
  overflow: hidden;
  height: 250px;
`;
const FeaturedImg = styled.img`
  width: 100%;
  object-fit: cover;
  z-index: 1;
`;
const FeaturedTitles = styled.div`
  position: absolute;
  bottom: 25px;
  left: 25px;
`;
const FeaturedTitlesHeading = styled.h1``;
const FeaturedTitlesSubHeading = styled.h2``;
const Featured = () => {
  const { data, error, loading } = useFetch(
    "/hotels/countByCity?cities=Hyderabad,Mumbai,Bangalore"
  );

  // console.log(data);
  return (
    <FeaturedContainer>
      {loading ? (
        "Loading Please Wait"
      ) : (
        <>
          <FeaturedItem>
            <FeaturedImg
              src="https://t-cf.bstatic.com/xdata/images/region/square300/49646.webp?k=b7f38878b9164ee38e0b99c4d4646dbea76b7bf4add8464b1aa75e4c9d0efc6e&o="
              alt="featured"
            />
            <FeaturedTitles>
              <FeaturedTitlesHeading>Hyderabad</FeaturedTitlesHeading>
              <FeaturedTitlesSubHeading>
                {data[0]} Properties
              </FeaturedTitlesSubHeading>
            </FeaturedTitles>
          </FeaturedItem>
          <FeaturedItem>
            <FeaturedImg
              src="https://t-cf.bstatic.com/xdata/images/city/square300/684534.webp?k=d1fe86c22f2433f4e2dda14ddcbe80feb024b0fb30305e5684a1241fba5d4cff&o="
              alt="featured"
            />
            <FeaturedTitles>
              <FeaturedTitlesHeading>Bangalore</FeaturedTitlesHeading>
              <FeaturedTitlesSubHeading>
                {data[2]} Properties
              </FeaturedTitlesSubHeading>
            </FeaturedTitles>
          </FeaturedItem>
          <FeaturedItem>
            <FeaturedImg
              src="https://t-cf.bstatic.com/xdata/images/city/square300/971346.webp?k=40eeb583a755f2835f4dcb6900cdeba2a46dc9d50e64f2aa04206f5f6fce5671&o="
              alt="featured"
            />
            <FeaturedTitles>
              <FeaturedTitlesHeading>Mumbai</FeaturedTitlesHeading>
              <FeaturedTitlesSubHeading>
                {data[1]} Properties
              </FeaturedTitlesSubHeading>
            </FeaturedTitles>
          </FeaturedItem>
        </>
      )}
    </FeaturedContainer>
  );
};
export default Featured;
